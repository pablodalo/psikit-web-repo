import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Video, FileText, CreditCard, CheckCircle, X } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PacienteNotificacionesPage() {
  const notificaciones = [
    {
      id: 1,
      tipo: "sesion",
      titulo: "Recordatorio de sesión",
      mensaje: "Tu sesión con Dr. Roberto Silva es en 1 hora",
      fecha: "Hace 30 min",
      leida: false,
      urgencia: "alta",
      icono: Video,
    },
    {
      id: 2,
      tipo: "pago",
      titulo: "Pago procesado",
      mensaje: "Tu pago de $150 ha sido procesado exitosamente",
      fecha: "Hace 2 horas",
      leida: false,
      urgencia: "baja",
      icono: CreditCard,
    },
    {
      id: 3,
      tipo: "documento",
      titulo: "Test disponible",
      mensaje: "Tienes un nuevo test GAD-7 para completar",
      fecha: "Hace 1 día",
      leida: true,
      urgencia: "media",
      icono: FileText,
    },
    {
      id: 4,
      tipo: "sistema",
      titulo: "Sesión completada",
      mensaje: "Tu sesión del 15/01/2024 ha sido registrada",
      fecha: "Hace 2 días",
      leida: true,
      urgencia: "baja",
      icono: CheckCircle,
    },
  ]

  const noLeidas = notificaciones.filter((n) => !n.leida).length

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Notificaciones</h1>
                <p className="text-gray-600">
                  {noLeidas > 0 ? `${noLeidas} notificaciones sin leer` : "Todas las notificaciones están al día"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">Marcar todas como leídas</Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{notificaciones.length}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{noLeidas}</p>
                  <p className="text-sm text-gray-600">Sin leer</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{notificaciones.filter((n) => n.leida).length}</p>
                  <p className="text-sm text-gray-600">Leídas</p>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Notificaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Todas las Notificaciones</CardTitle>
                <CardDescription>Mantente al día con tus citas y actividades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificaciones.map((notif) => {
                    const IconComponent = notif.icono
                    return (
                      <div
                        key={notif.id}
                        className={`flex items-start space-x-4 p-4 border rounded-lg ${
                          !notif.leida ? "bg-blue-50 border-blue-200" : "bg-white"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            notif.urgencia === "alta"
                              ? "bg-red-100"
                              : notif.urgencia === "media"
                                ? "bg-orange-100"
                                : "bg-gray-100"
                          }`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${
                              notif.urgencia === "alta"
                                ? "text-red-600"
                                : notif.urgencia === "media"
                                  ? "text-orange-600"
                                  : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{notif.titulo}</p>
                              <p className="text-sm text-gray-600 mt-1">{notif.mensaje}</p>
                              <p className="text-xs text-gray-500 mt-2">{notif.fecha}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!notif.leida && (
                                <Badge variant="default" className="bg-blue-600">
                                  Nueva
                                </Badge>
                              )}
                              <Button size="sm" variant="ghost">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
