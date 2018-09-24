# Stage Three of Restaurant Reviews (Mohammad Bakir)
---
## Overview

This code covers Stage 3 of the Restaurant Reviews web application for the Mobile Web Specialist course from Udacity. It has the following features:

* A fully responsive layout
* Responsive images, both for sizing and art direction
* A restaurant listings page
* A restaurant info page
* Accessibility updates
* Service worker implementation to allow for viewing previously browsed pages while offline
* Offline application capabilities utilizing both the caches and IndexedDB
* Favorites can be controlled for each restaurant and work offline
* Reviews can be written for each restaurant and work offline
* Utilizes IDB for the IndexedDB

Icons credit to Flaticons

## How to view

This project depends on a separate project provided by Udacity to create an API end-point. This project is available on [git ](https://github.com/udacity/mws-restaurant-stage-3). Please follow the instructions there.

Once you the API server is started, do the following:

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.
In a terminal, check the version of Python you have: python -V. If you have Python 2.x, spin up the server with python -m SimpleHTTPServer 8000 (or some other port, if port 8000 is already in use.) For Python 3.x, you can use python3 -m http.server 8000. If you don't have Python installed, navigate to Python's website to download and install the software.

2. With your server running, visit the site: `http://localhost:8000` and explore some restaurants.

3. In Chrome you can open the Console, go to Application / Service Workers, and then check the Offline option to see offline behavior.
