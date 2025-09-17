"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, MapPin, Phone, Mail, Calendar, Heart, Edit, Camera } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { useState, useRef } from "react"

export default function PacientePerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    nombre: "María González",
    email: "maria.gonzalez@ejemplo.com",
    telefono: "+54 11 1234-5678",
    fechaNacimiento: "1990-05-15",
    contactoEmergencia: "Juan González - +54 11 9876-5432",
    ubicacion: "Buenos Aires, Argentina",
    foto: "/images/maria-gonzalez.jpg",
  })

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, foto: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("[v0] Saving profile data:", formData)
    setIsEditing(false)
  }

  const estadisticas = [
    { label: "Sesiones Completadas", valor: "12", icono: Calendar },
    { label: "Meses en Terapia", valor: "3", icono: Heart },
    { label: "Tests Completados", valor: "5", icono: User },
  ]

  return (
    <AuthGuard requiredUserType="paciente">
      <div className="flex">
        <Navigation userType="paciente" />
        <div className="flex-1 min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Administra tu información personal</p>
              </div>
              <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Guardar Cambios" : "Editar Perfil"}
              </Button>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información Principal */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Tu información personal y de contacto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={formData.foto || "/placeholder.svg"}
                          alt="María González"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">MG</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <Input
                          value={formData.nombre}
                          onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                          className="text-2xl font-bold mb-2"
                        />
                      ) : (
                        <h2 className="text-2xl font-bold text-gray-900">{formData.nombre}</h2>
                      )}
                      <p className="text-gray-600 mb-2">Paciente</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Miembro desde Enero 2024
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {isEditing ? (
                            <Input
                              value={formData.ubicacion}
                              onChange={(e) => setFormData((prev) => ({ ...prev, ubicacion: e.target.value }))}
                              className="h-6 text-sm"
                            />
                          ) : (
                            formData.ubicacion
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Badge className="bg-green-100 text-green-800">Activo</Badge>
                        <Badge variant="secondary">Plan Profesional</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <div className="flex items-center mt-1">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{formData.email}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Teléfono</Label>
                        {isEditing ? (
                          <Input
                            value={formData.telefono}
                            onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{formData.telefono}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Fecha de Nacimiento</Label>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={formData.fechaNacimiento}
                            onChange={(e) => setFormData((prev) => ({ ...prev, fechaNacimiento: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm mt-1">15 de Mayo, 1990</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Contacto de Emergencia</Label>
                        {isEditing ? (
                          <Input
                            value={formData.contactoEmergencia}
                            onChange={(e) => setFormData((prev) => ({ ...prev, contactoEmergencia: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm mt-1">{formData.contactoEmergencia}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card>
                <CardHeader>
                  <CardTitle>Mi Progreso</CardTitle>
                  <CardDescription>Tu progreso en terapia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {estadisticas.map((stat, index) => {
                      const IconComponent = stat.icono
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{stat.valor}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mi Psicólogo */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Mi Psicólogo</CardTitle>
                <CardDescription>Información de tu profesional asignado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=64&h=64&fit=crop&crop=face" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Dr. Roberto Silva</h3>
                    <p className="text-gray-600">Psicólogo Clínico - Matrícula 12345</p>
                    <p className="text-sm text-gray-500">Especialista en Terapia Cognitivo-Conductual</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge>8 años de experiencia</Badge>
                      <Badge variant="secondary">Calificación: 4.9/5</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Próxima sesión</p>
                    <p className="font-medium">Hoy 15:00</p>
                    <Button size="sm" className="mt-2">
                      Contactar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferencias */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Preferencias de Sesión</CardTitle>
                <CardDescription>Configura tus preferencias para las sesiones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recordatorios">Recordatorios (minutos antes)</Label>
                      <Input id="recordatorios" defaultValue="30" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="duracionPreferida">Duración preferida (minutos)</Label>
                      <Input id="duracionPreferida" defaultValue="50" type="number" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="horarioPreferido">Horario preferido</Label>
                      <Input id="horarioPreferido" defaultValue="Tarde (14:00 - 18:00)" />
                    </div>
                    <div>
                      <Label htmlFor="modalidad">Modalidad preferida</Label>
                      <Input id="modalidad" defaultValue="Virtual" />
                    </div>
                  </div>
                </div>
                <Button className="mt-6">Guardar Preferencias</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
