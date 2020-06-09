---
layout: post
title: Inspyred 
subtitle: Python Package For Bio-Inspired Computation
cover-img: /assets/img/forest_path.jpg
tags: [optimization, metaheuristics, algorithm]
---
In developing the [Heuristic Optimisation Platform][hopgit] I hand-coded various metaheuristics (algorithms) including 
Particle Swarm Optimisation and Genetic Evolution. These can get quite involved, but of course a lot can be learned from 
such deep dive. HOP also has a hyper-heuristic feature, which can be thought of as a metaheuristic to select other algorithms 
from a low-level metaheuristic pool. I wanted a way to rapidly expand the catalogue of metaheuristics available to the hyper
feature, and the [Inspyred][inspyred] python package gives me just that capability.

````python
from random import Random
from time import time
import inspyred

def main(prng=None, display=False):    
    if prng is None:
        prng = Random()
        prng.seed(time()) 
        
    problem = inspyred.benchmarks.Rosenbrock(2)
    ea = inspyred.ec.ES(prng)
    ea.terminator = [inspyred.ec.terminators.evaluation_termination, 
                     inspyred.ec.terminators.diversity_termination]
    final_pop = ea.evolve(generator=problem.generator, 
                          evaluator=problem.evaluator, 
                          pop_size=100, 
                          bounder=problem.bounder,
                          maximize=problem.maximize,
                          max_evaluations=30000)

    if display:
        best = max(final_pop)
        print('Best Solution: \n{0}'.format(str(best)))
    return ea
            
if __name__ == '__main__':
    main(display=True)
````      

````python
from optimizers.optimizer import Optimizer
import inspyred
from optimizers.inspyred_wrapper import InspyredWrapper


class ES(Optimizer):
    def __init__(self, **kwargs):
        Optimizer.__init__(self, **kwargs)

    def optimize(self):
        self.evolve()

    def evolve(self):
        es = inspyred.ec.ES(self.random)
        es.observer = InspyredWrapper.observer
        es.terminator = [inspyred.ec.terminators.evaluation_termination,
                         inspyred.ec.terminators.diversity_termination]

        final_pop = es.evolve(generator=InspyredWrapper.generator,
                              evaluator=InspyredWrapper.evaluator,
                              pop_size=self.hj.initial_pop_size,
                              maximize=False,
                              max_evaluations=self.hj.budget,
                              slf=self)

        final_pop.sort(reverse=True)
        self.hj.rbest.fitness = final_pop[0].fitness

        # Inspyred ES extends candidate with strategy elements, slice for actual solution cand. associated with fitness
        self.hj.rbest.candidate = final_pop[0].candidate[:self.hj.pid_cls.n]
        self.hj.rft = list(set(self.hj.rft))  # Remove duplicates
        self.hj.rft.sort(reverse=True)
````


````python
import copy


class InspyredWrapper:
    def __init__(self):
        pass

    @staticmethod
    def generator(random, args):
        if args['slf'].hj.population:
            candidate = copy.deepcopy(args['slf'].hj.population[0].candidate)
            args['slf'].hj.population.pop(0)
        else:
            candidate = args['slf'].get_generator()(lb=args['slf'].hj.pid_lb, ub=args['slf'].hj.pid_ub)
        return candidate

    @staticmethod
    def evaluator(candidates, args):
        fitness = []
        for c in candidates:
            if isinstance(c[0], float) and args['slf'].hj.pid_type == 'combinatorial':
                c = args['slf'].hj.pid_cls.candidate_spv_continuous_to_discrete(c)
            f, _ = args['slf'].hj.pid_cls.evaluator(c)
            fitness.append(f)
            args['slf'].hj.budget -= 1
        return fitness

    @staticmethod
    def observer(population, num_generations, num_evaluations, args):
        if args['slf'].hj.oid_cls.__class__.__name__ == 'DEA':
            ft = [o.fitness for o in population]
            args['slf'].hj.rft.extend(ft)
        else:
            # Persist best fitness as population evolves. Note use of max is correct irrespective of max or min problem,
            # as Inspyred knows which type of problem the heuristic is instantiated with
            best = max(population)
            args['slf'].hj.rft.append(round(best.fitness, 2))

        args['slf'].hj.rft.sort()
        if args['slf'].hj.rft[0] < args['slf'].hj.rbest.fitness:
            args['slf'].hj.rbest.fitness = args['slf'].hj.rft[0]
            if not args['slf'].fromhyper:
                args['slf'].hj.iter_last_imp[args['slf'].hj.run] = args['slf'].hj.budget_total - args['slf'].hj.budget
                args['slf'].hj.imp_count[args['slf'].hj.run] += 1
````

![hopgit]: https://github.com/corticalstack/heuristic-optimization-platform  
![inspyred]: https://pythonhosted.org/inspyred/