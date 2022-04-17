importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');


//workbox chache strategy -- network first
workbox.routing.registerRoute(
    ({request})=> request.destination === 'image',
    new workbox.strategies.NetworkFirst()
);


//add pages to cache memory
self.addEventListener('install', event =>  {
    event.WaitUntil(
        caches.open("app-shell").then(cache => {  
            cache.add("/");
            console.log(cache);
          })
    )});
    
//invoke data from cache when application is offline
    self.addEventListener('fetch', event => {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    });
    
