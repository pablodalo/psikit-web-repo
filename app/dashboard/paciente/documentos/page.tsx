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
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Documentos</h1>
                <p className="text-gray-600 dark:text-gray-300">Accede a tus facturas, certificados y resultados</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Buscar documentos..." className="w-64 border-gray-300 dark:border-gray-600" />
                  <Button size="sm" variant="outline" className="bg-transparent dark:border-gray-600">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="bg-transparent dark:border-gray-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Documento
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {documentosPendientes.length > 0 && (
              <Card className="mb-6 border-0 shadow-sm dark:bg-gray-800 dark:text-white">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Documentos Pendientes</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Documentos que requieren tu atención
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentosPendientes.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-gray-700 rounded-full">
                            <FileText className="h-5 w-5 text-orange-600 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{doc.nombre}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{doc.descripcion}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Fecha límite: {doc.fechaLimite}</p>
                          </div>
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-gray-700 dark:hover:bg-gray-800">
                          Completar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-sm dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Mis Documentos</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Todos tus documentos disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentos.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-gray-700 rounded-lg">
                            <FileText className="h-5 w-5 text-purple-600 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{doc.nombre}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300">{doc.tamaño}</p>
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
                        >
                          {doc.estado}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{doc.descripcion}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{doc.fecha}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent dark:border-gray-600">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                        >
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
