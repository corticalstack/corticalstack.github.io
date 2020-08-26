---
layout: post
title: Breast Cancer Tumour Classification
subtitle: Fuzzy Logic Outperforms Neural Networks
cover-img: /assets/img/forest_path.jpg
tags: [learning, breast cancer, fuzzy logic, classification, machine learning, data science]
---
Of all cancers occurring in women, breast cancer is the most common. 2 million new cases and over 0.5 million 
deaths globally each year. In the UK alone, between 2015 and 2017, 11,400 deaths each year, or 31 per day. Globally, many 
doctors are overwhelmed, having to deal with up to 70 patients a day. Mistakes in diagnosis have deadly consequences. These 
are shocking, extremely sad statistics, especially as all 100% of women with the disease can survive their first year if 
diagnosed at the earliest stage.

Disease diagnosis implies complex data involving several levels of uncertainty and imprecision. A single disease can 
manifest itself differently, with varying intensities, depending on the patient. A single symptom may correspond to different 
diseases. On the other hand, several diseases present in a patient may interact and interfere with the usual description 
of any one disease.

The report and source code linked below presents a Python-based fuzzy logic knowledge-based inference system for the binary 
classification of breast cancer tumours. Fuzzy logic lends itself to modelling domains where vagueness and blurriness are 
present. The solution takes an extensive data-driven, supervised learning approach in defining linguistic 
terms, implication rule sets and membership functions, with the Wisconsin Diagnostic Breast Cancer dataset used as the 
empirical, impartial problem domain expert. 

The best FIS model classified all test set malignant tumors correctly with an overall accuracy of 93.6%, outperforming 
the logistical regression, decision tree, random forest machine and neural network learning methods. Fuzzy logic systems 
are transparent, simple and interpretable. They can provide a far more “*explainable A.I.*” solution than machine 
learning alternatives such as neural networks.

[Master's Degree Intelligent Systems paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/fl/Breast Cancer Tumour Classification With FIS.pdf) grade 98%
 | [Source code](https://github.com/corticalstack/fuzzy-system-breast-cancer-wisconsin)