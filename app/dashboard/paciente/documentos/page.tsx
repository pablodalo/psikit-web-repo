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
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Documentos</h1>
                <p className="text-gray-600">Accede a tus facturas, certificados y resultados</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Buscar documentos..." className="w-64" />
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Documento
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Documentos Pendientes */}
            {documentosPendientes.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-orange-600">Documentos Pendientes</CardTitle>
                  <CardDescription>Documentos que requieren tu atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentosPendientes.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                            <FileText className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.nombre}</p>
                            <p className="text-sm text-gray-600">{doc.descripcion}</p>
                            <p className="text-xs text-gray-500">Fecha límite: {doc.fechaLimite}</p>
                          </div>
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-700">Completar</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mis Documentos */}
            <Card>
              <CardHeader>
                <CardTitle>Mis Documentos</CardTitle>
                <CardDescription>Todos tus documentos disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentos.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{doc.nombre}</p>
                            <p className="text-xs text-gray-500">{doc.tamaño}</p>
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
                          className={doc.estado === "firmado" ? "bg-green-100 text-green-800" : ""}
                        >
                          {doc.estado}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600">{doc.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">{doc.fecha}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" className="flex-1">
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
