---
layout: post
title: AI Agentic Tooling - A Hands-On Comparison of Leading Frameworks
subtitle: From simple function calls to complex multi-agent systems — choosing the right tool for your AI workflow
cover-img: /assets/img/forest_path.jpg
tags: [linkedin]
---
<!-- Original LinkedIn post: https://www.linkedin.com/posts/activity-7277424128813400064-cO0X -->

𝐍𝐚𝐯𝐢𝐠𝐚𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐀𝐈 𝐀𝐠𝐞𝐧𝐭𝐢𝐜 𝐓𝐨𝐨𝐥𝐢𝐧𝐠 𝐌𝐚𝐳𝐞: 𝐌𝐲 𝐇𝐚𝐧𝐝𝐬-𝐎𝐧 𝐄𝐯𝐚𝐥𝐮𝐚𝐭𝐢𝐨𝐧

Over the last weeks, I've deep dived into agentic tooling. They empower LLMs to direct logic flow, enabling everything from simple function calls to complex multi-agent collaborations. They turn LLMs from passive text generators into active, goal-orientated agents that execute real tasks. Here’s my key takeaways to help you choose the right tool.

🔧𝐎𝐩𝐞𝐧𝐀𝐈 𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧 𝐂𝐚𝐥𝐥𝐢𝐧𝐠

Perfect for simple use cases (KISS).  
𝐏𝐫𝐨𝐬  
↳ Simple integration of specific, well-defined functions with a schema.  
↳ Low code.  
↳ Easily extensible.  
↳ Best for simple, real-time assistants without high latency & token cost of multi-agent, multi-step inner monologues.  

𝐂𝐨𝐧𝐬  
↳ Single model agent.  
↳ Requires own agentic loop & function calling implementation.  

🔍𝐋𝐥𝐚𝐦𝐚𝐈𝐧𝐝𝐞𝐱

Optimized for multi-doc retrieval & intelligence, so ideal for knowledge management systems.  
𝐏𝐫𝐨𝐬  
↳ Easy multi data source integration.  
↳ High control over agent & tool integration.  

𝐂𝐨𝐧𝐬  
↳ Steep learning curve, code heavy.

📈𝐋𝐚𝐧𝐠𝐆𝐫𝐚𝐩𝐡

Built for complex agentic AI systems needing granular control & customization.  
𝐏𝐫𝐨𝐬  
↳ Advanced workflow controls, human interrupts for critical actions.  
↳ LangSmith integration for AgentOps.  

𝐂𝐨𝐧𝐬  
↳ Code intensive.  
↳ Steeper learning curve, requires graph-based thinking.  

🧠𝐌𝐞𝐦𝐆𝐩𝐭 (𝐋𝐞𝐭𝐭𝐚)

Optimized for multi-agent conversational orchestration with shared memory & persistent memory for context over time & restarts.  
𝐏𝐫𝐨𝐬  
↳ Easy to define blocks of LLM context for structured state & information sharing between agents.  
↳ Multi-session long-term memory retention.  
↳ Agents can autonomously update their memory to learn over time & provide more contextually aware, immersive responses.  
↳ Powerful feature to evict older context to persistent memory, retrieving later in compressed format for no information loss.  

𝐂𝐨𝐧𝐬  
↳ Learning curve setting up memory config.  

🤖 𝐀𝐮𝐭𝐨𝐠𝐞𝐧

Optimized for multi-agent, roles-based group conversation.  
𝐏𝐫𝐨𝐬  
↳ Clear delegation between specialized agents to coordinate efforts.  
↳ Simple orchestration.  
↳ Easy multi-model setup.  
↳ Highly configurable inter-agent interactions.  
↳ Workflow allows human oversight.  

𝐂𝐨𝐧𝐬  
↳ Learning curve to configure coded agent interactions. 

🛠️ 𝐂𝐫𝐞𝐰𝐀𝐈

Optimized for simplified multi-agent orchestration to handle different parts of a task.  
𝐏𝐫𝐨𝐬  
↳ Intuitive, clear boundaries between tasks, agents, & crews.  
↳ Structured Pydantic output for consistency & robustness.  
↳ Easy external tool integration, including hashtag#LangChain.  
↳ Multi-model support.  
↳ Allows human interrupts for feedback to agent execution output.  

𝐂𝐨𝐧𝐬  
↳ Moderate code dependency, configuration between code & yaml.

❓What's your key takeaways from these tools? Anything I've missed or should evaluate next?

![](../assets/img/agentic-frameworks.jpg)