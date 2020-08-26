---
layout: post
title: Metaheuristic Optimization
subtitle: Good Enough
cover-img: /assets/img/forest_path.jpg
tags: [learning, optimization, operations research, data science]
---
Often when we make a choice we face an optimisation problem. 

Imagine a manufacturing process where 20 jobs have 10 timed operations. For each operation there is a corresponding machine 
on which it will be processed. You are responsible for a permutation of job order that completes manufacturing in the 
shortest possible time. This is known as the Flow Shop Scheduling Problem (FSSP). 

In this 20*j*x10*m* scenario there are 2,432,902,008,176,640,000 possible permutations of job sequence! Know that how well 
you can optimize will directly impact the supply chain as a whole, so no pressure! It's going to take a little while to 
evaluate every possible solution, right? 

Metaheuristics can be applied to scheduling problems to propose solutions that may only be near-optimal, but considered 
“*good enough*”, at reasonable computational cost. Today I'd like to share the code and supporting academic paper for a 
Python-based framework I developed to address the real-world problem of scheduling optimisation. 5 nature-inspired 
metaheuristic algorithms including Simulated Annealing (SA), Genetic Algorithm (GA), Particle Swarm Optimisation (PSO), 
Differential Evolution Algorithm (DEA) and Evolution Strategy (ES) are implemented.

The framework also implements a hyper-heuristic feature that dynamically switches between low-level metaheuristics to 
deterministically use the most appropriate algorithm according to current problem state, or select one stochastically.

Enjoy!

[Master's Degree Intelligent Systems paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/cio/Heuristic Optimization Platform.pdf) grade 100%
 | [Source code](https://github.com/corticalstack/heuristic-optimization-platform)