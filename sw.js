const cacheName = "teste";

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                    `/`,
                    `/index.html`,
                    `/dist/css/normalize.css`,
                    `/dist/css/all.css`,
                    `/dist/css/main.css`,
                    `/dist/js/vendor/jquery-3.4.1.min.js`,
                    `/dist/js/plugins.js`,
                    `/dist/js/bundle.js`,
                    `/dist/images/backgrounds/background.jpg`,
                    `/dist/webfonts/fa-solid-900.woff2`,
                    `/dist/webfonts/fa-solid-900.woff`,
                    `/dist/webfonts/fa-solid-900.ttf`,
                    `/site.webmanifest`,
                    `/favicon.ico`
                ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
            return response || fetch(event.request);
        })
    );
});