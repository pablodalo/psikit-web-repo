"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  CreditCard,
  Download,
  Search,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Send,
  BarChart3,
} from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoPagosPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
    {
      id: 4,
      paciente: "Carlos Rodríguez",
      monto: 150,
      fecha: "05/01/2024",
      metodo: "Mercado Pago",
      estado: "completado",
    },
    { id: 5, paciente: "Carmen López", monto: 200, fecha: "03/01/2024", metodo: "Transferencia", estado: "completado" },
  ]

  const filteredHistorial = useMemo(() => {
    if (!searchTerm.trim()) return historialPagos

    const searchLower = searchTerm.toLowerCase()
    return historialPagos.filter(
      (pago) => pago.paciente.toLowerCase().includes(searchLower) || pago.metodo.toLowerCase().includes(searchLower),
    )
  }, [searchTerm])

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex min-h-screen bg-gray-50">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
                  <p className="text-gray-600 mt-1">Administra los pagos de tus pacientes</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configurar Pagos
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar pagos..."
                  className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Estadísticas de Pagos
                </CardTitle>
                <CardDescription>Resumen financiero del mes actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center space-y-2 p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$2,450</div>
                    <p className="text-sm font-medium text-gray-900">Ingresos del Mes</p>
                    <p className="text-xs text-gray-500">+12% vs mes anterior</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">$600</div>
                    <p className="text-sm font-medium text-gray-900">Pagos Pendientes</p>
                    <p className="text-xs text-gray-500">3 pacientes</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">18</div>
                    <p className="text-sm font-medium text-gray-900">Pagos Completados</p>
                    <p className="text-xs text-gray-500">Este mes</p>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <p className="text-sm font-medium text-gray-900">Tasa de Cobro</p>
                    <p className="text-xs text-gray-500">Excelente rendimiento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Pagos Pendientes
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Requieren seguimiento y gestión</p>
                </div>
                <Badge variant="destructive" className="text-sm">
                  {pagosPendientes.length} pendientes
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pagosPendientes.map((pago) => (
                  <Card key={pago.id} className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{pago.paciente}</h4>
                          <p className="text-sm text-gray-600">
                            ${pago.monto} - {pago.sesiones} sesión(es)
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              pago.estado === "vencido"
                                ? "border-red-200 text-red-800 bg-red-50"
                                : "border-orange-200 text-orange-800 bg-orange-50"
                            }`}
                          >
                            {pago.estado}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">Vence: {pago.fecha}</p>
                        <Button size="sm" className="w-full h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white">
                          <Send className="h-3 w-3 mr-1" />
                          Enviar Recordatorio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Historial de Pagos
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {searchTerm
                      ? `${filteredHistorial.length} pago${filteredHistorial.length !== 1 ? "s" : ""} encontrado${filteredHistorial.length !== 1 ? "s" : ""}`
                      : "Pagos completados exitosamente"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-700 border-green-300 hover:bg-green-50 bg-transparent"
                >
                  Ver todos
                </Button>
              </div>

              {filteredHistorial.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pagos</h3>
                  <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHistorial.map((pago) => (
                    <Card key={pago.id} className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{pago.paciente}</h4>
                            <p className="text-sm text-gray-600">
                              ${pago.monto} - {pago.metodo}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <Badge variant="outline" className="text-xs border-green-200 text-green-800 bg-green-50">
                              {pago.estado}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-gray-500">Fecha: {pago.fecha}</p>
                          <Button size="sm" variant="outline" className="w-full h-8 text-xs bg-transparent">
                            <Download className="h-3 w-3 mr-1" />
                            Descargar Recibo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
