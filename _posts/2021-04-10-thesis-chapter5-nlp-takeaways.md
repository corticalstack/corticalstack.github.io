---
layout: post
title: Chapter 5 Natural Language Processing
subtitle: COVID-LEAP thesis takeaways
cover-img: /assets/img/forest_path.jpg
tags: [Covid-19, Microsoft Azure, cloud, Python, learning, machine learning, database, data, data engineering]
---
At its core, COVID-LEAP is a semantic information retrieval system. It is tasked with finding the most relevant academic paper snippets within a large open-source knowledge base of biomedical literature to answer human natural language form questions. 

I decomposed the problem of extracting knowledge to support clinical research into a step-by-step process. Language texts and trials data flow in, are processed through several data engineering and modelling tasks (developed in Python), and prepared data flows out to storage for applications to consume via an inference web service and database connection.

![](../assets/img/nlp pipeline.jpg)

I used the Azure Machine Learning service framework to author, publish, orchestrate and monitor the pipelines.