"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, CreditCard, Video, Shield, Globe, Heart, Brain } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PricingSection } from "@/components/pricing-section"
import { ThemeToggle } from "@/components/theme-toggle"

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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">PsiKit</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user?.isAuthenticated ? (
              <Link href={user.userType === "psicologo" ? "/dashboard/psicologo" : "/dashboard/paciente"}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
                  Ir a mi perfil
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-black hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-blue-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 border-0">
            Consultorio Virtual Completo
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Tu consultorio psicológico
            <span className="text-blue-600 dark:text-blue-400"> en cualquier lugar</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
            Plataforma integral para psicólogos de Latinoamérica. Sesiones virtuales, gestión de pacientes, historia
            clínica, pagos y mucho más en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => handleUserTypeSelection("psicologo")}
            >
              Soy Psicólogo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white bg-transparent"
              onClick={() => handleUserTypeSelection("paciente")}
            >
              Soy Paciente
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Funcionalidades Principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Video className="h-12 w-12 text-sky-500 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Sesiones Virtuales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">Integración con Google Meet y sala de espera virtual</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Agenda Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Calendario de pacientes con recordatorios automáticos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Gestión de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">Historia clínica digital y fichas de admisión</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Pagos Integrados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">Gestión de pagos con Mercado Pago y facturación</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Test Psicológicos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">PHQ-9, GAD-7, MMSE y más tests disponibles</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Consentimiento Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">Consentimientos informados seguros y legales</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Globe className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Catálogo de Profesionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">Directorio público para encontrar psicólogos</p>
              </CardContent>
            </Card>

            <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Comunidad Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">Red de intercambio entre profesionales</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto">
          <PricingSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">PsiKit</span>
          </div>
          <p className="text-gray-400 mb-4">Tu consultorio psicológico digital</p>
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
