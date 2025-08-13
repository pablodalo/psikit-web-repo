"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, ArrowRight } from "lucide-react"
import { pricingPlans, pricingManager, type PricingPlan } from "@/lib/pricing-config"
import { domainManager } from "@/lib/domain-config"
import { SubscriptionModal } from "@/components/subscription-modal"

interface PricingSectionProps {
  showRegionalPricing?: boolean
  compact?: boolean
}

export function PricingSection({ showRegionalPricing = true, compact = false }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false)
  const [currentRegion, setCurrentRegion] = useState("argentina")
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

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

  const handlePlanClick = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    setShowSubscriptionModal(true)
  }

  const handleSubscribe = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    setShowSubscriptionModal(true)
  }

  return (
    <>
      <section className={`py-12 px-4 ${compact ? "bg-transparent" : "bg-white"}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Membresías Flexibles</h2>
            <p className="text-lg text-gray-600 mb-8">Planes diseñados para profesionales</p>

            {/* Toggle Anual/Mensual */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${!isAnnual ? "font-medium text-gray-900" : "text-gray-500"}`}>Mensual</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={`text-sm ${isAnnual ? "font-medium text-gray-900" : "text-gray-500"}`}>Anual</span>
              {isAnnual && <Badge className="bg-green-100 text-green-800 ml-2">Ahorra 20%</Badge>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const pricing = formatPrice(plan)

              return (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl transform border-0 shadow-lg ${
                    plan.popular
                      ? "ring-2 ring-blue-500 scale-105 bg-gradient-to-br from-blue-50 to-white"
                      : "hover:scale-102 bg-white hover:shadow-xl"
                  } rounded-2xl overflow-hidden group`}
                  onClick={() => handlePlanClick(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-blue-500 text-white px-6 py-2 shadow-lg rounded-full text-sm font-medium">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        Más Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6 pt-8 relative z-10">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-base text-center">
                      {plan.description}
                    </CardDescription>

                    <div className="py-6 text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{pricing.price}</div>
                      {pricing.originalPrice && (
                        <div className="text-sm text-gray-500 text-center">
                          <span className="line-through">{pricing.originalPrice}</span>
                          {pricing.savings && (
                            <span className="text-green-600 ml-2 font-medium">Ahorras {pricing.savings}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 pb-8 relative z-10 text-center">
                    <ul className="space-y-4 mb-8 text-left">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-sm text-blue-600 font-medium text-center">
                          +{plan.features.length - 4} características más
                        </li>
                      )}
                    </ul>

                    <div className="space-y-3">
                      <Button
                        className={`w-full h-12 text-base font-medium transition-all duration-200 rounded-xl ${
                          plan.buttonVariant === "outline"
                            ? "border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900"
                            : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                        }`}
                        variant={plan.buttonVariant}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSubscribe(plan)
                        }}
                      >
                        {plan.buttonText}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlanClick(plan)
                        }}
                      >
                        Ver detalles completos
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>

                    {plan.maxPatients !== "unlimited" && (
                      <p className="text-xs text-gray-500 text-center mt-4">Hasta {plan.maxPatients} pacientes</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Información adicional */}
          <div className="text-center mt-16">
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Sin permanencia</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Cancela cuando quieras</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Soporte incluido</span>
              </div>
            </div>

            {showRegionalPricing && (
              <p className="text-sm text-gray-500 mt-8">
                Precios mostrados en moneda local para {currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1)}
              </p>
            )}
          </div>
        </div>
      </section>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        selectedPlan={selectedPlan}
        isAnnual={isAnnual}
        showRegionalPricing={showRegionalPricing}
      />
    </>
  )
}
