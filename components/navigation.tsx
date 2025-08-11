"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Brain, Calendar, Users, FileText, CreditCard, Video, Settings, Home, Bell, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface NavigationProps {
  userType: "psicologo" | "paciente"
}

export function Navigation({ userType }: NavigationProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const psicologoNavItems = [
    { href: "/dashboard/psicologo", label: "Dashboard", icon: Home },
    { href: "/dashboard/psicologo/pacientes", label: "Pacientes", icon: Users },
    { href: "/dashboard/psicologo/agenda", label: "Agenda", icon: Calendar },
    { href: "/dashboard/psicologo/sesiones", label: "Sesiones", icon: Video },
    { href: "/dashboard/psicologo/tests", label: "Tests", icon: FileText },
    { href: "/dashboard/psicologo/pagos", label: "Pagos", icon: CreditCard },
    { href: "/dashboard/psicologo/configuracion", label: "Configuración", icon: Settings },
  ]

  const pacienteNavItems = [
    { href: "/dashboard/paciente", label: "Mi Dashboard", icon: Home },
    { href: "/dashboard/paciente/sesiones", label: "Mis Sesiones", icon: Video },
    { href: "/dashboard/paciente/agenda", label: "Mi Agenda", icon: Calendar },
    { href: "/dashboard/paciente/documentos", label: "Documentos", icon: FileText },
    { href: "/dashboard/paciente/pagos", label: "Pagos", icon: CreditCard },
    { href: "/dashboard/paciente/configuracion", label: "Configuración", icon: Settings },
  ]

  const navItems = userType === "psicologo" ? psicologoNavItems : pacienteNavItems

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">PsiKit</span>
        </Link>

        {user && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-blue-100 text-blue-600">{getUserInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500">{user.userType === "psicologo" ? "Psicólogo" : "Paciente"}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn("w-full justify-start", isActive && "bg-blue-600 text-white hover:bg-blue-700")}
                >
                  <IconComponent className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t space-y-2">
          <Link
            href={
              userType === "psicologo" ? "/dashboard/psicologo/notificaciones" : "/dashboard/paciente/notificaciones"
            }
          >
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-3" />
              Notificaciones
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-3" />
                Mi Cuenta
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <Link href={userType === "psicologo" ? "/dashboard/psicologo/perfil" : "/dashboard/paciente/perfil"}>
                <DropdownMenuItem className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
              </Link>
              <Link
                href={
                  userType === "psicologo" ? "/dashboard/psicologo/configuracion" : "/dashboard/paciente/configuracion"
                }
              >
                <DropdownMenuItem className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
