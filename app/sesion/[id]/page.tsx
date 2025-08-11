"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  Clock,
  Settings,
  MessageSquare,
  Share,
  Monitor,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface Participante {
  id: string
  nombre: string
  tipo: "psicologo" | "paciente"
  avatar?: string
  conectado: boolean
  video: boolean
  audio: boolean
}

interface SesionData {
  id: string
  paciente: string
  psicologo: string
  fechaHora: string
  duracion: number
  estado: "esperando" | "en-curso" | "finalizada"
  meetUrl?: string
}

export default function SesionPage() {
  const params = useParams()
  const router = useRouter()
  const [sesion, setSesion] = useState<SesionData | null>(null)
  const [participantes, setParticipantes] = useState<Participante[]>([])
  const [tiempoSesion, setTiempoSesion] = useState(0)
  const [controles, setControles] = useState({
    video: true,
    audio: true,
    pantalla: false,
    volumen: true,
  })
  const [userType, setUserType] = useState<"psicologo" | "paciente">("psicologo")
  const [salaEspera, setSalaEspera] = useState<Participante[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Simular datos de sesión
  useEffect(() => {
    const sesionData: SesionData = {
      id: params.id as string,
      paciente: "María González",
      psicologo: "Dr. Roberto Silva",
      fechaHora: new Date().toLocaleString(),
      duracion: 50,
      estado: "en-curso",
      meetUrl: `https://meet.google.com/abc-defg-hij`,
    }
    setSesion(sesionData)

    // Simular participantes
    setParticipantes([
      {
        id: "1",
        nombre: "Dr. Roberto Silva",
        tipo: "psicologo",
        conectado: true,
        video: true,
        audio: true,
      },
      {
        id: "2",
        nombre: "María González",
        tipo: "paciente",
        conectado: true,
        video: true,
        audio: true,
      },
    ])

    // Simular sala de espera
    setSalaEspera([
      {
        id: "3",
        nombre: "Carlos Rodríguez",
        tipo: "paciente",
        conectado: true,
        video: false,
        audio: false,
      },
    ])
  }, [params.id])

  // Timer de sesión
  useEffect(() => {
    if (sesion?.estado === "en-curso") {
      const interval = setInterval(() => {
        setTiempoSesion((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [sesion?.estado])

  // Inicializar cámara
  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
      }
    }

    initCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
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

    if (stream) {
      if (control === "video") {
        stream.getVideoTracks().forEach((track) => {
          track.enabled = !controles.video
        })
      } else if (control === "audio") {
        stream.getAudioTracks().forEach((track) => {
          track.enabled = !controles.audio
        })
      }
    }
  }

  const admitirPaciente = (pacienteId: string) => {
    const paciente = salaEspera.find((p) => p.id === pacienteId)
    if (paciente) {
      setParticipantes((prev) => [...prev, { ...paciente, conectado: true }])
      setSalaEspera((prev) => prev.filter((p) => p.id !== pacienteId))
    }
  }

  const finalizarSesion = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setSesion((prev) => (prev ? { ...prev, estado: "finalizada" } : null))
    router.push("/dashboard/psicologo")
  }

  const abrirGoogleMeet = () => {
    if (sesion?.meetUrl) {
      window.open(sesion.meetUrl, "_blank")
    }
  }

  if (!sesion) {
    return <div className="flex items-center justify-center min-h-screen">Cargando sesión...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header de Sesión */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-600 text-white">
              {sesion.estado === "en-curso" ? "EN VIVO" : sesion.estado.toUpperCase()}
            </Badge>
            <div className="text-white">
              <h1 className="text-lg font-semibold">Sesión con {sesion.paciente}</h1>
              <p className="text-sm text-gray-300">
                {formatTime(tiempoSesion)} / {sesion.duracion} min
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={abrirGoogleMeet}>
              <Share className="h-4 w-4 mr-2" />
              Google Meet
            </Button>
            <Button variant="destructive" size="sm" onClick={finalizarSesion}>
              <PhoneOff className="h-4 w-4 mr-2" />
              Finalizar
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Principal */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full">
            {/* Video del Psicólogo */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm font-medium">Dr. Roberto Silva (Tú)</span>
                  <div className="flex space-x-1">
                    {controles.audio ? (
                      <Mic className="h-4 w-4 text-green-500" />
                    ) : (
                      <MicOff className="h-4 w-4 text-red-500" />
                    )}
                    {controles.video ? (
                      <Video className="h-4 w-4 text-green-500" />
                    ) : (
                      <VideoOff className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Video del Paciente */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                <div className="text-center text-white">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="text-2xl">MG</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">María González</p>
                  <p className="text-sm text-gray-400">Conectando...</p>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className="text-white text-sm font-medium">María González</span>
                  <div className="flex space-x-1">
                    <Mic className="h-4 w-4 text-green-500" />
                    <Video className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Controles de Video */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 rounded-full px-6 py-3 shadow-lg">
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
                variant={controles.pantalla ? "default" : "secondary"}
                className="rounded-full w-12 h-12"
                onClick={() => toggleControl("pantalla")}
              >
                <Monitor className="h-5 w-5" />
              </Button>

              <Button
                size="sm"
                variant={controles.volumen ? "secondary" : "destructive"}
                className="rounded-full w-12 h-12"
                onClick={() => toggleControl("volumen")}
              >
                {controles.volumen ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>

              <Button size="sm" variant="outline" className="rounded-full w-12 h-12 bg-transparent">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Participantes */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Participantes ({participantes.length})
            </h3>
            <div className="space-y-2">
              {participantes.map((participante) => (
                <div key={participante.id} className="flex items-center justify-between p-2 rounded bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {participante.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-medium">{participante.nombre}</p>
                      <p className="text-gray-400 text-xs">{participante.tipo}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {participante.audio ? (
                      <Mic className="h-3 w-3 text-green-500" />
                    ) : (
                      <MicOff className="h-3 w-3 text-red-500" />
                    )}
                    {participante.video ? (
                      <Video className="h-3 w-3 text-green-500" />
                    ) : (
                      <VideoOff className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sala de Espera */}
          {salaEspera.length > 0 && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-medium mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Sala de Espera ({salaEspera.length})
              </h3>
              <div className="space-y-2">
                {salaEspera.map((paciente) => (
                  <div key={paciente.id} className="flex items-center justify-between p-2 rounded bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {paciente.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white text-sm font-medium">{paciente.nombre}</p>
                        <p className="text-gray-400 text-xs">Esperando...</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => admitirPaciente(paciente.id)}>
                      Admitir
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat de Sesión
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    <span className="font-medium text-blue-400">Sistema:</span> Sesión iniciada
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{new Date().toLocaleTimeString()}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    <span className="font-medium text-green-400">María González:</span> Buenos días, doctor
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Escribir mensaje..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm">Enviar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
