const CACHE_NAME="shelter-locator-v3";
const STATIC_ASSETS=[
  "index.html","manifest.json","icon-192.png","icon-512.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css",
  "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js",
  "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css",
  "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(STATIC_ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))))});
self.addEventListener("fetch",e=>{
  const url=e.request.url;
  if(url.includes("firebase")||url.includes("index.html")){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});