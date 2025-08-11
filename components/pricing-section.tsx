"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star } from "lucide-react"
import { pricingPlans, pricingManager, type PricingPlan } from "@/lib/pricing-config"
import { domainManager } from "@/lib/domain-config"

interface PricingSectionProps {
  showRegionalPricing?: boolean
  compact?: boolean
}

export function PricingSection({ showRegionalPricing = true, compact = false }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false)
  const [currentRegion, setCurrentRegion] = useState("argentina")

  useEffect(() => {
    if (showRegionalPricing) {
      const region = domainManager.detectRegion()
      setCurrentRegion(region)
      pricingManager.setRegion(region)
    }
  }, [showRegionalPricing])

  const formatPrice = (plan: PricingPlan) => {
    if (showRegionalPricing) {
      const formatted = pricingManager.formatPrice(plan.id)
      if (isAnnual && plan.price > 0) {
        const { annualPrice, savings } = pricingManager.calculateAnnualDiscount(plan.id)
        const { currency } = pricingManager.getPricingForRegion(plan.id)
        const formatter = new Intl.NumberFormat("es", {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        return {
          price: `${formatter.format(Math.round(annualPrice / 12))}/mes`,
          originalPrice: formatted,
          savings: formatter.format(savings),
        }
      }
      return { price: formatted }
    }

    if (plan.price === 0) {
      return { price: "Gratis" }
    }

    if (isAnnual) {
      const monthlyPrice = plan.price
      const annualPrice = Math.round(plan.price * 12 * 0.8)
      return {
        price: `$${Math.round(annualPrice / 12)}/mes`,
        originalPrice: `$${monthlyPrice}/mes`,
        savings: `$${monthlyPrice * 12 - annualPrice}`,
      }
    }

    return { price: `$${plan.price}/mes` }
  }

  return (
    <section className={`py-16 px-4 ${compact ? "bg-transparent" : "bg-gray-50"}`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Membresías Flexibles</h2>
          <p className="text-gray-600 mb-8">Solo los profesionales pagan. Los pacientes acceden gratis siempre.</p>

          {/* Toggle Anual/Mensual */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? "font-medium" : "text-gray-600"}`}>Mensual</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? "font-medium" : "text-gray-600"}`}>Anual</span>
            {isAnnual && <Badge className="bg-green-100 text-green-800 ml-2">Ahorra 20%</Badge>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => {
            const pricing = formatPrice(plan)

            return (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "border-blue-500 border-2 scale-105" : ""} ${compact ? "h-auto" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Más Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>

                  <div className="py-4">
                    <div className="text-3xl font-bold text-gray-900">{pricing.price}</div>
                    {pricing.originalPrice && (
                      <div className="text-sm text-gray-500">
                        <span className="line-through">{pricing.originalPrice}</span>
                        {pricing.savings && <span className="text-green-600 ml-2">Ahorras {pricing.savings}</span>}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Button
                      className={`w-full ${plan.buttonVariant === "outline" ? "bg-transparent" : ""}`}
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>

                  {plan.maxPatients !== "unlimited" && (
                    <p className="text-xs text-gray-500 text-center">Hasta {plan.maxPatients} pacientes</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Información adicional */}
        <div className="text-center mt-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Sin permanencia</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Soporte incluido</span>
            </div>
          </div>

          {showRegionalPricing && (
            <p className="text-xs text-gray-500 mt-6">
              Precios mostrados en moneda local para {currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1)}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
