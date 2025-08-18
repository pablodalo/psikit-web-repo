import { google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/calendar"]

export class GoogleCalendarService {
  private oauth2Client: any

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )
  }

  // Generate authorization URL for user consent
  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
    })
  }

  // Exchange authorization code for tokens
  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code)
    return tokens
  }

  // Set user credentials
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens)
  }

  // Get calendar events
  async getEvents(timeMin?: string, timeMax?: string) {
    const calendar = google.calendar({ version: "v3", auth: this.oauth2Client })

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin || new Date().toISOString(),
      timeMax: timeMax,
      maxResults: 50,
      singleEvents: true,
      orderBy: "startTime",
    })

    return response.data.items || []
  }

  // Create calendar event
  async createEvent(eventData: {
    summary: string
    description?: string
    start: { dateTime: string; timeZone: string }
    end: { dateTime: string; timeZone: string }
    attendees?: { email: string }[]
  }) {
    const calendar = google.calendar({ version: "v3", auth: this.oauth2Client })

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: eventData,
    })

    return response.data
  }

  // Update calendar event
  async updateEvent(eventId: string, eventData: any) {
    const calendar = google.calendar({ version: "v3", auth: this.oauth2Client })

    const response = await calendar.events.update({
      calendarId: "primary",
      eventId: eventId,
      requestBody: eventData,
    })

    return response.data
  }

  // Delete calendar event
  async deleteEvent(eventId: string) {
    const calendar = google.calendar({ version: "v3", auth: this.oauth2Client })

    await calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
    })
  }
}
