"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Shield, Server, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"

interface DomainStatus {
  domain: string
  ssl: boolean
  dns: boolean
  cdn: boolean
  lastCheck: Date
  uptime: number
}

export function DomainStatusWidget() {
  const [status, setStatus] = useState<DomainStatus>({
    domain: "psikit.com",
    ssl: true,
    dns: true,
    cdn: true,
    lastCheck: new Date(),
    uptime: 99.9,
  })
  const [isChecking, setIsChecking] = useState(false)

  const checkStatus = async () => {
    setIsChecking(true)

    // Simular verificación
    setTimeout(() => {
      setStatus((prev) => ({
        ...prev,
        ssl: Math.random() > 0.05,
        dns: Math.random() > 0.02,
        cdn: Math.random() > 0.03,
        lastCheck: new Date(),
        uptime: 99.5 + Math.random() * 0.5,
      }))
      setIsChecking(false)
    }, 2000)
  }

  useEffect(() => {
    // Verificación automática cada 5 minutos
    const interval = setInterval(checkStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getOverallStatus = () => {
    return status.ssl && status.dns && status.cdn ? "operational" : "issues"
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Estado del Dominio</span>
          </div>
          <Button size="sm" variant="ghost" onClick={checkStatus} disabled={isChecking}>
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Estado General */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            {getOverallStatus() === "operational" ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            )}
            <span className="font-medium">{status.domain}</span>
          </div>
          <Badge variant={getOverallStatus() === "operational" ? "default" : "secondary"}>
            {getOverallStatus() === "operational" ? "Operacional" : "Problemas"}
          </Badge>
        </div>

        {/* Servicios */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm">SSL/TLS</span>
            </div>
            <Badge variant={status.ssl ? "default" : "destructive"}>{status.ssl ? "Activo" : "Error"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-blue-600" />
              <span className="text-sm">DNS</span>
            </div>
            <Badge variant={status.dns ? "default" : "destructive"}>{status.dns ? "Activo" : "Error"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-purple-600" />
              <span className="text-sm">CDN</span>
            </div>
            <Badge variant={status.cdn ? "default" : "destructive"}>{status.cdn ? "Activo" : "Error"}</Badge>
          </div>
        </div>

        {/* Métricas */}
        <div className="pt-3 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Uptime</span>
            <span className="font-medium">{status.uptime.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Última verificación</span>
            <span className="font-medium">{status.lastCheck.toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
