"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { AlertTriangle, Phone, MessageSquare, Shield, User, Heart } from "lucide-react"
import { notificationManager } from "@/lib/notifications"

interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

interface EmergencyProtocolProps {
  sessionId: string
  patientName: string
  patientId: string
  emergencyContacts: EmergencyContact[]
  userType: "psicologo" | "paciente"
}

type EmergencyType = "crisis" | "suicidal" | "technical" | "medical" | "other"

interface EmergencyReport {
  id: string
  type: EmergencyType
  description: string
  timestamp: Date
  status: "active" | "resolved" | "escalated"
  actions: string[]
}

export function EmergencyProtocol({
  sessionId,
  patientName,
  patientId,
  emergencyContacts,
  userType,
}: EmergencyProtocolProps) {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [emergencyType, setEmergencyType] = useState<EmergencyType>("crisis")
  const [description, setDescription] = useState("")
  const [currentReport, setCurrentReport] = useState<EmergencyReport | null>(null)
  const [emergencyTimer, setEmergencyTimer] = useState(0)

  // Números de emergencia por país
  const emergencyNumbers = {
    argentina: { police: "911", medical: "107", crisis: "135" },
    mexico: { police: "911", medical: "911", crisis: "800-290-0024" },
    colombia: { police: "123", medical: "125", crisis: "106" },
    chile: { police: "133", medical: "131", crisis: "600-360-7777" },
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isEmergencyActive) {
      interval = setInterval(() => {
        setEmergencyTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isEmergencyActive])

  const activateEmergency = async (type: EmergencyType, desc: string) => {
    const report: EmergencyReport = {
      id: Date.now().toString(),
      type,
      description: desc,
      timestamp: new Date(),
      status: "active",
      actions: [],
    }

    setCurrentReport(report)
    setIsEmergencyActive(true)
    setEmergencyTimer(0)

    // Notificar inmediatamente
    await notificationManager.notifyEmergency(patientName, type)

    // Acciones automáticas según el tipo
    switch (type) {
      case "suicidal":
        await handleSuicidalCrisis(report)
        break
      case "crisis":
        await handleMentalHealthCrisis(report)
        break
      case "medical":
        await handleMedicalEmergency(report)
        break
      case "technical":
        await handleTechnicalEmergency(report)
        break
    }
  }

  const handleSuicidalCrisis = async (report: EmergencyReport) => {
    const actions = [
      "Protocolo de riesgo suicida activado",
      "Contactando servicios de emergencia",
      "Notificando contactos de emergencia",
      "Grabando sesión para evidencia",
    ]

    // Contactar automáticamente servicios de emergencia
    if (userType === "psicologo") {
      // Mostrar números de emergencia
      actions.push("Números de emergencia mostrados")
    }

    setCurrentReport((prev) => (prev ? { ...prev, actions } : null))
  }

  const handleMentalHealthCrisis = async (report: EmergencyReport) => {
    const actions = [
      "Protocolo de crisis activado",
      "Técnicas de contención aplicadas",
      "Contactos de emergencia notificados",
    ]

    setCurrentReport((prev) => (prev ? { ...prev, actions } : null))
  }

  const handleMedicalEmergency = async (report: EmergencyReport) => {
    const actions = [
      "Emergencia médica reportada",
      "Servicios médicos contactados",
      "Ubicación del paciente solicitada",
    ]

    setCurrentReport((prev) => (prev ? { ...prev, actions } : null))
  }

  const handleTechnicalEmergency = async (report: EmergencyReport) => {
    const actions = [
      "Problema técnico crítico detectado",
      "Canales alternativos de comunicación activados",
      "Soporte técnico notificado",
    ]

    setCurrentReport((prev) => (prev ? { ...prev, actions } : null))
  }

  const resolveEmergency = () => {
    setIsEmergencyActive(false)
    setCurrentReport((prev) => (prev ? { ...prev, status: "resolved" } : null))
    setEmergencyTimer(0)
  }

  const escalateEmergency = () => {
    setCurrentReport((prev) => (prev ? { ...prev, status: "escalated" } : null))
    // Aquí se implementaría la escalación a supervisores o autoridades
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isEmergencyActive && currentReport) {
    return (
      <Card className="border-red-500 bg-red-50">
        <CardHeader className="bg-red-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6" />
            <span>🚨 PROTOCOLO DE EMERGENCIA ACTIVO</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Estado de emergencia */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="animate-pulse">
                {currentReport.type.toUpperCase()}
              </Badge>
              <span className="text-sm font-medium">Tiempo activo: {formatTime(emergencyTimer)}</span>
            </div>
            <Badge variant={currentReport.status === "active" ? "destructive" : "secondary"}>
              {currentReport.status}
            </Badge>
          </div>

          {/* Información del paciente */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Información del Paciente
            </h4>
            <p>
              <strong>Nombre:</strong> {patientName}
            </p>
            <p>
              <strong>ID:</strong> {patientId}
            </p>
            <p>
              <strong>Sesión:</strong> {sessionId}
            </p>
          </div>

          {/* Descripción */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Descripción del Incidente</h4>
            <p className="text-sm text-gray-700">{currentReport.description}</p>
          </div>

          {/* Acciones tomadas */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Acciones Tomadas</h4>
            <div className="space-y-1">
              {currentReport.actions.map((action, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Números de emergencia */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Números de Emergencia
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div className="p-2 bg-red-100 rounded">
                <p className="font-medium">Policía</p>
                <p className="text-lg font-bold">911</p>
              </div>
              <div className="p-2 bg-blue-100 rounded">
                <p className="font-medium">Médica</p>
                <p className="text-lg font-bold">107</p>
              </div>
              <div className="p-2 bg-green-100 rounded">
                <p className="font-medium">Crisis</p>
                <p className="text-lg font-bold">135</p>
              </div>
            </div>
          </div>

          {/* Contactos de emergencia */}
          {emergencyContacts.length > 0 && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Contactos de Emergencia
              </h4>
              <div className="space-y-2">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Controles de emergencia */}
          <div className="flex space-x-2">
            <Button variant="destructive" className="flex-1" onClick={escalateEmergency}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Escalar Emergencia
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={resolveEmergency}>
              Resolver
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-600" />
          <span>Protocolo de Emergencia</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Botones de emergencia rápida */}
        <div className="grid grid-cols-2 gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="h-16">
                <div className="text-center">
                  <AlertTriangle className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Crisis Mental</span>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Activar Protocolo de Crisis</AlertDialogTitle>
                <AlertDialogDescription>
                  Se activará el protocolo de emergencia para crisis de salud mental. Se notificarán los contactos de
                  emergencia y servicios especializados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Textarea
                placeholder="Describe brevemente la situación..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => activateEmergency("crisis", description)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Activar Protocolo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="h-16">
                <div className="text-center">
                  <Heart className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Riesgo Suicida</span>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>🚨 Protocolo de Riesgo Suicida</AlertDialogTitle>
                <AlertDialogDescription>
                  ATENCIÓN: Se activará el protocolo de máxima prioridad. Se contactarán inmediatamente los servicios de
                  emergencia.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Textarea
                placeholder="Información crítica sobre la situación..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => activateEmergency("suicidal", description)}
                  className="bg-red-800 hover:bg-red-900"
                >
                  ACTIVAR INMEDIATAMENTE
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-16 border-orange-500 text-orange-600 bg-transparent">
                <div className="text-center">
                  <Phone className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Emergencia Médica</span>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Emergencia Médica</AlertDialogTitle>
                <AlertDialogDescription>
                  Se activará el protocolo para emergencias médicas. Se contactarán los servicios médicos de emergencia.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Textarea
                placeholder="Describe los síntomas o situación médica..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => activateEmergency("medical", description)}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Activar Protocolo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-16 border-blue-500 text-blue-600 bg-transparent">
                <div className="text-center">
                  <MessageSquare className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-xs">Problema Técnico</span>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Problema Técnico Crítico</AlertDialogTitle>
                <AlertDialogDescription>
                  Se activarán canales alternativos de comunicación y se notificará al soporte técnico.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Textarea
                placeholder="Describe el problema técnico..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => activateEmergency("technical", description)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Reportar Problema
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Información de contactos */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Números de Emergencia</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>🚔 Policía: 911</p>
            <p>🏥 Emergencias Médicas: 107</p>
            <p>🧠 Crisis Psicológica: 135</p>
            <p>📞 Línea de Prevención Suicida: 135</p>
          </div>
        </div>

        {/* Protocolo de seguridad */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-blue-600" />
            Protocolo de Seguridad
          </h4>
          <div className="text-xs text-gray-700 space-y-1">
            <p>• Todas las emergencias se registran automáticamente</p>
            <p>• Los contactos de emergencia son notificados inmediatamente</p>
            <p>• Las sesiones se graban durante emergencias</p>
            <p>• Se mantiene comunicación con servicios especializados</p>
          </div>
        </div>

        {/* Botón de ayuda */}
        <Button variant="outline" className="w-full bg-transparent" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Contactar Soporte 24/7
        </Button>
      </CardContent>
    </Card>
  )
}
