const CACHE_NAME = 'tap-the-enemy-cache-v1';
const urlsToCache = [
  '/',
  '/game.html',
  '/index.html',
  '/manifest.webmanifest',
  '/Game/assets/enemy.png'

];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
