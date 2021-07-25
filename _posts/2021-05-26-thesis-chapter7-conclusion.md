---
layout: post
title: Chapter 7 Conclusion
subtitle: COVID-LEAP thesis takeaways
cover-img: /assets/img/forest_path.jpg
tags: [Covid-19, learning, machine learning, information retrieval]
---
A summary of the LEAP solution:

* __Benchmarked nine IR strategies__ including lexical models (BM25) and dense models based on BERT transformer architecture. with synthetic benchmarking allowed automated, iterative evaluation and optimisation. Showed semantic models benefitted from domain and longer passage fine-tuning. BM25 does well. Reranking ensembles capitalise on strong BM25 & fine-grain the lexical model results with semantic capture for even better performance.

* __Base models responding positively to calibration__ to capture the semantics of specialised domains

* __Demonstrated a consistent top strategy__ with a dense architecture refined in several iterations with MS MARCO passage training, CORD-19 tuning, and an enhanced learning mechanism

* __Empirical evaluation__ showed dense ANCE strategy outperforming the lexical BM25 method and “go-to” PubMedCentral search site in most test tasks

* __Experimentation with bibliometrics__ to add paper quality metrics detrimentally affected relevancy. More work is required to dampen their overly aggressive influence

* __Disambiguation of authors__ needs improvement

* __Future work__ would include a custom tokenizer to prevent the splitting of hyphenated entities such as *T-cell*, which affects search, and experiment with other transformer models such as *Big Bird*, by Google, which is designed to capture longer text sequences

In closing, I share a medical expert’s view of the vaccine landscape tracking element of LEAP:

*The COVID-19 vaccine dashboard provides an overview of the global COVID-19 vaccine development landscape. It presents an impressive amount of vaccine development and related knowledge via an intuitive user-interface. Automatically generated visualizations of the preclinical and clinical development pipelines empower end-users to quickly and efficiently navigate and understand the landscape and how it is changing over time. Linked tabulations of knowledge allow users to quickly drill-down to more deeply understand the development and related details of any given vaccine or class of vaccines. The Dashboard is an invaluable resource for anyone working in the field of COVID-19 vaccine development.*
