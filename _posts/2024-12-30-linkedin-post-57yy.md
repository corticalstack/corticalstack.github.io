---
layout: post
title: Cline v3 - The Power and Pitfalls of Autonomous Coding Assistants
subtitle: Building a RAG application in minutes instead of hours — but beware the token monster
cover-img: /assets/img/forest_path.jpg
tags: [learning, ai, genai, coding, softwareengineering, developertools]
---
<!-- Original LinkedIn post: https://www.linkedin.com/posts/activity-7279523976203141120-57Yy -->

🔥 Hands-on with Cline v3: The Autonomous Coding Assistant

This holiday I tested the latest v3 release of hashtag#Cline, a vscode extension that can autonomously build entire applications. It can do everything, from creating and editing development artefacts to executing terminal commands and browser interactions. There are however customizable safety controls to tweak what Cline can do without explicit human approval.

To test, I tasked Cline to build a family personal assistant app for Q&A over resume, medical, and contractual documents.

✅ Nailed the backend: Developed and deployed RAG solution, based on the Qdrant vector dB, as instructed, with the following all autonomously done. 
↳ Creation of the environment requirements.txt.
↳ Installation of docker-compose & creation of the docker-compose.yaml.
↳ Fixed missing dependencies.
↳ Chunking and embedding a test set of mixed French/English docs using SentenceTransformer for multilingual embeddings.
↳ Spinning up the container & testing the health endpoint.
↳ Search query unit tests.

🤯 Mind-blown! Completed the above in 5 minutes. Would typically take a skilled developer at least 2-3 focused hours.

⚠️ Frontend challenge: Requested frontend, a browser-based app using the OpenAI realtime model API with WebRTC for voice-first query, proved tough (common across all LLMs and approaches I've used). 

🚨But there's a fundamental gotcha. Any coding assistant is of course only as good as the underlying LLM. And these coding assistants like Cline are expensive token MONSTERS! 

• DeepSeeker V3 official api token limit of 64K hit quickly before any part of solution build/test/deploy completed.

• Switching to Claude Sonnet 3.5, soon hit per minute org rate limit of 80K tokens, forcing a pause and retry.

𝗩𝗲𝗿𝗱𝗶𝗰𝘁: In experienced hands, with proper skepticism, guidance, and validation, these tools can significantly boost productivity. Just watch those tokens! Looking forward to experimenting more, supported by self-hosted models, where token costs and limits are not a concern.

![](../assets/img/autonomous-agents.jpg)



