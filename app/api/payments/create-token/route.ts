import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cardData = await request.json()

    const { MercadoPagoConfig, CardToken } = await import("mercadopago")

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
      options: {
        timeout: 5000,
        idempotencyKey: "abc",
      },
    })

    const cardToken = new CardToken(client)

    // Create card token using server-side SDK
    const token = await cardToken.create({
      body: {
        card_number: cardData.number,
        cardholder: {
          name: cardData.holderName,
          identification: {
            type: cardData.identificationType,
            number: cardData.identificationNumber,
          },
        },
        expiration_month: cardData.expirationMonth,
        expiration_year: cardData.expirationYear,
        security_code: cardData.securityCode,
      },
    })

    return NextResponse.json({
      success: true,
      token: {
        id: token.id,
        payment_method_id: token.payment_method_id,
      },
    })
  } catch (error) {
    console.error("Error creating card token:", error)
    return NextResponse.json({ success: false, error: "Error creando token de tarjeta" }, { status: 500 })
  }
}
