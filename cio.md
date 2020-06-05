---
layout: page
title: Computational Intelligence Optimization
cover-img: /assets/img/fish_school.jpg
tags: [optimization, metaheuristics, hyper-heuristics, Python, flow shop, combinatorial, continuous]
---
### Hyper And Meta-Heuristic Optimization Platform
The Flow Shop Scheduling Problem (FSSP) is a well-known combinatorial optimization problem where job operations must be 
processed on a set of machines with the objective of finding the permutation of jobs that minimises the complete 
processing time of the complete manufacturing operation, known as the makespan. 

Solutions look to optimize the production process and therefore the supply chain as a whole. The FSSP problem is 𝑛! Given 
this factorial nature, it becomes prohibitive calculating the makespan for all possible permutations. Taking a 20 job by 
10 machine (20jx10m) scenario as an example, there are 2,432,902,008,176,640,000 possible permutations of job sequence. 
Further illustrating the challenge, solving a small 10jx10m benchmark instance published by Fisher and Thompson in 1963 
took 23 years to solve. Metaheuristic algorithms can be applied to scheduling problems to propose solutions that may 
only be near-optimal, but considered “good enough”, at reasonable computational cost. 

This study presents HOP (Heuristic Optimisation Platform), a Python-based framework to address the real-world problem of 
scheduling optimisation. 5 nature-inspired metaheuristic algorithms including Simulated Annealing (SA), Genetic Algorithm (GA), 
Particle Swarm Optimisation (PSO), Differential Evolution Algorithm (DEA) and Evolution Strategy (ES) are implemented and 
evaluated using 3 benchmark instances from Taillard’s FSSP problem suite. Further supporting the guiding principle of problem and heuristic separation, HOP can also solve continuous problems with 
the same general metaheuristic pool without code change, tested using Rastrigin’s function. 

A hyper-heuristic feature dynamically switches between low-level metaheuristics to deterministically use the most 
appropriate according to current problem state, or select one stochastically.

[MSc paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/cio/Heuristic Optimization Platform.pdf) graded 100%
 | [Source code](https://github.com/corticalstack/heuristic-optimization-platform)

### Testbed Problem Optimization
4 popular testbed problems (De Jong's Sphere, Schwefel, Rastrigin, Michalewicz) are optimized with a single solution 
simulated annealing (SA) algorithm.

[MSc paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/cio/Testbed Problem Optimisation.pdf) graded 100%
 | [Source code](https://github.com/corticalstack/problem-optimisation-benchmarking)

### Exact Optimization
Using calculus to find the global minimum in single and multivariate functions. 

[MSc paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/cio/Exact Optimisation.pdf) graded 100%


