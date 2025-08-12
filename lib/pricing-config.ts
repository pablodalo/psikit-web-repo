"use client"

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: "month" | "year"
  maxPatients: number | "unlimited"
  features: string[]
  popular?: boolean
  buttonText: string
  buttonVariant: "default" | "outline"
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Básico",
    description: "Hasta 10 pacientes",
    price: 0,
    currency: "USD",
    interval: "month",
    maxPatients: 10,
    features: [
      "Sesiones virtuales",
      "Agenda básica",
      "Historia clínica",
      "Consentimientos digitales",
      "Soporte por email",
    ],
    buttonText: "Comenzar Gratis",
    buttonVariant: "outline",
  },
  {
    id: "professional",
    name: "Profesional",
    description: "Hasta 50 pacientes",
    price: 16.5,
    currency: "USD",
    interval: "month",
    maxPatients: 50,
    features: [
      "Todo lo del plan Básico",
      "Tests psicológicos",
      "Pagos integrados",
      "Facturación automática",
      "Grabación de sesiones",
      "Chat avanzado",
      "Reportes básicos",
    ],
    popular: true,
    buttonText: "Elegir Profesional",
    buttonVariant: "default",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Pacientes ilimitados",
    price: 25,
    currency: "USD",
    interval: "month",
    maxPatients: "unlimited",
    features: [
      "Todo lo del plan Profesional",
      "Pacientes ilimitados",
      "Comunidad profesional",
      "Aula virtual",
      "API completa",
      "Soporte prioritario",
      "Reportes avanzados",
      "Integraciones personalizadas",
    ],
    buttonText: "Elegir Premium",
    buttonVariant: "default",
  },
]

// Configuración de precios por región
export const regionalPricing = {
  argentina: {
    currency: "ARS",
    rates: {
      basic: 0,
      professional: 16500, // ~16.5 USD
      premium: 25000, // ~25 USD
    },
  },
  mexico: {
    currency: "MXN",
    rates: {
      basic: 0,
      professional: 297, // ~16.5 USD
      premium: 450, // ~25 USD
    },
  },
  colombia: {
    currency: "COP",
    rates: {
      basic: 0,
      professional: 66000, // ~16.5 USD
      premium: 100000, // ~25 USD
    },
  },
  chile: {
    currency: "CLP",
    rates: {
      basic: 0,
      professional: 13200, // ~16.5 USD
      premium: 20000, // ~25 USD
    },
  },
  peru: {
    currency: "PEN",
    rates: {
      basic: 0,
      professional: 61, // ~16.5 USD
      premium: 90, // ~25 USD
    },
  },
}

export class PricingManager {
  private static instance: PricingManager
  private currentRegion = "argentina"

  static getInstance(): PricingManager {
    if (!PricingManager.instance) {
      PricingManager.instance = new PricingManager()
    }
    return PricingManager.instance
  }

  setRegion(region: string) {
    this.currentRegion = region
  }

  getPricingForRegion(planId: string): { price: number; currency: string } {
    const regionConfig = regionalPricing[this.currentRegion as keyof typeof regionalPricing]

    if (!regionConfig) {
      // Fallback a USD si no hay configuración regional
      const plan = pricingPlans.find((p) => p.id === planId)
      return {
        price: plan?.price || 0,
        currency: "USD",
      }
    }

    return {
      price: regionConfig.rates[planId as keyof typeof regionConfig.rates] || 0,
      currency: regionConfig.currency,
    }
  }

  formatPrice(planId: string): string {
    const { price, currency } = this.getPricingForRegion(planId)

    if (price === 0) {
      return "Gratis"
    }

    const formatter = new Intl.NumberFormat("es", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return `${formatter.format(price)}/mes`
  }

  getPlanFeatures(planId: string): string[] {
    const plan = pricingPlans.find((p) => p.id === planId)
    return plan?.features || []
  }

  getRecommendedPlan(): PricingPlan {
    return pricingPlans.find((p) => p.popular) || pricingPlans[1]
  }

  calculateAnnualDiscount(planId: string): { monthlyPrice: number; annualPrice: number; savings: number } {
    const { price } = this.getPricingForRegion(planId)
    const monthlyPrice = price
    const annualPrice = Math.round(price * 12 * 0.8) // 20% descuento anual
    const savings = price * 12 - annualPrice

    return {
      monthlyPrice,
      annualPrice,
      savings,
    }
  }
}

export const pricingManager = PricingManager.getInstance()
