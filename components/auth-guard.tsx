"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredUserType?: "psicologo" | "paciente"
  redirectTo?: string
}

export function AuthGuard({ children, requiredUserType, redirectTo = "/login" }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!user?.isAuthenticated) {
        router.push(redirectTo)
        return
      }

      // Wrong user type
      if (requiredUserType && user.userType !== requiredUserType) {
        router.push(redirectTo)
        return
      }
    }
  }, [user, isLoading, requiredUserType, redirectTo, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Not authenticated or wrong user type
  if (!user?.isAuthenticated || (requiredUserType && user.userType !== requiredUserType)) {
    return null
  }

  return <>{children}</>
}
