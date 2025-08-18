import { type NextRequest, NextResponse } from "next/server"
import { GoogleCalendarService } from "@/lib/google-calendar"

export async function GET(request: NextRequest) {
  try {
    // Get user tokens from database/session
    const googleCalendar = new GoogleCalendarService()
    // googleCalendar.setCredentials(userTokens)

    const events = await googleCalendar.getEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    const googleCalendar = new GoogleCalendarService()
    // googleCalendar.setCredentials(userTokens)

    const event = await googleCalendar.createEvent(eventData)
    return NextResponse.json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
