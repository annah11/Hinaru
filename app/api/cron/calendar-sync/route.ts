/**
 * Cron job to sync tasks with Google Calendar
 * Schedule: Every hour
 * Purpose: Two-way sync between tasks and calendar events
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { fetchGoogleCalendarEvents, createGoogleCalendarEvent, updateGoogleCalendarEvent } from '@/lib/calendar/google'

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient()

    // Get all users with calendar sync enabled
    const { data: accounts, error: accountsError } = await supabase
      .from('calendar_accounts')
      .select('*')
      .eq('provider', 'google')
      .eq('sync_enabled', true)

    if (accountsError) {
      console.error('Error fetching calendar accounts:', accountsError)
      return NextResponse.json({ error: 'Failed to fetch calendar accounts' }, { status: 500 })
    }

    let totalCreated = 0
    let totalUpdated = 0
    let totalErrors = 0

    for (const account of accounts || []) {
      try {
        // Fetch user's tasks that need syncing
        const { data: tasks, error: tasksError } = await supabase
          .from('tasks')
          .select('*, calendar_links(*)')
          .eq('user_id', account.user_id)
          .or('status.eq.pending,status.eq.completed')
          .gte('due_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days
          .lte('due_at', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()) // Next 30 days

        if (tasksError) {
          console.error('Error fetching tasks:', tasksError)
          totalErrors++
          continue
        }

        // Fetch calendar events for comparison
        const now = new Date()
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        
        const calendarEvents = await fetchGoogleCalendarEvents(account.user_id, sevenDaysAgo, thirtyDaysFromNow)
        const eventMap = new Map(calendarEvents.map(e => [e.id, e]))

        for (const task of tasks || []) {
          try {
            const existingLink = task.calendar_links?.[0]

            if (existingLink) {
              // Update existing event
              const calendarEvent = eventMap.get(existingLink.external_event_id)
              
              if (calendarEvent) {
                // Check if update is needed (compare etag or timestamps)
                const taskUpdatedAt = new Date(task.updated_at).getTime()
                const lastSyncedAt = new Date(existingLink.last_synced_at || 0).getTime()
                
                if (taskUpdatedAt > lastSyncedAt) {
                  const updatedEvent = await updateGoogleCalendarEvent(account.user_id, existingLink.external_event_id, task)
                  
                  if (updatedEvent) {
                    await supabase.from('calendar_links').update({
                      last_synced_at: new Date().toISOString(),
                      sync_status: 'synced',
                      etag: updatedEvent.etag,
                    }).eq('id', existingLink.id)
                    
                    totalUpdated++
                  }
                }
              }
            } else {
              // Create new calendar event
              const newEvent = await createGoogleCalendarEvent(account.user_id, task)
              
              if (newEvent && newEvent.id) {
                await supabase.from('calendar_links').insert({
                  task_id: task.id,
                  calendar_account_id: account.id,
                  provider: 'google',
                  external_event_id: newEvent.id,
                  last_synced_at: new Date().toISOString(),
                  sync_status: 'synced',
                  etag: newEvent.etag,
                })
                
                totalCreated++
              }
            }
          } catch (taskError) {
            console.error(`Error syncing task ${task.id}:`, taskError)
            totalErrors++
          }
        }

        // Update last sync timestamp for account
        await supabase
          .from('calendar_accounts')
          .update({ last_sync_at: new Date().toISOString() })
          .eq('id', account.id)

      } catch (accountError) {
        console.error(`Error syncing account ${account.id}:`, accountError)
        totalErrors++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Calendar sync completed',
      created: totalCreated,
      updated: totalUpdated,
      errors: totalErrors,
    })
  } catch (error) {
    console.error('Cron job failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
