'use server'

import { createClient } from '@/lib/supabase/server'
import { getNextOccurrence, shouldCreateNextOccurrence } from '@/lib/recurrence'
import { createTaskAction } from './tasks'

/**
 * Process recurring tasks and create next occurrences
 * This should be run periodically (e.g., daily via cron)
 */
export async function processRecurringTasks() {
  const supabase = await createClient()

  // Get all completed tasks with recurrence rules
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'completed')
    .not('recurrence_rule', 'is', null)
    .not('recurrence_anchor', 'is', null)

  if (error || !tasks) {
    return { processed: 0, error }
  }

  let processedCount = 0

  for (const task of tasks) {
    if (shouldCreateNextOccurrence(task)) {
      try {
        // Calculate next occurrence
        const anchorDate = new Date(task.recurrence_anchor)
        const nextDate = getNextOccurrence(task.recurrence_rule, anchorDate)

        if (nextDate) {
          // Create new task instance
          await createTaskAction({
            title: task.title,
            description: task.description,
            priority: task.priority,
            due_at: nextDate.toISOString(),
            start_at: nextDate.toISOString(),
            estimate_minutes: task.estimate_minutes,
            parent_task_id: task.parent_task_id,
            recurrence_rule: task.recurrence_rule,
            recurrence_anchor: nextDate.toISOString(), // Update anchor to new occurrence
            sync_to_calendar: task.sync_to_calendar,
          })

          processedCount++
        }
      } catch (err) {
        console.error(`Failed to process recurring task ${task.id}:`, err)
      }
    }
  }

  return { processed: processedCount, error: null }
}

/**
 * Process pending reminders and send notifications
 * This should be run frequently (e.g., every minute via cron)
 */
export async function processPendingReminders() {
  const supabase = await createClient()

  // Get reminders that are due
  const now = new Date().toISOString()
  const { data: reminders, error } = await supabase
    .from('reminders')
    .select(`
      *,
      task:tasks(*)
    `)
    .eq('status', 'pending')
    .lte('remind_at', now)
    .limit(100)

  if (error || !reminders) {
    return { processed: 0, error }
  }

  let processedCount = 0

  for (const reminder of reminders) {
    try {
      // Send notification based on channel
      await sendReminder(reminder)

      // Mark reminder as sent
      await supabase
        .from('reminders')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
        })
        .eq('id', reminder.id)

      processedCount++
    } catch (err) {
      console.error(`Failed to process reminder ${reminder.id}:`, err)
      
      // Mark as failed
      await supabase
        .from('reminders')
        .update({
          status: 'failed',
        })
        .eq('id', reminder.id)
    }
  }

  return { processed: processedCount, error: null }
}

/**
 * Send a reminder notification
 */
async function sendReminder(reminder: any) {
  const { channel, task } = reminder

  switch (channel) {
    case 'notification':
      // Send browser/push notification
      // This would integrate with a notification service like OneSignal, Firebase, etc.
      console.log(`Sending notification reminder for task: ${task.title}`)
      // await sendPushNotification({ ... })
      break

    case 'email':
      // Send email reminder
      // This would integrate with an email service like SendGrid, Resend, etc.
      console.log(`Sending email reminder for task: ${task.title}`)
      // await sendEmail({ ... })
      break

    case 'sms':
      // Send SMS reminder
      // This would integrate with an SMS service like Twilio
      console.log(`Sending SMS reminder for task: ${task.title}`)
      // await sendSMS({ ... })
      break

    default:
      throw new Error(`Unknown reminder channel: ${channel}`)
  }
}
