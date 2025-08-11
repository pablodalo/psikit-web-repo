import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PacientePagosPage() {
  const pagosPendientes = [
    { id: 1, monto: 150, fecha: "20/01/2024", descripcion: "Sesión de terapia", estado: "pendiente" },
  ]

  const historialPagos = [
    {
      id: 1,
      monto: 150,
      fecha: "15/01/2024",
      descripcion: "Sesión de terapia",
      metodo: "Mercado Pago",
      estado: "completado",
    },
    {
      id: 2,
      monto: 150,
      fecha: "10/01/2024",
      descripcion: "Sesión de terapia",
      metodo: "Transferencia",
      estado: "completado",
    },
    {
      id: 3,
      monto: 300,
      fecha: "08/01/2024",
      descripcion: "2 Sesiones de terapia",
      metodo: "Mercado Pago",
      estado: "completado",
    },
  ]

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Pagos</h1>
                <p className="text-gray-600">Gestiona tus pagos y facturas</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Facturas
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Estado de Pagos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Próximo Pago</p>
                      <p className="text-2xl font-bold text-orange-600">$150</p>
                      <p className="text-xs text-gray-500">Vence 20/01/2024</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Pagado</p>
                      <p className="text-2xl font-bold text-green-600">$600</p>
                      <p className="text-xs text-gray-500">Este mes</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Método de Pago</p>
                      <p className="text-lg font-bold text-blue-600">Mercado Pago</p>
                      <p className="text-xs text-gray-500">Configurado</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pagos Pendientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Pagos Pendientes</CardTitle>
                  <CardDescription>Pagos que requieren tu atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pagosPendientes.map((pago) => (
                      <div
                        key={pago.id}
                        className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-6 w-6 text-orange-600" />
                          <div>
                            <p className="font-medium">${pago.monto}</p>
                            <p className="text-sm text-gray-600">{pago.descripcion}</p>
                            <p className="text-xs text-gray-500">Vence: {pago.fecha}</p>
                          </div>
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-700">Pagar Ahora</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Historial de Pagos */}
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Pagos</CardTitle>
                  <CardDescription>Tus pagos completados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historialPagos.map((pago) => (
                      <div key={pago.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">${pago.monto}</p>
                          <p className="text-sm text-gray-600">{pago.descripcion}</p>
                          <p className="text-xs text-gray-500">
                            {pago.fecha} - {pago.metodo}
                          </p>
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
