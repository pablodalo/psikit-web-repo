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
  private publicKey: string
  private mp: any

  constructor() {
    this.publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || ""
  }

  async initialize() {
    if (typeof window !== "undefined") {
      // Cargar SDK de Mercado Pago
      const script = document.createElement("script")
      script.src = "https://sdk.mercadopago.com/js/v2"
      script.onload = () => {
        this.mp = new (window as any).MercadoPago(this.publicKey, {
          locale: "es-AR",
        })
      }
      document.head.appendChild(script)
    }
  }

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
    if (!this.mp) {
      throw new Error("Mercado Pago no inicializado")
    }

    try {
      const token = await this.mp.createCardToken({
        cardNumber: cardData.number,
        cardholderName: cardData.holderName,
        cardExpirationMonth: cardData.expirationMonth,
        cardExpirationYear: cardData.expirationYear,
        securityCode: cardData.securityCode,
        identificationType: cardData.identificationType,
        identificationNumber: cardData.identificationNumber,
      })

      return token
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
