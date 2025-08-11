import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, Users, Video, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoAgendaPage() {
  console.log("Agenda page loaded successfully")

  const sesionesHoy = [
    { id: 1, paciente: "María González", hora: "09:00", duracion: 50, estado: "confirmada", tipo: "virtual" },
    { id: 2, paciente: "Carlos Rodríguez", hora: "10:30", duracion: 50, estado: "pendiente", tipo: "virtual" },
    { id: 3, paciente: "Ana Martínez", hora: "14:00", duracion: 50, estado: "confirmada", tipo: "presencial" },
    { id: 4, paciente: "Luis Pérez", hora: "15:30", duracion: 50, estado: "confirmada", tipo: "virtual" },
  ]

  const proximosDias = [
    { fecha: "Mañana", sesiones: 4 },
    { fecha: "Miércoles", sesiones: 6 },
    { fecha: "Jueves", sesiones: 3 },
    { fecha: "Viernes", sesiones: 5 },
  ]

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Agenda</h1>
                <p className="text-gray-600">Gestiona tus citas y horarios</p>
                <p className="text-xs text-blue-600 mt-1">✓ Página de Agenda cargada correctamente</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Vista Mensual
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Cita
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sesiones de Hoy */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Hoy - {new Date().toLocaleDateString()}</CardTitle>
                      <CardDescription>4 sesiones programadas</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sesionesHoy.map((sesion) => (
                      <div key={sesion.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                            <Clock className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{sesion.paciente}</p>
                            <p className="text-sm text-gray-600">
                              {sesion.hora} - {sesion.duracion} min
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={sesion.tipo === "virtual" ? "default" : "secondary"}>{sesion.tipo}</Badge>
                              <Badge variant={sesion.estado === "confirmada" ? "default" : "secondary"}>
                                {sesion.estado}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {sesion.tipo === "virtual" && (
                            <Link href={`/sesion/${sesion.id}`}>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Video className="h-4 w-4 mr-1" />
                                Iniciar
                              </Button>
                            </Link>
                          )}
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Días */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Días</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proximosDias.map((dia, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{dia.fecha}</p>
                          <p className="text-sm text-gray-600">{dia.sesiones} sesiones</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-600">Pacientes Activos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm text-gray-600">Sesiones Esta Semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.5</p>
                  <p className="text-sm text-gray-600">Horas Promedio/Día</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Video className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-gray-600">Sesiones Virtuales</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
