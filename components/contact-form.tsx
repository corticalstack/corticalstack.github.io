"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { playSfx } from "@/lib/sfx";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdajdezj";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    playSfx("press");
    const form = event.currentTarget;
    const data = new FormData(form);

    // Pretty subject line so the inbox is greppable.
    const name = String(data.get("name") || "anonymous operative");
    data.set("_subject", `// NEW TRANSMISSION FROM ${name}`);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const json: { errors?: { message: string }[] } = await response
        .json()
        .catch(() => ({}));
      const detail = json.errors?.map((e) => e.message).join(", ") || "";
      setStatus("error");
      setErrorMessage(detail || `Transmission failed (${response.status}).`);
    } catch {
      setStatus("error");
      setErrorMessage("Network unreachable. Check your connection and retry.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-primary/40 bg-card/40 p-8 text-center">
        <div className="font-mono text-xs text-primary">
          // TRANSMISSION RECEIVED
        </div>
        <h3 className="mt-3 font-display text-2xl tracking-tight">
          Signal acknowledged.
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Reply incoming when bandwidth permits.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-xs text-primary/70 underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          [ open another channel ]
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* Honeypot: hidden from humans; bots fill it and Formspree silently discards. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="font-mono text-xs text-muted-foreground"
          >
            NAME
          </label>
          <Input
            id="name"
            name="name"
            placeholder="operative name"
            required
            disabled={status === "submitting"}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="font-mono text-xs text-muted-foreground"
          >
            EMAIL
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@domain.com"
            required
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="font-mono text-xs text-muted-foreground"
        >
          MESSAGE
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Compose transmission..."
          className="min-h-[150px]"
          required
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="border border-destructive/40 bg-destructive/10 p-3 font-mono text-xs text-destructive"
        >
          // TRANSMISSION FAILED // {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full font-mono"
        size="lg"
        disabled={status === "submitting"}
        onMouseEnter={() => {
          playSfx("hover");
          playSfx("type");
        }}
      >
        {status === "submitting" ? "> TRANSMITTING..." : "SEND TRANSMISSION"}
      </Button>
    </form>
  );
}
