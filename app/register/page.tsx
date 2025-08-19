"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, User, Stethoscope, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    license: "", // For psychologists
    specialty: "", // For psychologists
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"psicologo" | "paciente">("psicologo")
  const router = useRouter()
  const { login, user } = useAuth()

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (user?.isAuthenticated) {
      if (user.userType === "psicologo") {
        router.push("/dashboard/psicologo")
      } else {
        router.push("/dashboard/paciente")
      }
      return
    }

    const intendedUserType = localStorage.getItem("intendedUserType")
    console.log("Registration - Intended user type from localStorage:", intendedUserType)
    if (intendedUserType === "paciente") {
      setUserType("paciente")
      console.log("Registration - Setting userType to paciente")
    } else {
      setUserType("psicologo")
      console.log("Registration - Setting userType to psicologo (default)")
    }
    // Don't remove from localStorage yet - keep it until registration is successful
  }, [user, router])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones")
      return
    }

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      const userData = {
        email: formData.email,
        name: formData.name,
        userType,
        isAuthenticated: true,
      }

      console.log("Registration - Creating user with userData:", userData)
      login(userData)

      localStorage.removeItem("intendedUserType")

      // Redirect to appropriate dashboard
      console.log("Registration - Redirecting to dashboard for:", userType)
      if (userType === "psicologo") {
        router.push("/dashboard/psicologo")
      } else {
        router.push("/dashboard/paciente")
      }

      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PsiKit</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Únete a la plataforma de psicología digital</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>Completa tus datos para crear tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "psicologo" | "paciente")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="psicologo" className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4" />
                  <span>Psicólogo</span>
                </TabsTrigger>
                <TabsTrigger value="paciente" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Paciente</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="psicologo">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        placeholder="Dr. Juan Pérez"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">Matrícula</Label>
                      <Input
                        id="license"
                        placeholder="12345"
                        value={formData.license}
                        onChange={(e) => handleInputChange("license", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Input
                      id="specialty"
                      placeholder="Psicología Clínica"
                      value={formData.specialty}
                      onChange={(e) => handleInputChange("specialty", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email profesional</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+54 11 1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label
                            htmlFor="terms"
                            className="text-base font-medium text-gray-900 cursor-pointer block leading-relaxed"
                          >
                            Acepto los términos y condiciones
                          </Label>
                          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                            Al crear tu cuenta, confirmas que has leído y aceptas nuestros{" "}
                            <Link href="/terminos" className="text-blue-600 hover:text-blue-800 underline font-medium">
                              Términos y Condiciones
                            </Link>{" "}
                            y nuestra{" "}
                            <Link
                              href="/privacidad"
                              className="text-blue-600 hover:text-blue-800 underline font-medium"
                            >
                              Política de Privacidad
                            </Link>
                            .
                          </p>
                        </div>
                        <div className="border-t border-blue-200 pt-3">
                          <p className="text-xs text-gray-600 leading-relaxed">
                            También aceptas recibir comunicaciones importantes relacionadas con tu cuenta y servicios
                            profesionales.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || !formData.acceptTerms}>
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta Profesional"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="paciente">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-paciente">Nombre completo</Label>
                    <Input
                      id="name-paciente"
                      placeholder="María González"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-paciente">Email</Label>
                    <Input
                      id="email-paciente"
                      type="email"
                      placeholder="maria@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-paciente">Teléfono</Label>
                    <Input
                      id="phone-paciente"
                      type="tel"
                      placeholder="+54 11 1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password-paciente">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="password-paciente"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword-paciente">Confirmar</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword-paciente"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id="terms-paciente"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label
                            htmlFor="terms-paciente"
                            className="text-base font-medium text-gray-900 cursor-pointer block leading-relaxed"
                          >
                            Acepto los términos y condiciones
                          </Label>
                          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                            Al crear tu cuenta, confirmas que has leído y aceptas nuestros{" "}
                            <Link href="/terminos" className="text-blue-600 hover:text-blue-800 underline font-medium">
                              Términos y Condiciones
                            </Link>{" "}
                            y nuestra{" "}
                            <Link
                              href="/privacidad"
                              className="text-blue-600 hover:text-blue-800 underline font-medium"
                            >
                              Política de Privacidad
                            </Link>
                            .
                          </p>
                        </div>
                        <div className="border-t border-blue-200 pt-3">
                          <p className="text-xs text-gray-600 leading-relaxed">
                            También aceptas recibir comunicaciones importantes relacionadas con tu cuenta y cuidado de
                            salud mental.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || !formData.acceptTerms}>
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta de Paciente"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
