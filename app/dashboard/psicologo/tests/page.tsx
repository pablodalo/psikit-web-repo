"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Search, Send, Download, BarChart3, FileText, Brain, Heart, Zap, Shield, ChevronDown, User } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function TestsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const [selectedPatients, setSelectedPatients] = useState<Record<string, string[]>>({})

  const pacientes = [
    { id: 1, nombre: "María González", email: "maria.gonzalez@email.com", ultimaVisita: "10/01/2024" },
    { id: 2, nombre: "Carlos Rodríguez", email: "carlos.rodriguez@email.com", ultimaVisita: "12/01/2024" },
    { id: 3, nombre: "Ana Martínez", email: "ana.martinez@email.com", ultimaVisita: "08/01/2024" },
    { id: 4, nombre: "Luis Fernández", email: "luis.fernandez@email.com", ultimaVisita: "15/01/2024" },
    { id: 5, nombre: "Carmen López", email: "carmen.lopez@email.com", ultimaVisita: "05/01/2024" },
  ]

  const testsDisponibles = [
    {
      id: 1,
      nombre: "PHQ-9",
      descripcion: "Cuestionario de Salud del Paciente - Depresión",
      categoria: "Depresión",
      duracion: "5-10 min",
      preguntas: 9,
      icono: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      nombre: "GAD-7",
      descripcion: "Escala de Ansiedad Generalizada",
      categoria: "Ansiedad",
      duracion: "3-5 min",
      preguntas: 7,
      icono: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      id: 3,
      nombre: "Rosenberg Self-Esteem Scale",
      descripcion: "Escala de Autoestima de Rosenberg",
      categoria: "Autoestima",
      duracion: "5 min",
      preguntas: 10,
      icono: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      nombre: "AUDIT",
      descripcion: "Test de Identificación de Trastornos por Uso de Alcohol",
      categoria: "Adicciones",
      duracion: "5-8 min",
      preguntas: 10,
      icono: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 5,
      nombre: "MMSE",
      descripcion: "Mini Examen del Estado Mental",
      categoria: "Cognitivo",
      duracion: "10-15 min",
      preguntas: 30,
      icono: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 6,
      nombre: "MoCA",
      descripcion: "Evaluación Cognitiva de Montreal",
      categoria: "Cognitivo",
      duracion: "15-20 min",
      preguntas: 30,
      icono: Brain,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const testsEnviados = [
    {
      id: 1,
      test: "PHQ-9",
      paciente: "María González",
      fechaEnvio: "15/01/2024",
      estado: "completado",
      puntuacion: 12,
      interpretacion: "Depresión moderada",
    },
    {
      id: 2,
      test: "GAD-7",
      paciente: "Carlos Rodríguez",
      fechaEnvio: "14/01/2024",
      estado: "pendiente",
      puntuacion: null,
      interpretacion: null,
    },
    {
      id: 3,
      test: "Rosenberg",
      paciente: "Ana Martínez",
      fechaEnvio: "13/01/2024",
      estado: "completado",
      puntuacion: 18,
      interpretacion: "Autoestima baja",
    },
  ]

  const filteredTests = useMemo(() => {
    if (!searchTerm.trim()) return testsDisponibles

    const searchLower = searchTerm.toLowerCase()
    return testsDisponibles.filter(
      (test) =>
        test.nombre.toLowerCase().includes(searchLower) ||
        test.descripcion.toLowerCase().includes(searchLower) ||
        test.categoria.toLowerCase().includes(searchLower),
    )
  }, [searchTerm])

  const handleSendTest = (testId?: string) => {
    const url = testId ? `/dashboard/psicologo/tests/enviar?test=${testId}` : "/dashboard/psicologo/tests/enviar"
    router.push(url)
  }

  const handlePatientSelection = (testId: string, patientId: string, isSelected: boolean) => {
    setSelectedPatients((prev) => {
      const currentSelected = prev[testId] || []
      if (isSelected) {
        return { ...prev, [testId]: [...currentSelected, patientId] }
      } else {
        return { ...prev, [testId]: currentSelected.filter((id) => id !== patientId) }
      }
    })
  }

  const handleSendToSelectedPatients = (testId: string) => {
    const selectedPatientIds = selectedPatients[testId] || []
    if (selectedPatientIds.length === 0) {
      alert("Por favor selecciona al menos un paciente")
      return
    }

    const selectedPatientNames = pacientes
      .filter((p) => selectedPatientIds.includes(p.id.toString()))
      .map((p) => p.nombre)

    setOpenDropdowns((prev) => ({ ...prev, [testId]: false }))
    setSelectedPatients((prev) => ({ ...prev, [testId]: [] }))

    console.log(`[v0] Sending test ${testId} to patients: ${selectedPatientIds.join(", ")}`)
    alert(`Test enviado exitosamente a: ${selectedPatientNames.join(", ")}`)
  }

  const toggleDropdown = (testId: string, isOpen: boolean) => {
    setOpenDropdowns((prev) => ({ ...prev, [testId]: isOpen }))
    if (!isOpen) {
      setSelectedPatients((prev) => ({ ...prev, [testId]: [] }))
    }
  }

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex min-h-screen bg-gray-50">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-gray-900">Tests Psicológicos</h1>
                  <p className="text-gray-600 text-lg">Biblioteca completa de evaluaciones psicológicas</p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar tests por nombre o categoría..."
                    className="pl-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3">
                <Card className="shadow-sm border-gray-200">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-semibold text-gray-900">Tests Disponibles</CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      {searchTerm
                        ? `${filteredTests.length} test${filteredTests.length !== 1 ? "s" : ""} encontrado${filteredTests.length !== 1 ? "s" : ""}`
                        : "Selecciona y envía tests a tus pacientes"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredTests.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tests</h3>
                        <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredTests.map((test) => {
                          const IconComponent = test.icono
                          const testSelectedPatients = selectedPatients[test.id.toString()] || []

                          return (
                            <Card
                              key={test.id}
                              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-blue-300"
                            >
                              <CardHeader className="pb-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-lg ${test.bgColor}`}>
                                      <IconComponent className={`h-6 w-6 ${test.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                                        {test.nombre}
                                      </CardTitle>
                                      <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {test.descripcion}
                                      </CardDescription>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="shrink-0 text-xs font-medium">
                                    {test.categoria}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0 space-y-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="font-medium">{test.preguntas} preguntas</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{test.duracion}</span>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <DropdownMenu
                                    open={openDropdowns[test.id.toString()] || false}
                                    onOpenChange={(isOpen) => toggleDropdown(test.id.toString(), isOpen)}
                                  >
                                    <DropdownMenuTrigger asChild>
                                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                        <Send className="h-4 w-4 mr-2" />
                                        Enviar
                                        <ChevronDown className="h-4 w-4 ml-2" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="w-80">
                                      <DropdownMenuLabel className="text-sm font-semibold text-gray-900">
                                        Seleccionar Pacientes
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <div className="max-h-64 overflow-y-auto">
                                        {pacientes.map((paciente) => (
                                          <div
                                            key={paciente.id}
                                            className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => {
                                              const isSelected = testSelectedPatients.includes(paciente.id.toString())
                                              handlePatientSelection(
                                                test.id.toString(),
                                                paciente.id.toString(),
                                                !isSelected,
                                              )
                                            }}
                                          >
                                            <Checkbox
                                              checked={testSelectedPatients.includes(paciente.id.toString())}
                                              onChange={() => {}}
                                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <div className="p-1.5 bg-blue-100 rounded-full">
                                              <User className="h-3 w-3 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-sm font-medium text-gray-900 truncate">
                                                {paciente.nombre}
                                              </p>
                                              <p className="text-xs text-gray-500 truncate">
                                                Última visita: {paciente.ultimaVisita}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <DropdownMenuSeparator />
                                      {testSelectedPatients.length > 0 && (
                                        <>
                                          <div className="p-3">
                                            <Button
                                              onClick={() => handleSendToSelectedPatients(test.id.toString())}
                                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                                              size="sm"
                                            >
                                              <Send className="h-4 w-4 mr-2" />
                                              Enviar a {testSelectedPatients.length} paciente
                                              {testSelectedPatients.length > 1 ? "s" : ""}
                                            </Button>
                                          </div>
                                          <DropdownMenuSeparator />
                                        </>
                                      )}
                                      <DropdownMenuItem
                                        onClick={() => {
                                          toggleDropdown(test.id.toString(), false)
                                          handleSendTest(test.id.toString())
                                        }}
                                        className="cursor-pointer text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Send className="h-4 w-4" />
                                          <span className="text-sm font-medium">Ver todos los pacientes</span>
                                        </div>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="px-4 border-gray-300 hover:bg-gray-50 bg-transparent"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold text-gray-900">Tests Enviados</CardTitle>
                  <CardDescription className="text-gray-600">Estado de los tests enviados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testsEnviados.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{test.test}</h4>
                          <Badge
                            variant={test.estado === "completado" ? "default" : "secondary"}
                            className={
                              test.estado === "completado"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {test.estado}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium text-gray-700">{test.paciente}</p>
                          <p className="text-xs text-gray-500">Enviado: {test.fechaEnvio}</p>
                        </div>

                        {test.estado === "completado" && (
                          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-900">Puntuación: {test.puntuacion}</span>
                              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Ver Resultados
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{test.interpretacion}</p>
                          </div>
                        )}

                        {test.estado === "pendiente" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-gray-300 hover:bg-gray-50 bg-transparent"
                          >
                            Recordar al Paciente
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-gray-900">Estadísticas de Tests</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Resumen de la actividad de evaluaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-600">24</div>
                    <p className="text-base font-medium text-gray-900">Tests Enviados</p>
                    <p className="text-sm text-gray-500">Este mes</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">18</div>
                    <p className="text-base font-medium text-gray-900">Completados</p>
                    <p className="text-sm text-gray-500">75% tasa de respuesta</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-orange-600">6</div>
                    <p className="text-base font-medium text-gray-900">Pendientes</p>
                    <p className="text-sm text-gray-500">Requieren seguimiento</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-purple-600">PHQ-9</div>
                    <p className="text-base font-medium text-gray-900">Más Usado</p>
                    <p className="text-sm text-gray-500">8 veces este mes</p>
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
