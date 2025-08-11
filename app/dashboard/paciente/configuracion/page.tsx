import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, CreditCard, Shield, Save } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PacienteConfiguracionPage() {
  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
              <p className="text-gray-600">Administra tu perfil y preferencias</p>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="perfil" className="space-y-6">
              <TabsList>
                <TabsTrigger value="perfil" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </TabsTrigger>
                <TabsTrigger value="notificaciones" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notificaciones</span>
                </TabsTrigger>
                <TabsTrigger value="pagos" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Pagos</span>
                </TabsTrigger>
                <TabsTrigger value="privacidad" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacidad</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="perfil">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información personal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input id="nombre" defaultValue="María González" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" defaultValue="+54 11 1234-5678" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="maria.gonzalez@ejemplo.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                        <Input id="fechaNacimiento" type="date" defaultValue="1990-05-15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactoEmergencia">Contacto de Emergencia</Label>
                        <Input id="contactoEmergencia" placeholder="Nombre y teléfono" />
                      </div>
                    </div>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notificaciones">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                    <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recordatorios de sesiones</p>
                        <p className="text-sm text-gray-600">Recibe recordatorios antes de cada sesión</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificaciones de pagos</p>
                        <p className="text-sm text-gray-600">Alertas sobre pagos pendientes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mensajes del psicólogo</p>
                        <p className="text-sm text-gray-600">Notificaciones de mensajes de tu psicólogo</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Tests y tareas</p>
                        <p className="text-sm text-gray-600">Recordatorios de tests y tareas pendientes</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pagos">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Pagos</CardTitle>
                    <CardDescription>Administra tus métodos de pago</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="metodoPago">Método de Pago Preferido</Label>
                      <Input id="metodoPago" defaultValue="Mercado Pago" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facturacion">Datos de Facturación</Label>
                      <Input id="facturacion" placeholder="CUIT/CUIL para facturación" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pagos automáticos</p>
                        <p className="text-sm text-gray-600">Autorizar pagos automáticos para sesiones</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacidad">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Privacidad</CardTitle>
                    <CardDescription>Controla la privacidad de tu información</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compartir datos para investigación</p>
                        <p className="text-sm text-gray-600">Permitir uso anónimo de datos para investigación</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Grabación de sesiones</p>
                        <p className="text-sm text-gray-600">
                          Permitir grabación de sesiones (solo con consentimiento)
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Comunicaciones de marketing</p>
                        <p className="text-sm text-gray-600">Recibir información sobre nuevas funcionalidades</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
