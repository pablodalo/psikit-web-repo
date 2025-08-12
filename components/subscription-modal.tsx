"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard, ArrowLeft } from "lucide-react"
import { type PricingPlan, pricingManager } from "@/lib/pricing-config"

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: PricingPlan | null
  isAnnual: boolean
  showRegionalPricing: boolean
}

export function SubscriptionModal({
  isOpen,
  onClose,
  selectedPlan,
  isAnnual,
  showRegionalPricing,
}: SubscriptionModalProps) {
  const [step, setStep] = useState<"details" | "form">("details")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    specialty: "",
    institution: "",
    address: "",
    city: "",
    country: "Argentina",
    billingType: "individual" as "individual" | "business",
    businessName: "",
    taxId: "",
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  })

  if (!selectedPlan) return null

  const formatPrice = () => {
    if (showRegionalPricing) {
      const formatted = pricingManager.formatPrice(selectedPlan.id)
      if (isAnnual && selectedPlan.price > 0) {
        const { annualPrice, savings } = pricingManager.calculateAnnualDiscount(selectedPlan.id)
        const { currency } = pricingManager.getPricingForRegion(selectedPlan.id)
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
          total: formatter.format(annualPrice),
        }
      }
      return { price: formatted, total: formatted }
    }

    if (selectedPlan.price === 0) {
      return { price: "Gratis", total: "Gratis" }
    }

    if (isAnnual) {
      const monthlyPrice = selectedPlan.id === "professional" ? 16.5 : selectedPlan.price
      const annualPrice = Math.round(monthlyPrice * 12 * 0.8)
      return {
        price: `$${Math.round(annualPrice / 12)}/mes`,
        originalPrice: `$${monthlyPrice}/mes`,
        savings: `$${monthlyPrice * 12 - annualPrice}`,
        total: `$${annualPrice}/año`,
      }
    }

    const displayPrice = selectedPlan.id === "professional" ? 16.5 : selectedPlan.price
    return { price: `$${displayPrice}/mes`, total: `$${displayPrice}/mes` }
  }

  const pricing = formatPrice()

  const handleMercadoPagoSubscription = () => {
    const subscriptionData = {
      plan: selectedPlan,
      formData,
      isAnnual,
      pricing,
    }

    console.log("Redirecting to MercadoPago with data:", subscriptionData)

    alert(
      `Redirigiendo a MercadoPago para procesar el pago de ${pricing.total}. Esta funcionalidad se implementará próximamente.`,
    )

    onClose()
  }

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.licenseNumber &&
      formData.specialty &&
      formData.acceptTerms &&
      formData.acceptPrivacy
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0 bg-white">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedPlan.popular && (
                <Badge className="bg-blue-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              <DialogTitle className="text-xl font-bold text-gray-900">Plan {selectedPlan.name}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          {step === "details" ? (
            /* Single column layout to prevent overlap */
            <div className="p-6 space-y-6">
              {/* Plan Info */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h3>
                <p className="text-gray-600 leading-relaxed">{selectedPlan.description}</p>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-2">
                  <div className="text-4xl font-bold text-blue-600">{pricing.price}</div>
                  {pricing.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">{pricing.originalPrice}</div>
                  )}
                  {pricing.savings && <div className="text-green-600 font-semibold">Ahorras {pricing.savings}</div>}
                  {isAnnual && pricing.total && (
                    <div className="text-gray-700 font-medium">Total anual: {pricing.total}</div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Características incluidas</h4>
                <div className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg">
                      <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                <h4 className="font-bold text-green-800 mb-2">Beneficios</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3" />
                    <span>Acceso instantáneo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3" />
                    <span>Sin permanencia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3" />
                    <span>Soporte incluido</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3" />
                    <span>Cancela cuando quieras</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Form step - simplified */
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <Button variant="ghost" size="sm" onClick={() => setStep("details")} className="p-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Datos Profesionales</h3>
                  <p className="text-gray-600 text-sm">Completa tu información</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Nombre *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Tu nombre"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Apellido *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Tu apellido"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 1234-5678"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber" className="text-sm font-medium">
                      Matrícula *
                    </Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      placeholder="MP 12345"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty" className="text-sm font-medium">
                      Especialidad *
                    </Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="psicologia-clinica">Psicología Clínica</SelectItem>
                        <SelectItem value="psicologia-infantil">Psicología Infantil</SelectItem>
                        <SelectItem value="psicologia-familiar">Psicología Familiar</SelectItem>
                        <SelectItem value="psicologia-laboral">Psicología Laboral</SelectItem>
                        <SelectItem value="neuropsicologia">Neuropsicología</SelectItem>
                        <SelectItem value="psiquiatria">Psiquiatría</SelectItem>
                        <SelectItem value="otra">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900">Términos y Condiciones</h4>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-gray-700">
                      Acepto los{" "}
                      <a href="/terminos" className="text-blue-600 hover:underline">
                        Términos y Condiciones
                      </a>{" "}
                      *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptPrivacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="acceptPrivacy" className="text-sm text-gray-700">
                      Acepto la{" "}
                      <a href="/privacidad" className="text-blue-600 hover:underline">
                        Política de Privacidad
                      </a>{" "}
                      *
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-white">
          {step === "details" ? (
            <div className="space-y-3">
              {selectedPlan.price === 0 ? (
                <Button onClick={() => setStep("form")} className="w-full h-12 text-lg font-semibold">
                  Activar Plan Gratuito
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleMercadoPagoSubscription}
                    className="w-full h-16 text-xl font-black bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl border-2 border-blue-500 transform hover:scale-105 transition-all duration-200"
                  >
                    <CreditCard className="h-6 w-6 mr-3" />💳 PAGAR CON MERCADOPAGO - {pricing.total}
                  </Button>
                  <Button variant="outline" onClick={() => setStep("form")} className="w-full h-10 text-sm">
                    Completar datos primero
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep("details")} className="flex-1 h-12">
                Volver
              </Button>
              <Button
                onClick={handleMercadoPagoSubscription}
                disabled={!isFormValid()}
                className="flex-1 h-12 font-semibold bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pagar - {pricing.total}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
