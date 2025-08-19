"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  FileText,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Filter,
  Users,
  UserCheck,
  Clock,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { useState, useMemo } from "react"

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const pacientes = [
    {
      id: 1,
      nombre: "María González",
      edad: 28,
      telefono: "+54 11 1234-5678",
      email: "maria.gonzalez@email.com",
      ultimaSesion: "15/01/2024",
      proximaSesion: "22/01/2024",
      estado: "activo",
      modalidad: "virtual",
      sesionesTotal: 12,
      pagosPendientes: 0,
      diagnostico: "Ansiedad generalizada",
      fechaIngreso: "10/10/2023",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      edad: 35,
      telefono: "+54 11 2345-6789",
      email: "carlos.rodriguez@email.com",
      ultimaSesion: "14/01/2024",
      proximaSesion: "21/01/2024",
      estado: "activo",
      modalidad: "presencial",
      sesionesTotal: 8,
      pagosPendientes: 1,
      diagnostico: "Depresión leve",
      fechaIngreso: "15/11/2023",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      edad: 42,
      telefono: "+54 11 3456-7890",
      email: "ana.martinez@email.com",
      ultimaSesion: "13/01/2024",
      proximaSesion: "20/01/2024",
      estado: "activo",
      modalidad: "mixta",
      sesionesTotal: 15,
      pagosPendientes: 0,
      diagnostico: "Trastorno adaptativo",
      fechaIngreso: "05/09/2023",
    },
    {
      id: 4,
      nombre: "Juan Pérez",
      edad: 29,
      telefono: "+54 11 4567-8901",
      email: "juan.perez@email.com",
      ultimaSesion: "10/01/2024",
      proximaSesion: "17/01/2024",
      estado: "inactivo",
      modalidad: "virtual",
      sesionesTotal: 6,
      pagosPendientes: 2,
      diagnostico: "Estrés laboral",
      fechaIngreso: "20/12/2023",
    },
  ]

  const filteredPacientes = useMemo(() => {
    if (!searchTerm) return pacientes

    return pacientes.filter(
      (paciente) =>
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.telefono.includes(searchTerm) ||
        paciente.diagnostico.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const getStatusColor = (estado: string) => {
    return estado === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getModalidadColor = (modalidad: string) => {
    switch (modalidad) {
      case "virtual":
        return "bg-blue-100 text-blue-800"
      case "presencial":
        return "bg-purple-100 text-purple-800"
      case "mixta":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pacientes</h1>
                  <p className="text-lg text-gray-600">
                    Administra la información de tus pacientes de manera eficiente
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Plus className="h-5 w-5 mr-2" />
                  Nuevo Paciente
                </Button>
              </div>
            </div>

            <Card className="mb-8 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Buscar pacientes por nombre, email, teléfono o diagnóstico..."
                        className="pl-12 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                    <Button variant="outline" className="h-12 px-6 bg-transparent">
                      Exportar
                    </Button>
                  </div>
                </div>
                {searchTerm && (
                  <div className="mt-4 text-sm text-gray-600">
                    Mostrando {filteredPacientes.length} de {pacientes.length} pacientes
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-1">Total Pacientes</p>
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
                      <p className="text-sm font-medium text-green-700 mb-1">Pacientes Activos</p>
                      <p className="text-3xl font-bold text-green-900">21</p>
                      <p className="text-xs text-green-600 mt-1">87.5% del total</p>
                    </div>
                    <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700 mb-1">Sesiones Programadas</p>
                      <p className="text-3xl font-bold text-purple-900">18</p>
                      <p className="text-xs text-purple-600 mt-1">Esta semana</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-700" />
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
                      <AlertCircle className="h-6 w-6 text-orange-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader className="bg-white border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">Lista de Pacientes</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Información detallada de todos tus pacientes
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {filteredPacientes.map((paciente) => (
                    <div key={paciente.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/generic-placeholder-graphic.png?height=48&width=48`} />
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                              {paciente.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{paciente.nombre}</h3>
                              <Badge className={`${getStatusColor(paciente.estado)} border-0 font-medium`}>
                                {paciente.estado}
                              </Badge>
                              <Badge className={`${getModalidadColor(paciente.modalidad)} border-0 font-medium`}>
                                {paciente.modalidad}
                              </Badge>
                              {paciente.pagosPendientes > 0 && (
                                <Badge className="bg-red-100 text-red-800 border-0 font-medium">
                                  {paciente.pagosPendientes} pago{paciente.pagosPendientes > 1 ? "s" : ""} pendiente
                                  {paciente.pagosPendientes > 1 ? "s" : ""}
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium w-20">Edad:</span>
                                  <span>{paciente.edad} años</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                  <span>{paciente.telefono}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                  <span className="truncate">{paciente.email}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium w-24">Diagnóstico:</span>
                                  <span>{paciente.diagnostico}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium w-24">Sesiones:</span>
                                  <span>{paciente.sesionesTotal} completadas</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium w-24">Ingreso:</span>
                                  <span>{paciente.fechaIngreso}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-6 text-sm">
                              <div className="flex items-center text-gray-600">
                                <span className="font-medium mr-2">Última sesión:</span>
                                <span>{paciente.ultimaSesion}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <span className="font-medium mr-2">Próxima sesión:</span>
                                <span>{paciente.proximaSesion}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 bg-transparent"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Historia
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-50 hover:text-green-700 hover:border-green-300 bg-transparent"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Agendar
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                              <DropdownMenuItem>Editar información</DropdownMenuItem>
                              <DropdownMenuItem>Enviar test</DropdownMenuItem>
                              <DropdownMenuItem>Generar factura</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Desactivar paciente</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredPacientes.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pacientes</h3>
                    <p className="text-gray-600">
                      {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza agregando tu primer paciente"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
