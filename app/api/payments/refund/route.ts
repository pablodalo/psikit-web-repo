import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, amount } = await request.json()

    const { MercadoPagoConfig, PaymentRefund } = await import("mercadopago")

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
      options: {
        timeout: 5000,
      },
    })

    const paymentRefund = new PaymentRefund(client)

    // Process refund using server-side SDK
    const result = await paymentRefund.create({
      payment_id: paymentId,
      body: {
        amount: amount,
      },
    })

    return NextResponse.json({
      success: true,
      refundId: result.id,
      status: result.status,
      amount: result.amount,
      date_created: result.date_created,
    })
  } catch (error) {
    console.error("Error processing refund:", error)
    return NextResponse.json({ success: false, error: "Error procesando el reembolso" }, { status: 500 })
  }
}
