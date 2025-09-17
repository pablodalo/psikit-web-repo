"use client"

import type React from "react"

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
  Mail,
  MailOpen,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"

export default function PacienteDashboard() {
  const { logout } = useAuth()
  const router = useRouter()

  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: "sesion",
      mensaje: "Tu sesión con Dr. Roberto Silva es en 30 minutos",
      tiempo: "hace 5 min",
      leida: false,
    },
    {
      id: 2,
      tipo: "documento",
      mensaje: "Nuevo documento disponible para descarga",
      tiempo: "hace 1 hora",
      leida: false,
    },
    {
      id: 3,
      tipo: "test",
      mensaje: "Test GAD-7 asignado para completar",
      tiempo: "hace 2 horas",
      leida: true,
    },
  ])

  useEffect(() => {
    const savedNotifications = localStorage.getItem("paciente-notifications")
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications)
        setNotificaciones(parsed)
      } catch (error) {
        console.error("Error loading notifications from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("paciente-notifications", JSON.stringify(notificaciones))
  }, [notificaciones])

  const handleNotificationClick = (notif: any) => {
    setNotificaciones((prev) => prev.map((n) => (n.id === notif.id ? { ...n, leida: true } : n)))

    switch (notif.tipo) {
      case "sesion":
        router.push("/dashboard/paciente/sesiones")
        break
      case "documento":
        router.push("/dashboard/paciente/documentos")
        break
      case "test":
        router.push("/dashboard/paciente/tests")
        break
      default:
        router.push("/dashboard/paciente/notificaciones")
    }
  }

  const toggleNotificationStatus = (notifId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    setNotificaciones((prev) => prev.map((n) => (n.id === notifId ? { ...n, leida: !n.leida } : n)))
  }

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
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold dark:text-white">María González</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Paciente desde Enero 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="relative bg-transparent">
                      <Bell className="h-4 w-4 mr-2" />
                      Notificaciones
                      {notificaciones.some((n) => !n.leida) && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2">
                      <h3 className="font-semibold text-sm mb-2">Notificaciones recientes</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notificaciones.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              !notif.leida
                                ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1">
                                <div
                                  className={`w-2 h-2 rounded-full mt-2 ${
                                    notif.tipo === "sesion"
                                      ? "bg-green-500"
                                      : notif.tipo === "documento"
                                        ? "bg-purple-500"
                                        : "bg-blue-500"
                                  }`}
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{notif.mensaje}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notif.tiempo}</p>
                                  <p className="text-xs text-blue-600 mt-1 opacity-75">Click para ver detalles</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => toggleNotificationStatus(notif.id, e)}
                                className="h-6 w-6 p-0 hover:bg-gray-200"
                                title={notif.leida ? "Marcar como no leída" : "Marcar como leída"}
                              >
                                {notif.leida ? (
                                  <MailOpen className="h-3 w-3 text-gray-500" />
                                ) : (
                                  <Mail className="h-3 w-3 text-blue-600" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <DropdownMenuSeparator className="my-2" />
                      <Link href="/dashboard/paciente/notificaciones">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Ver todas las notificaciones
                        </Button>
                      </Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

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
            {/* Gradient summary cards with statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-blue-700">Próxima Sesión</p>
                      <p className="text-2xl font-bold text-blue-900">Hoy</p>
                      <p className="text-xs text-blue-600">15:00 hrs</p>
                    </div>
                    <div className="ml-4 p-3 bg-blue-200 rounded-full">
                      <Clock className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-green-700">Sesiones Completadas</p>
                      <p className="text-2xl font-bold text-green-900">12</p>
                      <p className="text-xs text-green-600">Este mes</p>
                    </div>
                    <div className="ml-4 p-3 bg-green-200 rounded-full">
                      <Video className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-purple-700">Tests Pendientes</p>
                      <p className="text-2xl font-bold text-purple-900">2</p>
                      <p className="text-xs text-purple-600">Por completar</p>
                    </div>
                    <div className="ml-4 p-3 bg-purple-200 rounded-full">
                      <FileText className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-orange-700">Pagos al Día</p>
                      <p className="text-2xl font-bold text-orange-900">✓</p>
                      <p className="text-xs text-orange-600">Sin pendientes</p>
                    </div>
                    <div className="ml-4 p-3 bg-orange-200 rounded-full">
                      <CreditCard className="h-6 w-6 text-orange-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información del Profesional */}
            <Card className="mb-6 bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800">Tu Psicólogo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-2 ring-blue-200">
                    <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=64&h=64&fit=crop&crop=face" />
                    <AvatarFallback className="bg-blue-100 text-blue-700">RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">Dr. Roberto Silva</h3>
                    <p className="text-slate-600">Psicólogo Clínico - Matrícula 12345</p>
                    <p className="text-sm text-slate-500">Especialista en Terapia Cognitivo-Conductual</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 border-green-200">Activo</Badge>
                    <p className="text-sm text-slate-500 mt-1">Próxima sesión: Hoy 15:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Próximas Sesiones */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-900">Mis Próximas Sesiones</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
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
                        className="flex items-center justify-between p-4 bg-white/70 border border-blue-200 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              {sesion.fecha} - {sesion.hora}
                            </p>
                            <p className="text-sm text-slate-600">{sesion.profesional}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={sesion.estado === "confirmada" ? "default" : "secondary"}
                            className={
                              sesion.estado === "confirmada" ? "bg-green-100 text-green-800 border-green-200" : ""
                            }
                          >
                            {sesion.estado}
                          </Badge>
                          {sesion.fecha === "Hoy" && sesion.puedeIngresar && (
                            <Link href={`/sala-espera/${sesion.id}`}>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
              <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Estado de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-100/70 border border-green-200 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Último Pago</p>
                        <p className="text-sm text-green-600">$150 - 15/01/2024</p>
                      </div>
                      <Badge className="bg-green-200 text-green-800 border-green-300">Pagado</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-100/70 border border-orange-200 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-800">Próximo Pago</p>
                        <p className="text-sm text-orange-600">$150 - Vence 20/01/2024</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Pagar Ahora
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-green-200">
                      <Button
                        variant="outline"
                        className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                      >
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
              <Card className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900">Mis Documentos y Tests</CardTitle>
                  <CardDescription className="text-purple-700">
                    Descarga tus facturas, certificados y resultados de tests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {documentos.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/70 border border-purple-200 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{doc.tipo}</p>
                            <p className="text-sm text-slate-600">{doc.fecha}</p>
                            <p className="text-xs text-slate-500">{doc.descripcion}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                        >
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
              <Card className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Tareas y Tests Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-100/70 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-200 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-yellow-700" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Test GAD-7 - Ansiedad</p>
                          <p className="text-sm text-slate-600">Asignado el 16/01/2024</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        Completar Test
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-100/70 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-200 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Ejercicio de Relajación</p>
                          <p className="text-sm text-slate-600">Para completar antes de la próxima sesión</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
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
