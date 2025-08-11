"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseVideoCallProps {
  sessionId: string
  userType: "psicologo" | "paciente"
}

interface CallState {
  isConnected: boolean
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  isScreenSharing: boolean
  participants: string[]
  waitingRoom: string[]
  callDuration: number
}

export function useVideoCall({ sessionId, userType }: UseVideoCallProps) {
  const [callState, setCallState] = useState<CallState>({
    isConnected: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    isScreenSharing: false,
    participants: [],
    waitingRoom: [],
    callDuration: 0,
  })

  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnection = useRef<RTCPeerConnection | null>(null)

  // Inicializar conexión WebRTC
  const initializePeerConnection = useCallback(() => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
    }

    peerConnection.current = new RTCPeerConnection(configuration)

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        // Enviar candidate al peer remoto
        console.log("ICE candidate:", event.candidate)
      }
    }

    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0])
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0]
      }
    }

    peerConnection.current.onconnectionstatechange = () => {
      const state = peerConnection.current?.connectionState
      setCallState((prev) => ({
        ...prev,
        isConnected: state === "connected",
      }))
    }
  }, [])

  // Obtener medios locales
  const getLocalMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      setLocalStream(stream)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Agregar tracks al peer connection
      if (peerConnection.current) {
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream)
        })
      }

      return stream
    } catch (error) {
      console.error("Error accessing media devices:", error)
      throw error
    }
  }, [])

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = !callState.isVideoEnabled
      })
      setCallState((prev) => ({
        ...prev,
        isVideoEnabled: !prev.isVideoEnabled,
      }))
    }
  }, [localStream, callState.isVideoEnabled])

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = !callState.isAudioEnabled
      })
      setCallState((prev) => ({
        ...prev,
        isAudioEnabled: !prev.isAudioEnabled,
      }))
    }
  }, [localStream, callState.isAudioEnabled])

  // Screen sharing
  const toggleScreenShare = useCallback(async () => {
    try {
      if (!callState.isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })

        // Reemplazar video track
        if (peerConnection.current && localStream) {
          const videoTrack = screenStream.getVideoTracks()[0]
          const sender = peerConnection.current.getSenders().find((s) => s.track?.kind === "video")

          if (sender) {
            await sender.replaceTrack(videoTrack)
          }
        }

        setCallState((prev) => ({ ...prev, isScreenSharing: true }))

        screenStream.getVideoTracks()[0].onended = () => {
          setCallState((prev) => ({ ...prev, isScreenSharing: false }))
          // Volver a la cámara
          getLocalMedia()
        }
      }
    } catch (error) {
      console.error("Error sharing screen:", error)
    }
  }, [callState.isScreenSharing, localStream, getLocalMedia])

  // Crear oferta (para psicólogo)
  const createOffer = useCallback(async () => {
    if (peerConnection.current) {
      const offer = await peerConnection.current.createOffer()
      await peerConnection.current.setLocalDescription(offer)
      return offer
    }
  }, [])

  // Crear respuesta (para paciente)
  const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    if (peerConnection.current) {
      await peerConnection.current.setRemoteDescription(offer)
      const answer = await peerConnection.current.createAnswer()
      await peerConnection.current.setLocalDescription(answer)
      return answer
    }
  }, [])

  // Finalizar llamada
  const endCall = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop())
    }
    if (peerConnection.current) {
      peerConnection.current.close()
    }
    setCallState((prev) => ({ ...prev, isConnected: false }))
  }, [localStream])

  // Admitir paciente desde sala de espera (solo psicólogo)
  const admitFromWaitingRoom = useCallback(
    (participantId: string) => {
      if (userType === "psicologo") {
        setCallState((prev) => ({
          ...prev,
          participants: [...prev.participants, participantId],
          waitingRoom: prev.waitingRoom.filter((id) => id !== participantId),
        }))
      }
    },
    [userType],
  )

  // Timer de duración de llamada
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (callState.isConnected) {
      interval = setInterval(() => {
        setCallState((prev) => ({
          ...prev,
          callDuration: prev.callDuration + 1,
        }))
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [callState.isConnected])

  // Inicializar al montar
  useEffect(() => {
    initializePeerConnection()
    getLocalMedia()

    return () => {
      endCall()
    }
  }, [initializePeerConnection, getLocalMedia, endCall])

  return {
    callState,
    localVideoRef,
    remoteVideoRef,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    createOffer,
    createAnswer,
    endCall,
    admitFromWaitingRoom,
  }
}
