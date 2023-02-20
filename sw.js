let cacheName    = "JSStringReplacer";
let filesToCache = [
  "./",
  "./libraries/pico/pico.classless.min.css",
  "./manifest.json",
  "./imgs/logo.png",
  "./imgs/logo.svg",
  "./index.html",
  "./css/style.min.css",
  "./js/app.js"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});