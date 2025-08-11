import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, MapPin, Phone, Mail, Calendar, Heart, Edit } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PacientePerfilPage() {
  const estadisticas = [
    { label: "Sesiones Completadas", valor: "12", icono: Calendar },
    { label: "Meses en Terapia", valor: "3", icono: Heart },
    { label: "Tests Completados", valor: "5", icono: User },
  ]

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Administra tu información personal</p>
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
                  <CardDescription>Tu información personal y de contacto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-6 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl">MG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">María González</h2>
                      <p className="text-gray-600 mb-2">Paciente</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Miembro desde Enero 2024
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Buenos Aires, Argentina
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Badge className="bg-green-100 text-green-800">Activo</Badge>
                        <Badge variant="secondary">Plan Profesional</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">maria.gonzalez@ejemplo.com</span>
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
                        <Label className="text-sm font-medium text-gray-700">Fecha de Nacimiento</Label>
                        <p className="text-sm mt-1">15 de Mayo, 1990</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Contacto de Emergencia</Label>
                        <p className="text-sm mt-1">Juan González - +54 11 9876-5432</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card>
                <CardHeader>
                  <CardTitle>Mi Progreso</CardTitle>
                  <CardDescription>Tu progreso en terapia</CardDescription>
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

            {/* Mi Psicólogo */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Mi Psicólogo</CardTitle>
                <CardDescription>Información de tu profesional asignado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Dr. Roberto Silva</h3>
                    <p className="text-gray-600">Psicólogo Clínico - Matrícula 12345</p>
                    <p className="text-sm text-gray-500">Especialista en Terapia Cognitivo-Conductual</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge>8 años de experiencia</Badge>
                      <Badge variant="secondary">Calificación: 4.9/5</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Próxima sesión</p>
                    <p className="font-medium">Hoy 15:00</p>
                    <Button size="sm" className="mt-2">
                      Contactar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferencias */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Preferencias de Sesión</CardTitle>
                <CardDescription>Configura tus preferencias para las sesiones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recordatorios">Recordatorios (minutos antes)</Label>
                      <Input id="recordatorios" defaultValue="30" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="duracionPreferida">Duración preferida (minutos)</Label>
                      <Input id="duracionPreferida" defaultValue="50" type="number" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="horarioPreferido">Horario preferido</Label>
                      <Input id="horarioPreferido" defaultValue="Tarde (14:00 - 18:00)" />
                    </div>
                    <div>
                      <Label htmlFor="modalidad">Modalidad preferida</Label>
                      <Input id="modalidad" defaultValue="Virtual" />
                    </div>
                  </div>
                </div>
                <Button className="mt-6">Guardar Preferencias</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
