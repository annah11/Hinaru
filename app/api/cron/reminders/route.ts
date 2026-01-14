/**
 * Cron job to process and send reminders
 * Schedule: Every minute
 * Purpose: Send pending reminders that are due
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient()
    const now = new Date().toISOString()

    // Get all pending reminders that are due
    const { data: dueReminders, error } = await supabase
      .from('reminders')
      .select(`
        *,
        tasks!inner(
          id,
          title,
          description,
          due_at,
          user_id,
          users:user_id(email)
        )
      `)
      .eq('status', 'pending')
      .lte('remind_at', now)

    if (error) {
      console.error('Error fetching reminders:', error)
      return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 })
    }

    let sentCount = 0
    let errorCount = 0

    for (const reminder of dueReminders || []) {
      try {
        // Send notification based on channel
        if (reminder.channel === 'notification') {
          // In-app notification (implement your notification system)
          // For now, just log it
          console.log(`Notification reminder for task: ${reminder.tasks.title}`)
        } else if (reminder.channel === 'email') {
          // Send email (implement your email service)
          // For now, just log it
          console.log(`Email reminder to: ${reminder.tasks.users.email}`)
        }

        // Mark reminder as sent
        const { error: updateError } = await supabase
          .from('reminders')
          .update({ status: 'sent', updated_at: new Date().toISOString() })
          .eq('id', reminder.id)

        if (updateError) {
          console.error('Error updating reminder status:', updateError)
          errorCount++
        } else {
          sentCount++
        }
      } catch (reminderError) {
        console.error(`Error processing reminder ${reminder.id}:`, reminderError)
        errorCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Reminders processed',
      sent: sentCount,
      errors: errorCount,
    })
  } catch (error) {
    console.error('Cron job failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
