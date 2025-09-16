import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Search, Plus, Play, Pause } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoSesionesPage() {
  const sesionesActivas = [
    { id: 1, paciente: "María González", estado: "en-curso", duracion: 25, inicioReal: "10:05" },
    { id: 2, paciente: "Carlos Rodríguez", estado: "esperando", duracion: 0, inicioReal: null },
  ]

  const proximasSesiones = [
    { id: 3, paciente: "Ana Martínez", hora: "14:00", estado: "confirmada" },
    { id: 4, paciente: "Luis Pérez", hora: "15:30", estado: "confirmada" },
  ]

  const historialSesiones = [
    { id: 5, paciente: "Pedro García", fecha: "15/01/2024", duracion: 50, estado: "completada" },
    { id: 6, paciente: "María González", fecha: "10/01/2024", duracion: 45, estado: "completada" },
    { id: 7, paciente: "Ana Martínez", fecha: "08/01/2024", duracion: 50, estado: "completada" },
  ]

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Sesiones</h1>
                <p className="text-gray-600">Administra tus sesiones virtuales y presenciales</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Sesión
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Sesiones Activas */}
            {sesionesActivas.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-green-600">Sesiones Activas</CardTitle>
                  <CardDescription>Sesiones en curso o esperando</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sesionesActivas.map((sesion) => (
                      <div
                        key={sesion.id}
                        className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                            {sesion.estado === "en-curso" ? (
                              <Play className="h-6 w-6 text-green-600" />
                            ) : (
                              <Pause className="h-6 w-6 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{sesion.paciente}</p>
                            <p className="text-sm text-gray-600">
                              {sesion.estado === "en-curso"
                                ? `En curso - ${sesion.duracion} min`
                                : "Paciente esperando"}
                            </p>
                            {sesion.inicioReal && (
                              <p className="text-xs text-gray-500">Iniciada: {sesion.inicioReal}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={sesion.estado === "en-curso" ? "default" : "secondary"}>
                            {sesion.estado}
                          </Badge>
                          <Link href={`/sesion/${sesion.id}`}>
                            <Button className="bg-green-600 hover:bg-green-700">
                              <Video className="h-4 w-4 mr-1" />
                              {sesion.estado === "en-curso" ? "Continuar" : "Iniciar"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximas Sesiones */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Sesiones</CardTitle>
                  <CardDescription>Sesiones programadas para hoy</CardDescription>
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
                            <p className="text-sm text-gray-600">{sesion.hora}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>{sesion.estado}</Badge>
                          <Link href={`/sesion/${sesion.id}`}>
                            <Button size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Historial Reciente */}
              <Card>
                <CardHeader>
                  <CardTitle>Historial Reciente</CardTitle>
                  <CardDescription>Sesiones completadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historialSesiones.map((sesion) => (
                      <div key={sesion.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{sesion.paciente}</p>
                          <p className="text-sm text-gray-600">
                            {sesion.fecha} - {sesion.duracion} min
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{sesion.estado}</Badge>
                      </div>
                    ))}
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
