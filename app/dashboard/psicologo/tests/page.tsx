"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Send,
  Download,
  BarChart3,
  FileText,
  Brain,
  Heart,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
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
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Tests Psicológicos</h1>
                  <p className="text-gray-600 mt-1">Gestiona y envía evaluaciones psicológicas</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={() => handleSendTest()}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Test
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar tests..."
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
                    Últimos Tests Enviados
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Actividad reciente de evaluaciones</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-700 border-green-300 hover:bg-green-50 bg-transparent"
                >
                  Ver todos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testsEnviados.map((test) => (
                  <Card key={test.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{test.test}</h4>
                          <p className="text-sm text-gray-600 truncate">{test.paciente}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {test.estado === "completado" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-600" />
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              test.estado === "completado"
                                ? "border-green-200 text-green-800 bg-green-50"
                                : "border-amber-200 text-amber-800 bg-amber-50"
                            }`}
                          >
                            {test.estado}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">Enviado: {test.fechaEnvio}</p>

                        {test.estado === "completado" && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">Puntuación: {test.puntuacion}</span>
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Ver
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600">{test.interpretacion}</p>
                          </div>
                        )}

                        {test.estado === "pendiente" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full h-8 text-xs text-amber-700 border-amber-200 hover:bg-amber-50 bg-transparent"
                          >
                            Recordar
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
                  <FileText className="h-5 w-5 text-blue-600" />
                  Tests Disponibles
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {searchTerm
                    ? `${filteredTests.length} test${filteredTests.length !== 1 ? "s" : ""} encontrado${filteredTests.length !== 1 ? "s" : ""}`
                    : "Selecciona y envía tests a tus pacientes"}
                </p>
              </div>

              {filteredTests.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tests</h3>
                  <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTests.map((test) => {
                    const IconComponent = test.icono

                    return (
                      <Card key={test.id} className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${test.bgColor} shrink-0`}>
                              <IconComponent className={`h-5 w-5 ${test.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base font-semibold text-gray-900 leading-tight truncate">
                                {test.nombre}
                              </CardTitle>
                              <Badge variant="outline" className="text-xs mt-1">
                                {test.categoria}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <CardDescription className="text-sm text-gray-600 line-clamp-2">
                            {test.descripcion}
                          </CardDescription>

                          <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span>{test.preguntas} preguntas</span>
                            </div>
                            <span>{test.duracion}</span>
                          </div>

                          <div className="flex gap-2 pt-1">
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm"
                              onClick={() => handleSendTest(test.id.toString())}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Enviar
                            </Button>
                            <Button size="sm" variant="outline" className="px-3 h-9 bg-transparent">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Estadísticas de Tests
                </CardTitle>
                <CardDescription>Resumen de la actividad de evaluaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center space-y-2 p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <p className="text-sm font-medium text-gray-900">Tests Enviados</p>
                    <p className="text-xs text-gray-500">Este mes</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <p className="text-sm font-medium text-gray-900">Completados</p>
                    <p className="text-xs text-gray-500">75% tasa de respuesta</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">6</div>
                    <p className="text-sm font-medium text-gray-900">Pendientes</p>
                    <p className="text-xs text-gray-500">Requieren seguimiento</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">PHQ-9</div>
                    <p className="text-sm font-medium text-gray-900">Más Usado</p>
                    <p className="text-xs text-gray-500">8 veces este mes</p>
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
