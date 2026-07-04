// GRE Math Trainer — Full Edition — service worker
// Codename: Abel (first build). Bump CACHE_VERSION on every deploy.
const CACHE_VERSION = 'gre-full-abel-1';
const CACHE_NAME = 'gre-full-cache-' + CACHE_VERSION;
const ASSETS = [
  './gre_original_v2.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k.indexOf('gre-full-cache-') === 0 && k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request).then(function (networkResp) {
        if (networkResp && networkResp.status === 200) {
          var respClone = networkResp.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, respClone);
          });
        }
        return networkResp;
      }).catch(function () {
        return cached;
      });
      return cached || fetchPromise;
    })
  );
});
