import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, CreditCard, Shield, Save } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoConfiguracionPage() {
  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
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
                    <CardDescription>Actualiza tu información profesional</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input id="nombre" defaultValue="Dr. Roberto Silva" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="matricula">Matrícula</Label>
                        <Input id="matricula" defaultValue="12345" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="especialidad">Especialidad</Label>
                      <Input id="especialidad" defaultValue="Psicología Clínica" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biografia">Biografía</Label>
                      <Textarea
                        id="biografia"
                        placeholder="Describe tu experiencia y enfoque terapéutico..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" defaultValue="+54 11 1234-5678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="roberto.silva@ejemplo.com" />
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
                        <p className="text-sm text-gray-600">Alertas sobre pagos pendientes y completados</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nuevos pacientes</p>
                        <p className="text-sm text-gray-600">Notificaciones cuando un nuevo paciente se registra</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Actualizaciones del sistema</p>
                        <p className="text-sm text-gray-600">Información sobre nuevas funcionalidades</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pagos">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Pagos</CardTitle>
                    <CardDescription>Administra tus métodos de cobro</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="tarifa">Tarifa por Sesión</Label>
                      <Input id="tarifa" defaultValue="150" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mercadopago">Mercado Pago</Label>
                      <Input id="mercadopago" placeholder="Tu usuario de Mercado Pago" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cbu">CBU/CVU</Label>
                      <Input id="cbu" placeholder="Para transferencias bancarias" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recordatorios automáticos</p>
                        <p className="text-sm text-gray-600">Enviar recordatorios de pago automáticamente</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacidad">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Privacidad</CardTitle>
                    <CardDescription>Controla la visibilidad de tu perfil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Perfil público</p>
                        <p className="text-sm text-gray-600">Aparecer en el directorio de profesionales</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mostrar especialidad</p>
                        <p className="text-sm text-gray-600">Mostrar tu especialidad en el perfil público</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Permitir nuevos pacientes</p>
                        <p className="text-sm text-gray-600">Aceptar solicitudes de nuevos pacientes</p>
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
