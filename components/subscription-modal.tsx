"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard, Building, User, ArrowLeft } from "lucide-react"
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
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <DialogTitle className="flex items-center justify-between text-xl font-semibold text-gray-900">
            <div className="flex items-center space-x-3">
              {selectedPlan.popular && (
                <Badge className="bg-blue-600 text-white px-2 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              <span>Plan {selectedPlan.name}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          {step === "details" ? (
            <div className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h3>
                  <p className="text-gray-600 text-lg">{selectedPlan.description}</p>
                </div>

                <div className="bg-white border-2 border-blue-100 rounded-xl p-6 space-y-3">
                  <div className="text-4xl font-bold text-blue-600">{pricing.price}</div>
                  {pricing.originalPrice && (
                    <div className="space-y-1">
                      <div className="text-lg text-gray-500 line-through">{pricing.originalPrice}</div>
                      {pricing.savings && <div className="text-green-600 font-medium">Ahorras {pricing.savings}</div>}
                    </div>
                  )}
                  {isAnnual && pricing.total && (
                    <div className="text-gray-600 font-medium">Total anual: {pricing.total}</div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Características incluidas</h4>
                <div className="grid gap-3">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {selectedPlan.maxPatients !== "unlimited" && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      Límite de pacientes: Hasta {selectedPlan.maxPatients} pacientes
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-green-800">Beneficios inmediatos</h4>
                <ul className="text-green-700 space-y-2">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Acceso instantáneo a todas las funciones</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Sin permanencia ni costos ocultos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Soporte técnico incluido</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Cancela cuando quieras</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <Button variant="ghost" size="sm" onClick={() => setStep("details")} className="p-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Datos Profesionales</h3>
                  <p className="text-gray-600">Completa tu información para activar la suscripción</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      Nombre *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Tu nombre"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Apellido *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Tu apellido"
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 1234-5678"
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
                      Matrícula Profesional *
                    </Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      placeholder="MP 12345"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">
                      Especialidad *
                    </Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                    >
                      <SelectTrigger className="h-10">
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

                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-sm font-medium text-gray-700">
                    Institución/Consultorio
                  </Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Nombre de tu consultorio o institución"
                    className="h-10"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Tipo de facturación</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={formData.billingType === "individual" ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, billingType: "individual" })}
                      className="h-12 justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Individual
                    </Button>
                    <Button
                      type="button"
                      variant={formData.billingType === "business" ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, billingType: "business" })}
                      className="h-12 justify-start"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Empresa
                    </Button>
                  </div>
                </div>

                {formData.billingType === "business" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                        Razón Social
                      </Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Nombre de la empresa"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId" className="text-sm font-medium text-gray-700">
                        CUIT/RUT
                      </Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        placeholder="20-12345678-9"
                        className="h-10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">Términos y Condiciones</h4>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                        className="mt-1"
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-relaxed text-gray-700">
                        Acepto los{" "}
                        <a href="/terminos" className="text-blue-600 hover:underline font-medium">
                          Términos y Condiciones
                        </a>{" "}
                        de uso de la plataforma *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptPrivacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                        className="mt-1"
                      />
                      <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed text-gray-700">
                        Acepto la{" "}
                        <a href="/privacidad" className="text-blue-600 hover:underline font-medium">
                          Política de Privacidad
                        </a>{" "}
                        y el tratamiento de mis datos personales *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptMarketing: checked as boolean })}
                        className="mt-1"
                      />
                      <Label htmlFor="acceptMarketing" className="text-sm leading-relaxed text-gray-700">
                        Acepto recibir comunicaciones comerciales y novedades de PsiKit
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-gray-50">
          {step === "details" ? (
            <div className="space-y-3">
              {selectedPlan.price === 0 ? (
                <Button onClick={() => setStep("form")} className="w-full h-12 text-lg font-medium">
                  Activar Plan Gratuito
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleMercadoPagoSubscription}
                    className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagar Ahora con MercadoPago
                  </Button>
                  <Button variant="outline" onClick={() => setStep("form")} className="w-full h-10 text-sm">
                    Completar datos profesionales primero
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
                className="flex-1 h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pagar con MercadoPago
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
