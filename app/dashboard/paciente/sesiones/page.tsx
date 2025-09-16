import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PacienteSesionesPage() {
  const proximasSesiones = [
    { id: 1, fecha: "Hoy", hora: "15:00", profesional: "Dr. Roberto Silva", estado: "confirmada", puedeIngresar: true },
    {
      id: 2,
      fecha: "Miércoles",
      hora: "15:00",
      profesional: "Dr. Roberto Silva",
      estado: "confirmada",
      puedeIngresar: false,
    },
  ]

  const historialSesiones = [
    { id: 3, fecha: "15/01/2024", hora: "15:00", duracion: 50, estado: "completada", notas: "Sesión de seguimiento" },
    { id: 4, fecha: "10/01/2024", hora: "15:00", duracion: 50, estado: "completada", notas: "Primera sesión" },
    { id: 5, fecha: "08/01/2024", hora: "15:00", duracion: 50, estado: "completada", notas: "Evaluación inicial" },
  ]

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Sesiones</h1>
                <p className="text-gray-600">Gestiona tus citas de terapia</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Calendario
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximas Sesiones */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Sesiones</CardTitle>
                  <CardDescription>Tus citas programadas</CardDescription>
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
                            <p className="font-medium">
                              {sesion.fecha} - {sesion.hora}
                            </p>
                            <p className="text-sm text-gray-600">{sesion.profesional}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={sesion.estado === "confirmada" ? "default" : "secondary"}>
                            {sesion.estado}
                          </Badge>
                          {sesion.fecha === "Hoy" && sesion.puedeIngresar && (
                            <Link href={`/sala-espera/${sesion.id}`}>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Video className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Historial de Sesiones */}
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Sesiones</CardTitle>
                  <CardDescription>Sesiones completadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historialSesiones.map((sesion) => (
                      <div key={sesion.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {sesion.fecha} - {sesion.hora}
                            </p>
                            <p className="text-sm text-gray-600">{sesion.duracion} minutos</p>
                            <p className="text-xs text-gray-500">{sesion.notas}</p>
                          </div>
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
