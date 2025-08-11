"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, Settings } from "lucide-react"

interface VideoCallManagerProps {
  sessionId: string
  userType: "psicologo" | "paciente"
  onEndCall?: () => void
  onToggleVideo?: (enabled: boolean) => void
  onToggleAudio?: (enabled: boolean) => void
}

export function VideoCallManager({
  sessionId,
  userType,
  onEndCall,
  onToggleVideo,
  onToggleAudio,
}: VideoCallManagerProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Inicializar medios
  const initializeMedia = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setStream(mediaStream)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream
      }
      setConnectionStatus("connected")
    } catch (error) {
      console.error("Error accessing media devices:", error)
      setConnectionStatus("disconnected")
    }
  }, [])

  useEffect(() => {
    initializeMedia()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [initializeMedia])

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (stream) {
      const videoTracks = stream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled
      })
      setIsVideoEnabled(!isVideoEnabled)
      onToggleVideo?.(!isVideoEnabled)
    }
  }, [stream, isVideoEnabled, onToggleVideo])

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !isAudioEnabled
      })
      setIsAudioEnabled(!isAudioEnabled)
      onToggleAudio?.(!isAudioEnabled)
    }
  }, [stream, isAudioEnabled, onToggleAudio])

  // Screen sharing
  const toggleScreenShare = useCallback(async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })
        setIsScreenSharing(true)
        // Aquí implementarías la lógica para reemplazar el video track
      } else {
        setIsScreenSharing(false)
        // Volver a la cámara
        await initializeMedia()
      }
    } catch (error) {
      console.error("Error sharing screen:", error)
    }
  }, [isScreenSharing, initializeMedia])

  // End call
  const endCall = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setConnectionStatus("disconnected")
    onEndCall?.()
  }, [stream, onEndCall])

  return (
    <div className="relative w-full h-full">
      {/* Video Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-4">
        {/* Local Video */}
        <Card className="relative overflow-hidden bg-gray-900">
          <CardContent className="p-0 h-full">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">{userType === "psicologo" ? "Dr. (Tú)" : "Tú"}</Badge>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {isAudioEnabled ? (
                <Mic className="h-4 w-4 text-green-500" />
              ) : (
                <MicOff className="h-4 w-4 text-red-500" />
              )}
              {isVideoEnabled ? (
                <Video className="h-4 w-4 text-green-500" />
              ) : (
                <VideoOff className="h-4 w-4 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Remote Video */}
        <Card className="relative overflow-hidden bg-gray-900">
          <CardContent className="p-0 h-full">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">{userType === "psicologo" ? "Paciente" : "Dr. Roberto Silva"}</Badge>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Mic className="h-4 w-4 text-green-500" />
              <Video className="h-4 w-4 text-green-500" />
            </div>
            {connectionStatus === "connecting" && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Conectando...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-gray-800 rounded-full px-6 py-3 shadow-lg">
          <Button
            size="sm"
            variant={isAudioEnabled ? "secondary" : "destructive"}
            className="rounded-full w-12 h-12"
            onClick={toggleAudio}
          >
            {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            size="sm"
            variant={isVideoEnabled ? "secondary" : "destructive"}
            className="rounded-full w-12 h-12"
            onClick={toggleVideo}
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            size="sm"
            variant={isScreenSharing ? "default" : "secondary"}
            className="rounded-full w-12 h-12"
            onClick={toggleScreenShare}
          >
            <Monitor className="h-5 w-5" />
          </Button>

          <Button size="sm" variant="secondary" className="rounded-full w-12 h-12">
            <Settings className="h-5 w-5" />
          </Button>

          <Button size="sm" variant="destructive" className="rounded-full w-12 h-12" onClick={endCall}>
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="absolute top-4 right-4">
        <Badge
          variant={
            connectionStatus === "connected"
              ? "default"
              : connectionStatus === "connecting"
                ? "secondary"
                : "destructive"
          }
        >
          {connectionStatus === "connected"
            ? "Conectado"
            : connectionStatus === "connecting"
              ? "Conectando..."
              : "Desconectado"}
        </Badge>
      </div>
    </div>
  )
}
