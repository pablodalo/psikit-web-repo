"use client"

import { useState, useMemo } from "react"
import AuthGuard from "@/components/AuthGuard"
import Navigation from "@/components/Navigation"
import Button from "@/components/Button"
import Card from "@/components/Card"
import CardHeader from "@/components/CardHeader"
import CardTitle from "@/components/CardTitle"
import CardDescription from "@/components/CardDescription"
import CardContent from "@/components/CardContent"
import Badge from "@/components/Badge"
import Input from "@/components/Input"
import ArrowLeft from "@/icons/ArrowLeft"
import Check from "@/icons/Check"
import Search from "@/icons/Search"
import User from "@/icons/User"
import Send from "@/icons/Send"

export default function EnviarTestPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const pacientes = [
    {
      id: "1",
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      telefono: "+34 612 345 678",
      ultimaConsulta: "10/01/2024",
      estado: "activo",
    },
    {
      id: "2",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      telefono: "+34 687 654 321",
      ultimaConsulta: "08/01/2024",
      estado: "activo",
    },
    {
      id: "3",
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      telefono: "+34 654 987 123",
      ultimaConsulta: "05/01/2024",
      estado: "inactivo",
    },
    {
      id: "4",
      nombre: "Luis Fernández",
      email: "luis.fernandez@email.com",
      telefono: "+34 698 123 456",
      ultimaConsulta: "12/01/2024",
      estado: "activo",
    },
    {
      id: "5",
      nombre: "Carmen López",
      email: "carmen.lopez@email.com",
      telefono: "+34 645 789 012",
      ultimaConsulta: "15/01/2024",
      estado: "activo",
    },
  ]

  const testsDisponibles = [
    { id: "1", nombre: "PHQ-9", descripcion: "Cuestionario de Salud del Paciente - Depresión" },
    { id: "2", nombre: "GAD-7", descripcion: "Escala de Ansiedad Generalizada" },
    { id: "3", nombre: "Rosenberg Self-Esteem Scale", descripcion: "Escala de Autoestima de Rosenberg" },
    { id: "4", nombre: "AUDIT", descripcion: "Test de Identificación de Trastornos por Uso de Alcohol" },
    { id: "5", nombre: "MMSE", descripcion: "Mini Examen del Estado Mental" },
    { id: "6", nombre: "MoCA", descripcion: "Evaluación Cognitiva de Montreal" },
  ]

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return pacientes

    const searchLower = searchTerm.toLowerCase()
    return pacientes.filter(
      (paciente) =>
        paciente.nombre.toLowerCase().includes(searchLower) || paciente.email.toLowerCase().includes(searchLower),
    )
  }, [searchTerm])

  const handlePatientToggle = (patientId: string) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId],
    )
  }

  const handleSendTest = () => {
    if (!selectedTest || selectedPatients.length === 0) return

    // Here you would implement the actual sending logic
    console.log("[v0] Sending test:", selectedTest, "to patients:", selectedPatients)

    // Show success message and redirect
    alert(`Test enviado exitosamente a ${selectedPatients.length} paciente(s)`)
    window.location.href = "/dashboard/psicologo/tests"
  }

  return (
    <AuthGuard requiredUserType="psicologo">
      <div className="flex min-h-screen bg-gray-50">
        <Navigation userType="psicologo" />

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-gray-900">Enviar Test</h1>
                  <p className="text-gray-600 text-lg">Selecciona el test y los pacientes destinatarios</p>
                </div>
                <Button onClick={() => window.history.back()} variant="outline" className="px-6 py-3">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Volver
                </Button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">
            {/* Test Selection */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">1. Seleccionar Test</CardTitle>
                <CardDescription className="text-gray-600">Elige el test psicológico que deseas enviar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testsDisponibles.map((test) => (
                    <Card
                      key={test.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedTest === test.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                      }`}
                      onClick={() => setSelectedTest(test.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              selectedTest === test.id ? "bg-blue-600 border-blue-600" : "border-gray-300"
                            }`}
                          >
                            {selectedTest === test.id && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{test.nombre}</h3>
                            <p className="text-sm text-gray-600">{test.descripcion}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Selection */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">2. Seleccionar Pacientes</CardTitle>
                <CardDescription className="text-gray-600">
                  Elige los pacientes que recibirán el test ({selectedPatients.length} seleccionados)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar pacientes..."
                    className="pl-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Patients List */}
                <div className="space-y-3">
                  {filteredPatients.map((paciente) => (
                    <Card
                      key={paciente.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedPatients.includes(paciente.id)
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                      }`}
                      onClick={() => handlePatientToggle(paciente.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                selectedPatients.includes(paciente.id)
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedPatients.includes(paciente.id) && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{paciente.nombre}</h3>
                                <p className="text-sm text-gray-600">{paciente.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={paciente.estado === "activo" ? "default" : "secondary"}
                              className={
                                paciente.estado === "activo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {paciente.estado}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">Última consulta: {paciente.ultimaConsulta}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPatients.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pacientes</h3>
                    <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Send Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSendTest}
                disabled={!selectedTest || selectedPatients.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Enviar Test a {selectedPatients.length} Paciente{selectedPatients.length !== 1 ? "s" : ""}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
