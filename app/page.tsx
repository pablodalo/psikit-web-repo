"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, Users, FileText, CreditCard, Video, Shield, Globe } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PricingSection } from "@/components/pricing-section"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.isAuthenticated) {
      if (user.userType === "psicologo") {
        router.push("/dashboard/psicologo")
      } else {
        router.push("/dashboard/paciente")
      }
    }
  }, [user, router])

  const handleUserTypeSelection = (userType: "psicologo" | "paciente") => {
    localStorage.setItem("intendedUserType", userType)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PsiKit</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Consultorio Virtual Completo</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tu consultorio psicológico
            <span className="text-blue-600"> en cualquier lugar</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma integral para psicólogos de Latinoamérica. Sesiones virtuales, gestión de pacientes, historia
            clínica, pagos y mucho más en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleUserTypeSelection("psicologo")}
            >
              Soy Psicólogo
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleUserTypeSelection("paciente")}>
              Soy Paciente
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Sesiones Virtuales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Integración con Google Meet y sala de espera virtual</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Agenda Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Calendario de pacientes con recordatorios automáticos</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Gestión de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Historia clínica digital y fichas de admisión</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Pagos Integrados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Gestión de pagos con Mercado Pago y facturación</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Test Psicológicos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">PHQ-9, GAD-7, MMSE y más tests disponibles</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle>Consentimiento Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Consentimientos informados seguros y legales</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Catálogo de Profesionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Directorio público para encontrar psicólogos</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <CardTitle>Comunidad Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Red de intercambio entre profesionales</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Membresías Flexibles</h2>
          <p className="text-gray-600 mb-8">Solo los profesionales pagan. Los pacientes acceden gratis siempre.</p>
          <PricingSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6" />
            <span className="text-xl font-bold">PsiKit</span>
          </div>
          <p className="text-gray-400 mb-4">Transformando la práctica psicológica en Latinoamérica</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/privacidad" className="hover:text-white">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white">
              Términos
            </Link>
            <Link href="/contacto" className="hover:text-white">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
