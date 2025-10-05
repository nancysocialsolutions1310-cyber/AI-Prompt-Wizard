const CACHE_NAME = 'prompt-wizard-cache-v1';
const urlsToCache = [
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    // अपनी आइकन फाइलें जोड़ें
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// इंस्टॉलेशन (Installation): सभी आवश्यक एसेट्स को कैश करें
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and cached files');
                return cache.addAll(urlsToCache);
            })
    );
});

// फ़ेच (Fetch): कैश से एसेट्स प्रदान करें
self.addEventListener('fetch', event => {
    // विज्ञापन (Ads) और बाहरी स्क्रिप्ट को कैश न करें
    if (event.request.url.includes('google') || event.request.url.includes('highperformanceformat')) {
        return fetch(event.request);
    }
    
    // बाकी सभी अनुरोधों के लिए: कैश, फिर नेटवर्क
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // अगर कैश में है, तो कैश से लौटाएँ
                if (response) {
                    return response;
                }
                // अगर कैश में नहीं है, तो नेटवर्क से फ़ेच करें
                return fetch(event.request);
            })
    );
});

// सक्रियण (Activation): पुराने कैश को हटाएँ
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});