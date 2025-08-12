import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, amount } = await request.json()

    // Process refund using MercadoPago server SDK
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}/refunds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })

    const result = await response.json()

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error procesando el reembolso",
    })
  }
}
