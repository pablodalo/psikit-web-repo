import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, MapPin, Phone, Mail, Calendar, Award, Star, Edit } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoPerfilPage() {
  const estadisticas = [
    { label: "Pacientes Activos", valor: "24", icono: User },
    { label: "Sesiones Completadas", valor: "156", icono: Calendar },
    { label: "Años de Experiencia", valor: "8", icono: Award },
    { label: "Calificación Promedio", valor: "4.9", icono: Star },
  ]

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Administra tu información profesional</p>
              </div>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información Principal */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Tu información profesional y de contacto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-6 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl">RS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">Dr. Roberto Silva</h2>
                      <p className="text-gray-600 mb-2">Psicólogo Clínico</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          Matrícula: 12345
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Buenos Aires, Argentina
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Badge>Psicología Clínica</Badge>
                        <Badge variant="secondary">Terapia Cognitivo-Conductual</Badge>
                        <Badge variant="outline">Adultos</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">roberto.silva@ejemplo.com</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Teléfono</Label>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">+54 11 1234-5678</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Especialidad</Label>
                        <p className="text-sm mt-1">Psicología Clínica</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Años de Experiencia</Label>
                        <p className="text-sm mt-1">8 años</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm font-medium text-gray-700">Biografía</Label>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      Psicólogo clínico especializado en terapia cognitivo-conductual con más de 8 años de experiencia.
                      Me enfoco en el tratamiento de ansiedad, depresión y trastornos del estado de ánimo. Creo
                      firmemente en un enfoque colaborativo y centrado en el paciente para lograr resultados duraderos.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                  <CardDescription>Tu desempeño profesional</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {estadisticas.map((stat, index) => {
                      const IconComponent = stat.icono
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{stat.valor}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Horarios de Atención */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Horarios de Atención</CardTitle>
                <CardDescription>Configura tus horarios disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Días de la Semana</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Lunes</span>
                        <span className="text-sm text-gray-600">09:00 - 17:00</span>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Martes</span>
                        <span className="text-sm text-gray-600">09:00 - 17:00</span>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Miércoles</span>
                        <span className="text-sm text-gray-600">09:00 - 17:00</span>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Jueves</span>
                        <span className="text-sm text-gray-600">09:00 - 17:00</span>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">Viernes</span>
                        <span className="text-sm text-gray-600">09:00 - 15:00</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Configuración</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="duracion">Duración de sesión (minutos)</Label>
                        <Input id="duracion" defaultValue="50" type="number" />
                      </div>
                      <div>
                        <Label htmlFor="descanso">Tiempo entre sesiones (minutos)</Label>
                        <Input id="descanso" defaultValue="10" type="number" />
                      </div>
                      <Button className="w-full">Actualizar Horarios</Button>
                    </div>
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
