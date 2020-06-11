---
layout: page
title: Mobile Robots
cover-img: /assets/img/mr.jpg
tags: [neural networks, ai]
---
### Wall Follower
This study presents an approach to addressing a wall-following problem. A virtual robot equipped with ultrasonic sensors 
is tasked with autonomously navigating an environment interior while maintaining constant distance to the wall. The 
solution leverages the extensive functionality of the V-REP virtual robot experimentation platform to provide the 
simulated physical environment layer, including wall and mobile robot objects. The control layer, implemented in Python 
and interfacing with VREP via API, manages environment perception and navigation. 

A final evaluation is made, comparing single and multi-sensor approaches. The final optimized multi-sensor solution 
offered best performance, especially at high speed, completing one loop in 155s with a navigation distance error rate of 
420.85cm. 

Recommendations include more refined sensor calibration and further research into proven control methods.

[Master Intelligent Systems paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/mr/Wall Follower.pdf) grade 92%
 | [Source code](https://github.com/corticalstack/vrep-wall-follower)
 
### Wall Follower With PID Controller
Implemented as a plugin to the control layer of the first Wall Follower solution, this study adds a Proportional, Integral 
and Derivative (PID) controller tasked with setting motor control velocities. Several variants of PID controller were 
tested. Using a fixed baseline speed, the PI controller performed best, reducing navigation error by 12% over best efforts 
from previous research. The PD controller delivers optimum performance when dynamically adjusting baseline speed with 
proportional error, reducing navigation error by 55.8% over previous best. 

Recommendations include refined sensor noise filtering to improve integral and derivative control

[Master Intelligent Systems paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/mr/Wall Follower PID Controller.pdf) grade 92%
 | [Source code](https://github.com/corticalstack/vrep-wall-follower-pid)
 
### Search And Rescue Robot
This study researched and implemented a virtual solution designed to simulate capabilities required of Search and Rescue 
robots. These include obstacle avoidance, sensor data fusion, environment mapping, precision navigation and victim 
location. 

A Python control layer commands a Pioneer P3DX robot modelled in VREP. During victim search ultrasonic sensor data builds 
an occupancy grid (OG) of free and occupied space probability. The A* path finding algorithm uses the OG to propose an 
optimal path from victim to home point. All task solutions are successful. 

Recommendations include performance optimization of grid mapping and resolving identified environment feature 
missing/overexposure issues affecting route planning.

[Master Intelligent Systems paper](https://docs.google.com/viewer?url=https://github.com/corticalstack/corticalstack.github.io/raw/master/docs/mr/Search and Rescue Robot.pdf) grade 100%
 | [Source code](https://github.com/corticalstack/vrep-search-rescue)

 