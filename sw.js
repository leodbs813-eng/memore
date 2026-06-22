const CACHE_NAME = "memore-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./IMG_6116.PNG",
  "./ruri/",
  "./ruri/ruri1.JPG",
  "./ruri/ruri2.WEBP",
  "./ruri/ruri3.WEBP",
  "./ruri/ruri4.jpg",
  "./someone/",
  "./someone/hertz1.PNG",
  "./someone/hertz2.PNG",
  "./someone/hertz3.PNG",
  "./someone/hertz4.PNG"
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // 추가
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => { // 추가
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
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
