"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Users,
  Video,
  FileText,
  CreditCard,
  Bell,
  Plus,
  Clock,
  TrendingUp,
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

export default function PsicologoDashboard() {
  const { logout } = useAuth()
  const router = useRouter()

  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: "sesion",
      mensaje: "Sesión con María González en 30 minutos",
      tiempo: "hace 5 min",
      leida: false,
    },
    {
      id: 2,
      tipo: "pago",
      mensaje: "Pago recibido de Carlos Rodríguez",
      tiempo: "hace 1 hora",
      leida: false,
    },
    {
      id: 3,
      tipo: "documento",
      mensaje: "Nuevo consentimiento firmado por Ana Martínez",
      tiempo: "hace 2 horas",
      leida: true,
    },
  ])

  useEffect(() => {
    const savedNotifications = localStorage.getItem("psicologo-notifications")
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
    localStorage.setItem("psicologo-notifications", JSON.stringify(notificaciones))
  }, [notificaciones])

  const handleNotificationClick = (notif: any) => {
    setNotificaciones((prev) => prev.map((n) => (n.id === notif.id ? { ...n, leida: true } : n)))

    switch (notif.tipo) {
      case "sesion":
        router.push("/dashboard/psicologo/agenda?view=list")
        break
      case "pago":
        router.push("/dashboard/psicologo/pagos?patient=carlos-rodriguez&view=history")
        break
      case "documento":
        router.push("/dashboard/psicologo/pacientes")
        break
      default:
        router.push("/dashboard/psicologo/notificaciones")
    }
  }

  const toggleNotificationStatus = (notifId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    setNotificaciones((prev) => prev.map((n) => (n.id === notifId ? { ...n, leida: !n.leida } : n)))
  }

  const proximasSesiones = [
    {
      id: 1,
      paciente: "María González",
      hora: "10:00",
      tipo: "Virtual",
      estado: "confirmada",
      estadoSesion: "programada",
    },
    {
      id: 2,
      paciente: "Carlos Rodríguez",
      hora: "11:30",
      tipo: "Virtual",
      estado: "pendiente",
      estadoSesion: "en-curso",
    },
    {
      id: 3,
      paciente: "Ana Martínez",
      hora: "14:00",
      tipo: "Virtual",
      estado: "confirmada",
      estadoSesion: "programada",
    },
  ]

  const alertas = [
    { tipo: "pago", mensaje: "3 pacientes con pagos pendientes", urgencia: "alta" },
    { tipo: "sesion", mensaje: "Sesión con Juan Pérez en 15 minutos", urgencia: "media" },
    { tipo: "documento", mensaje: "2 consentimientos informados pendientes", urgencia: "baja" },
  ]

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold">Dr. Roberto Silva</h1>
                  <p className="text-sm text-gray-600">Psicólogo Clínico - Mat. 12345</p>
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
                                      : notif.tipo === "pago"
                                        ? "bg-blue-500"
                                        : "bg-purple-500"
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
                      <Link href="/dashboard/psicologo/notificaciones">
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
                    <Link href="/dashboard/psicologo/perfil">
                      <DropdownMenuItem className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Perfil
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/psicologo/configuracion">
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-1">Pacientes Activos</p>
                      <p className="text-3xl font-bold text-blue-900">24</p>
                      <p className="text-xs text-blue-600 mt-1">+2 este mes</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">Sesiones Hoy</p>
                      <p className="text-3xl font-bold text-green-900">6</p>
                      <p className="text-xs text-green-600 mt-1">3 completadas</p>
                    </div>
                    <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700 mb-1">Ingresos del Mes</p>
                      <p className="text-3xl font-bold text-purple-900">$2,450</p>
                      <p className="text-xs text-purple-600 mt-1">+12% vs anterior</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700 mb-1">Pagos Pendientes</p>
                      <p className="text-3xl font-bold text-orange-900">3</p>
                      <p className="text-xs text-orange-600 mt-1">$450 total</p>
                    </div>
                    <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Próximas Sesiones */}
              <Card className="lg:col-span-2 border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900">Próximas Sesiones</CardTitle>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Sesión
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proximasSesiones.map((sesion) => (
                      <div
                        key={sesion.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{sesion.paciente}</p>
                            <p className="text-sm text-gray-600">
                              {sesion.hora} - {sesion.tipo}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={sesion.estado === "confirmada" ? "default" : "secondary"}>
                            {sesion.estado}
                          </Badge>
                          <Link href={`/sesion/${sesion.id}`}>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Video className="h-4 w-4 mr-1" />
                              {sesion.estadoSesion === "en-curso" ? "Unirse" : "Iniciar"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alertas y Notificaciones */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertas.map((alerta, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            alerta.urgencia === "alta"
                              ? "bg-red-500"
                              : alerta.urgencia === "media"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{alerta.mensaje}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Acciones Rápidas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/psicologo/pacientes">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">Gestionar Pacientes</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/psicologo/agenda">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">Ver Agenda</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/psicologo/tests">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">Tests Psicológicos</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/psicologo/pagos">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
                    <CardContent className="p-6 text-center">
                      <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="font-medium text-gray-900">Gestión de Pagos</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
