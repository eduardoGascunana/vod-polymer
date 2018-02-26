var dataCacheName = "videoclub-data";
var cacheName = "videoclub-shell";
var rootPath = self.location.origin + self.location.pathname.substr(0, self.location.pathname.indexOf("service-worker.js")-1); 
var filesToCache = [
  ".",
  rootPath,
  rootPath + "/index.html",
  rootPath + "/src/c-main.html",
  rootPath + "/src/c-cart-item.html",
  rootPath + "/src/c-cover.html",
  rootPath + "/src/c-img.html",
  rootPath + "/src/c-list.html",
  rootPath + "/src/c-menu-item.html",
  rootPath + "/src/c-menu.html",
  rootPath + "/src/c-model-cart.html",
  rootPath + "/src/c-model-categories.html",
  rootPath + "/src/c-model-data.html",
  rootPath + "/src/c-rating.html",
  rootPath + "/src/c-view-cart.html",
  rootPath + "/src/c-view-detail.html",
  rootPath + "/src/c-view-home.html",
  rootPath + "/src/c-view-list.html",
  rootPath + "/src/c-modal.html",
  rootPath + "/src/c-view-404.html",
  rootPath + "/images/default.jpg",
  rootPath + "/images/star.png",
  rootPath + "/bower_components/polymer/polymer.html",
  rootPath + "/bower_components/app-layout/app-drawer/app-drawer.html",
  rootPath + "/bower_components/app-route/app-location.html",
  rootPath + "/bower_components/app-route/app-route.html",
  rootPath + "/bower_components/iron-pages/iron-pages.html",
  rootPath + "/bower_components/iron-icon/iron-icon.html",
  rootPath + "/bower_components/iron-icons/iron-icons.html",
  rootPath + "/bower_components/paper-spinner/paper-spinner.html",
  rootPath + "/bower_components/iron-media-query/iron-media-query.html",
  rootPath + "/bower_components/polymer/polymer-mini.html",
  rootPath + "/bower_components/iron-flex-layout/iron-flex-layout.html",
  rootPath + "/bower_components/iron-location/iron-location.html",
  rootPath + "/bower_components/iron-location/iron-query-params.html",
  rootPath + "/bower_components/app-route/app-route-converter-behavior.html",
  rootPath + "/bower_components/iron-resizable-behavior/iron-resizable-behavior.html",
  rootPath + "/bower_components/iron-selector/iron-selectable.html",
  rootPath + "/bower_components/iron-meta/iron-meta.html",
  rootPath + "/bower_components/iron-iconset-svg/iron-iconset-svg.html",
  rootPath + "/bower_components/iron-localstorage/iron-localstorage.html",
  rootPath + "/bower_components/iron-ajax/iron-ajax.html",
  rootPath + "/bower_components/paper-styles/color.html",
  rootPath + "/bower_components/paper-spinner/paper-spinner-behavior.html",
  rootPath + "/bower_components/paper-spinner/paper-spinner-styles.html",
  rootPath + "/bower_components/polymer/polymer-micro.html",
  rootPath + "/bower_components/iron-selector/iron-selection.html",
  rootPath + "/bower_components/iron-ajax/iron-request.html",
  rootPath + "/bower_components/promise-polyfill/promise-polyfill-lite.html",
  rootPath + "/bower_components/promise-polyfill/Promise.js"
];
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", function (e) {

  /* 
    https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
  */
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          return caches.delete(key);
        }
      }));
    }).then(function () {
      return clients.claim();
    }).then(function () {
      return self.clients.matchAll().then(function (clients) {
        return Promise.all(clients.map(function (client) {
          return client.postMessage("service worker activated");
        }));
      });
    })
  );

});
self.addEventListener("fetch", function (e) {
  if (e.request.url.indexOf("/data/") > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});
