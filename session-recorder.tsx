"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RepeatIcon as Record, Square, Download, Shield, Clock } from "lucide-react"

interface SessionRecorderProps {
  sessionId: string
  patientName: string
  onRecordingStart?: () => void
  onRecordingStop?: (recordingData: Blob) => void
}

export function SessionRecorder({ sessionId, patientName, onRecordingStart, onRecordingStop }: SessionRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasConsent, setHasConsent] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = useCallback(async () => {
    if (!hasConsent) {
      alert("Se requiere consentimiento para grabar la sesión")
      return
    }

    try {
      // Obtener stream de pantalla y audio
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
        audio: true,
      })

      // Obtener audio del micrófono
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })

      // Combinar streams
      const combinedStream = new MediaStream([...displayStream.getVideoTracks(), ...audioStream.getAudioTracks()])

      mediaRecorderRef.current = new MediaRecorder(combinedStream, {
        mimeType: "video/webm;codecs=vp9",
      })

      recordedChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const recordingBlob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        })
        onRecordingStop?.(recordingBlob)

        // Limpiar streams
        combinedStream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start(1000) // Grabar en chunks de 1 segundo
      setIsRecording(true)
      setRecordingTime(0)
      onRecordingStart?.()

      // Iniciar timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error iniciando grabación:", error)
      alert("Error al iniciar la grabación")
    }
  }, [hasConsent, onRecordingStart, onRecordingStop])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const downloadRecording = useCallback(() => {
    if (recordedChunksRef.current.length > 0) {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sesion-${sessionId}-${new Date().toISOString().split("T")[0]}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }, [sessionId])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Record className="h-5 w-5" />
          <span>Grabación de Sesión</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estado de grabación */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isRecording ? (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Grabando</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Detenido</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Clock className="h-4 w-4" />
            <span>{formatTime(recordingTime)}</span>
          </div>
        </div>

        {/* Información del paciente */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Paciente: {patientName}</p>
          <p className="text-xs text-gray-600">Sesión ID: {sessionId}</p>
        </div>

        {/* Consentimiento */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="consent"
            checked={hasConsent}
            onChange={(e) => setHasConsent(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            El paciente ha dado consentimiento para grabar
          </label>
        </div>

        {/* Controles */}
        <div className="flex space-x-2">
          {!isRecording ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex-1" disabled={!hasConsent}>
                  <Record className="h-4 w-4 mr-2" />
                  Iniciar Grabación
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Grabación</AlertDialogTitle>
                  <AlertDialogDescription>
                    ¿Está seguro de que desea iniciar la grabación de esta sesión? Asegúrese de que el paciente ha dado
                    su consentimiento explícito.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={startRecording}>Iniciar Grabación</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button variant="destructive" className="flex-1" onClick={stopRecording}>
              <Square className="h-4 w-4 mr-2" />
              Detener
            </Button>
          )}

          {recordedChunksRef.current.length > 0 && (
            <Button variant="outline" onClick={downloadRecording}>
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Información legal */}
        <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
          <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-800">
            <p className="font-medium">Información Legal:</p>
            <p>
              Las grabaciones se almacenan de forma segura y solo pueden ser accedidas por el profesional tratante. Se
              requiere consentimiento explícito del paciente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
