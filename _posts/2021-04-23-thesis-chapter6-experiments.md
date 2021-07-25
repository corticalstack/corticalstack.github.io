---
layout: post
title: Chapter 6 Experiment Design & ResultsNatural Language Processing
subtitle: COVID-LEAP thesis takeaways
cover-img: /assets/img/forest_path.jpg
tags: [Covid-19, learning, machine learning]
---
With COVID-LEAP, I developed and evaluated several IR strategies that included lexical (e.g., BM25), dense (e.g., msmarco-distilbert-base-v3), and re-ranking models (e.g., lexical first stage BM25 reranked by second stage dense c19gq-ance-msmarco-passage), with and without applied paper quality metrics, for the location and ranking of relevant candidate paragraphs from searching a large corpus of academic articles. A summary of the extensive testing:

* __Intrinsic evaluation__ with synthetic benchmarking allowed automated, iterative evaluation and optimisation. Showed semantic models benefitted from domain and longer passage fine-tuning. BM25 does well. Reranking ensembles capitalise on strong BM25 & fine-grain the lexical model results with semantic capture for even better performance.

* __Extrinsic evaluation__ by a medical expert with over 30 years experience shows there is a concensus with intrinsic testing, with the *ANCE with cross-encoding* the strongest strategy. In contrast to synthetic benchmarking, BM25 performs poorly, highlighting the importance of *human in the loop* evaluation of deep-learning solutions. 

Overall, LEAP outpeforms PubMedCentral.  For much more detail, please see Chapter 6 of the [Thesis paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/project/Jon-Paul Boyd Masters Thesis Report COVID-LEAP state-of-the-art information retrieval.pdf)
