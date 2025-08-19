"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  email: string
  name: string
  userType: "psicologo" | "paciente"
  isAuthenticated: boolean
  license?: string
  specialty?: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session on mount
    const checkAuth = () => {
      try {
        const userStr = localStorage.getItem("user")
        if (userStr) {
          const userData = JSON.parse(userStr)
          console.log("Auth context - Found existing user:", userData)
          if (userData.isAuthenticated) {
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData: User) => {
    console.log("Auth context - Logging in user:", userData)
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    console.log("Auth context - Logging out user")
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("intendedUserType")
    window.location.href = "/"
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
