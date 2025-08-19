"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  Plus,
  Video,
  ChevronLeft,
  ChevronRight,
  List,
  MapPin,
  Search,
  TrendingUp,
  Users,
} from "lucide-react"
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
    if (date.getMonth() !== currentMonth) break

    const dateKey = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()

    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    const numAppointments = Math.floor(Math.random() * 4) + 1
    const dayAppointments = []

    for (let i = 0; i < numAppointments; i++) {
      const hour = 9 + Math.floor(Math.random() * 8)
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [appointments, setAppointments] = useState(() => generateAppointments())
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const view = searchParams.get("view")
    if (view === "list") {
      setViewMode("list")
    }
  }, [searchParams])

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

  const proximosDias = [
    { dia: "Mañana", fecha: "15 Nov", sesiones: 3, disponibles: 2 },
    { dia: "Miércoles", fecha: "16 Nov", sesiones: 4, disponibles: 1 },
    { dia: "Jueves", fecha: "17 Nov", sesiones: 2, disponibles: 3 },
    { dia: "Viernes", fecha: "18 Nov", sesiones: 5, disponibles: 0 },
  ]

  const getAvailableTimeSlots = (date: string) => {
    const timeSlots = []
    const dayAppointments = appointments[date] || []
    const bookedTimes = dayAppointments.map((apt) => apt.hora)

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

    setAppointments((prev) => ({
      ...prev,
      [newAppointment.fecha]: [...(prev[newAppointment.fecha] || []), newApt].sort((a, b) =>
        a.hora.localeCompare(b.hora),
      ),
    }))

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

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1))
      return newDate
    })
  }

  const handleDayClick = (day: Date) => {
    setSelectedDate(day)
    setViewMode("list")
  }

  const handleProximosDiasClick = (proximoDia: any) => {
    setViewMode("list")
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

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex min-h-screen bg-gray-50">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
                  <p className="text-gray-600 mt-1">Gestiona tus citas y horarios profesionales</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg shadow-sm">
                    <Button
                      variant={viewMode === "calendar" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("calendar")}
                      className={`rounded-r-none ${viewMode === "calendar" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-50"}`}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Calendario
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`rounded-l-none border-l ${viewMode === "list" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-50"}`}
                    >
                      <List className="h-4 w-4 mr-2" />
                      Lista
                    </Button>
                  </div>

                  <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Cita
                      </Button>
                    </DialogTrigger>
                    {/* ... existing dialog content ... */}
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
                            onChange={(e) =>
                              setNewAppointment((prev) => ({ ...prev, fecha: e.target.value, hora: "" }))
                            }
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
            </div>
          </header>

          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar citas, pacientes..."
                    className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-1 p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">12</div>
                  <p className="text-xs font-medium text-gray-900">Hoy</p>
                </div>
                <div className="text-center space-y-1 p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">45</div>
                  <p className="text-xs font-medium text-gray-900">Esta semana</p>
                </div>
                <div className="text-center space-y-1 p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">89%</div>
                  <p className="text-xs font-medium text-gray-900">Asistencia</p>
                </div>
              </div>
            </div>

            {viewMode === "calendar" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigateMonth("prev")}
                        className="hover:bg-gray-50 border-gray-300"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentDate(new Date())}
                        className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                      >
                        Hoy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigateMonth("next")}
                        className="hover:bg-gray-50 border-gray-300"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                  </div>
                </div>

                <Card className="shadow-sm border-gray-200">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-7 bg-gray-50 border-b">
                      {dayNames.map((day) => (
                        <div
                          key={day}
                          className="p-4 text-center font-semibold text-gray-700 text-sm border-r last:border-r-0 bg-gradient-to-b from-gray-50 to-gray-100"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7">
                      {getDaysInMonth(currentDate).map((day, index) => {
                        if (!day) {
                          return <div key={index} className="h-32 border-r border-b last:border-r-0 bg-gray-25"></div>
                        }

                        const dateKey = formatDateKey(day)
                        const dayAppointments = appointments[dateKey] || []
                        const isToday = day.toDateString() === new Date().toDateString()
                        const isCurrentMonth = day.getMonth() === currentDate.getMonth()

                        return (
                          <div
                            key={index}
                            onClick={() => handleDayClick(day)}
                            className={`h-32 p-2 border-r border-b last:border-r-0 relative overflow-hidden cursor-pointer transition-all duration-200 hover:bg-blue-25 ${
                              isToday ? "bg-blue-50 border-blue-200 shadow-inner" : "bg-white hover:bg-gray-50"
                            } ${!isCurrentMonth ? "opacity-40 bg-gray-25" : ""}`}
                          >
                            <div
                              className={`text-sm font-bold mb-2 ${
                                isToday
                                  ? "text-blue-700 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                  : "text-gray-900"
                              }`}
                            >
                              {day.getDate()}
                            </div>

                            <div className="space-y-1 h-20 overflow-hidden">
                              {dayAppointments.slice(0, 2).map((appointment, idx) => (
                                <div
                                  key={appointment.id}
                                  className={`text-xs p-1.5 rounded-md truncate font-medium shadow-sm border transition-all hover:shadow-md ${
                                    appointment.tipo === "virtual"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : "bg-green-100 text-green-800 border-green-200"
                                  }`}
                                  title={`${appointment.hora} - ${appointment.paciente} (${appointment.tipo})`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold">{appointment.hora}</span>
                                    {appointment.tipo === "virtual" && <Video className="h-3 w-3" />}
                                    {appointment.tipo === "presencial" && <MapPin className="h-3 w-3" />}
                                  </div>
                                  <div className="truncate text-xs opacity-90">{appointment.paciente}</div>
                                </div>
                              ))}

                              {dayAppointments.length > 2 && (
                                <div className="absolute bottom-1 right-1 bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
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
              </>
            )}

            {viewMode === "list" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="shadow-sm border-gray-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5 text-blue-600" />
                            {selectedDate
                              ? `${selectedDate.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`
                              : `Hoy - ${new Date().toLocaleDateString()}`}
                          </CardTitle>
                          <CardDescription className="text-gray-600 mt-1">
                            {selectedDate
                              ? `${(appointments[formatDateKey(selectedDate)] || []).length} sesiones programadas`
                              : `${sesionesHoy.length} sesiones programadas`}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedDate && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedDate(null)}
                              className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                            >
                              Ver Hoy
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="hover:bg-gray-50 bg-transparent">
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-gray-50 bg-transparent">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {(selectedDate ? appointments[formatDateKey(selectedDate)] || [] : sesionesHoy).map(
                          (sesion) => (
                            <div
                              key={sesion.id}
                              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:border-blue-200 bg-white"
                            >
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                    sesion.tipo === "virtual" ? "bg-blue-100" : "bg-green-100"
                                  }`}
                                >
                                  {sesion.tipo === "virtual" ? (
                                    <Video className="h-6 w-6 text-blue-600" />
                                  ) : (
                                    <MapPin className="h-6 w-6 text-green-600" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{sesion.paciente}</p>
                                  <p className="text-sm text-gray-600">
                                    {sesion.hora} - {sesion.duracion || 50} min
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        sesion.tipo === "virtual"
                                          ? "border-blue-200 text-blue-800 bg-blue-50"
                                          : "border-green-200 text-green-800 bg-green-50"
                                      }`}
                                    >
                                      {sesion.tipo}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        sesion.estado === "confirmada"
                                          ? "border-green-200 text-green-800 bg-green-50"
                                          : "border-amber-200 text-amber-800 bg-amber-50"
                                      }`}
                                    >
                                      {sesion.estado}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {sesion.tipo === "virtual" && (
                                  <Link href={`/sesion/${sesion.id}`}>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
                                      <Video className="h-4 w-4 mr-1" />
                                      Iniciar
                                    </Button>
                                  </Link>
                                )}
                                <Button size="sm" variant="outline" className="hover:bg-gray-50 bg-transparent">
                                  Editar
                                </Button>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="shadow-sm border-gray-200">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                      <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Próximos Días
                      </CardTitle>
                      <CardDescription className="text-gray-600">Vista rápida de tu agenda</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {proximosDias.map((dia, index) => (
                          <div
                            key={index}
                            onClick={() => handleProximosDiasClick(dia)}
                            className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 hover:border-purple-200 bg-white hover:bg-purple-25"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">{dia.dia}</p>
                                <p className="text-sm text-gray-600">{dia.fecha}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-purple-600" />
                                  <p className="text-sm font-semibold text-gray-900">{dia.sesiones}</p>
                                </div>
                                <p className="text-xs text-gray-500">{dia.disponibles} disponibles</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
