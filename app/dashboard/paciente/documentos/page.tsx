import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Upload, Eye } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PacienteDocumentosPage() {
  const documentos = [
    {
      id: 1,
      tipo: "Factura",
      nombre: "Factura-001-2024.pdf",
      fecha: "15/01/2024",
      descripcion: "Sesión de terapia",
      estado: "disponible",
      tamaño: "245 KB",
    },
    {
      id: 2,
      tipo: "Certificado",
      nombre: "Certificado-Medico.pdf",
      fecha: "10/01/2024",
      descripcion: "Certificado médico",
      estado: "disponible",
      tamaño: "180 KB",
    },
    {
      id: 3,
      tipo: "Test",
      nombre: "PHQ9-Resultados.pdf",
      fecha: "08/01/2024",
      descripcion: "PHQ-9 - Resultados",
      estado: "completado",
      tamaño: "320 KB",
    },
    {
      id: 4,
      tipo: "Consentimiento",
      nombre: "Consentimiento-Informado.pdf",
      fecha: "05/01/2024",
      descripcion: "Consentimiento informado firmado",
      estado: "firmado",
      tamaño: "156 KB",
    },
  ]

  const documentosPendientes = [
    {
      id: 1,
      tipo: "Test",
      nombre: "GAD-7 - Ansiedad",
      descripcion: "Test de ansiedad pendiente",
      fechaLimite: "25/01/2024",
    },
    {
      id: 2,
      tipo: "Formulario",
      nombre: "Actualización de datos",
      descripcion: "Actualizar información personal",
      fechaLimite: "30/01/2024",
    },
  ]

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 border-b border-purple-200 dark:border-gray-600">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-purple-900 dark:text-white">Mis Documentos</h1>
                <p className="text-purple-700 dark:text-gray-300">Accede a tus facturas, certificados y resultados</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Buscar documentos..." className="w-64 border-purple-200" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Documento
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {documentosPendientes.length > 0 && (
              <Card className="mb-6 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Documentos Pendientes</CardTitle>
                  <CardDescription className="text-amber-700">Documentos que requieren tu atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentosPendientes.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-yellow-100/70 border border-yellow-200 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-yellow-200 rounded-full">
                            <FileText className="h-5 w-5 text-yellow-700" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{doc.nombre}</p>
                            <p className="text-sm text-slate-600">{doc.descripcion}</p>
                            <p className="text-xs text-slate-500">Fecha límite: {doc.fechaLimite}</p>
                          </div>
                        </div>
                        <Button className="bg-yellow-600 hover:bg-yellow-700">Completar</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Mis Documentos</CardTitle>
                <CardDescription className="text-purple-700">Todos tus documentos disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentos.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white/70 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-lg">
                            <FileText className="h-5 w-5 text-purple-700" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-slate-800">{doc.nombre}</p>
                            <p className="text-xs text-slate-500">{doc.tamaño}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            doc.estado === "disponible"
                              ? "default"
                              : doc.estado === "completado"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            doc.estado === "firmado"
                              ? "bg-green-200 text-green-800 border-green-300"
                              : doc.estado === "disponible"
                                ? "bg-purple-200 text-purple-800 border-purple-300"
                                : ""
                          }
                        >
                          {doc.estado}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-slate-600">{doc.descripcion}</p>
                        <p className="text-xs text-slate-500 mt-1">{doc.fecha}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                          <Download className="h-4 w-4 mr-1" />
                          Descargar
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
    </AuthGuard>
  )
}
