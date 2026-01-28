const CACHE_NAME = "tsushima-cache-v1";
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./css/styles.css",
    "./js/app.js",
    "./manifest.json",
    "./assets/JinSakai.jpg",
    "./assets/Jin.jpg",
    "./assets/Yuna.webp",
    "./assets/Shimura.png",
    "./assets/Ryuzo.webp",
    "./icons/icon.png",
    "./icons/icon2.png"
];

// Instalar SW
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activar SW
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

// Fetch (offline)
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
