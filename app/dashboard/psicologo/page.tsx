"use client"

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
  DollarSign,
  AlertTriangle,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function PsicologoDashboard() {
  const { logout } = useAuth()

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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sesiones Hoy</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">3 completadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,450</div>
                  <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <p className="text-xs text-muted-foreground">$450 total</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Próximas Sesiones */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Próximas Sesiones</CardTitle>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Sesión
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proximasSesiones.map((sesion) => (
                      <div key={sesion.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{sesion.paciente}</p>
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
              <Card>
                <CardHeader>
                  <CardTitle>Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertas.map((alerta, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
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
                          <p className="text-sm">{alerta.mensaje}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/psicologo/pacientes">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium">Gestionar Pacientes</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/psicologo/agenda">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">Ver Agenda</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/psicologo/tests">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium">Tests Psicológicos</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/psicologo/pagos">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="font-medium">Gestión de Pagos</p>
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
