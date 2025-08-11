"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Globe, Shield, Server, Settings, CheckCircle, Copy, ExternalLink, RefreshCw, MapPin } from "lucide-react"
import { domainConfig, domainManager } from "@/lib/domain-config"

export function DomainSettings() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentRegion, setCurrentRegion] = useState("argentina")
  const [domainStatus, setDomainStatus] = useState({
    ssl: true,
    dns: true,
    cdn: true,
    api: true,
  })
  const [customDomain, setCustomDomain] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const region = domainManager.detectRegion()
    setCurrentRegion(region)
  }, [])

  const checkDomainStatus = async () => {
    setIsVerifying(true)
    // Simular verificación de dominio
    setTimeout(() => {
      setDomainStatus({
        ssl: Math.random() > 0.1,
        dns: Math.random() > 0.05,
        cdn: Math.random() > 0.02,
        api: Math.random() > 0.03,
      })
      setIsVerifying(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const regionConfig = domainConfig.regions[currentRegion]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configuración de Dominio</h1>
          <p className="text-gray-600">Gestiona los dominios, SSL, DNS y configuraciones regionales de PsiKit</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="domains">Dominios</TabsTrigger>
            <TabsTrigger value="dns">DNS</TabsTrigger>
            <TabsTrigger value="ssl">SSL/TLS</TabsTrigger>
            <TabsTrigger value="regions">Regiones</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Estado General */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Estado del Dominio</span>
                </CardTitle>
                <CardDescription>Estado actual de todos los servicios de dominio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="font-medium">SSL/TLS</span>
                    </div>
                    <Badge variant={domainStatus.ssl ? "default" : "destructive"}>
                      {domainStatus.ssl ? "Activo" : "Error"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">DNS</span>
                    </div>
                    <Badge variant={domainStatus.dns ? "default" : "destructive"}>
                      {domainStatus.dns ? "Activo" : "Error"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">CDN</span>
                    </div>
                    <Badge variant={domainStatus.cdn ? "default" : "destructive"}>
                      {domainStatus.cdn ? "Activo" : "Error"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">API</span>
                    </div>
                    <Badge variant={domainStatus.api ? "default" : "destructive"}>
                      {domainStatus.api ? "Activo" : "Error"}
                    </Badge>
                  </div>
                </div>

                <Button onClick={checkDomainStatus} disabled={isVerifying} className="w-full">
                  {isVerifying ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Verificar Estado
                </Button>
              </CardContent>
            </Card>

            {/* Dominio Principal */}
            <Card>
              <CardHeader>
                <CardTitle>Dominio Principal</CardTitle>
                <CardDescription>Configuración del dominio principal de PsiKit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{domainConfig.primary}</p>
                      <p className="text-sm text-gray-600">Dominio principal</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-600">Verificado</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(domainConfig.subdomains).map(([key, subdomain]) => (
                      <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{subdomain}</p>
                          <p className="text-xs text-gray-600 capitalize">{key}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(subdomain)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Región Actual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Región Actual</span>
                </CardTitle>
                <CardDescription>Configuración regional detectada automáticamente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium capitalize">{currentRegion}</p>
                      <p className="text-sm text-gray-600">{regionConfig.domain}</p>
                    </div>
                    <Badge>{regionConfig.currency}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Idioma:</p>
                      <p className="text-gray-600">{regionConfig.language}</p>
                    </div>
                    <div>
                      <p className="font-medium">Zona Horaria:</p>
                      <p className="text-gray-600">{regionConfig.timezone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domains Tab */}
          <TabsContent value="domains" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Dominios</CardTitle>
                <CardDescription>Configura dominios personalizados y subdominios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agregar Dominio Personalizado */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-4">Agregar Dominio Personalizado</h4>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="mi-consultorio.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      className="flex-1"
                    />
                    <Button>Agregar</Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Agrega tu propio dominio para personalizar tu consultorio virtual
                  </p>
                </div>

                {/* Lista de Dominios */}
                <div className="space-y-3">
                  <h4 className="font-medium">Dominios Configurados</h4>

                  {/* Dominio Principal */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">{domainConfig.primary}</p>
                        <p className="text-sm text-gray-600">Dominio principal</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Principal</Badge>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Subdominios */}
                  {Object.entries(domainConfig.subdomains).map(([key, subdomain]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{subdomain}</p>
                          <p className="text-sm text-gray-600 capitalize">Subdominio - {key}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Activo</Badge>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DNS Tab */}
          <TabsContent value="dns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración DNS</CardTitle>
                <CardDescription>Gestiona los registros DNS de tu dominio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Proveedor DNS</p>
                      <p className="text-sm text-gray-600">{domainConfig.dns.provider}</p>
                    </div>
                    <Badge>Activo</Badge>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium">Registros DNS</h4>
                    </div>
                    <div className="divide-y">
                      {domainConfig.dns.records.slice(0, 10).map((record, index) => (
                        <div key={index} className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">{record.type}</Badge>
                            <div>
                              <p className="font-medium">{record.name === "@" ? domainConfig.primary : record.name}</p>
                              <p className="text-sm text-gray-600">{record.value}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">TTL: {record.ttl}s</span>
                            <Button size="sm" variant="ghost">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Todos los Registros ({domainConfig.dns.records.length})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SSL Tab */}
          <TabsContent value="ssl" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Certificados SSL/TLS</span>
                </CardTitle>
                <CardDescription>Gestiona la seguridad y encriptación de tu dominio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Estado SSL */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">SSL Activo</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Todos los dominios están protegidos con certificados SSL válidos
                  </p>
                </div>

                {/* Configuración SSL */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Proveedor SSL</p>
                      <p className="text-sm text-gray-600">{domainConfig.ssl.provider}</p>
                    </div>
                    <Badge>Activo</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Renovación Automática</p>
                      <p className="text-sm text-gray-600">Los certificados se renuevan automáticamente</p>
                    </div>
                    <Switch checked={domainConfig.ssl.autoRenewal} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Redirección HTTPS</p>
                      <p className="text-sm text-gray-600">Forzar conexiones seguras</p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">HSTS</p>
                      <p className="text-sm text-gray-600">HTTP Strict Transport Security</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>

                {/* Certificados por Dominio */}
                <div className="space-y-3">
                  <h4 className="font-medium">Certificados por Dominio</h4>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{domainConfig.primary}</p>
                        <p className="text-sm text-gray-600">Válido hasta: 15/04/2024</p>
                      </div>
                      <Badge className="bg-green-600">Válido</Badge>
                    </div>

                    {Object.values(domainConfig.subdomains).map((subdomain, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{subdomain}</p>
                          <p className="text-sm text-gray-600">Válido hasta: 15/04/2024</p>
                        </div>
                        <Badge className="bg-green-600">Válido</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regions Tab */}
          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Configuración Regional</span>
                </CardTitle>
                <CardDescription>Gestiona dominios y configuraciones específicas por región</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(domainConfig.regions).map(([region, config]) => (
                    <Card key={region} className={region === currentRegion ? "border-blue-500" : ""}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg capitalize">{region}</CardTitle>
                          <div className="flex items-center space-x-2">
                            {region === currentRegion && <Badge>Actual</Badge>}
                            <Badge variant="outline">{config.currency}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Dominio</Label>
                            <div className="flex items-center space-x-2">
                              <Input value={config.domain} readOnly className="text-sm" />
                              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(config.domain)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">API</Label>
                            <div className="flex items-center space-x-2">
                              <Input value={config.api} readOnly className="text-sm" />
                              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(config.api)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Idioma</Label>
                            <Input value={config.language} readOnly className="text-sm" />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Zona Horaria</Label>
                            <Input value={config.timezone} readOnly className="text-sm" />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-2 block">Números de Emergencia</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 bg-red-50 border border-red-200 rounded text-center">
                              <p className="text-xs font-medium">Policía</p>
                              <p className="font-bold">{config.emergencyNumbers.police}</p>
                            </div>
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded text-center">
                              <p className="text-xs font-medium">Médica</p>
                              <p className="font-bold">{config.emergencyNumbers.medical}</p>
                            </div>
                            <div className="p-2 bg-green-50 border border-green-200 rounded text-center">
                              <p className="text-xs font-medium">Crisis</p>
                              <p className="font-bold">{config.emergencyNumbers.crisis}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
