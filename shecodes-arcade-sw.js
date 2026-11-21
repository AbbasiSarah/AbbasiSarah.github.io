const VERSION = 'shecodes-arcade-offline-v1';
const entry = new URL('./arcade-app.html', self.location.href);
const assets = [
  entry.href,
  new URL('./shecodes-arcade.webmanifest', self.location.href).href,
  new URL('./shecodes-arcade-192.png', self.location.href).href,
  new URL('./shecodes-arcade-512.png', self.location.href).href
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(assets)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('shecodes-arcade-offline-') && key !== VERSION)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const requestURL = new URL(event.request.url);
  if (event.request.mode === 'navigate' && requestURL.origin === entry.origin && requestURL.pathname === entry.pathname) {
    event.respondWith(fetch(event.request).then(async response => {
      if (response.ok) {
        const cache = await caches.open(VERSION);
        await cache.put(entry.href, response.clone());
      }
      return response;
    }).catch(() => caches.match(entry.href)));
  } else if (assets.includes(requestURL.href)) {
    event.respondWith(caches.match(requestURL.href).then(cached => cached || fetch(event.request)));
  }
});
