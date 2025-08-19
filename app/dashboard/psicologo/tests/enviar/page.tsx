"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check, Search, User, Send, Clock, Mail, Phone } from "lucide-react"

export default function EnviarTestPage() {
  const searchParams = useSearchParams()
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const testId = searchParams.get("test")
    if (testId) {
      console.log("[v0] Setting initial test from URL:", testId)
      setSelectedTest(testId)
    }
  }, [searchParams])

  const pacientes = [
    {
      id: "1",
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      telefono: "+34 612 345 678",
      ultimaConsulta: "10/01/2024",
      estado: "activo",
      edad: 34,
      diagnostico: "Ansiedad",
    },
    {
      id: "2",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      telefono: "+34 687 654 321",
      ultimaConsulta: "08/01/2024",
      estado: "activo",
      edad: 28,
      diagnostico: "Depresión",
    },
    {
      id: "3",
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      telefono: "+34 654 987 123",
      ultimaConsulta: "05/01/2024",
      estado: "inactivo",
      edad: 45,
      diagnostico: "Trastorno bipolar",
    },
    {
      id: "4",
      nombre: "Luis Fernández",
      email: "luis.fernandez@email.com",
      telefono: "+34 698 123 456",
      ultimaConsulta: "12/01/2024",
      estado: "activo",
      edad: 52,
      diagnostico: "Estrés postraumático",
    },
    {
      id: "5",
      nombre: "Carmen López",
      email: "carmen.lopez@email.com",
      telefono: "+34 645 789 012",
      ultimaConsulta: "15/01/2024",
      estado: "activo",
      edad: 39,
      diagnostico: "Trastorno de pánico",
    },
  ]

  const testsDisponibles = [
    { id: "1", nombre: "PHQ-9", descripcion: "Cuestionario de Salud del Paciente - Depresión", duracion: "5-10 min" },
    { id: "2", nombre: "GAD-7", descripcion: "Escala de Ansiedad Generalizada", duracion: "3-5 min" },
    {
      id: "3",
      nombre: "Rosenberg Self-Esteem Scale",
      descripcion: "Escala de Autoestima de Rosenberg",
      duracion: "5 min",
    },
    {
      id: "4",
      nombre: "AUDIT",
      descripcion: "Test de Identificación de Trastornos por Uso de Alcohol",
      duracion: "10 min",
    },
    { id: "5", nombre: "MMSE", descripcion: "Mini Examen del Estado Mental", duracion: "15-20 min" },
    { id: "6", nombre: "MoCA", descripcion: "Evaluación Cognitiva de Montreal", duracion: "10-15 min" },
  ]

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return pacientes

    const searchLower = searchTerm.toLowerCase()
    return pacientes.filter(
      (paciente) =>
        paciente.nombre.toLowerCase().includes(searchLower) ||
        paciente.email.toLowerCase().includes(searchLower) ||
        paciente.telefono.includes(searchTerm) ||
        paciente.diagnostico.toLowerCase().includes(searchLower),
    )
  }, [searchTerm])

  const handlePatientToggle = (patientId: string) => {
    setSelectedPatients((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId],
    )
  }

  const handleSendTest = async () => {
    if (!selectedTest || selectedPatients.length === 0) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Sending test:", selectedTest, "to patients:", selectedPatients)

      // Show success message and redirect
      alert(`Test enviado exitosamente a ${selectedPatients.length} paciente(s)`)
      window.location.href = "/dashboard/psicologo/tests"
    } catch (error) {
      console.error("[v0] Error sending test:", error)
      alert("Error al enviar el test. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectAllFiltered = () => {
    const filteredIds = filteredPatients.map((p) => p.id)
    const allSelected = filteredIds.every((id) => selectedPatients.includes(id))

    if (allSelected) {
      setSelectedPatients((prev) => prev.filter((id) => !filteredIds.includes(id)))
    } else {
      setSelectedPatients((prev) => [...new Set([...prev, ...filteredIds])])
    }
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
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    1
                  </div>
                  Seleccionar Test
                  {selectedTest && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 ml-2">Test seleccionado</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {selectedTest
                    ? "Puedes cambiar tu selección haciendo clic en otro test"
                    : "Elige el test psicológico que deseas enviar"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTest && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">
                        Test actual: {testsDisponibles.find((t) => t.id === selectedTest)?.nombre}
                      </span>
                    </div>
                    <p className="text-blue-600 text-sm mt-1">Haz clic en cualquier otro test para cambiarlo</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testsDisponibles.map((test) => {
                    const isSelected = selectedTest === test.id
                    console.log("[v0] Rendering test:", test.id, "Selected:", selectedTest, "IsSelected:", isSelected)

                    return (
                      <Card
                        key={test.id}
                        className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200 scale-105"
                            : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log("[v0] Card clicked for test:", test.id, "Current selected:", selectedTest)
                          setSelectedTest(test.id)
                        }}
                      >
                        <CardContent className="p-4 relative">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                                isSelected
                                  ? "bg-blue-600 border-blue-600 scale-110"
                                  : "border-gray-300 hover:border-blue-400"
                              }`}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                console.log(
                                  "[v0] Checkbox clicked for test:",
                                  test.id,
                                  "Current selected:",
                                  selectedTest,
                                )
                                setSelectedTest(test.id)
                              }}
                            >
                              {isSelected && <Check className="h-4 w-4 text-white" />}
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-semibold mb-1 ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                                {test.nombre}
                              </h3>
                              <p className={`text-sm mb-2 ${isSelected ? "text-blue-700" : "text-gray-600"}`}>
                                {test.descripcion}
                              </p>
                              <div
                                className={`flex items-center gap-1 text-xs ${
                                  isSelected ? "text-blue-600" : "text-gray-500"
                                }`}
                              >
                                <Clock className="h-3 w-3" />
                                {test.duracion}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {selectedTest && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTest(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Limpiar selección
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Patient Selection */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    2
                  </div>
                  Seleccionar Pacientes
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Elige los pacientes que recibirán el test ({selectedPatients.length} seleccionados)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Buscar por nombre, email, teléfono o diagnóstico..."
                      className="pl-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {filteredPatients.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleSelectAllFiltered}
                      className="whitespace-nowrap bg-transparent"
                    >
                      {filteredPatients.every((p) => selectedPatients.includes(p.id))
                        ? "Deseleccionar todos"
                        : "Seleccionar todos"}
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {filteredPatients.map((paciente) => (
                    <Card
                      key={paciente.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedPatients.includes(paciente.id)
                          ? "border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200"
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
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{paciente.nombre}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {paciente.email}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {paciente.telefono}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                  {paciente.edad} años • {paciente.diagnostico}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={paciente.estado === "activo" ? "default" : "secondary"}
                              className={
                                paciente.estado === "activo"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-gray-100 text-gray-800 border-gray-200"
                              }
                            >
                              {paciente.estado}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Última consulta: {paciente.ultimaConsulta}
                            </p>
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
                disabled={!selectedTest || selectedPatients.length === 0 || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 text-lg min-w-[200px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Test a {selectedPatients.length} Paciente{selectedPatients.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
