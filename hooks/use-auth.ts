"use client"

import { useAuth as useAuthContext } from "@/contexts/auth-context"

export const useAuth = () => {
  return useAuthContext()
}

export const useRequireAuth = (requiredUserType?: "psicologo" | "paciente") => {
  const auth = useAuthContext()

  const isAuthorized = () => {
    if (!auth.user?.isAuthenticated) return false
    if (requiredUserType && auth.user.userType !== requiredUserType) return false
    return true
  }

  return {
    ...auth,
    isAuthorized: isAuthorized(),
  }
}
