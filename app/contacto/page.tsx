import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PsiKit</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
            <p className="text-xl text-gray-600">
              Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo de soporte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información de Contacto */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>Múltiples formas de comunicarte con nosotros</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-gray-600">soporte@psikit.com</p>
                      <p className="text-xs text-gray-500">Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-sm text-gray-600">+54 11 1234-5678</p>
                      <p className="text-sm text-gray-600">Lun-Vie 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Oficina</h3>
                      <p className="text-sm text-gray-600">Av. Corrientes 1234</p>
                      <p className="text-sm text-gray-600">Buenos Aires, Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Horarios de Atención</h3>
                      <p className="text-sm text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                      <p className="text-sm text-gray-600">Sábados: 9:00 - 14:00</p>
                      <p className="text-xs text-gray-500">Soporte 24/7 para emergencias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Rápido */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">¿Cómo inicio una sesión?</h4>
                    <p className="text-xs text-gray-600">
                      Desde tu dashboard, haz clic en &quot;Iniciar Sesión&quot; o &quot;Unirse a Sesión&quot;
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">¿Problemas de conexión?</h4>
                    <p className="text-xs text-gray-600">Verifica tu conexión a internet y actualiza tu navegador</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">¿Cómo cambio mi contraseña?</h4>
                    <p className="text-xs text-gray-600">Ve a Configuración &gt; Seguridad en tu perfil</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de Contacto */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un Mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input id="nombre" placeholder="Tu nombre completo" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                        <Input id="telefono" type="tel" placeholder="+54 11 1234-5678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo de Usuario</Label>
                        <select
                          id="tipo"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="psicologo">Psicólogo</option>
                          <option value="paciente">Paciente</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="asunto">Asunto</Label>
                      <select
                        id="asunto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecciona el motivo de contacto</option>
                        <option value="soporte-tecnico">Soporte Técnico</option>
                        <option value="problemas-pago">Problemas de Pago</option>
                        <option value="problemas-sesion">Problemas con Sesiones</option>
                        <option value="sugerencia">Sugerencia o Mejora</option>
                        <option value="comercial">Consulta Comercial</option>
                        <option value="legal">Consulta Legal</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Describe tu consulta o problema en detalle..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="urgente" className="mt-1" />
                        <Label htmlFor="urgente" className="text-sm">
                          Marcar como urgente (problemas críticos que afectan el servicio)
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="newsletter" className="mt-1" />
                        <Label htmlFor="newsletter" className="text-sm">
                          Quiero recibir actualizaciones y noticias sobre PsiKit
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Soporte Adicional */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Soporte Adicional</CardTitle>
              <CardDescription>Otros recursos que pueden ayudarte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Centro de Ayuda</h3>
                  <p className="text-sm text-gray-600 mb-3">Encuentra respuestas a las preguntas más comunes</p>
                  <Button variant="outline" size="sm">
                    Ver Artículos
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Tutoriales en Video</h3>
                  <p className="text-sm text-gray-600 mb-3">Aprende a usar PsiKit paso a paso</p>
                  <Button variant="outline" size="sm">
                    Ver Videos
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Comunidad</h3>
                  <p className="text-sm text-gray-600 mb-3">Conecta con otros profesionales</p>
                  <Button variant="outline" size="sm">
                    Unirse
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
