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
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
            <div className="relative px-8 py-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Tests Psicológicos</h1>
                  <p className="text-gray-600 text-lg font-medium">Biblioteca completa de evaluaciones psicológicas</p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
                  onClick={() => handleSendTest()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Test
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="relative max-w-lg mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar tests por nombre, categoría o descripción..."
                    className="pl-12 h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      Últimos Tests Enviados
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      Actividad reciente de evaluaciones
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="text-green-700 border-green-200 hover:bg-green-50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Ver todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testsEnviados.map((test, index) => (
                    <Card
                      key={test.id}
                      className="border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-base truncate">{test.test}</h4>
                            <p className="text-sm text-gray-600 truncate font-medium">{test.paciente}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            {test.estado === "completado" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-amber-600" />
                            )}
                            <Badge
                              variant="outline"
                              className={`text-xs font-semibold px-3 py-1 ${
                                test.estado === "completado"
                                  ? "border-green-200 text-green-800 bg-green-50"
                                  : "border-amber-200 text-amber-800 bg-amber-50"
                              }`}
                            >
                              {test.estado}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-xs text-gray-500 font-medium">Enviado: {test.fechaEnvio}</p>

                          {test.estado === "completado" && (
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-900">Puntuación: {test.puntuacion}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-3 text-xs hover:bg-white/80 transition-colors"
                                >
                                  <BarChart3 className="h-3 w-3 mr-1" />
                                  Ver
                                </Button>
                              </div>
                              <p className="text-xs text-gray-700 line-clamp-2 font-medium">{test.interpretacion}</p>
                            </div>
                          )}

                          {test.estado === "pendiente" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full h-9 text-xs bg-white/80 hover:bg-amber-50 border-amber-200 text-amber-700 font-semibold transition-all duration-200"
                            >
                              Recordar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Tests Disponibles
                </CardTitle>
                <CardDescription className="text-gray-600 text-base font-medium">
                  {searchTerm
                    ? `${filteredTests.length} test${filteredTests.length !== 1 ? "s" : ""} encontrado${filteredTests.length !== 1 ? "s" : ""}`
                    : "Selecciona y envía tests a tus pacientes"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {filteredTests.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-300 mb-4">
                      <Search className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">No se encontraron tests</h3>
                    <p className="text-gray-600 text-base">Intenta con otros términos de búsqueda</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTests.map((test, index) => {
                      const IconComponent = test.icono
                      const testSelectedPatients = selectedPatients[test.id.toString()] || []

                      return (
                        <Card
                          key={test.id}
                          className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white/90 backdrop-blur-sm group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-3 rounded-xl ${test.bgColor} shrink-0 group-hover:scale-110 transition-transform duration-200`}
                              >
                                <IconComponent className={`h-6 w-6 ${test.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg font-bold text-gray-900 leading-tight truncate group-hover:text-blue-700 transition-colors">
                                  {test.nombre}
                                </CardTitle>
                                <Badge variant="outline" className="text-xs font-semibold mt-2 px-2 py-1">
                                  {test.categoria}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0 space-y-4">
                            <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {test.descripcion}
                            </CardDescription>

                            <div className="flex items-center justify-between text-xs text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-100">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="font-semibold">{test.preguntas} preguntas</span>
                              </div>
                              <span className="font-semibold">{test.duracion}</span>
                            </div>

                            <div className="flex gap-3 pt-2">
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-10 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => handleSendTest(test.id.toString())}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Enviar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="px-4 border-gray-200 hover:bg-gray-50 h-10 bg-white/80 hover:shadow-md transition-all duration-200"
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

            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  Estadísticas de Tests
                </CardTitle>
                <CardDescription className="text-gray-600 text-base font-medium">
                  Resumen de la actividad de evaluaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center space-y-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">24</div>
                    <p className="text-sm font-bold text-gray-900">Tests Enviados</p>
                    <p className="text-xs text-gray-500 font-medium">Este mes</p>
                  </div>
                  <div className="text-center space-y-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-green-600">18</div>
                    <p className="text-sm font-bold text-gray-900">Completados</p>
                    <p className="text-xs text-gray-500 font-medium">75% tasa de respuesta</p>
                  </div>
                  <div className="text-center space-y-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-orange-600">6</div>
                    <p className="text-sm font-bold text-gray-900">Pendientes</p>
                    <p className="text-xs text-gray-500 font-medium">Requieren seguimiento</p>
                  </div>
                  <div className="text-center space-y-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-purple-600">PHQ-9</div>
                    <p className="text-sm font-bold text-gray-900">Más Usado</p>
                    <p className="text-xs text-gray-500 font-medium">8 veces este mes</p>
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
