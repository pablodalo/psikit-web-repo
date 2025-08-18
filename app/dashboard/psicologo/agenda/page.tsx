"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Plus, Users, Video, ChevronLeft, ChevronRight, List, MapPin } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

function generateAppointments() {
  const appointments: { [key: string]: any[] } = {}
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Sample patients
  const patients = [
    "María González",
    "Carlos Rodríguez",
    "Ana Martínez",
    "Luis Pérez",
    "Sofia López",
    "Diego Martín",
    "Elena Ruiz",
    "Roberto Silva",
    "Carmen Torres",
    "Pedro Jiménez",
    "Laura Vega",
    "Miguel Santos",
  ]

  // Generate appointments for current month
  for (let day = 1; day <= 31; day++) {
    const date = new Date(currentYear, currentMonth, day)
    if (date.getMonth() !== currentMonth) break // Stop if we've moved to next month

    const dateKey = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()

    // Skip weekends for most appointments
    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    // Randomly generate 1-4 appointments per day
    const numAppointments = Math.floor(Math.random() * 4) + 1
    const dayAppointments = []

    for (let i = 0; i < numAppointments; i++) {
      const hour = 9 + Math.floor(Math.random() * 8) // 9 AM to 4 PM
      const minute = Math.random() > 0.5 ? "00" : "30"
      const patient = patients[Math.floor(Math.random() * patients.length)]
      const tipo = Math.random() > 0.3 ? "virtual" : "presencial"
      const estado = Math.random() > 0.2 ? "confirmada" : "pendiente"

      dayAppointments.push({
        id: `${dateKey}-${i}`,
        paciente: patient,
        hora: `${hour.toString().padStart(2, "0")}:${minute}`,
        tipo,
        estado,
      })
    }

    // Sort appointments by time
    dayAppointments.sort((a, b) => a.hora.localeCompare(b.hora))
    appointments[dateKey] = dayAppointments
  }

  // Add next month appointments
  for (let day = 1; day <= 15; day++) {
    const date = new Date(currentYear, currentMonth + 1, day)
    const dateKey = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()

    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    const numAppointments = Math.floor(Math.random() * 3) + 1
    const dayAppointments = []

    for (let i = 0; i < numAppointments; i++) {
      const hour = 9 + Math.floor(Math.random() * 8)
      const minute = Math.random() > 0.5 ? "00" : "30"
      const patient = patients[Math.floor(Math.random() * patients.length)]

      dayAppointments.push({
        id: `${dateKey}-${i}`,
        paciente: patient,
        hora: `${hour.toString().padStart(2, "0")}:${minute}`,
        tipo: Math.random() > 0.3 ? "virtual" : "presencial",
        estado: "confirmada",
      })
    }

    dayAppointments.sort((a, b) => a.hora.localeCompare(b.hora))
    appointments[dateKey] = dayAppointments
  }

  return appointments
}

export default function PsicologoAgendaPage() {
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "list">("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [appointments, setAppointments] = useState(() => generateAppointments())
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const viewParam = urlParams.get("view")

    if (viewParam === "list") {
      setViewMode("list")
    } else if (viewParam === "calendar") {
      setViewMode("month")
    }
  }, [])

  const [newAppointment, setNewAppointment] = useState({
    paciente: "",
    fecha: "",
    hora: "",
    tipo: "virtual" as "virtual" | "presencial",
    duracion: 50,
  })

  const sesionesHoy = [
    { id: 1, paciente: "María González", hora: "09:00", duracion: 50, estado: "confirmada", tipo: "virtual" },
    { id: 2, paciente: "Carlos Rodríguez", hora: "10:30", duracion: 50, estado: "pendiente", tipo: "virtual" },
    { id: 3, paciente: "Ana Martínez", hora: "14:00", duracion: 50, estado: "confirmada", tipo: "presencial" },
    { id: 4, paciente: "Luis Pérez", hora: "15:30", duracion: 50, estado: "confirmada", tipo: "virtual" },
  ]

  const getAvailableTimeSlots = (date: string) => {
    const timeSlots = []
    const dayAppointments = appointments[date] || []
    const bookedTimes = dayAppointments.map((apt) => apt.hora)

    // Generate time slots from 9:00 to 17:00 (5 PM)
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        timeSlots.push({
          time: timeString,
          available: !bookedTimes.includes(timeString),
        })
      }
    }

    return timeSlots
  }

  const handleCreateAppointment = async () => {
    if (!newAppointment.paciente || !newAppointment.fecha || !newAppointment.hora) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    const appointmentId = `${newAppointment.fecha}-${Date.now()}`
    const newApt = {
      id: appointmentId,
      paciente: newAppointment.paciente,
      hora: newAppointment.hora,
      tipo: newAppointment.tipo,
      estado: "confirmada" as const,
    }

    // Update appointments state
    setAppointments((prev) => ({
      ...prev,
      [newAppointment.fecha]: [...(prev[newAppointment.fecha] || []), newApt].sort((a, b) =>
        a.hora.localeCompare(b.hora),
      ),
    }))

    // Reset form and close modal
    setNewAppointment({
      paciente: "",
      fecha: "",
      hora: "",
      tipo: "virtual",
      duracion: 50,
    })
    setIsNewAppointmentOpen(false)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const navigateDate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (viewMode === "month") {
        newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1))
      } else if (viewMode === "week") {
        newDate.setDate(prev.getDate() + (direction === "next" ? 7 : -7))
      } else if (viewMode === "day") {
        newDate.setDate(prev.getDate() + (direction === "next" ? 1 : -1))
      }
      return newDate
    })
  }

  const handleDayClick = (day: Date) => {
    setSelectedDate(day)
    setViewMode("list")
  }

  const getSessionsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    const dayAppointments = appointments[dateKey] || []

    return dayAppointments.map((appointment, index) => ({
      id: `${dateKey}-${index}`,
      paciente: appointment.paciente,
      hora: appointment.hora,
      duracion: 50,
      estado: appointment.estado,
      tipo: appointment.tipo,
    }))
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getProximosDias = () => {
    const today = new Date()
    const proximosDias = []

    for (let i = 1; i <= 4; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dateKey = formatDateKey(date)
      const dayAppointments = appointments[dateKey] || []

      const dayName = date.toLocaleDateString("es-ES", { weekday: "long" })
      const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1)

      proximosDias.push({
        fecha: capitalizedDayName,
        date: date,
        sesiones: dayAppointments.length,
      })
    }

    return proximosDias
  }

  const proximosDias = getProximosDias()

  const handleProximoDiaClick = (date: Date) => {
    setSelectedDate(date)
    setViewMode("list")
  }

  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const getTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
    return slots
  }

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className={`flex-1 min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <header className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} border-b`}>
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Mi Agenda</h1>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Gestiona tus citas y horarios</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "day" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("day")}
                    className="rounded-r-none"
                  >
                    Día
                  </Button>
                  <Button
                    variant={viewMode === "week" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("week")}
                    className="rounded-none border-x"
                  >
                    Semana
                  </Button>
                  <Button
                    variant={viewMode === "month" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("month")}
                    className="rounded-none border-x"
                  >
                    Mes
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4 mr-2" />
                    Lista
                  </Button>
                </div>

                <Button variant="outline" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? "☀️" : "🌙"}
                </Button>

                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Programar Nueva Cita</DialogTitle>
                      <DialogDescription>
                        Selecciona un horario disponible para programar una nueva sesión
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="paciente">Paciente</Label>
                        <Input
                          id="paciente"
                          placeholder="Nombre del paciente"
                          value={newAppointment.paciente}
                          onChange={(e) => setNewAppointment((prev) => ({ ...prev, paciente: e.target.value }))}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="fecha">Fecha</Label>
                        <Input
                          id="fecha"
                          type="date"
                          value={newAppointment.fecha}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setNewAppointment((prev) => ({ ...prev, fecha: e.target.value, hora: "" }))}
                        />
                      </div>

                      {newAppointment.fecha && (
                        <div className="grid gap-2">
                          <Label>Horarios Disponibles</Label>
                          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                            {getAvailableTimeSlots(newAppointment.fecha).map((slot) => (
                              <Button
                                key={slot.time}
                                variant={newAppointment.hora === slot.time ? "default" : "outline"}
                                size="sm"
                                disabled={!slot.available}
                                onClick={() => setNewAppointment((prev) => ({ ...prev, hora: slot.time }))}
                                className={`text-xs ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                {slot.time}
                                {!slot.available && <span className="ml-1 text-red-500">✕</span>}
                              </Button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            ✕ = Horario ocupado | Selecciona un horario disponible
                          </p>
                        </div>
                      )}

                      <div className="grid gap-2">
                        <Label htmlFor="tipo">Tipo de Sesión</Label>
                        <Select
                          value={newAppointment.tipo}
                          onValueChange={(value: "virtual" | "presencial") =>
                            setNewAppointment((prev) => ({ ...prev, tipo: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="virtual">
                              <div className="flex items-center">
                                <Video className="h-4 w-4 mr-2" />
                                Virtual
                              </div>
                            </SelectItem>
                            <SelectItem value="presencial">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                Presencial
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="duracion">Duración (minutos)</Label>
                        <Select
                          value={newAppointment.duracion.toString()}
                          onValueChange={(value) =>
                            setNewAppointment((prev) => ({ ...prev, duracion: Number.parseInt(value) }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutos</SelectItem>
                            <SelectItem value="45">45 minutos</SelectItem>
                            <SelectItem value="50">50 minutos</SelectItem>
                            <SelectItem value="60">60 minutos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateAppointment}>Programar Cita</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => navigateDate("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setCurrentDate(new Date())}>
                    Hoy
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigateDate("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {viewMode === "month" && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  {viewMode === "week" && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  {viewMode === "day" &&
                    currentDate.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </h2>
              </div>
            </div>

            {viewMode === "month" && (
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-0">
                  <div className={`grid grid-cols-7 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} border-b`}>
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className={`p-4 text-center font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm border-r last:border-r-0`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      if (!day) {
                        return (
                          <div
                            key={index}
                            className={`h-32 border-r border-b last:border-r-0 ${isDarkMode ? "border-gray-700" : ""}`}
                          ></div>
                        )
                      }

                      const dateKey = formatDateKey(day)
                      const dayAppointments = appointments[dateKey] || []
                      const isToday = day.toDateString() === new Date().toDateString()
                      const isCurrentMonth = day.getMonth() === currentDate.getMonth()

                      return (
                        <div
                          key={index}
                          onClick={() => handleDayClick(day)}
                          className={`h-32 p-2 border-r border-b last:border-r-0 relative overflow-hidden cursor-pointer transition-all hover:bg-opacity-80 ${
                            isToday
                              ? isDarkMode
                                ? "bg-blue-900 border-blue-600"
                                : "bg-blue-50 border-blue-200"
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                                : "bg-white hover:bg-gray-50"
                          } ${!isCurrentMonth ? "opacity-40" : ""}`}
                        >
                          <div
                            className={`text-sm font-semibold mb-1 ${
                              isToday
                                ? isDarkMode
                                  ? "text-blue-300"
                                  : "text-blue-600"
                                : isDarkMode
                                  ? "text-white"
                                  : "text-gray-900"
                            }`}
                          >
                            {day.getDate()}
                          </div>

                          <div className="space-y-1 h-20 overflow-hidden">
                            {dayAppointments.slice(0, 2).map((appointment, idx) => (
                              <div
                                key={appointment.id}
                                className={`text-xs p-1.5 rounded-md truncate font-medium ${
                                  appointment.tipo === "virtual"
                                    ? isDarkMode
                                      ? "bg-blue-800 text-blue-200"
                                      : "bg-blue-100 text-blue-800"
                                    : isDarkMode
                                      ? "bg-green-800 text-green-200"
                                      : "bg-green-100 text-green-800"
                                }`}
                                title={`${appointment.hora} - ${appointment.paciente} (${appointment.tipo})`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{appointment.hora}</span>
                                  {appointment.tipo === "virtual" && <Video className="h-3 w-3" />}
                                </div>
                                <div className="truncate text-xs opacity-90">{appointment.paciente}</div>
                              </div>
                            ))}

                            {dayAppointments.length > 2 && (
                              <div
                                className={`absolute bottom-1 right-1 ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"} text-xs px-2 py-1 rounded-full font-medium border`}
                              >
                                +{dayAppointments.length - 2}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === "week" && (
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-0">
                  <div className={`grid grid-cols-8 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} border-b`}>
                    <div className={`p-4 border-r ${isDarkMode ? "border-gray-600" : ""}`}></div>
                    {getWeekDays(currentDate).map((day, index) => {
                      const isToday = day.toDateString() === new Date().toDateString()
                      return (
                        <div
                          key={index}
                          className={`p-4 text-center border-r last:border-r-0 ${isDarkMode ? "border-gray-600" : ""}`}
                        >
                          <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {day.toLocaleDateString("es-ES", { weekday: "short" })}
                          </div>
                          <div
                            className={`text-lg font-semibold ${
                              isToday
                                ? isDarkMode
                                  ? "text-blue-300"
                                  : "text-blue-600"
                                : isDarkMode
                                  ? "text-white"
                                  : "text-gray-900"
                            }`}
                          >
                            {day.getDate()}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {getTimeSlots().map((time) => (
                      <div key={time} className={`grid grid-cols-8 border-b ${isDarkMode ? "border-gray-700" : ""}`}>
                        <div
                          className={`p-2 text-xs ${isDarkMode ? "text-gray-400 bg-gray-700" : "text-gray-500 bg-gray-50"} border-r font-medium`}
                        >
                          {time}
                        </div>
                        {getWeekDays(currentDate).map((day, dayIndex) => {
                          const dateKey = formatDateKey(day)
                          const dayAppointments = appointments[dateKey] || []
                          const timeAppointment = dayAppointments.find((apt) => apt.hora === time)

                          return (
                            <div
                              key={dayIndex}
                              className={`p-2 h-12 border-r last:border-r-0 ${isDarkMode ? "border-gray-700 hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer transition-colors`}
                            >
                              {timeAppointment && (
                                <div
                                  className={`text-xs p-1 rounded truncate ${
                                    timeAppointment.tipo === "virtual"
                                      ? isDarkMode
                                        ? "bg-blue-800 text-blue-200"
                                        : "bg-blue-100 text-blue-800"
                                      : isDarkMode
                                        ? "bg-green-800 text-green-200"
                                        : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {timeAppointment.paciente}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === "day" && (
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {getTimeSlots().map((time) => {
                      const dateKey = formatDateKey(currentDate)
                      const dayAppointments = appointments[dateKey] || []
                      const timeAppointment = dayAppointments.find((apt) => apt.hora === time)

                      return (
                        <div key={time} className={`flex border-b ${isDarkMode ? "border-gray-700" : ""}`}>
                          <div
                            className={`w-20 p-3 text-sm ${isDarkMode ? "text-gray-400 bg-gray-700" : "text-gray-500 bg-gray-50"} border-r font-medium`}
                          >
                            {time}
                          </div>
                          <div
                            className={`flex-1 p-3 h-16 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer transition-colors`}
                          >
                            {timeAppointment && (
                              <div
                                className={`p-2 rounded-lg h-full flex items-center ${
                                  timeAppointment.tipo === "virtual"
                                    ? isDarkMode
                                      ? "bg-blue-800 text-blue-200"
                                      : "bg-blue-100 text-blue-800"
                                    : isDarkMode
                                      ? "bg-green-800 text-green-200"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  {timeAppointment.tipo === "virtual" && <Video className="h-4 w-4" />}
                                  <div>
                                    <div className="font-medium">{timeAppointment.paciente}</div>
                                    <div className="text-xs opacity-75">{timeAppointment.tipo}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === "list" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className={`lg:col-span-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {selectedDate
                            ? `${selectedDate.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`
                            : `Hoy - ${new Date().toLocaleDateString()}`}
                        </CardTitle>
                        <CardDescription>
                          {selectedDate
                            ? `${getSessionsForDate(selectedDate).length} sesiones programadas`
                            : `${sesionesHoy.length} sesiones programadas`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedDate && (
                          <Button size="sm" variant="outline" onClick={() => setSelectedDate(null)}>
                            Ver Hoy
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(selectedDate ? getSessionsForDate(selectedDate) : sesionesHoy).map((sesion) => (
                        <div key={sesion.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                              <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{sesion.paciente}</p>
                              <p className="text-sm text-gray-600">
                                {sesion.hora} - {sesion.duracion} min
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant={sesion.tipo === "virtual" ? "default" : "secondary"}>
                                  {sesion.tipo}
                                </Badge>
                                <Badge variant={sesion.estado === "confirmada" ? "default" : "secondary"}>
                                  {sesion.estado}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {sesion.tipo === "virtual" && (
                              <Link href={`/sesion/${sesion.id}`}>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Video className="h-4 w-4 mr-1" />
                                  Iniciar
                                </Button>
                              </Link>
                            )}
                            <Button size="sm" variant="outline">
                              Editar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Días</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {proximosDias.map((dia, index) => (
                        <div
                          key={index}
                          onClick={() => handleProximoDiaClick(dia.date)}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{dia.fecha}</p>
                            <p className="text-sm text-gray-600">{dia.sesiones} sesiones</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProximoDiaClick(dia.date)
                            }}
                          >
                            Ver
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-600">Pacientes Activos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CalendarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm text-gray-600">Sesiones Esta Semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.5</p>
                  <p className="text-sm text-gray-600">Horas Promedio/Día</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Video className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-gray-600">Sesiones Virtuales</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
