const CACHE_NAME = "memore-v6";

const urlsToCache = [
  "./",
  "./index.html",
  "./IMG_6116.PNG",
  "./ruri/ruri1.JPG",
  "./ruri/ruri2.WEBP",
  "./ruri/ruri3.WEBP",
  "./ruri/ruri4.jpg",
  "./someone/hertz1.PNG",
  "./someone/hertz2.PNG",
  "./someone/hertz3.PNG",
  "./someone/hertz4.PNG"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
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
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("event.request", copy));
          return response;
        })
        .catch(() => caches.match("event.request"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
