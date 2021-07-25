---
layout: post
title: Chapter 3 Datasets
subtitle: COVID-LEAP thesis takeaways
cover-img: /assets/img/forest_path.jpg
tags: [Covid-19, learning, mental health]
---
I rely on a collection of open-source datasets to provide foundational knowledge for answering questions related to the highly dynamic COVID-19 pandemic research domain and vaccine landscape. These are as follows:

* __CORD-19__ - Compiled by Microsoft Research and partners, this dataset is a collection of 400K unstructured academic articles related to coronavirus research. After cleansing to remove duplicates and articles with missing titles/abstracts, non-English etc, 127K articles remain for indexing and search.

* __WHO__ candidate vaccine landscape database - First published on 11th April 2020, it tracks the progress of pre-clinical and clinical vaccine trials, with updates published bi-weekly. In .pdf format, uugh! 
I will use it to answer questions such as: _Which private companies and government institutions are funding research?_ _Where are their vaccines being registered?_ _What are the characteristics of their clinical study?_

* __ClinicalTrials Registry__ - Provided by the United States National Library of Medicine at the National Institutes of Health, ClinicalTrails.Gov is a database of clinical trials registered in the U.S. This is the go-to information resource for clinical studies on a wide range of diseases and conditions

* __Aggregated Analysis of ClinicalTrials.Gov database__ - While valuable, extracts from ClinicalTrials.Gov are incomplete, missing essential study information such as interventions and design. I resolve this by supplementing CTG extracts with the AACT database developed by the Clinical Trials Transformation Initiative (CTTI).