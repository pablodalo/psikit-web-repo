"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Video, Mic, MicOff, VideoOff, Volume2, Settings, Wifi, WifiOff } from "lucide-react"
import { useParams } from "next/navigation"

interface SesionInfo {
  id: string
  psicologo: string
  fechaHora: string
  duracion: number
  estado: "esperando" | "listo" | "en-sesion-previa"
}

export default function SalaEsperaPage() {
  const params = useParams()
  const [sesion, setSesion] = useState<SesionInfo | null>(null)
  const [tiempoEspera, setTiempoEspera] = useState(0)
  const [conexionEstable, setConexionEstable] = useState(true)
  const [controles, setControles] = useState({
    video: true,
    audio: true,
    volumen: true,
  })
  const [mensajePsicologo, setMensajePsicologo] = useState<string | null>(null)

  useEffect(() => {
    // Simular datos de sesión
    const sesionData: SesionInfo = {
      id: params.id as string,
      psicologo: "Dr. Roberto Silva",
      fechaHora: new Date().toLocaleString(),
      duracion: 50,
      estado: "en-sesion-previa",
    }
    setSesion(sesionData)

    // Simular mensajes del psicólogo
    setTimeout(() => {
      setMensajePsicologo("Hola María, estaré contigo en unos minutos. Estoy finalizando la sesión anterior.")
    }, 3000)
  }, [params.id])

  // Timer de espera
  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoEspera((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simular cambios de estado
  useEffect(() => {
    const timer = setTimeout(() => {
      setSesion((prev) => (prev ? { ...prev, estado: "listo" } : null))
      setMensajePsicologo("¡Perfecto! Ya puedes ingresar a la sesión.")
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleControl = (control: keyof typeof controles) => {
    setControles((prev) => ({
      ...prev,
      [control]: !prev[control],
    }))
  }

  const ingresarSesion = () => {
    window.location.href = `/sesion/${params.id}?tipo=paciente`
  }

  if (!sesion) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{sesion.psicologo}</CardTitle>
                <p className="text-gray-600">Psicólogo Clínico</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Badge
                variant={
                  sesion.estado === "listo" ? "default" : sesion.estado === "en-sesion-previa" ? "secondary" : "outline"
                }
                className={
                  sesion.estado === "listo"
                    ? "bg-green-600 text-white"
                    : sesion.estado === "en-sesion-previa"
                      ? "bg-orange-500 text-white"
                      : ""
                }
              >
                {sesion.estado === "listo"
                  ? "Listo para ingresar"
                  : sesion.estado === "en-sesion-previa"
                    ? "En sesión previa"
                    : "Esperando"}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Tiempo de espera: {formatTime(tiempoEspera)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Estado de Conexión */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {conexionEstable ? (
                  <Wifi className="h-5 w-5 text-green-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm font-medium">
                  {conexionEstable ? "Conexión estable" : "Problemas de conexión"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Conectado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vista Previa de Video */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                {controles.video ? (
                  <div className="text-center text-white">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarFallback className="text-2xl">MG</AvatarFallback>
                    </Avatar>
                    <p className="text-lg">María González</p>
                    <p className="text-sm text-gray-400">Cámara activada</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <VideoOff className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">Cámara desactivada</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {controles.audio ? (
                  <Mic className="h-5 w-5 text-green-500" />
                ) : (
                  <MicOff className="h-5 w-5 text-red-500" />
                )}
                {controles.video ? (
                  <Video className="h-5 w-5 text-green-500" />
                ) : (
                  <VideoOff className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                size="sm"
                variant={controles.audio ? "secondary" : "destructive"}
                className="rounded-full w-12 h-12"
                onClick={() => toggleControl("audio")}
              >
                {controles.audio ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>

              <Button
                size="sm"
                variant={controles.video ? "secondary" : "destructive"}
                className="rounded-full w-12 h-12"
                onClick={() => toggleControl("video")}
              >
                {controles.video ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>

              <Button
                size="sm"
                variant={controles.volumen ? "secondary" : "destructive"}
                className="rounded-full w-12 h-12"
                onClick={() => toggleControl("volumen")}
              >
                <Volume2 className="h-5 w-5" />
              </Button>

              <Button size="sm" variant="outline" className="rounded-full w-12 h-12 bg-transparent">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mensajes del Psicólogo */}
        {mensajePsicologo && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{sesion.psicologo}</p>
                  <p className="text-sm text-gray-600 mt-1">{mensajePsicologo}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botón de Ingreso */}
        <Card>
          <CardContent className="p-6 text-center">
            {sesion.estado === "listo" ? (
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">¡Tu sesión está lista!</h3>
                <p className="text-gray-600 mb-4">El psicólogo te está esperando</p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={ingresarSesion}>
                  <Video className="h-5 w-5 mr-2" />
                  Ingresar a la Sesión
                </Button>
              </div>
            ) : sesion.estado === "en-sesion-previa" ? (
              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-2">El psicólogo está en otra sesión</h3>
                <p className="text-gray-600 mb-4">Por favor espera, estaremos contigo pronto</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Preparando sesión...</h3>
                <p className="text-gray-600 mb-4">Verificando conexión y configuración</p>
                <Button size="lg" disabled>
                  <Clock className="h-5 w-5 mr-2" />
                  Esperando...
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Información Adicional */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            ¿Problemas técnicos?{" "}
            <a href="/soporte" className="text-blue-600 hover:underline">
              Contacta soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
