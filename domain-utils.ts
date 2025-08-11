"use client"

export class DomainUtils {
  static isValidDomain(domain: string): boolean {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/
    return domainRegex.test(domain)
  }

  static extractRootDomain(domain: string): string {
    const parts = domain.split(".")
    if (parts.length >= 2) {
      return parts.slice(-2).join(".")
    }
    return domain
  }

  static getSubdomain(domain: string): string | null {
    const parts = domain.split(".")
    if (parts.length > 2) {
      return parts.slice(0, -2).join(".")
    }
    return null
  }

  static generateSSLConfig(domain: string) {
    return {
      domain,
      certificate: `-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----`,
      privateKey: `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----`,
      chain: `-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----`,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 días
    }
  }

  static checkDNSPropagation(domain: string, recordType = "A"): Promise<boolean> {
    return new Promise((resolve) => {
      // Simular verificación DNS
      setTimeout(() => {
        resolve(Math.random() > 0.2) // 80% éxito
      }, 2000)
    })
  }

  static generateDNSRecords(domain: string, ip: string) {
    return [
      { type: "A", name: "@", value: ip, ttl: 300 },
      { type: "A", name: "www", value: ip, ttl: 300 },
      { type: "CNAME", name: "api", value: domain, ttl: 300 },
      { type: "CNAME", name: "cdn", value: domain, ttl: 300 },
      { type: "MX", name: "@", value: `10 mail.${domain}`, ttl: 300 },
      { type: "TXT", name: "@", value: `v=spf1 include:_spf.google.com ~all`, ttl: 300 },
    ]
  }

  static validateSSLCertificate(certificate: string): boolean {
    // Validación básica del formato del certificado
    return certificate.includes("BEGIN CERTIFICATE") && certificate.includes("END CERTIFICATE")
  }

  static getRegionFromDomain(domain: string): string {
    const regionMap: Record<string, string> = {
      "ar.": "argentina",
      "mx.": "mexico",
      "co.": "colombia",
      "cl.": "chile",
      "pe.": "peru",
    }

    for (const [prefix, region] of Object.entries(regionMap)) {
      if (domain.startsWith(prefix)) {
        return region
      }
    }

    return "argentina" // Default
  }

  static formatDomainForDisplay(domain: string): string {
    return domain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
  }

  static generateVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  static createVerificationFile(token: string): { filename: string; content: string } {
    return {
      filename: "psikit-verification.txt",
      content: token,
    }
  }

  static createVerificationMetaTag(token: string): string {
    return `<meta name="psikit-verification" content="${token}" />`
  }

  static createVerificationDNSRecord(token: string) {
    return {
      type: "TXT" as const,
      name: "@",
      value: `psikit-verification=${token}`,
      ttl: 300,
    }
  }
}
