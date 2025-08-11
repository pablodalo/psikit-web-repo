"use client"

interface DomainConfig {
  primary: string
  subdomains: {
    api: string
    cdn: string
    admin: string
    docs: string
    status: string
  }
  regions: {
    [key: string]: {
      domain: string
      cdn: string
      api: string
      currency: string
      language: string
      timezone: string
      emergencyNumbers: {
        police: string
        medical: string
        crisis: string
      }
    }
  }
  ssl: {
    enabled: boolean
    provider: string
    autoRenewal: boolean
  }
  dns: {
    provider: string
    records: DNSRecord[]
  }
}

interface DNSRecord {
  type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "SRV"
  name: string
  value: string
  ttl: number
  priority?: number
}

export const domainConfig: DomainConfig = {
  primary: "psikit.com",
  subdomains: {
    api: "api.psikit.com",
    cdn: "cdn.psikit.com",
    admin: "admin.psikit.com",
    docs: "docs.psikit.com",
    status: "status.psikit.com",
  },
  regions: {
    argentina: {
      domain: "ar.psikit.com",
      cdn: "cdn-ar.psikit.com",
      api: "api-ar.psikit.com",
      currency: "ARS",
      language: "es-AR",
      timezone: "America/Argentina/Buenos_Aires",
      emergencyNumbers: {
        police: "911",
        medical: "107",
        crisis: "135",
      },
    },
    mexico: {
      domain: "mx.psikit.com",
      cdn: "cdn-mx.psikit.com",
      api: "api-mx.psikit.com",
      currency: "MXN",
      language: "es-MX",
      timezone: "America/Mexico_City",
      emergencyNumbers: {
        police: "911",
        medical: "911",
        crisis: "800-290-0024",
      },
    },
    colombia: {
      domain: "co.psikit.com",
      cdn: "cdn-co.psikit.com",
      api: "api-co.psikit.com",
      currency: "COP",
      language: "es-CO",
      timezone: "America/Bogota",
      emergencyNumbers: {
        police: "123",
        medical: "125",
        crisis: "106",
      },
    },
    chile: {
      domain: "cl.psikit.com",
      cdn: "cdn-cl.psikit.com",
      api: "api-cl.psikit.com",
      currency: "CLP",
      language: "es-CL",
      timezone: "America/Santiago",
      emergencyNumbers: {
        police: "133",
        medical: "131",
        crisis: "600-360-7777",
      },
    },
    peru: {
      domain: "pe.psikit.com",
      cdn: "cdn-pe.psikit.com",
      api: "api-pe.psikit.com",
      currency: "PEN",
      language: "es-PE",
      timezone: "America/Lima",
      emergencyNumbers: {
        police: "105",
        medical: "117",
        crisis: "113",
      },
    },
  },
  ssl: {
    enabled: true,
    provider: "Let's Encrypt",
    autoRenewal: true,
  },
  dns: {
    provider: "Cloudflare",
    records: [
      // Registro principal
      { type: "A", name: "@", value: "76.76.19.123", ttl: 300 },
      { type: "AAAA", name: "@", value: "2606:4700:3033::ac43:d877", ttl: 300 },

      // Subdominio www
      { type: "CNAME", name: "www", value: "psikit.com", ttl: 300 },

      // API
      { type: "A", name: "api", value: "76.76.19.124", ttl: 300 },
      { type: "AAAA", name: "api", value: "2606:4700:3033::ac43:d878", ttl: 300 },

      // CDN
      { type: "CNAME", name: "cdn", value: "cdn.vercel.com", ttl: 300 },

      // Admin
      { type: "CNAME", name: "admin", value: "psikit.com", ttl: 300 },

      // Docs
      { type: "CNAME", name: "docs", value: "psikit.com", ttl: 300 },

      // Status
      { type: "CNAME", name: "status", value: "status.vercel.com", ttl: 300 },

      // Regiones
      { type: "A", name: "ar", value: "76.76.19.125", ttl: 300 },
      { type: "A", name: "mx", value: "76.76.19.126", ttl: 300 },
      { type: "A", name: "co", value: "76.76.19.127", ttl: 300 },
      { type: "A", name: "cl", value: "76.76.19.128", ttl: 300 },
      { type: "A", name: "pe", value: "76.76.19.129", ttl: 300 },

      // Email
      { type: "MX", name: "@", value: "mx1.forwardemail.net", ttl: 300, priority: 10 },
      { type: "MX", name: "@", value: "mx2.forwardemail.net", ttl: 300, priority: 20 },

      // Verificación
      { type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: 300 },
      { type: "TXT", name: "_dmarc", value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@psikit.com", ttl: 300 },
      { type: "TXT", name: "google._domainkey", value: "v=DKIM1; k=rsa; p=...", ttl: 300 },

      // Verificación de dominio
      { type: "TXT", name: "@", value: "psikit-verification=abc123def456", ttl: 300 },
    ],
  },
}

export class DomainManager {
  private static instance: DomainManager
  private currentRegion = "argentina"

  static getInstance(): DomainManager {
    if (!DomainManager.instance) {
      DomainManager.instance = new DomainManager()
    }
    return DomainManager.instance
  }

  detectRegion(): string {
    if (typeof window === "undefined") return this.currentRegion

    const hostname = window.location.hostname

    // Detectar por subdominio
    for (const [region, config] of Object.entries(domainConfig.regions)) {
      if (hostname === config.domain || hostname.includes(`.${region}.`)) {
        this.currentRegion = region
        return region
      }
    }

    // Detectar por geolocalización (si está disponible)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        this.currentRegion = this.getRegionByCoordinates(latitude, longitude)
      })
    }

    return this.currentRegion
  }

  private getRegionByCoordinates(lat: number, lng: number): string {
    // Rangos aproximados para cada país
    const regions = {
      argentina: { latMin: -55, latMax: -21, lngMin: -73, lngMax: -53 },
      mexico: { latMin: 14, latMax: 33, lngMin: -118, lngMax: -86 },
      colombia: { latMin: -4, latMax: 13, lngMin: -82, lngMax: -66 },
      chile: { latMin: -56, latMax: -17, lngMin: -76, lngMax: -66 },
      peru: { latMin: -18, latMax: 0, lngMin: -81, lngMax: -68 },
    }

    for (const [region, bounds] of Object.entries(regions)) {
      if (lat >= bounds.latMin && lat <= bounds.latMax && lng >= bounds.lngMin && lng <= bounds.lngMax) {
        return region
      }
    }

    return "argentina" // Default
  }

  getCurrentRegionConfig() {
    return domainConfig.regions[this.currentRegion]
  }

  getApiUrl(): string {
    const regionConfig = this.getCurrentRegionConfig()
    return `https://${regionConfig.api}`
  }

  getCdnUrl(): string {
    const regionConfig = this.getCurrentRegionConfig()
    return `https://${regionConfig.cdn}`
  }

  getEmergencyNumbers() {
    const regionConfig = this.getCurrentRegionConfig()
    return regionConfig.emergencyNumbers
  }

  formatCurrency(amount: number): string {
    const regionConfig = this.getCurrentRegionConfig()
    return new Intl.NumberFormat(regionConfig.language, {
      style: "currency",
      currency: regionConfig.currency,
    }).format(amount)
  }

  formatDate(date: Date): string {
    const regionConfig = this.getCurrentRegionConfig()
    return new Intl.DateTimeFormat(regionConfig.language, {
      timeZone: regionConfig.timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  formatTime(date: Date): string {
    const regionConfig = this.getCurrentRegionConfig()
    return new Intl.DateTimeFormat(regionConfig.language, {
      timeZone: regionConfig.timezone,
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }
}

export const domainManager = DomainManager.getInstance()
