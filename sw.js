const CACHE_NAME = "memore-v10";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
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
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
