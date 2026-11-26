// 26/11/2026 : la Lite a quitté ce dossier pour https://saltielgiorno-source.github.io/shalshelet-lite/
// ce service worker remplace l'ancien : il vide les mémoires de l'ancienne Lite et se retire
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((k) => Promise.all(k.filter((n) => /^tiqoun-allegee-/.test(n) && !/-p\d{4}$/.test(n)).map((n) => caches.delete(n))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll())
    .then((cs) => cs.forEach((c) => c.navigate("https://saltielgiorno-source.github.io/shalshelet-lite/"))));
});
