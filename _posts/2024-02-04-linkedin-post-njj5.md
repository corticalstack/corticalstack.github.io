---
layout: post
title: LinkedIn Post NjJ5
subtitle: LinkedIn Post
cover-img: /assets/img/forest_path.jpg
tags: [learning, personal, opensource, genai, travel]
---
<!-- Original LinkedIn post: https://www.linkedin.com/posts/activity-7159864136389025792-NjJ5 -->

🔓 Showcasing the potential of open source GenAI for crafting personalized travel content.

🌏 Destination: Tokyo! Our fictional traveler, Max, embarks on his vacation to Japan. He chooses fish from the flight on-board menu. He also watched sports and played video games on the onboard entertainment system.

📜 Used the OpenHermes Mistral 7B LLM via the text-generation-webui to bring Max's Tokyo experience to life with a vivid and personalized set of key frame prompts like:
"150": "digital art, a 30 year old man buying fish at Tsukiji Fish Market , Fresh Seafood Vibes, Busy Traders, Unique Ingredients, vivid colors, (high-resolution:1.2),  ultra realistic"
https://lnkd.in/eHk4BsRD
https://lnkd.in/eduEpZsb

🎬 Used Stable Diffusion and deforum extension to create the animation. Provided the prompts from the LLM, and added settings for camera movement. Deforum takes care of the tweening (“inbetween”), or creating, the images from one keyframe to the next which are described by the prompts.
https://lnkd.in/et28cXaW

🎤 Tortoise TTS for text-to-speech voice over intro welcoming Max to Tokyo.
https://lnkd.in/e43-S4gA

All tools self-hosted on consumer hardware (RTX3090), using less than 10Gb VRAM, video rendered in 1 hour.

I'm curious how the above could be stitched together in an automated pipeline to scale presenting the output in-flight to passengers nearing arrival time.

https://www.youtube.com/watch?v=CLUbBg42he4
