"use client"

export interface User {
  email: string
  name: string
  userType: "psicologo" | "paciente"
  isAuthenticated: boolean
  license?: string
  specialty?: string
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    window.location.href = "/"
  }
}

export const isAuthenticated = (): boolean => {
  const user = getUser()
  return user?.isAuthenticated || false
}

export const requireAuth = (userType?: "psicologo" | "paciente") => {
  const user = getUser()

  if (!user?.isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
    return false
  }

  if (userType && user.userType !== userType) {
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
    return false
  }

  return true
}
