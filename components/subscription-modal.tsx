"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, X, CreditCard, Building, User } from "lucide-react"
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
      const monthlyPrice = selectedPlan.price
      const annualPrice = Math.round(selectedPlan.price * 12 * 0.8)
      return {
        price: `$${Math.round(annualPrice / 12)}/mes`,
        originalPrice: `$${monthlyPrice}/mes`,
        savings: `$${monthlyPrice * 12 - annualPrice}`,
        total: `$${annualPrice}/año`,
      }
    }

    return { price: `$${selectedPlan.price}/mes`, total: `$${selectedPlan.price}/mes` }
  }

  const pricing = formatPrice()

  const handleSubscribe = () => {
    // TODO: Integrate with MercadoPago in the future
    console.log("Subscription data:", { plan: selectedPlan, formData, isAnnual })
    alert("¡Suscripción procesada! En el futuro esto se conectará con MercadoPago.")
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Plan {selectedPlan.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Plan Details */}
          <div className="space-y-6">
            <Card className={selectedPlan.popular ? "border-blue-500 border-2" : ""}>
              {selectedPlan.popular && (
                <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
                  <Badge className="bg-white text-blue-600">
                    <Star className="h-3 w-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{selectedPlan.name}</CardTitle>
                <p className="text-gray-600">{selectedPlan.description}</p>

                <div className="py-4">
                  <div className="text-4xl font-bold text-gray-900">{pricing.price}</div>
                  {pricing.originalPrice && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">{pricing.originalPrice}</span>
                      {pricing.savings && <span className="text-green-600 ml-2">Ahorras {pricing.savings}</span>}
                    </div>
                  )}
                  {isAnnual && pricing.total && (
                    <div className="text-sm text-gray-600 mt-2">Total anual: {pricing.total}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Características incluidas:</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedPlan.maxPatients !== "unlimited" && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Límite de pacientes:</strong> Hasta {selectedPlan.maxPatients} pacientes
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Form */}
          <div className="space-y-6">
            {step === "details" ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">¿Listo para comenzar?</h3>
                <p className="text-gray-600">
                  Completa tus datos profesionales para activar tu suscripción al plan {selectedPlan.name}.
                </p>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Beneficios inmediatos:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Acceso instantáneo a todas las funciones</li>
                    <li>• Sin permanencia ni costos ocultos</li>
                    <li>• Soporte técnico incluido</li>
                    <li>• Cancela cuando quieras</li>
                  </ul>
                </div>

                <Button onClick={() => setStep("form")} className="w-full" size="lg">
                  Continuar con la suscripción
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Datos Profesionales
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber">Matrícula Profesional *</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      placeholder="MP 12345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Especialidad *</Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                    >
                      <SelectTrigger>
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

                <div>
                  <Label htmlFor="institution">Institución/Consultorio</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Nombre de tu consultorio o institución"
                  />
                </div>

                {/* Billing Type */}
                <div className="space-y-4">
                  <Label>Tipo de facturación</Label>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant={formData.billingType === "individual" ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, billingType: "individual" })}
                      className="flex-1"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Individual
                    </Button>
                    <Button
                      type="button"
                      variant={formData.billingType === "business" ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, billingType: "business" })}
                      className="flex-1"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Empresa
                    </Button>
                  </div>
                </div>

                {formData.billingType === "business" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Razón Social</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Nombre de la empresa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxId">CUIT/RUT</Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        placeholder="20-12345678-9"
                      />
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      Acepto los{" "}
                      <a href="/terminos" className="text-blue-600 hover:underline">
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
                    />
                    <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
                      Acepto la{" "}
                      <a href="/privacidad" className="text-blue-600 hover:underline">
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
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm leading-relaxed">
                      Acepto recibir comunicaciones comerciales y novedades de PsiKit
                    </Label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                    Volver
                  </Button>
                  <Button onClick={handleSubscribe} disabled={!isFormValid()} className="flex-1">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Suscribirse
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
