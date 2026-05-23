#!/usr/bin/env node
/**
 * Kling AI image-to-video CLI.
 *
 * Usage (after dropping KLING_ACCESS_KEY + KLING_SECRET_KEY into `.env.local`):
 *
 *   node --env-file=.env.local tools/kling.mjs \
 *     --image ./seed.jpg \
 *     --prompt "Subject does X. Environment does Y. Slow camera dolly. Natural lighting." \
 *     --out hero-test1.mp4 \
 *     --model kling-v3 \
 *     --mode pro \
 *     --duration 10 \
 *     --aspect-ratio 16:9
 *
 * Mints a JWT from AccessKey + SecretKey (HS256, 30 min expiry), submits an
 * image-to-video task, polls until done, and writes the MP4 into
 * `public/assets/video/<out>`.
 *
 * Known model_name values (check your Kling dashboard for what your account
 * has access to): kling-v1, kling-v1-5, kling-v1-6, kling-v2-master,
 * kling-v2-1, kling-v2-1-master, kling-v2-5-turbo, kling-v2-6, kling-v3.
 * If `kling-v3` errors with model-not-found, fall back to `kling-v2-6`.
 *
 * No runtime deps - JWT via built-in node:crypto, env via Node 22's
 * --env-file flag.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parseArgs } from "node:util";

const BASE_URL = process.env.KLING_BASE_URL || "https://api-singapore.klingai.com";
const POLL_INTERVAL_MS = 8000;
const POLL_TIMEOUT_MS = 15 * 60 * 1000;
const OUT_DIR = path.resolve("public/assets/video");

const { values: args } = parseArgs({
  options: {
    image: { type: "string" },
    "image-url": { type: "string" },
    "image-tail": { type: "string" },
    prompt: { type: "string" },
    negative: { type: "string" },
    out: { type: "string" },
    model: { type: "string", default: "kling-v3" },
    mode: { type: "string", default: "pro" },
    duration: { type: "string", default: "10" },
    "aspect-ratio": { type: "string", default: "16:9" },
    sound: { type: "string", default: "off" },
  },
});

if (!args.prompt) die("--prompt is required");
if (!args.out) die("--out is required (e.g. hero-test1.mp4)");
if (!args.image && !args["image-url"]) die("--image or --image-url is required");

const accessKey = process.env.KLING_ACCESS_KEY;
const secretKey = process.env.KLING_SECRET_KEY;
if (!accessKey || !secretKey) {
  die(
    "KLING_ACCESS_KEY and KLING_SECRET_KEY must be set in .env.local. " +
      "Get them from https://app.klingai.com/global/dev/api-key and run with " +
      "`node --env-file=.env.local tools/kling.mjs ...`",
  );
}

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function mintJwt(ak, sk) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: ak, exp: now + 1800, nbf: now - 5 };
  const head = b64url(JSON.stringify(header));
  const body = b64url(JSON.stringify(payload));
  const sig = b64url(
    crypto.createHmac("sha256", sk).update(`${head}.${body}`).digest(),
  );
  return `${head}.${body}.${sig}`;
}

function loadImage() {
  if (args["image-url"]) return args["image-url"];
  const buf = fs.readFileSync(path.resolve(args.image));
  // Kling requires raw base64 (no data: prefix).
  return buf.toString("base64");
}

async function postTask(token) {
  const body = {
    model_name: args.model,
    image: loadImage(),
    prompt: args.prompt,
    mode: args.mode,
    duration: args.duration,
    aspect_ratio: args["aspect-ratio"],
    sound: args.sound,
  };
  if (args.negative) body.negative_prompt = args.negative;
  if (args["image-tail"]) {
    body.image_tail = args["image-tail"].startsWith("http")
      ? args["image-tail"]
      : fs.readFileSync(path.resolve(args["image-tail"])).toString("base64");
  }

  const res = await fetch(`${BASE_URL}/v1/videos/image2video`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok || json.code !== 0) {
    die(`task creation failed: ${res.status} ${JSON.stringify(json)}`);
  }
  return json.data.task_id;
}

async function pollTask(token, taskId) {
  const start = Date.now();
  let lastStatus = "";
  while (Date.now() - start < POLL_TIMEOUT_MS) {
    const res = await fetch(`${BASE_URL}/v1/videos/image2video/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok || json.code !== 0) {
      die(`poll failed: ${res.status} ${JSON.stringify(json)}`);
    }
    const status = json.data.task_status;
    if (status !== lastStatus) {
      const elapsed = Math.round((Date.now() - start) / 1000);
      console.log(`[${elapsed}s] status: ${status}`);
      lastStatus = status;
    }
    if (status === "succeed") return json.data.task_result.videos[0].url;
    if (status === "failed") {
      die(`generation failed: ${json.data.task_status_msg || "(no message)"}`);
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  die(`timed out after ${POLL_TIMEOUT_MS / 1000}s`);
}

async function download(url, dst) {
  const res = await fetch(url);
  if (!res.ok) die(`download failed: ${res.status}`);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dst, buf);
  return buf.length;
}

(async () => {
  const token = mintJwt(accessKey, secretKey);
  console.log(`> submitting ${args.model} ${args.mode} ${args.duration}s ...`);
  const taskId = await postTask(token);
  console.log(`> task_id: ${taskId}`);
  const url = await pollTask(token, taskId);
  console.log(`> video ready: ${url}`);
  const dst = path.join(OUT_DIR, args.out);
  const size = await download(url, dst);
  console.log(`> wrote ${dst} (${(size / 1024 / 1024).toFixed(2)} MB)`);
})();
