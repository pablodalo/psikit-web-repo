"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Calendar,
  Video,
  FileText,
  CreditCard,
  Bell,
  Clock,
  Download,
  AlertCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function PacienteDashboard() {
  const { logout } = useAuth()

  const proximasSesiones = [
    { id: 1, fecha: "Hoy", hora: "15:00", profesional: "Dr. Roberto Silva", estado: "confirmada", puedeIngresar: true },
    {
      id: 2,
      fecha: "Mañana",
      hora: "10:00",
      profesional: "Dr. Roberto Silva",
      estado: "confirmada",
      puedeIngresar: false,
    },
    {
      id: 3,
      fecha: "Viernes",
      hora: "15:00",
      profesional: "Dr. Roberto Silva",
      estado: "pendiente",
      puedeIngresar: false,
    },
  ]

  const documentos = [
    { tipo: "Factura", fecha: "15/01/2024", descripcion: "Sesión de terapia", estado: "disponible" },
    { tipo: "Certificado", fecha: "10/01/2024", descripcion: "Certificado médico", estado: "disponible" },
    { tipo: "Test", fecha: "08/01/2024", descripcion: "PHQ-9 - Resultados", estado: "completado" },
  ]

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold dark:text-white">María González</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Paciente desde Enero 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificaciones
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Mi Cuenta
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <Link href="/dashboard/paciente/perfil">
                      <DropdownMenuItem className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Perfil
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/paciente/configuracion">
                      <DropdownMenuItem className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Configuración
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Información del Profesional */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Tu Psicólogo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Dr. Roberto Silva</h3>
                    <p className="text-gray-600 dark:text-gray-400">Psicólogo Clínico - Matrícula 12345</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Especialista en Terapia Cognitivo-Conductual
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Activo</Badge>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Próxima sesión: Hoy 15:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Próximas Sesiones */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Mis Próximas Sesiones</CardTitle>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Ver Calendario
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proximasSesiones.map((sesion) => (
                      <div
                        key={sesion.id}
                        className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full dark:bg-blue-900">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">
                              {sesion.fecha} - {sesion.hora}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{sesion.profesional}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={sesion.estado === "confirmada" ? "default" : "secondary"}
                            className="dark:bg-gray-800 dark:text-gray-300"
                          >
                            {sesion.estado}
                          </Badge>
                          {sesion.fecha === "Hoy" && sesion.puedeIngresar && (
                            <Link href={`/sala-espera/${sesion.id}`}>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                              >
                                <Video className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estado de Pagos */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900 dark:border-green-700">
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">Último Pago</p>
                        <p className="text-sm text-green-600 dark:text-green-400">$150 - 15/01/2024</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Pagado
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-900 dark:border-orange-700">
                      <div>
                        <p className="font-medium text-orange-800 dark:text-orange-300">Próximo Pago</p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">$150 - Vence 20/01/2024</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                      >
                        Pagar Ahora
                      </Button>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700">
                      <Button variant="outline" className="w-full bg-transparent dark:text-white">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Ver Historial de Pagos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documentos y Tests */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Documentos y Tests</CardTitle>
                  <CardDescription>Descarga tus facturas, certificados y resultados de tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {documentos.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                          <div>
                            <p className="font-medium dark:text-white">{doc.tipo}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{doc.fecha}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">{doc.descripcion}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="dark:text-white bg-transparent">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tareas Pendientes */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tareas y Tests Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900 dark:border-yellow-700">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                        <div>
                          <p className="font-medium dark:text-white">Test GAD-7 - Ansiedad</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Asignado el 16/01/2024</p>
                        </div>
                      </div>
                      <Button size="sm" className="dark:text-white">
                        Completar Test
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900 dark:border-blue-700">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        <div>
                          <p className="font-medium dark:text-white">Ejercicio de Relajación</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Para completar antes de la próxima sesión
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="dark:text-white bg-transparent">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
