"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { WifiOff, Signal, SignalHigh, SignalLow, SignalMedium, Settings, RefreshCw, AlertTriangle } from "lucide-react"

interface ConnectionStats {
  bandwidth: number
  latency: number
  packetLoss: number
  jitter: number
  quality: "excellent" | "good" | "fair" | "poor"
}

interface ConnectionQualityMonitorProps {
  onQualityChange?: (quality: ConnectionStats["quality"]) => void
  onRecommendation?: (recommendation: string) => void
}

export function ConnectionQualityMonitor({ onQualityChange, onRecommendation }: ConnectionQualityMonitorProps) {
  const [stats, setStats] = useState<ConnectionStats>({
    bandwidth: 0,
    latency: 0,
    packetLoss: 0,
    jitter: 0,
    quality: "good",
  })
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [recommendations, setRecommendations] = useState<string[]>([])

  // Simular medición de conexión
  const measureConnection = useCallback(async () => {
    setIsMonitoring(true)

    try {
      // Simular medición de latencia
      const startTime = performance.now()
      await fetch("/api/ping", { method: "HEAD" }).catch(() => {})
      const latency = performance.now() - startTime

      // Simular medición de ancho de banda
      const bandwidth = Math.random() * 50 + 10 // 10-60 Mbps

      // Simular pérdida de paquetes y jitter
      const packetLoss = Math.random() * 5 // 0-5%
      const jitter = Math.random() * 20 + 5 // 5-25ms

      // Determinar calidad
      let quality: ConnectionStats["quality"] = "excellent"
      if (latency > 150 || bandwidth < 5 || packetLoss > 2) {
        quality = "poor"
      } else if (latency > 100 || bandwidth < 10 || packetLoss > 1) {
        quality = "fair"
      } else if (latency > 50 || bandwidth < 20) {
        quality = "good"
      }

      const newStats = {
        bandwidth: Math.round(bandwidth * 10) / 10,
        latency: Math.round(latency),
        packetLoss: Math.round(packetLoss * 10) / 10,
        jitter: Math.round(jitter),
        quality,
      }

      setStats(newStats)
      onQualityChange?.(quality)

      // Generar recomendaciones
      const newRecommendations: string[] = []
      if (latency > 100) {
        newRecommendations.push("Latencia alta detectada. Considere cerrar otras aplicaciones.")
      }
      if (bandwidth < 10) {
        newRecommendations.push("Ancho de banda bajo. Desactive el video si es necesario.")
      }
      if (packetLoss > 1) {
        newRecommendations.push("Pérdida de paquetes detectada. Verifique su conexión WiFi.")
      }
      if (jitter > 15) {
        newRecommendations.push("Jitter alto. Considere usar conexión por cable.")
      }

      setRecommendations(newRecommendations)

      if (newRecommendations.length > 0) {
        onRecommendation?.(newRecommendations[0])
      }
    } catch (error) {
      console.error("Error midiendo conexión:", error)
    } finally {
      setIsMonitoring(false)
    }
  }, [onQualityChange, onRecommendation])

  // Monitoreo automático cada 30 segundos
  useEffect(() => {
    measureConnection()
    const interval = setInterval(measureConnection, 30000)
    return () => clearInterval(interval)
  }, [measureConnection])

  const getQualityIcon = () => {
    switch (stats.quality) {
      case "excellent":
        return <SignalHigh className="h-5 w-5 text-green-600" />
      case "good":
        return <SignalMedium className="h-5 w-5 text-blue-600" />
      case "fair":
        return <SignalLow className="h-5 w-5 text-yellow-600" />
      case "poor":
        return <WifiOff className="h-5 w-5 text-red-600" />
      default:
        return <Signal className="h-5 w-5 text-gray-600" />
    }
  }

  const getQualityColor = () => {
    switch (stats.quality) {
      case "excellent":
        return "bg-green-600"
      case "good":
        return "bg-blue-600"
      case "fair":
        return "bg-yellow-600"
      case "poor":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getQualityText = () => {
    switch (stats.quality) {
      case "excellent":
        return "Excelente"
      case "good":
        return "Buena"
      case "fair":
        return "Regular"
      case "poor":
        return "Pobre"
      default:
        return "Desconocida"
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getQualityIcon()}
            <span>Calidad de Conexión</span>
          </div>
          <Button size="sm" variant="outline" onClick={measureConnection} disabled={isMonitoring}>
            {isMonitoring ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Estado general */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Estado:</span>
          <Badge className={getQualityColor()}>{getQualityText()}</Badge>
        </div>

        {/* Métricas detalladas */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Ancho de banda</span>
              <span>{stats.bandwidth} Mbps</span>
            </div>
            <Progress value={Math.min((stats.bandwidth / 50) * 100, 100)} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Latencia</span>
              <span>{stats.latency} ms</span>
            </div>
            <Progress value={Math.max(100 - (stats.latency / 200) * 100, 0)} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pérdida de paquetes</span>
              <span>{stats.packetLoss}%</span>
            </div>
            <Progress value={Math.max(100 - (stats.packetLoss / 5) * 100, 0)} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Jitter</span>
              <span>{stats.jitter} ms</span>
            </div>
            <Progress value={Math.max(100 - (stats.jitter / 30) * 100, 0)} className="h-2" />
          </div>
        </div>

        {/* Recomendaciones */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-orange-600">
              <AlertTriangle className="h-4 w-4" />
              <span>Recomendaciones:</span>
            </div>
            <div className="space-y-1">
              {recommendations.map((rec, index) => (
                <p key={index} className="text-xs text-gray-600 bg-orange-50 p-2 rounded">
                  {rec}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Configuración automática */}
        <div className="pt-3 border-t">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Optimizar Automáticamente
          </Button>
        </div>

        {/* Información técnica */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Medición cada 30 segundos</p>
          <p>• Optimización automática habilitada</p>
          <p>• Última actualización: {new Date().toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
