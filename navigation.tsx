"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Brain, Calendar, Users, FileText, CreditCard, Video, Settings, Home, Bell } from "lucide-react"

interface NavigationProps {
  userType: "psicologo" | "paciente"
}

export function Navigation({ userType }: NavigationProps) {
  const pathname = usePathname()

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

  return (
    <nav className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">PsiKit</span>
        </Link>

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

        <div className="mt-8 pt-8 border-t">
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-3" />
            Notificaciones
          </Button>
        </div>
      </div>
    </nav>
  )
}
