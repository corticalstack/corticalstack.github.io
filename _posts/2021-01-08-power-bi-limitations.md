---
layout: post
title: Power-BI limitations
subtitle: Bootstrapping my search engine with a front-end
cover-img: /assets/img/forest_path.jpg
tags: [Covid-19, information retrieval, data visualisation, microsoft, analytics]
---
Having prototyped visualising and exploring the COVID-19 vaccine development landscape with Power-BI, I wanted to add the following search feature:

* A free text search bar visualisation element for entry of query phrase
* The query phrased is passed to a web service
* The web service returns a table of results, where relationships can then be modeled with other data tables

In other words, add a custom search app feature in Power-BI, passing a search term to a NLP model exposed in Azure as a web service, and return a hit list of ranked results.

Now I believe you can create a search viz in Power-BI, but believe this searches only over existing *normal* data tables, and not linkable to trigger a web service api call. 

I also believe in Power-BI option *get data* you can define a web service, but how to trigger from a search element? I think the challenge may be integrating the search element with the web service call. 

Looks like I'll have to explore other front-end options for search, hoping not to resort to full-blown React/Vue apps.