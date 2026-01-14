import { NextRequest, NextResponse } from 'next/server'
import { getAuthUrl } from '@/lib/calendar/google'

export async function GET(request: NextRequest) {
  try {
    const authUrl = getAuthUrl()
    
    return NextResponse.json({ authUrl })
  } catch (error: any) {
    console.error('Failed to generate auth URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    )
  }
}
