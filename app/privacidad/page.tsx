import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft, Shield, Lock, Eye } from "lucide-react"

export default function PrivacidadPage() {
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
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Política de Privacidad</CardTitle>
            <p className="text-center text-gray-600 mt-2">Última actualización: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Protección Total</h3>
                <p className="text-sm text-gray-600">Tus datos están protegidos con los más altos estándares</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Lock className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Encriptación</h3>
                <p className="text-sm text-gray-600">Toda la información se transmite de forma encriptada</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Eye className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Transparencia</h3>
                <p className="text-sm text-gray-600">Control total sobre tus datos personales</p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En PsiKit recopilamos diferentes tipos de información para brindar y mejorar nuestros servicios:
                </p>

                <h3 className="text-xl font-medium mb-3">Información Personal</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Nombre completo, email y número de teléfono</li>
                  <li>Información profesional (para psicólogos): matrícula, especialidad, experiencia</li>
                  <li>Información de facturación y pago</li>
                  <li>Fotografía de perfil (opcional)</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Información de Salud</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Historias clínicas y notas de sesiones</li>
                  <li>Resultados de tests psicológicos</li>
                  <li>Grabaciones de sesiones (solo con consentimiento explícito)</li>
                  <li>Información médica relevante para el tratamiento</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Información Técnica</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Dirección IP y datos de ubicación</li>
                  <li>Información del dispositivo y navegador</li>
                  <li>Logs de actividad en la plataforma</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Cómo Utilizamos su Información</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos la información recopilada para los siguientes propósitos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Facilitar sesiones de terapia y comunicación entre profesionales y pacientes</li>
                  <li>Mantener historias clínicas digitales seguras y accesibles</li>
                  <li>Procesar pagos y generar facturas</li>
                  <li>Mejorar la calidad y funcionalidad de nuestros servicios</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                  <li>Enviar notificaciones importantes sobre el servicio</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Protección de Datos de Salud</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Reconocemos la naturaleza especialmente sensible de los datos de salud mental y implementamos
                  protecciones adicionales:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Encriptación end-to-end para todas las comunicaciones</li>
                  <li>Acceso restringido solo a personal autorizado</li>
                  <li>Auditorías regulares de seguridad</li>
                  <li>Cumplimiento con estándares internacionales de protección de datos de salud</li>
                  <li>Servidores ubicados en jurisdicciones con fuertes leyes de privacidad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Compartir Información</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  No vendemos, alquilamos o compartimos su información personal con terceros, excepto en las siguientes
                  circunstancias limitadas:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Con su consentimiento explícito</li>
                  <li>Entre profesionales de la salud involucrados en su tratamiento (con su autorización)</li>
                  <li>
                    Con proveedores de servicios que nos ayudan a operar la plataforma (bajo estrictos acuerdos de
                    confidencialidad)
                  </li>
                  <li>Cuando sea requerido por ley o para proteger la seguridad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Sus Derechos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Usted tiene los siguientes derechos sobre su información personal:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Acceso:</strong> Solicitar una copia de toda la información que tenemos sobre usted
                  </li>
                  <li>
                    <strong>Rectificación:</strong> Corregir información inexacta o incompleta
                  </li>
                  <li>
                    <strong>Eliminación:</strong> Solicitar la eliminación de su información (sujeto a obligaciones
                    legales)
                  </li>
                  <li>
                    <strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado y legible
                  </li>
                  <li>
                    <strong>Restricción:</strong> Limitar el procesamiento de su información en ciertas circunstancias
                  </li>
                  <li>
                    <strong>Oposición:</strong> Oponerse al procesamiento de sus datos para ciertos fines
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Retención de Datos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Conservamos su información personal solo durante el tiempo necesario para cumplir con los fines para
                  los cuales fue recopilada, incluyendo requisitos legales, contables o de informes. Los datos de salud
                  se conservan según las regulaciones profesionales aplicables, típicamente entre 7-10 años después del
                  último contacto.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Seguridad</h2>
                <p className="text-gray-700 leading-relaxed">
                  Implementamos medidas de seguridad técnicas, administrativas y físicas apropiadas para proteger su
                  información personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye
                  encriptación, firewalls, controles de acceso y monitoreo continuo de nuestros sistemas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Cookies y Tecnologías de Seguimiento</h2>
                <p className="text-gray-700 leading-relaxed">
                  Utilizamos cookies y tecnologías similares para mejorar su experiencia, recordar sus preferencias y
                  analizar el uso de nuestro sitio. Puede controlar las cookies a través de la configuración de su
                  navegador, aunque esto puede afectar la funcionalidad del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Cambios a esta Política</h2>
                <p className="text-gray-700 leading-relaxed">
                  Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios
                  significativos por email o a través de un aviso prominente en nuestro sitio web. Su uso continuado de
                  nuestros servicios después de tales cambios constituye su aceptación de la nueva política.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contacto</h2>
                <p className="text-gray-700 leading-relaxed">
                  Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, puede contactarnos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>Email: privacidad@psikit.com</li>
                  <li>Teléfono: +54 11 1234-5678</li>
                  <li>
                    Formulario de contacto:{" "}
                    <Link href="/contacto" className="text-blue-600 hover:underline">
                      psikit.com/contacto
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
