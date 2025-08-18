"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Plus, Users, Video, ChevronLeft, ChevronRight, Grid, List } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"

export default function PsicologoAgendaPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [currentDate, setCurrentDate] = useState(new Date())

  const sesionesHoy = [
    { id: 1, paciente: "María González", hora: "09:00", duracion: 50, estado: "confirmada", tipo: "virtual" },
    { id: 2, paciente: "Carlos Rodríguez", hora: "10:30", duracion: 50, estado: "pendiente", tipo: "virtual" },
    { id: 3, paciente: "Ana Martínez", hora: "14:00", duracion: 50, estado: "confirmada", tipo: "presencial" },
    { id: 4, paciente: "Luis Pérez", hora: "15:30", duracion: 50, estado: "confirmada", tipo: "virtual" },
  ]

  const generateAppointments = () => {
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

  const appointments = generateAppointments()

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

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
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

  const proximosDias = [
    { fecha: "Mañana", sesiones: 4 },
    { fecha: "Miércoles", sesiones: 6 },
    { fecha: "Jueves", sesiones: 3 },
    { fecha: "Viernes", sesiones: 5 },
  ]

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex">
        <Navigation userType="psicologo" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Agenda</h1>
                <p className="text-gray-600">Gestiona tus citas y horarios</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Calendario
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
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Cita
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {viewMode === "calendar" ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setCurrentDate(new Date())}>
                        Hoy
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {dayNames.map((day) => (
                      <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      if (!day) {
                        return <div key={index} className="h-24 p-1"></div>
                      }

                      const dateKey = formatDateKey(day)
                      const dayAppointments = appointments[dateKey] || []
                      const isToday = day.toDateString() === new Date().toDateString()

                      return (
                        <div
                          key={index}
                          className={`h-24 p-1 border rounded-lg ${isToday ? "bg-blue-50 border-blue-200" : "bg-white hover:bg-gray-50"}`}
                        >
                          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 2).map((appointment) => (
                              <div
                                key={appointment.id}
                                className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                              >
                                {appointment.hora} {appointment.paciente}
                              </div>
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className="text-xs text-gray-500">+{dayAppointments.length - 2} más</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Existing list view */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Hoy - {new Date().toLocaleDateString()}</CardTitle>
                        <CardDescription>{sesionesHoy.length} sesiones programadas</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
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
                      {sesionesHoy.map((sesion) => (
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
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{dia.fecha}</p>
                            <p className="text-sm text-gray-600">{dia.sesiones} sesiones</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Ver
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Estadísticas Rápidas */}
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
