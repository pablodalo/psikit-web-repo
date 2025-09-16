import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/google-calendar/callback`,
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      throw new Error(tokens.error_description || tokens.error)
    }

    // Store tokens securely (you'll need to implement user-specific storage)
    // For now, we'll just return success and close the popup
    return new Response(
      `
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'GOOGLE_CALENDAR_SUCCESS' }, '*');
            window.close();
          </script>
          <p>Calendar connected successfully! You can close this window.</p>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      },
    )
  } catch (error) {
    console.error("Error in Google Calendar callback:", error)
    return new Response(
      `
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'GOOGLE_CALENDAR_ERROR' }, '*');
            window.close();
          </script>
          <p>Error connecting calendar. Please try again.</p>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      },
    )
  }
}
