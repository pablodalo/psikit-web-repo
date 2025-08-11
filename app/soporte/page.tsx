import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain, ArrowLeft, Search, HelpCircle, Video, FileText, MessageCircle, Phone } from "lucide-react"

export default function SoportePage() {
  const categorias = [
    {
      titulo: "Problemas Técnicos",
      descripcion: "Conexión, audio, video y otros problemas técnicos",
      icono: Video,
      articulos: [
        "No puedo conectarme a la sesión",
        "Problemas de audio o video",
        "La plataforma se ve lenta",
        "Error al cargar la página",
      ],
    },
    {
      titulo: "Gestión de Cuenta",
      descripcion: "Registro, perfil, configuración y seguridad",
      icono: FileText,
      articulos: [
        "Cómo cambiar mi contraseña",
        "Actualizar información del perfil",
        "Configurar notificaciones",
        "Eliminar mi cuenta",
      ],
    },
    {
      titulo: "Pagos y Facturación",
      descripcion: "Métodos de pago, facturas y suscripciones",
      icono: MessageCircle,
      articulos: [
        "Configurar método de pago",
        "Descargar facturas",
        "Cambiar plan de suscripción",
        "Reembolsos y cancelaciones",
      ],
    },
  ]

  const preguntasFrecuentes = [
    {
      pregunta: "¿Cómo inicio mi primera sesión?",
      respuesta:
        "Desde tu dashboard, busca la sección 'Próximas Sesiones' y haz clic en 'Iniciar' o 'Unirse' cuando sea el momento de tu cita.",
    },
    {
      pregunta: "¿Qué hago si tengo problemas de conexión?",
      respuesta:
        "Verifica tu conexión a internet, cierra otras aplicaciones que usen ancho de banda y actualiza tu navegador. Si el problema persiste, contáctanos.",
    },
    {
      pregunta: "¿Puedo grabar las sesiones?",
      respuesta:
        "Las grabaciones solo están disponibles con el consentimiento explícito de ambas partes y siguiendo las regulaciones de privacidad aplicables.",
    },
    {
      pregunta: "¿Cómo cambio mi plan de suscripción?",
      respuesta:
        "Ve a Configuración > Suscripción en tu perfil. Puedes cambiar tu plan en cualquier momento y los cambios se aplicarán en el próximo ciclo de facturación.",
    },
  ]

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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Soporte</h1>
            <p className="text-xl text-gray-600 mb-8">
              Encuentra respuestas rápidas a tus preguntas o contacta con nuestro equipo
            </p>

            {/* Búsqueda */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Busca en nuestro centro de ayuda..." className="pl-10 pr-4 py-3 text-lg" />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Buscar</Button>
              </div>
            </div>
          </div>

          {/* Contacto Rápido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Soporte Telefónico</h3>
                <p className="text-gray-600 mb-4">Habla directamente con nuestro equipo</p>
                <Button variant="outline">+54 11 1234-5678</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chat en Vivo</h3>
                <p className="text-gray-600 mb-4">Respuesta inmediata a tus consultas</p>
                <Button>Iniciar Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enviar Ticket</h3>
                <p className="text-gray-600 mb-4">Describe tu problema en detalle</p>
                <Link href="/contacto">
                  <Button variant="outline">Crear Ticket</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Categorías de Ayuda */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Categorías de Ayuda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categorias.map((categoria, index) => {
                const IconComponent = categoria.icono
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{categoria.titulo}</CardTitle>
                          <CardDescription>{categoria.descripcion}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {categoria.articulos.map((articulo, idx) => (
                          <li key={idx}>
                            <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                              {articulo}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        Ver Todos los Artículos
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Preguntas Frecuentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Preguntas Frecuentes</CardTitle>
              <CardDescription>Las consultas más comunes de nuestros usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {preguntasFrecuentes.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.pregunta}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.respuesta}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">¿No encontraste lo que buscabas?</p>
                <Link href="/contacto">
                  <Button>Contactar Soporte</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Estado del Sistema */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>Monitoreo en tiempo real de nuestros servicios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Plataforma Web</p>
                    <p className="text-sm text-gray-600">Operativo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Video Llamadas</p>
                    <p className="text-sm text-gray-600">Operativo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Pagos</p>
                    <p className="text-sm text-gray-600">Operativo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Base de Datos</p>
                    <p className="text-sm text-gray-600">Operativo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
