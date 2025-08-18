"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, RefreshCw, Link } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GoogleCalendarIntegrationProps {
  onEventsSync?: (events: any[]) => void
}

export function GoogleCalendarIntegration({ onEventsSync }: GoogleCalendarIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    // Check if user has Google Calendar connected
    checkConnectionStatus()
  }, [])

  const checkConnectionStatus = async () => {
    // Check if user has valid Google tokens stored
    // This would typically check your database or session
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("google_connected") === "true") {
      setIsConnected(true)
      syncEvents()
    }
  }

  const connectGoogleCalendar = () => {
    window.location.href = "/api/google-calendar/auth"
  }

  const syncEvents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/google-calendar/events")
      if (response.ok) {
        const googleEvents = await response.json()
        setEvents(googleEvents)
        onEventsSync?.(googleEvents)
      }
    } catch (error) {
      console.error("Error syncing events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createGoogleEvent = async (appointmentData: any) => {
    try {
      const eventData = {
        summary: `Sesión con ${appointmentData.patient}`,
        description: `Sesión de psicología con ${appointmentData.patient}`,
        start: {
          dateTime: appointmentData.startTime,
          timeZone: "America/Argentina/Buenos_Aires",
        },
        end: {
          dateTime: appointmentData.endTime,
          timeZone: "America/Argentina/Buenos_Aires",
        },
        attendees: appointmentData.patientEmail ? [{ email: appointmentData.patientEmail }] : [],
      }

      const response = await fetch("/api/google-calendar/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      })

      if (response.ok) {
        const event = await response.json()
        return event
      }
    } catch (error) {
      console.error("Error creating Google Calendar event:", error)
    }
  }

  if (!isConnected) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Integración con Google Calendar
          </CardTitle>
          <CardDescription>Conecta tu Google Calendar para sincronizar automáticamente tus citas</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={connectGoogleCalendar} className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Conectar Google Calendar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Google Calendar Conectado
        </CardTitle>
        <CardDescription>Tus citas se sincronizan automáticamente con Google Calendar</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={syncEvents}
          disabled={isLoading}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Sincronizando..." : "Sincronizar Eventos"}
        </Button>
        {events.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">{events.length} eventos sincronizados desde Google Calendar</p>
        )}
      </CardContent>
    </Card>
  )
}
