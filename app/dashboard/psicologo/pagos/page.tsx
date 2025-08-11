import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CreditCard, DollarSign, Download, Search, AlertTriangle, CheckCircle } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoPagosPage() {
  const pagosPendientes = [
    { id: 1, paciente: "María González", monto: 150, fecha: "20/01/2024", sesiones: 1, estado: "pendiente" },
    { id: 2, paciente: "Carlos Rodríguez", monto: 300, fecha: "18/01/2024", sesiones: 2, estado: "vencido" },
    { id: 3, paciente: "Ana Martínez", monto: 150, fecha: "22/01/2024", sesiones: 1, estado: "pendiente" },
  ]

  const historialPagos = [
    { id: 1, paciente: "Luis Pérez", monto: 150, fecha: "15/01/2024", metodo: "Mercado Pago", estado: "completado" },
    {
      id: 2,
      paciente: "María González",
      monto: 150,
      fecha: "10/01/2024",
      metodo: "Transferencia",
      estado: "completado",
    },
    { id: 3, paciente: "Ana Martínez", monto: 300, fecha: "08/01/2024", metodo: "Mercado Pago", estado: "completado" },
  ]

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Pagos</h1>
                <p className="text-gray-600">Administra los pagos de tus pacientes</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Configurar Pagos
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ingresos del Mes</p>
                      <p className="text-2xl font-bold text-green-600">$2,450</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pagos Pendientes</p>
                      <p className="text-2xl font-bold text-orange-600">$600</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pagos Completados</p>
                      <p className="text-2xl font-bold text-blue-600">18</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tasa de Cobro</p>
                      <p className="text-2xl font-bold text-purple-600">92%</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pagos Pendientes */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pagos Pendientes</CardTitle>
                    <Badge variant="destructive">3 pendientes</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pagosPendientes.map((pago) => (
                      <div key={pago.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{pago.paciente}</p>
                          <p className="text-sm text-gray-600">
                            ${pago.monto} - {pago.sesiones} sesión(es)
                          </p>
                          <p className="text-xs text-gray-500">Vence: {pago.fecha}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={pago.estado === "vencido" ? "destructive" : "secondary"}>{pago.estado}</Badge>
                          <Button size="sm">Enviar Recordatorio</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Historial de Pagos */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Historial de Pagos</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Buscar..." className="w-32" />
                      <Button size="sm" variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historialPagos.map((pago) => (
                      <div key={pago.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{pago.paciente}</p>
                          <p className="text-sm text-gray-600">
                            ${pago.monto} - {pago.metodo}
                          </p>
                          <p className="text-xs text-gray-500">{pago.fecha}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">{pago.estado}</Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
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
