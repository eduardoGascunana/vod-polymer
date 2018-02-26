# Progressive Web App with Polymer 1.6

Simulates a VOD site distributed in:
* Home (access point to the site)
* Menu of genres and filtered list (depends on device resolution is possible add or remove each movie to the cart and modify it's rate)
* Detail (it allows add or remove the movie to the cart and modify it's rate)
* Cart (it concludes the purchase process or removes movies added to the cart)

### PRPL
This PWA exercise is built following the pattern PRPL:
* Push (critical resources for the initial URL route)
* Render (initial route)
* Precache (remaining routes)
* Lazyload

### App entrypoint
* Import and instantiate the shell:
* Minimal static dependencies
* Loads required polyfills
* Register service worker if the browser supports it

### App Shell
* HTML, JS and CSS minimun required to activate the UI
* Responsible for routing and includes the main navigation UI
* Lazyload fragments as they're required

### Custom Service Worker
It includes configuration to cache the Shell application and the data, so in the following visits it will load faster

### Install bower
npm install g bower

### Install polymercli
Version 1.6.0   
npm install g polymercli

### Build
polymer build   
Create a build according to the defined configuration in polymer.json
