"use client"

interface PaymentData {
  amount: number
  description: string
  patientId: string
  sessionId?: string
  metadata?: Record<string, any>
}

interface PaymentResult {
  success: boolean
  paymentId?: string
  status?: string
  error?: string
}

class MercadoPagoIntegration {
  async createPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        return {
          success: true,
          paymentId: result.paymentId,
          status: result.status,
        }
      } else {
        return {
          success: false,
          error: result.error,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: "Error procesando el pago",
      }
    }
  }

  async createCardToken(cardData: any) {
    try {
      const response = await fetch("/api/payments/create-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      })

      const result = await response.json()

      if (result.success) {
        return result.token
      } else {
        throw new Error(result.error || "Error creando token de tarjeta")
      }
    } catch (error) {
      throw new Error("Error creando token de tarjeta")
    }
  }

  async processPayment(paymentData: any) {
    try {
      const response = await fetch("/api/payments/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      return await response.json()
    } catch (error) {
      throw new Error("Error procesando el pago")
    }
  }

  // Métodos específicos para PsiKit
  async paySession(sessionId: string, amount: number, patientId: string) {
    return await this.createPayment({
      amount,
      description: `Sesión de terapia - ID: ${sessionId}`,
      patientId,
      sessionId,
      metadata: {
        type: "session_payment",
        sessionId,
      },
    })
  }

  async paySubscription(planId: string, amount: number, psychologistId: string) {
    return await this.createPayment({
      amount,
      description: `Suscripción PsiKit - Plan ${planId}`,
      patientId: psychologistId,
      metadata: {
        type: "subscription_payment",
        planId,
      },
    })
  }

  async refundPayment(paymentId: string, amount?: number) {
    try {
      const response = await fetch("/api/payments/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, amount }),
      })

      return await response.json()
    } catch (error) {
      throw new Error("Error procesando el reembolso")
    }
  }
}

export const mercadoPago = new MercadoPagoIntegration()
