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
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-b border-green-200 dark:border-gray-600">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-green-900 dark:text-white">Mis Pagos</h1>
                <p className="text-green-700 dark:text-gray-300">Gestiona tus pagos y facturas</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Facturas
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-orange-700">Próximo Pago</p>
                      <p className="text-2xl font-bold text-orange-900">$150</p>
                      <p className="text-xs text-orange-600">Vence 20/01/2024</p>
                    </div>
                    <div className="ml-4 p-3 bg-orange-200 rounded-full">
                      <Clock className="h-6 w-6 text-orange-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-green-700">Total Pagado</p>
                      <p className="text-2xl font-bold text-green-900">$600</p>
                      <p className="text-xs text-green-600">Este mes</p>
                    </div>
                    <div className="ml-4 p-3 bg-green-200 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium text-blue-700">Método de Pago</p>
                      <p className="text-lg font-bold text-blue-900">Mercado Pago</p>
                      <p className="text-xs text-blue-600">Configurado</p>
                    </div>
                    <div className="ml-4 p-3 bg-blue-200 rounded-full">
                      <CreditCard className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Pagos Pendientes</CardTitle>
                  <CardDescription className="text-amber-700">Pagos que requieren tu atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pagosPendientes.map((pago) => (
                      <div
                        key={pago.id}
                        className="flex items-center justify-between p-4 bg-yellow-100/70 border border-yellow-200 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-200 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-yellow-700" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">${pago.monto}</p>
                            <p className="text-sm text-slate-600">{pago.descripcion}</p>
                            <p className="text-xs text-slate-500">Vence: {pago.fecha}</p>
                          </div>
                        </div>
                        <Button className="bg-yellow-600 hover:bg-yellow-700">Pagar Ahora</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Historial de Pagos</CardTitle>
                  <CardDescription className="text-green-700">Tus pagos completados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historialPagos.map((pago) => (
                      <div
                        key={pago.id}
                        className="flex items-center justify-between p-4 bg-white/70 border border-green-200 rounded-lg shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-slate-800">${pago.monto}</p>
                          <p className="text-sm text-slate-600">{pago.descripcion}</p>
                          <p className="text-xs text-slate-500">
                            {pago.fecha} - {pago.metodo}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-200 text-green-800 border-green-300">{pago.estado}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                          >
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
