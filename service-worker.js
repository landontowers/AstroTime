// service-worker.js

const CACHE_NAME = 'lat-cache-v1'; // Cache name for easier versioning
const urlsToCache = [
    '/',
    '/calcLat.html',
    '/main.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache:', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    // Clean up old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from the cache
                if (response) {
                    return response;
                }

                // Clone the request for caching
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response for caching
                        const responseToCache = response.clone();

                        event.waitUntil(
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                })
                        );

                        return response;
                    })
                    .catch(error => {
                        console.error('Fetch failed:', error);
                        // Fallback to a custom offline page or message
                        return caches.match('/offline.html'); // Example
                    });
            })
    );
});