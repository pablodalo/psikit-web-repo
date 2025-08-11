"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, Copy, RefreshCw, Globe, Shield } from "lucide-react"

interface DomainVerificationProps {
  domain: string
  onVerified: (domain: string) => void
  onCancel: () => void
}

export function DomainVerification({ domain, onVerified, onCancel }: DomainVerificationProps) {
  const [verificationMethod, setVerificationMethod] = useState<"dns" | "file" | "meta">("dns")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending")
  const [errorMessage, setErrorMessage] = useState("")

  const verificationCode = `psikit-verification=${Math.random().toString(36).substring(2, 15)}`
  const verificationFile = `psikit-verification.txt`
  const verificationContent = verificationCode.split("=")[1]

  const verifyDomain = async () => {
    setIsVerifying(true)
    setErrorMessage("")

    try {
      // Simular verificación
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simular resultado (90% éxito)
      if (Math.random() > 0.1) {
        setVerificationStatus("success")
        setTimeout(() => {
          onVerified(domain)
        }, 1000)
      } else {
        setVerificationStatus("error")
        setErrorMessage("No se pudo verificar el dominio. Verifica la configuración DNS.")
      }
    } catch (error) {
      setVerificationStatus("error")
      setErrorMessage("Error durante la verificación del dominio.")
    } finally {
      setIsVerifying(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Verificar Dominio</span>
          </CardTitle>
          <CardDescription>Verifica la propiedad de {domain} para continuar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {verificationStatus === "success" ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ¡Dominio verificado exitosamente! Redirigiendo...
              </AlertDescription>
            </Alert>
          ) : verificationStatus === "error" ? (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Método de Verificación */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Método de Verificación</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => setVerificationMethod("dns")}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      verificationMethod === "dns"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">DNS</span>
                    </div>
                    <p className="text-sm text-gray-600">Agregar registro TXT</p>
                  </button>

                  <button
                    onClick={() => setVerificationMethod("file")}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      verificationMethod === "file"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">Archivo</span>
                    </div>
                    <p className="text-sm text-gray-600">Subir archivo HTML</p>
                  </button>

                  <button
                    onClick={() => setVerificationMethod("meta")}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      verificationMethod === "meta"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Meta Tag</span>
                    </div>
                    <p className="text-sm text-gray-600">Agregar meta tag</p>
                  </button>
                </div>
              </div>

              {/* Instrucciones según el método */}
              <div className="space-y-4">
                {verificationMethod === "dns" && (
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Verificación DNS</CardTitle>
                      <CardDescription>Agrega el siguiente registro TXT a tu DNS</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Tipo de Registro</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input value="TXT" readOnly className="w-20" />
                          <Badge>DNS</Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Nombre</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input value="@" readOnly className="flex-1" />
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard("@")}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Valor</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input value={verificationCode} readOnly className="flex-1 font-mono text-sm" />
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(verificationCode)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">TTL</Label>
                        <Input value="300" readOnly className="w-20 mt-1" />
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Los cambios DNS pueden tardar hasta 48 horas en propagarse completamente.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {verificationMethod === "file" && (
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Verificación por Archivo</CardTitle>
                      <CardDescription>Sube un archivo de verificación a tu servidor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Nombre del Archivo</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input value={verificationFile} readOnly className="flex-1 font-mono" />
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(verificationFile)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Contenido del Archivo</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input value={verificationContent} readOnly className="flex-1 font-mono" />
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(verificationContent)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Ubicación</Label>
                        <Input value={`https://${domain}/${verificationFile}`} readOnly className="font-mono text-sm" />
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          El archivo debe ser accesible públicamente desde la raíz de tu dominio.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {verificationMethod === "meta" && (
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Verificación por Meta Tag</CardTitle>
                      <CardDescription>Agrega una meta tag a tu página principal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Meta Tag</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            value={`<meta name="psikit-verification" content="${verificationContent}" />`}
                            readOnly
                            className="flex-1 font-mono text-sm"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              copyToClipboard(`<meta name="psikit-verification" content="${verificationContent}" />`)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Ubicación</Label>
                        <Input
                          value={`Dentro del <head> de https://${domain}`}
                          readOnly
                          className="font-mono text-sm"
                        />
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          La meta tag debe estar en la página principal de tu dominio dentro del elemento {"<head>"}.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}

          {/* Botones de Acción */}
          <div className="flex space-x-3">
            <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={verifyDomain} disabled={isVerifying} className="flex-1">
              {isVerifying ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verificar Dominio
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
