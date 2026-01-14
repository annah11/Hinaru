import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getTokensFromCode } from '@/lib/calendar/google'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        new URL(`/settings?error=${encodeURIComponent(error)}`, request.url)
      )
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/settings?error=no_code', request.url)
      )
    }

    // Exchange code for tokens
    const tokens = await getTokensFromCode(code)

    // Store tokens in database
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(
        new URL('/auth/login?error=not_authenticated', request.url)
      )
    }

    // Get user's email from Google
    // TODO: Fetch email from Google OAuth response
    const email = user.email || 'unknown@example.com'

    // Encrypt tokens before storing (basic implementation - should use proper encryption)
    const accessTokenEnc = Buffer.from(tokens.access_token).toString('base64')
    const refreshTokenEnc = Buffer.from(tokens.refresh_token).toString('base64')

    // Upsert calendar account
    const { error: dbError } = await supabase
      .from('calendar_accounts')
      .upsert({
        user_id: user.id,
        provider: 'google',
        email,
        access_token_enc: accessTokenEnc,
        refresh_token_enc: refreshTokenEnc,
        token_expires_at: new Date(tokens.expiry_date).toISOString(),
        scope: 'https://www.googleapis.com/auth/calendar.events',
        sync_enabled: true,
      })
      .eq('user_id', user.id)
      .eq('provider', 'google')

    if (dbError) {
      console.error('Failed to store calendar account:', dbError)
      return NextResponse.redirect(
        new URL('/settings?error=storage_failed', request.url)
      )
    }

    return NextResponse.redirect(
      new URL('/settings?success=calendar_connected', request.url)
    )
  } catch (error: any) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(`/settings?error=${encodeURIComponent(error.message)}`, request.url)
    )
  }
}
