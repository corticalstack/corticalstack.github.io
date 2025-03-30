---
layout: post
title: Unsloth AI - Supercharging LLM Fine-Tuning with Half the Memory and Double the Speed
subtitle: How rewritten CUDA kernels are making open-source model customization accessible on consumer hardware
cover-img: /assets/img/forest_path.jpg
tags: [learning, personal, opensource, genai, llm]
---
<!-- Original LinkedIn post: https://www.linkedin.com/posts/activity-7160306684823805953-PKp9 -->

🔧 You can fine-tune an open source LLM for it to better understand your business & use case.

🐢 However, fine-tuning can be slow & memory hungry. 

🦥 [Unsloth AI](https://github.com/unslothai/unsloth) created an open source Python package making fine tuning of LLMs up to 2x faster, & reducing training memory by 50%.

🖥️ How? Unsloth AI took the entire backpropogation algorithm and rewrote the CUDA kernels in OpenAI's triton language, along with maths optimisation, for better performance & efficiency without accuracy loss.

💵 Ideal for enthusiasts optimizing models on consumer hardware. Also works for organizations aiming to cost-effectively fine-tune & swiftly adapt models to align with evolving data.

⏱️ I tested instruct fine-tuning Llama-7B with alpaca dataset 51K Q/A pairs, on a single RTX3090, for training time & training memory used.
- Standard HF AutoModelForCausalLM (fast attn 2): 31 minutes, 10.8GB 
- Unsloth: 20 minutes, 3.9GB. 

🏆 That's a 10 minute & 7GB saving with this test.

🗜️ Unsloth can also merge your fine-tuned adapter layers back with the base model & quantise (compress) to formats including GGUF and GPTQ. 

⭐ Daniel Han is working hard on unsloth, adding new features & compatibility with more base models. Go check the repo for fab collection of fine-tuning colab notebook examples, & while there, give the repo a ⭐. Thanks Eric Hartford for the Unsloth AI tip!

![](../assets/img/unsloth.jpg)

