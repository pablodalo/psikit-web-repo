import { type NextRequest, NextResponse } from "next/server"
import { GoogleCalendarService } from "@/lib/google-calendar"

export async function GET(request: NextRequest) {
  const googleCalendar = new GoogleCalendarService()
  const authUrl = googleCalendar.getAuthUrl()

  return NextResponse.redirect(authUrl)
}
