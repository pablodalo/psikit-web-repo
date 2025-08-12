import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cardData = await request.json()

    // Here you would use the MercadoPago server SDK with private keys
    // This is just a placeholder implementation
    const response = await fetch("https://api.mercadopago.com/v1/card_tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
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
      }),
    })

    const result = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        token: result,
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.message || "Error creando token",
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error interno del servidor",
    })
  }
}
