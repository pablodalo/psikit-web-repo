"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, CreditCard, Video, Shield, Globe, Heart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PricingSection } from "@/components/pricing-section"
import Image from "next/image"

export default function HomePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleUserTypeSelection = (userType: "psicologo" | "paciente") => {
    console.log("Selected user type:", userType)

    if (user?.isAuthenticated) {
      logout()
    }

    localStorage.setItem("intendedUserType", userType)
    console.log("Stored in localStorage:", localStorage.getItem("intendedUserType"))
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/psikit-logo.png" alt="PsiKit Logo" width={120} height={40} className="h-8 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            {user?.isAuthenticated ? (
              <Link href={user.userType === "psicologo" ? "/dashboard/psicologo" : "/dashboard/paciente"}>
                <Button>Ir al Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Iniciar Sesión</Button>
                </Link>
                <Link href="/register">
                  <Button>Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">Consultorio Virtual Completo</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tu consultorio,
            <span className="text-sky-500"> siempre con vos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Llevá tu práctica profesional a cualquier parte del mundo con una plataforma diseñada para psicólogos:
            historia clínica, agenda, pagos, gestión de pacientes y recordatorios, todo en un mismo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-sky-500 hover:bg-sky-600"
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

      {/* New Presentation Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Organizá, conectá y potenciá tu práctica clínica</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Desde un solo espacio seguro y fácil de usar. Realizá sesiones virtuales de alta calidad, gestioná tu agenda
            y recordatorios, almacená historias clínicas de manera segura y llevá el control de pagos y comprobantes.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            <strong>
              Con nuestra solución, podés llevar tu consultorio a donde estés, sin perder cercanía con tus pacientes.
            </strong>
          </p>
        </div>
      </section>

      {/* Updated Benefits Section */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Beneficios Destacados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-3">Agenda inteligente</h3>
              <p className="text-gray-600">Programá, cancelá y reprogramá citas en segundos.</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-3">Gestión de pagos</h3>
              <p className="text-gray-600">Integrá cobros y facturación sin complicaciones.</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-semibold mb-3">Historia clínica segura</h3>
              <p className="text-gray-600">Acceso rápido y protegido a la información de tus pacientes.</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-3">Recordatorios automáticos</h3>
              <p className="text-gray-600">Avisos por mail o WhatsApp para reducir ausencias.</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-xl font-semibold mb-3">Sesiones virtuales sin límites</h3>
              <p className="text-gray-600">Videollamadas seguras, estés donde estés.</p>
            </div>

            <div className="text-center">
              <Heart className="h-12 w-12 text-sky-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Soporte especializado</h3>
              <p className="text-gray-600">Acompañamiento técnico pensado para profesionales de la salud.</p>
            </div>
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
                <Video className="h-12 w-12 text-sky-500 mx-auto mb-4" />
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
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
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
        <div className="container mx-auto">
          <PricingSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src="/psikit-logo.png"
              alt="PsiKit Logo"
              width={100}
              height={32}
              className="h-6 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-gray-400 mb-4">Psicología real con soporte digital</p>
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
