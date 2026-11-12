/* Cache only this app's shell, never conversations, photos, requests or models. */
const CACHE='fred-shell-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./voice/fred-voice.js','./voice/inference-worker.js','./voice/sentencepiece.js','./voice/reference.wav'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fred-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;const allowed=FILES.map(p=>new URL(p,self.registration.scope).href);if(!allowed.includes(u.href))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const clone=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,clone)));}return r;}).catch(()=>caches.match(e.request)));});
