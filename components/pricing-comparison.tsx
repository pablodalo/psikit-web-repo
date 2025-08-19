"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { pricingPlans } from "@/lib/pricing-config"

const features = [
  {
    category: "Funcionalidades Básicas",
    items: [
      { name: "Sesiones virtuales", basic: true, professional: true, premium: true },
      { name: "Agenda básica", basic: true, professional: true, premium: true },
      { name: "Historia clínica", basic: true, professional: true, premium: true },
      { name: "Consentimientos digitales", basic: true, professional: true, premium: true },
      { name: "Máximo de pacientes", basic: "10", professional: "50", premium: "Ilimitado" },
    ],
  },
  {
    category: "Herramientas Profesionales",
    items: [
      { name: "Tests psicológicos", basic: false, professional: true, premium: true },
      { name: "Pagos integrados", basic: false, professional: true, premium: true },
      { name: "Facturación automática", basic: false, professional: true, premium: true },
      { name: "Chat avanzado", basic: false, professional: true, premium: true },
    ],
  },
  {
    category: "Funciones Avanzadas",
    items: [
      { name: "Comunidad profesional", basic: false, professional: false, premium: true },
      { name: "Aula virtual", basic: false, professional: false, premium: true },
      { name: "API completa", basic: false, professional: false, premium: true },
      { name: "Reportes avanzados", basic: false, professional: false, premium: true },
      { name: "Integraciones personalizadas", basic: false, professional: false, premium: true },
    ],
  },
  {
    category: "Soporte",
    items: [
      { name: "Soporte por email", basic: true, professional: true, premium: true },
      { name: "Soporte prioritario", basic: false, professional: false, premium: true },
      { name: "Onboarding personalizado", basic: false, professional: false, premium: true },
      { name: "Gerente de cuenta dedicado", basic: false, professional: false, premium: true },
    ],
  },
]

export function PricingComparison() {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-400 mx-auto" />
      )
    }
    return <span className="text-sm font-medium">{value}</span>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Comparación Detallada</h2>
        <p className="text-gray-600">Encuentra el plan perfecto para tu práctica profesional</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparación de Planes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Funcionalidades</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-4 min-w-[150px]">
                      <div className="space-y-2">
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-2xl font-bold">{plan.price === 0 ? "Gratis" : `$${plan.price}/mes`}</div>
                        {plan.popular && <Badge className="bg-blue-600 text-white">Más Popular</Badge>}
                        <Button size="sm" variant={plan.buttonVariant} className="w-full">
                          {plan.buttonText}
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((category) => (
                  <>
                    <tr key={category.category} className="border-b bg-gray-50">
                      <td colSpan={4} className="py-3 px-4 font-semibold text-gray-900">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item) => (
                      <tr key={item.name} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{item.name}</td>
                        <td className="py-3 px-4 text-center">{renderFeatureValue(item.basic)}</td>
                        <td className="py-3 px-4 text-center">{renderFeatureValue(item.professional)}</td>
                        <td className="py-3 px-4 text-center">{renderFeatureValue(item.premium)}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ de Precios */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes sobre Precios</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Puedo cambiar de plan en cualquier momento?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente y
                se prorratea el costo según corresponda.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Hay descuentos por pago anual?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Sí, ofrecemos un 20% de descuento cuando pagas anualmente. Esto te permite ahorrar significativamente en
                tu suscripción.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Los pacientes pagan algo?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                No, los pacientes nunca pagan por usar PsiKit. Solo los profesionales de la salud mental pagan por las
                funcionalidades avanzadas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Qué métodos de pago aceptan?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Aceptamos tarjetas de crédito/débito, transferencias bancarias y Mercado Pago. Los pagos son procesados
                de forma segura.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
