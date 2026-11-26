// garde l'appli sur le téléphone pour qu'elle s'ouvre sans connexion ; VERSION change à chaque construction
const VERSION = "tiqoun-allegee-1f5e4cb602-r2511-o2611";
const FAMILLE = /^tiqoun-allegee-/;   // ne vide que les mémoires de sa propre version (26/11 : la complète et la Lite partagent le même site)
const FICHIERS = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-512-maskable.png", "icon-192-maskable.png", "apple-touch-icon.png", "favicon-32.png", "favicon-48.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n !== VERSION && FAMILLE.test(n)).map((n) => caches.delete(n)))).then(() => self.clients.claim())); });
// réseau d'abord pour la page (mises à jour), mémoire si pas de réseau
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (e.request.url.includes("/son/")) return;   // sons de lecture : directement du réseau (lecture par morceaux, pas de mise en mémoire)
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(VERSION).then((k) => k.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("index.html"))));
});
