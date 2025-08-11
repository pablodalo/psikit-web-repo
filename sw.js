// Service Worker para notificaciones push
self.addEventListener("install", (event) => {
  console.log("Service Worker instalado")
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado")
  event.waitUntil(self.clients.claim())
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  const action = event.action
  const data = event.notification.data

  switch (action) {
    case "join":
      event.waitUntil(self.clients.openWindow(`/sesion/${data.sessionId}`))
      break
    case "admit":
      event.waitUntil(self.clients.openWindow(`/sesion/${data.sessionId}?action=admit&patientId=${data.patientId}`))
      break
    case "view-results":
      event.waitUntil(self.clients.openWindow(`/dashboard/psicologo/tests/results/${data.testId}`))
      break
    case "respond":
      event.waitUntil(self.clients.openWindow(`/emergency/${data.emergencyId}`))
      break
    default:
      event.waitUntil(self.clients.openWindow("/"))
  }
})

self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      data: data.data,
      actions: data.actions,
      requireInteraction: data.requireInteraction || false,
      vibrate: [200, 100, 200],
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
