import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, FileText, Calendar, Phone, Mail, MoreHorizontal, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PacientesPage() {
  const pacientes = [
    {
      id: 1,
      nombre: "María González",
      edad: 28,
      telefono: "+54 11 1234-5678",
      email: "maria.gonzalez@email.com",
      ultimaSesion: "15/01/2024",
      proximaSesion: "22/01/2024",
      estado: "activo",
      modalidad: "virtual",
      sesionesTotal: 12,
      pagosPendientes: 0,
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      edad: 35,
      telefono: "+54 11 2345-6789",
      email: "carlos.rodriguez@email.com",
      ultimaSesion: "14/01/2024",
      proximaSesion: "21/01/2024",
      estado: "activo",
      modalidad: "presencial",
      sesionesTotal: 8,
      pagosPendientes: 1,
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      edad: 42,
      telefono: "+54 11 3456-7890",
      email: "ana.martinez@email.com",
      ultimaSesion: "13/01/2024",
      proximaSesion: "20/01/2024",
      estado: "activo",
      modalidad: "mixta",
      sesionesTotal: 15,
      pagosPendientes: 0,
    },
    {
      id: 4,
      nombre: "Juan Pérez",
      edad: 29,
      telefono: "+54 11 4567-8901",
      email: "juan.perez@email.com",
      ultimaSesion: "10/01/2024",
      proximaSesion: "17/01/2024",
      estado: "inactivo",
      modalidad: "virtual",
      sesionesTotal: 6,
      pagosPendientes: 2,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Gestión de Pacientes</h1>
              <p className="text-gray-600">Administra la información de tus pacientes</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Paciente
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filtros y Búsqueda */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar pacientes por nombre, email o teléfono..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline">Exportar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21</div>
              <p className="text-xs text-muted-foreground">87.5% del total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sesiones Programadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-xs text-muted-foreground">$450 total</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Pacientes */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
            <CardDescription>Información detallada de todos tus pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                      <AvatarFallback>
                        {paciente.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{paciente.nombre}</h3>
                        <Badge variant={paciente.estado === "activo" ? "default" : "secondary"}>
                          {paciente.estado}
                        </Badge>
                        {paciente.pagosPendientes > 0 && (
                          <Badge variant="destructive">
                            {paciente.pagosPendientes} pago{paciente.pagosPendientes > 1 ? "s" : ""} pendiente
                            {paciente.pagosPendientes > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{paciente.edad} años</span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {paciente.telefono}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {paciente.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>Modalidad: {paciente.modalidad}</span>
                        <span>Sesiones: {paciente.sesionesTotal}</span>
                        <span>Última: {paciente.ultimaSesion}</span>
                        <span>Próxima: {paciente.proximaSesion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Historia
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                        <DropdownMenuItem>Editar información</DropdownMenuItem>
                        <DropdownMenuItem>Enviar test</DropdownMenuItem>
                        <DropdownMenuItem>Generar factura</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Desactivar paciente</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
