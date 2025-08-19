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
import { User, Stethoscope, Eye, EyeOff, Brain } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"psicologo" | "paciente">("psicologo")
  const router = useRouter()
  const { login, user } = useAuth()

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (user?.isAuthenticated) {
      console.log("User already authenticated:", user.userType)
      if (user.userType === "psicologo") {
        router.push("/dashboard/psicologo")
      } else {
        router.push("/dashboard/paciente")
      }
      return
    }

    const intendedUserType = localStorage.getItem("intendedUserType")
    console.log("Intended user type from localStorage:", intendedUserType)
    if (intendedUserType === "paciente") {
      setUserType("paciente")
      console.log("Setting userType to paciente")
    } else {
      setUserType("psicologo")
      console.log("Setting userType to psicologo (default)")
    }
    // Don't remove from localStorage yet - keep it until login is successful
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      const userData = {
        email,
        userType,
        name: userType === "psicologo" ? "Dr. Roberto Silva" : "María González",
        isAuthenticated: true,
      }

      console.log("Logging in with userData:", userData)
      login(userData)

      localStorage.removeItem("intendedUserType")

      // Redirect to appropriate dashboard
      console.log("Redirecting to dashboard for:", userType)
      if (userType === "psicologo") {
        router.push("/dashboard/psicologo")
      } else {
        router.push("/dashboard/paciente")
      }

      setIsLoading(false)
    }, 1500)
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
          <p className="text-gray-600">Accede a tu consultorio virtual</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bienvenido de vuelta</CardTitle>
            <CardDescription>Selecciona tu tipo de usuario e ingresa tus credenciales</CardDescription>
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
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email profesional</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Acceder al Consultorio"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="paciente">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-paciente">Email</Label>
                    <Input
                      id="email-paciente"
                      type="email"
                      placeholder="paciente@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-paciente">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password-paciente"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Acceder a Mi Portal"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="text-blue-600 hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          Al iniciar sesión, aceptas nuestros{" "}
          <Link href="/terminos" className="hover:underline">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link href="/privacidad" className="hover:underline">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </div>
  )
}
