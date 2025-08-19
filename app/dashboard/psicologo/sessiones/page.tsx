"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  BarChart3,
  TrendingUp,
  CalendarDays,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function SesionesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const sesionesRecientes = [
    {
      id: 1,
      paciente: "María González",
      fecha: "15/01/2024",
      hora: "10:00",
      tipo: "presencial",
      estado: "completada",
      duracion: "50 min",
      notas: "Sesión productiva, progreso notable en manejo de ansiedad",
    },
    {
      id: 2,
      paciente: "Carlos Rodríguez",
      fecha: "15/01/2024",
      hora: "11:00",
      tipo: "virtual",
      estado: "completada",
      duracion: "45 min",
      notas: "Trabajamos técnicas de relajación, tarea asignada",
    },
    {
      id: 3,
      paciente: "Ana Martínez",
      fecha: "14/01/2024",
      hora: "16:00",
      tipo: "telefonica",
      estado: "cancelada",
      duracion: null,
      notas: "Paciente canceló por enfermedad, reagendar",
    },
  ]

  const proximasSesiones = [
    {
      id: 4,
      paciente: "Luis Fernández",
      fecha: "16/01/2024",
      hora: "09:00",
      tipo: "presencial",
      estado: "programada",
      duracion: "50 min",
      preparacion: "Revisar resultados PHQ-9",
    },
    {
      id: 5,
      paciente: "Carmen López",
      fecha: "16/01/2024",
      hora: "10:30",
      tipo: "virtual",
      estado: "programada",
      duracion: "45 min",
      preparacion: "Seguimiento terapia cognitiva",
    },
    {
      id: 6,
      paciente: "Roberto Silva",
      fecha: "16/01/2024",
      hora: "14:00",
      tipo: "presencial",
      estado: "confirmada",
      duracion: "50 min",
      preparacion: "Primera sesión - evaluación inicial",
    },
    {
      id: 7,
      paciente: "Elena Torres",
      fecha: "17/01/2024",
      hora: "11:00",
      tipo: "virtual",
      estado: "programada",
      duracion: "45 min",
      preparacion: "Revisión de objetivos terapéuticos",
    },
  ]

  const allSesiones = [...sesionesRecientes, ...proximasSesiones]

  const filteredSesiones = useMemo(() => {
    if (!searchTerm.trim()) return proximasSesiones

    const searchLower = searchTerm.toLowerCase()
    return allSesiones.filter(
      (sesion) =>
        sesion.paciente.toLowerCase().includes(searchLower) ||
        sesion.tipo.toLowerCase().includes(searchLower) ||
        sesion.estado.toLowerCase().includes(searchLower),
    )
  }, [searchTerm])

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "completada":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "programada":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "confirmada":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "cancelada":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-amber-600" />
    }
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      completada: "border-green-200 text-green-800 bg-green-50",
      programada: "border-blue-200 text-blue-800 bg-blue-50",
      confirmada: "border-blue-200 text-blue-800 bg-blue-50",
      cancelada: "border-red-200 text-red-800 bg-red-50",
    }
    return variants[estado as keyof typeof variants] || "border-gray-200 text-gray-800 bg-gray-50"
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "virtual":
        return <Video className="h-4 w-4 text-purple-600" />
      case "telefonica":
        return <Phone className="h-4 w-4 text-green-600" />
      case "presencial":
        return <MapPin className="h-4 w-4 text-blue-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  const handleNuevaSesion = () => {
    router.push("/dashboard/psicologo/agenda")
  }

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex min-h-screen bg-gray-50">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Sesiones</h1>
                  <p className="text-gray-600 mt-1">Gestiona y revisa tus sesiones terapéuticas</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={handleNuevaSesion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Sesión
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar sesiones..."
                  className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Sesiones Recientes
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Actividad reciente de sesiones terapéuticas</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-700 border-green-300 hover:bg-green-50 bg-transparent"
                >
                  Ver historial
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sesionesRecientes.map((sesion) => (
                  <Card key={sesion.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{sesion.paciente}</h4>
                          <p className="text-sm text-gray-600">
                            {sesion.fecha} - {sesion.hora}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {getEstadoIcon(sesion.estado)}
                          <Badge variant="outline" className={`text-xs ${getEstadoBadge(sesion.estado)}`}>
                            {sesion.estado}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {getTipoIcon(sesion.tipo)}
                          <span className="capitalize">{sesion.tipo}</span>
                          {sesion.duracion && (
                            <>
                              <span>•</span>
                              <span>{sesion.duracion}</span>
                            </>
                          )}
                        </div>

                        {sesion.notas && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600 line-clamp-2">{sesion.notas}</p>
                          </div>
                        )}

                        {sesion.estado === "completada" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full h-8 text-xs text-blue-700 border-blue-200 hover:bg-blue-50 bg-transparent"
                          >
                            Ver detalles
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                  Próximas Sesiones
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {searchTerm
                    ? `${filteredSesiones.length} sesión${filteredSesiones.length !== 1 ? "es" : ""} encontrada${filteredSesiones.length !== 1 ? "s" : ""}`
                    : "Sesiones programadas y confirmadas"}
                </p>
              </div>

              {filteredSesiones.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron sesiones</h3>
                  <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredSesiones.map((sesion) => (
                    <Card key={sesion.id} className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-50 shrink-0">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base font-semibold text-gray-900 leading-tight truncate">
                              {sesion.paciente}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              {getTipoIcon(sesion.tipo)}
                              <Badge variant="outline" className="text-xs capitalize">
                                {sesion.tipo}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{sesion.fecha}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{sesion.hora}</span>
                          </div>
                        </div>

                        {sesion.preparacion && (
                          <div className="bg-amber-50 p-2 rounded-lg">
                            <p className="text-xs text-amber-800 font-medium">Preparación:</p>
                            <p className="text-xs text-amber-700">{sesion.preparacion}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {getEstadoIcon(sesion.estado)}
                            <Badge variant="outline" className={`text-xs ${getEstadoBadge(sesion.estado)}`}>
                              {sesion.estado}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{sesion.duracion}</span>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm">
                            Ver detalles
                          </Button>
                          {sesion.estado === "programada" && (
                            <Button size="sm" variant="outline" className="px-3 h-9 bg-transparent">
                              Confirmar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Estadísticas de Sesiones
                </CardTitle>
                <CardDescription>Resumen de la actividad terapéutica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center space-y-2 p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">32</div>
                    <p className="text-sm font-medium text-gray-900">Sesiones Este Mes</p>
                    <p className="text-xs text-gray-500">+15% vs mes anterior</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">28</div>
                    <p className="text-sm font-medium text-gray-900">Completadas</p>
                    <p className="text-xs text-gray-500">87.5% tasa de asistencia</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">7</div>
                    <p className="text-sm font-medium text-gray-900">Próximas</p>
                    <p className="text-xs text-gray-500">Esta semana</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">45</div>
                    <p className="text-sm font-medium text-gray-900">Duración Promedio</p>
                    <p className="text-xs text-gray-500">minutos por sesión</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
