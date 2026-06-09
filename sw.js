const CACHE = 'th-empreendimentos-v1';
const ASSETS = ['./','index.html','assets/index.css','assets/config.js','assets/sample-data.js','assets/api.js','assets/charts.js','assets/pdf.js','assets/app.js','manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(res => { const copy=res.clone(); caches.open(CACHE).then(c=>c.put(event.request, copy)); return res; }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./'))));
});
