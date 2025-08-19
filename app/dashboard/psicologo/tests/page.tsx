import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Send, Download, BarChart3, FileText, Brain, Heart, Zap, Shield } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function TestsPage() {
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

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex min-h-screen bg-gray-50">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          {/* Header */}
          <header className="bg-white border-b">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Tests Psicológicos</h1>
                  <p className="text-gray-600">Biblioteca completa de evaluaciones psicológicas</p>
                </div>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Test
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Búsqueda */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar tests por nombre o categoría..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tests Disponibles */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tests Disponibles</CardTitle>
                    <CardDescription>Selecciona y envía tests a tus pacientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testsDisponibles.map((test) => {
                        const IconComponent = test.icono
                        return (
                          <Card key={test.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <IconComponent className={`h-6 w-6 ${test.color}`} />
                                  <CardTitle className="text-lg">{test.nombre}</CardTitle>
                                </div>
                                <Badge variant="outline">{test.categoria}</Badge>
                              </div>
                              <CardDescription className="text-sm">{test.descripcion}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                <span>{test.preguntas} preguntas</span>
                                <span>{test.duracion}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" className="flex-1">
                                  <Send className="h-4 w-4 mr-2" />
                                  Enviar
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tests Enviados Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Tests Enviados</CardTitle>
                  <CardDescription>Estado de los tests enviados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testsEnviados.map((test) => (
                      <div key={test.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{test.test}</h4>
                          <Badge variant={test.estado === "completado" ? "default" : "secondary"}>{test.estado}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{test.paciente}</p>
                        <p className="text-xs text-gray-500 mb-3">Enviado: {test.fechaEnvio}</p>

                        {test.estado === "completado" && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Puntuación: {test.puntuacion}</span>
                              <Button size="sm" variant="outline">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Ver Resultados
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{test.interpretacion}</p>
                          </div>
                        )}

                        {test.estado === "pendiente" && (
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            Recordar al Paciente
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Estadísticas de Tests */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Tests</CardTitle>
                  <CardDescription>Resumen de la actividad de evaluaciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <p className="text-sm text-gray-600">Tests Enviados</p>
                      <p className="text-xs text-gray-500">Este mes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">18</div>
                      <p className="text-sm text-gray-600">Completados</p>
                      <p className="text-xs text-gray-500">75% tasa de respuesta</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">6</div>
                      <p className="text-sm text-gray-600">Pendientes</p>
                      <p className="text-xs text-gray-500">Requieren seguimiento</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">PHQ-9</div>
                      <p className="text-sm text-gray-600">Más Usado</p>
                      <p className="text-xs text-gray-500">8 veces este mes</p>
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
