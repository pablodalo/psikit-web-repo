"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Lock } from "lucide-react"
import { mercadoPago } from "@/lib/mercado-pago"

interface PaymentFormProps {
  amount: number
  description: string
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}

export function PaymentForm({ amount, description, onSuccess, onError }: PaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    holderName: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
    identificationType: "DNI",
    identificationNumber: "",
    email: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const cardToken = await mercadoPago.createCardToken({
        number: formData.cardNumber,
        holderName: formData.holderName,
        expirationMonth: formData.expirationMonth,
        expirationYear: formData.expirationYear,
        securityCode: formData.securityCode,
        identificationType: formData.identificationType,
        identificationNumber: formData.identificationNumber,
        email: formData.email,
      })

      // Procesar pago
      const paymentResult = await mercadoPago.processPayment({
        token: cardToken.id,
        transaction_amount: amount,
        description,
        payment_method_id: cardToken.payment_method_id,
        payer: {
          email: formData.email,
          identification: {
            type: formData.identificationType,
            number: formData.identificationNumber,
          },
        },
      })

      if (paymentResult.success) {
        onSuccess(paymentResult.paymentId)
      } else {
        onError(paymentResult.error || "Error procesando el pago")
      }
    } catch (error) {
      onError("Error procesando el pago")
    } finally {
      setLoading(false)
    }
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Pago Seguro</span>
        </CardTitle>
        <CardDescription>
          Total a pagar: <span className="font-bold text-lg">${amount}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número de tarjeta</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cardNumber: e.target.value.replace(/\s/g, ""),
                }))
              }
              maxLength={19}
              required
            />
          </div>

          <div>
            <Label htmlFor="holderName">Nombre del titular</Label>
            <Input
              id="holderName"
              placeholder="Juan Pérez"
              value={formData.holderName}
              onChange={(e) => setFormData((prev) => ({ ...prev, holderName: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="expirationMonth">Mes</Label>
              <Select
                value={formData.expirationMonth}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, expirationMonth: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expirationYear">Año</Label>
              <Select
                value={formData.expirationYear}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, expirationYear: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="AA" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i
                    return (
                      <SelectItem key={year} value={String(year).slice(-2)}>
                        {String(year).slice(-2)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="securityCode">CVV</Label>
              <Input
                id="securityCode"
                placeholder="123"
                value={formData.securityCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, securityCode: e.target.value }))}
                maxLength={4}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="identificationType">Tipo de documento</Label>
            <Select
              value={formData.identificationType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, identificationType: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DNI">DNI</SelectItem>
                <SelectItem value="CI">Cédula</SelectItem>
                <SelectItem value="LC">Libreta Cívica</SelectItem>
                <SelectItem value="LE">Libreta de Enrolamiento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="identificationNumber">Número de documento</Label>
            <Input
              id="identificationNumber"
              placeholder="12345678"
              value={formData.identificationNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, identificationNumber: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@email.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Pago procesado de forma segura por Mercado Pago</span>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Procesando..." : `Pagar $${amount}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
