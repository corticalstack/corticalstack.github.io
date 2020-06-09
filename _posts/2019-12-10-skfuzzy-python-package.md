---
layout: post
title: Skfuzzy
subtitle: Python Package For Fuzzy Logic
cover-img: /assets/img/forest_path.jpg
tags: [fuzzy logic, skfuzzy, Python]
---
Fuzzy logic is a concept first introduced by Zadeh in 1965 to model logical reasoning with a level of vagueness. I wanted 
to develop a Fuzzy Inference System (FIS) to classify breast cancer tumours. 

Why use fuzzy logic and not some trendy, state-of-the-art approach like neural networks? Because conclusions reached through 
use of fuzzy logic can be easily understood and interpreted by a medical practitioner, which provides a far more "**explainable A.I.**" 
solution. 

Furthermore, the problem domain of determining any presence of a single disease may manifest itself quite differently 
depending on the patient, and with different intensities. A single symptom may correspond to different diseases. On the 
other hand, several diseases present in a patient may interact and interfere with the usual description of any of the 
diseases. Such overlapping between diseases seemed a perfect fit for a fuzzy logic-based classification system able to model
blurriness. 
  
[Matlab's fuzzy logic toolbox][matlabfltb] is the most popular fuzzy logic library I'm aware of, with a large user 
community and many documented example use cases. However, I'm a Python developer at heart, so was happy to discover the 
[Skfuzzy] Python library. Some simple implementation examples can be found [here][Skfuzzyeg]. 

The Python-based FIS I developed to classify breast cancer tumours worked fantastically well. Tested with the [Wisconsin Diagnostic Breast Cancer 
Dataset][wisconsin], the best FIS configurations were able to correctly predict all malignant cancer samples. It 
outperformed tuned Keras neural networks and other classifiers including decision trees and random forest. The code can 
be found [here][fisgit], along with the [supporting paper][fispaper].    
   

[fisgit]: https://github.com/corticalstack/fuzzy-system-breast-cancer-wisconsin
[fispaper]: https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/fl/Breast Cancer Tumour Classification With Fuzzy Information System.pdf
[Skfuzzy]: https://pythonhosted.org/scikit-fuzzy/
[Skfuzzyeg]: https://pythonhosted.org/scikit-fuzzy/auto_examples/index.html
[matlabfltb]: https://www.mathworks.com/products/fuzzy-logic.html
[wisconsin]: https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)