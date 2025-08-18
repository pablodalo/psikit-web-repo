import { type NextRequest, NextResponse } from "next/server"
import { GoogleCalendarService } from "@/lib/google-calendar"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
  }

  try {
    const googleCalendar = new GoogleCalendarService()
    const tokens = await googleCalendar.getTokens(code)

    // Store tokens in your database or session
    // For now, we'll redirect back to the agenda with success
    return NextResponse.redirect("/dashboard/psicologo/agenda?google_connected=true")
  } catch (error) {
    console.error("Error getting tokens:", error)
    return NextResponse.json({ error: "Failed to authenticate with Google" }, { status: 500 })
  }
}
