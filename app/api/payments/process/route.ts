import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json()

    const { MercadoPagoConfig, Payment } = await import("mercadopago")

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
      options: {
        timeout: 5000,
      },
    })

    const payment = new Payment(client)

    // Process payment using server-side SDK
    const result = await payment.create({
      body: {
        transaction_amount: paymentData.transaction_amount,
        token: paymentData.token,
        description: paymentData.description,
        payment_method_id: paymentData.payment_method_id,
        payer: paymentData.payer,
        external_reference: paymentData.external_reference,
        metadata: paymentData.metadata,
      },
    })

    return NextResponse.json({
      success: true,
      paymentId: result.id,
      status: result.status,
      status_detail: result.status_detail,
      transaction_amount: result.transaction_amount,
      date_created: result.date_created,
    })
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ success: false, error: "Error procesando el pago" }, { status: 500 })
  }
}
