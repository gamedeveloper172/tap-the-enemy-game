const CACHE_NAME = 'tap-the-enemy-cache-v1';
const urlsToCache = [
  '/',
  '/game',
  '/manifest.webmanifest',
  '/Game/assets/enemy.png'
];

// Install and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Clear old caches on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Serve cached files or fetch network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Return cached response
      }
      // Fetch and cache new requests dynamically (optional)
      return fetch(event.request).then(networkResponse => {
        // You can add dynamic caching here if desired
        return networkResponse;
      });
    })
  );
});
