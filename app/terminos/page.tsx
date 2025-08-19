import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft } from "lucide-react"

export default function TerminosPage() {
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
            <CardTitle className="text-3xl text-center">Términos y Condiciones</CardTitle>
            <p className="text-center text-gray-600 mt-2">Última actualización: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Al acceder y utilizar PsiKit, usted acepta estar sujeto a estos términos y condiciones de uso. Si no
                  está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Descripción del Servicio</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  PsiKit es una plataforma digital que facilita la conexión entre profesionales de la salud mental y
                  pacientes, proporcionando herramientas para:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Sesiones de terapia virtual</li>
                  <li>Gestión de historias clínicas digitales</li>
                  <li>Administración de pagos y facturación</li>
                  <li>Tests psicológicos y evaluaciones</li>
                  <li>Comunicación segura entre profesionales y pacientes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Registro y Cuentas de Usuario</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Para utilizar PsiKit, debe crear una cuenta proporcionando información precisa y completa. Usted es
                  responsable de:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                  <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
                  <li>Asegurar que toda la información proporcionada sea veraz y actualizada</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Uso Aceptable</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Al utilizar PsiKit, usted se compromete a:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Utilizar el servicio únicamente para fines legítimos de atención de salud mental</li>
                  <li>Respetar la confidencialidad y privacidad de otros usuarios</li>
                  <li>No compartir información médica o personal de terceros sin autorización</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Responsabilidades de los Profesionales</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Los profesionales de la salud mental que utilicen PsiKit deben:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Mantener licencias y certificaciones válidas</li>
                  <li>Cumplir con los códigos de ética profesional aplicables</li>
                  <li>Mantener la confidencialidad de la información del paciente</li>
                  <li>Proporcionar atención de calidad dentro de su área de competencia</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Privacidad y Protección de Datos</h2>
                <p className="text-gray-700 leading-relaxed">
                  La protección de su información personal es fundamental para nosotros. Consulte nuestra{" "}
                  <Link href="/privacidad" className="text-blue-600 hover:underline">
                    Política de Privacidad
                  </Link>{" "}
                  para obtener información detallada sobre cómo recopilamos, utilizamos y protegemos sus datos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Pagos y Facturación</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Los términos de pago incluyen:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Los pagos se procesan de forma segura a través de proveedores certificados</li>
                  <li>Las tarifas son establecidas por cada profesional individual</li>
                  <li>Los reembolsos están sujetos a las políticas del profesional</li>
                  <li>PsiKit cobra una comisión por el uso de la plataforma</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitación de Responsabilidad</h2>
                <p className="text-gray-700 leading-relaxed">
                  PsiKit actúa como una plataforma tecnológica que facilita la conexión entre profesionales y pacientes.
                  No somos responsables de la calidad, efectividad o resultados de los servicios de salud mental
                  proporcionados por los profesionales a través de nuestra plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Modificaciones</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones
                  entrarán en vigor inmediatamente después de su publicación en la plataforma. El uso continuado del
                  servicio constituye la aceptación de los términos modificados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contacto</h2>
                <p className="text-gray-700 leading-relaxed">
                  Si tiene preguntas sobre estos términos, puede contactarnos en{" "}
                  <Link href="/contacto" className="text-blue-600 hover:underline">
                    nuestra página de contacto
                  </Link>{" "}
                  o enviando un email a legal@psikit.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
