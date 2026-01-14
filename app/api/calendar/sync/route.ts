import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { syncTasksWithCalendar, refreshAccessToken } from '@/lib/calendar/google'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get user's calendar account
    const { data: calendarAccount, error: accountError } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'google')
      .eq('sync_enabled', true)
      .single()

    if (accountError || !calendarAccount) {
      return NextResponse.json(
        { error: 'No calendar account found' },
        { status: 404 }
      )
    }

    // Check if access token is expired
    let accessToken = Buffer.from(calendarAccount.access_token_enc, 'base64').toString()
    const tokenExpiry = new Date(calendarAccount.token_expires_at)
    
    if (tokenExpiry < new Date()) {
      // Refresh token
      const refreshToken = Buffer.from(calendarAccount.refresh_token_enc, 'base64').toString()
      const newTokens = await refreshAccessToken(refreshToken)
      
      accessToken = newTokens.access_token
      
      // Update stored tokens
      await supabase
        .from('calendar_accounts')
        .update({
          access_token_enc: Buffer.from(newTokens.access_token).toString('base64'),
          token_expires_at: new Date(newTokens.expiry_date).toISOString(),
        })
        .eq('id', calendarAccount.id)
    }

    // Get tasks to sync
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('sync_to_calendar', true)
      .in('status', ['pending', 'in_progress', 'completed'])

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ message: 'No tasks to sync', stats: { created: 0, updated: 0, conflicts: [] } })
    }

    // Get existing calendar links
    const { data: links } = await supabase
      .from('calendar_links')
      .select('*')
      .eq('calendar_account_id', calendarAccount.id)
      .in('task_id', tasks.map((t) => t.id))

    const existingLinks: Record<string, { eventId: string; etag: string }> = {}
    links?.forEach((link) => {
      existingLinks[link.task_id] = {
        eventId: link.external_event_id,
        etag: link.etag || '',
      }
    })

    // Sync tasks with Google Calendar
    const lastSyncTime = calendarAccount.last_synced_at || new Date(0).toISOString()
    const stats = await syncTasksWithCalendar(
      accessToken,
      tasks,
      existingLinks,
      lastSyncTime
    )

    // Update calendar links in database
    for (const [taskId, link] of Object.entries(existingLinks)) {
      await supabase
        .from('calendar_links')
        .upsert({
          task_id: taskId,
          calendar_account_id: calendarAccount.id,
          external_event_id: link.eventId,
          etag: link.etag,
          sync_status: 'synced',
          last_synced_at: new Date().toISOString(),
        })
        .eq('task_id', taskId)
        .eq('calendar_account_id', calendarAccount.id)
    }

    // Update last sync time
    await supabase
      .from('calendar_accounts')
      .update({
        last_synced_at: new Date().toISOString(),
      })
      .eq('id', calendarAccount.id)

    return NextResponse.json({
      message: 'Sync completed',
      stats,
    })
  } catch (error: any) {
    console.error('Calendar sync error:', error)
    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    )
  }
}
