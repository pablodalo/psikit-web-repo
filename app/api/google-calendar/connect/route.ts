import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/google-calendar/callback`

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent("https://www.googleapis.com/auth/calendar")}&` +
      `access_type=offline&` +
      `prompt=consent`

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error("Error creating Google Calendar auth URL:", error)
    return NextResponse.json({ error: "Failed to create auth URL" }, { status: 500 })
  }
}
