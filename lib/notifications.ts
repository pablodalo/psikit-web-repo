"use client"

interface NotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: any
  actions?: any[]
}

class NotificationManager {
  private static instance: NotificationManager
  private registration: ServiceWorkerRegistration | null = null

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  async initialize() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        this.registration = await navigator.serviceWorker.register("/sw.js")
        console.log("Service Worker registrado:", this.registration)
      } catch (error) {
        console.error("Error registrando Service Worker:", error)
      }
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      throw new Error("Este navegador no soporta notificaciones")
    }

    let permission = Notification.permission

    if (permission === "default") {
      permission = await Notification.requestPermission()
    }

    return permission
  }

  async showNotification(options: NotificationOptions) {
    const permission = await this.requestPermission()

    if (permission === "granted") {
      if (this.registration) {
        // Notificación push
        await this.registration.showNotification(options.title, {
          body: options.body,
          icon: options.icon || "/icon-192x192.png",
          badge: options.badge || "/badge-72x72.png",
          tag: options.tag,
          data: options.data,
          actions: options.actions,
          requireInteraction: true,
          vibrate: [200, 100, 200],
        })
      } else {
        // Notificación local
        new Notification(options.title, {
          body: options.body,
          icon: options.icon || "/icon-192x192.png",
          tag: options.tag,
          data: options.data,
        })
      }
    }
  }

  // Notificaciones específicas de PsiKit
  async notifySessionStarting(patientName: string, timeMinutes: number) {
    await this.showNotification({
      title: "Sesión próxima",
      body: `Sesión con ${patientName} en ${timeMinutes} minutos`,
      tag: "session-reminder",
      actions: [
        { action: "join", title: "Unirse ahora" },
        { action: "postpone", title: "Posponer 5 min" },
      ],
    })
  }

  async notifyPaymentPending(patientName: string, amount: number) {
    await this.showNotification({
      title: "Pago pendiente",
      body: `${patientName} tiene un pago pendiente de $${amount}`,
      tag: "payment-pending",
      actions: [
        { action: "send-reminder", title: "Enviar recordatorio" },
        { action: "view-details", title: "Ver detalles" },
      ],
    })
  }

  async notifyPatientWaiting(patientName: string) {
    await this.showNotification({
      title: "Paciente en sala de espera",
      body: `${patientName} está esperando para la sesión`,
      tag: "patient-waiting",
      actions: [
        { action: "admit", title: "Admitir" },
        { action: "send-message", title: "Enviar mensaje" },
      ],
    })
  }

  async notifyTestCompleted(patientName: string, testName: string) {
    await this.showNotification({
      title: "Test completado",
      body: `${patientName} completó el test ${testName}`,
      tag: "test-completed",
      actions: [
        { action: "view-results", title: "Ver resultados" },
        { action: "schedule-review", title: "Agendar revisión" },
      ],
    })
  }

  async notifyEmergency(patientName: string, type: "crisis" | "technical" | "medical") {
    const messages = {
      crisis: "Situación de crisis detectada",
      technical: "Problema técnico crítico",
      medical: "Emergencia médica reportada",
    }

    await this.showNotification({
      title: "🚨 EMERGENCIA",
      body: `${patientName}: ${messages[type]}`,
      tag: "emergency",
      requireInteraction: true,
      actions: [
        { action: "respond", title: "Responder" },
        { action: "call-emergency", title: "Llamar emergencias" },
      ],
    })
  }
}

export const notificationManager = NotificationManager.getInstance()
