/**
 * Cron job to process recurring tasks
 * Schedule: Daily at midnight
 * Purpose: Materialize upcoming instances of recurring tasks
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateFutureOccurrences } from '@/lib/recurrence'

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient()
    
    // Get all recurring tasks
    const { data: recurringTasks, error } = await supabase
      .from('tasks')
      .select('*')
      .not('recurrence_rule', 'is', null)
      .eq('status', 'active')

    if (error) {
      console.error('Error fetching recurring tasks:', error)
      return NextResponse.json({ error: 'Failed to fetch recurring tasks' }, { status: 500 })
    }

    let processedCount = 0
    let errorCount = 0

    for (const task of recurringTasks || []) {
      try {
        // Generate next 5 occurrences for each recurring task
        const occurrences = generateFutureOccurrences(
          { rrule: task.recurrence_rule, anchorDate: task.recurrence_anchor },
          5,
          new Date()
        )

        for (const occurrenceDate of occurrences) {
          // Check if instance already exists
          const instanceDate = occurrenceDate.toISOString().split('T')[0]
          const { data: existingInstance } = await supabase
            .from('tasks')
            .select('id')
            .eq('parent_task_id', task.id)
            .eq('due_at', occurrenceDate.toISOString())
            .single()

          if (!existingInstance) {
            // Create new instance
            const { error: insertError } = await supabase
              .from('tasks')
              .insert({
                user_id: task.user_id,
                parent_task_id: task.id,
                title: task.title,
                description: task.description,
                category: task.category,
                priority: task.priority,
                status: 'pending',
                due_at: occurrenceDate.toISOString(),
                start_at: occurrenceDate.toISOString(),
                estimate_minutes: task.estimate_minutes,
              })

            if (insertError) {
              console.error('Error creating task instance:', insertError)
              errorCount++
            } else {
              processedCount++
            }
          }
        }
      } catch (taskError) {
        console.error(`Error processing task ${task.id}:`, taskError)
        errorCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Recurring tasks processed',
      processed: processedCount,
      errors: errorCount,
    })
  } catch (error) {
    console.error('Cron job failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
