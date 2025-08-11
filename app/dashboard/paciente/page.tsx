import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Video, FileText, CreditCard, Bell, Clock, Download, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PacienteDashboard() {
  const proximasSesiones = [
    { id: 1, fecha: "Hoy", hora: "15:00", profesional: "Dr. Roberto Silva", estado: "confirmada", puedeIngresar: true },
    {
      id: 2,
      fecha: "Mañana",
      hora: "10:00",
      profesional: "Dr. Roberto Silva",
      estado: "confirmada",
      puedeIngresar: false,
    },
    {
      id: 3,
      fecha: "Viernes",
      hora: "15:00",
      profesional: "Dr. Roberto Silva",
      estado: "pendiente",
      puedeIngresar: false,
    },
  ]

  const documentos = [
    { tipo: "Factura", fecha: "15/01/2024", descripcion: "Sesión de terapia", estado: "disponible" },
    { tipo: "Certificado", fecha: "10/01/2024", descripcion: "Certificado médico", estado: "disponible" },
    { tipo: "Test", fecha: "08/01/2024", descripcion: "PHQ-9 - Resultados", estado: "completado" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">María González</h1>
              <p className="text-sm text-gray-600">Paciente desde Enero 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </Button>
            <Link href="/sala-espera/1">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Video className="h-4 w-4 mr-2" />
                Unirse a Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Información del Profesional */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tu Psicólogo</CardTitle>
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
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">Activo</Badge>
                <p className="text-sm text-gray-500 mt-1">Próxima sesión: Hoy 15:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Próximas Sesiones */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mis Próximas Sesiones</CardTitle>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Calendario
                </Button>
              </div>
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
                      <Badge variant={sesion.estado === "confirmada" ? "default" : "secondary"}>{sesion.estado}</Badge>
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

          {/* Estado de Pagos */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Último Pago</p>
                    <p className="text-sm text-green-600">$150 - 15/01/2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Pagado</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-medium text-orange-800">Próximo Pago</p>
                    <p className="text-sm text-orange-600">$150 - Vence 20/01/2024</p>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Pagar Ahora
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Ver Historial de Pagos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentos y Tests */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Mis Documentos y Tests</CardTitle>
              <CardDescription>Descarga tus facturas, certificados y resultados de tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {documentos.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.tipo}</p>
                        <p className="text-sm text-gray-600">{doc.fecha}</p>
                        <p className="text-xs text-gray-500">{doc.descripcion}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tareas Pendientes */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tareas y Tests Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="font-medium">Test GAD-7 - Ansiedad</p>
                      <p className="text-sm text-gray-600">Asignado el 16/01/2024</p>
                    </div>
                  </div>
                  <Button size="sm">Completar Test</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Ejercicio de Relajación</p>
                      <p className="text-sm text-gray-600">Para completar antes de la próxima sesión</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
