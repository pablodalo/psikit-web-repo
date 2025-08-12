"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard, ArrowLeft, Shield, Clock } from "lucide-react"
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
      <DialogContent className="max-w-3xl h-[85vh] flex flex-col p-0 bg-white font-sans">
        <DialogHeader className="px-6 py-4 border-b bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {selectedPlan.popular && (
              <Badge className="bg-blue-600 text-white font-sans">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            <DialogTitle className="text-xl font-semibold text-gray-900 font-sans">
              Plan {selectedPlan.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {step === "details" ? (
            <div className="p-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sans">{selectedPlan.name}</h3>
                <p className="text-gray-600 mb-6 font-sans">{selectedPlan.description}</p>

                <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2 font-sans">{pricing.price}</div>
                  {pricing.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mb-1 font-sans">{pricing.originalPrice}</div>
                  )}
                  {pricing.savings && (
                    <div className="text-sm text-green-600 font-medium font-sans">Ahorras {pricing.savings}</div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Características incluidas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-sans">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-800 mb-3 font-sans">Beneficios adicionales</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-700 font-sans">Acceso instantáneo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-700 font-sans">Sin permanencia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-700 font-sans">Soporte incluido</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-700 font-sans">Cancela cuando quieras</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center space-x-3 pb-4 mb-6 border-b">
                <Button variant="ghost" size="sm" onClick={() => setStep("details")} className="p-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 font-sans">Datos Profesionales</h3>
                  <p className="text-sm text-gray-600 font-sans">Completa tu información para continuar</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 font-sans">
                      Nombre *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Tu nombre"
                      className="mt-1 font-sans"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 font-sans">
                      Apellido *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Tu apellido"
                      className="mt-1 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 font-sans">
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
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 font-sans">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700 font-sans">
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
                    <Label htmlFor="specialty" className="text-sm font-medium text-gray-700 font-sans">
                      Especialidad *
                    </Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona tu especialidad" />
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

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 font-sans">Términos y Condiciones</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                        className="mt-0.5"
                      />
                      <Label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed font-sans">
                        Acepto los{" "}
                        <a href="/terminos" className="text-blue-600 hover:underline font-medium">
                          Términos y Condiciones
                        </a>{" "}
                        *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptPrivacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                        className="mt-0.5"
                      />
                      <Label htmlFor="acceptPrivacy" className="text-sm text-gray-700 leading-relaxed font-sans">
                        Acepto la{" "}
                        <a href="/privacidad" className="text-blue-600 hover:underline font-medium">
                          Política de Privacidad
                        </a>{" "}
                        *
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex-shrink-0">
          {step === "details" ? (
            <div className="space-y-4">
              {selectedPlan.price === 0 ? (
                <Button onClick={() => setStep("form")} className="w-full h-12 text-base font-semibold font-sans">
                  Activar Plan Gratuito
                </Button>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-white/20 rounded-lg p-2">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold font-sans">Pago Seguro</h4>
                          <p className="text-blue-100 text-sm font-sans">Procesado por MercadoPago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-sans">{pricing.total}</div>
                        {pricing.originalPrice && (
                          <div className="text-blue-200 text-sm line-through font-sans">{pricing.originalPrice}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-blue-100 mb-4">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4" />
                        <span className="font-sans">Pago 100% seguro</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-sans">Activación inmediata</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleMercadoPagoSubscription}
                      className="w-full h-12 bg-white text-blue-700 hover:bg-blue-50 font-bold text-lg shadow-md transition-all duration-200 hover:shadow-lg font-sans"
                    >
                      PAGAR AHORA CON MERCADOPAGO
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setStep("form")}
                    className="w-full h-10 text-sm border-gray-300 hover:bg-gray-50 font-sans"
                  >
                    Completar datos profesionales primero
                  </Button>

                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span className="font-sans">SSL Seguro</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="font-sans">Sin permanencia</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="font-sans">Cancela cuando quieras</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep("details")} className="flex-1 h-12 font-sans">
                Volver
              </Button>
              <Button
                onClick={handleMercadoPagoSubscription}
                disabled={!isFormValid()}
                className="flex-1 h-12 font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 font-sans"
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
