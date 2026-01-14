'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { CreateTaskInput, UpdateTaskInput, TaskFilters } from '@/lib/tasks'

/**
 * Server action to get tasks
 */
export async function getTasksAction(filters: TaskFilters = {}) {
  const supabase = await createClient()

  let query = supabase
    .from('tasks')
    .select(`
      *,
      labels:task_labels(label:labels(*)),
      reminders(*),
      subtasks:tasks!parent_task_id(*)
    `)
    .order('updated_at', { ascending: false })

  // Apply filters
  if (filters.status) {
    if (Array.isArray(filters.status)) {
      query = query.in('status', filters.status)
    } else {
      query = query.eq('status', filters.status)
    }
  }

  if (filters.priority) {
    if (Array.isArray(filters.priority)) {
      query = query.in('priority', filters.priority)
    } else {
      query = query.eq('priority', filters.priority)
    }
  }

  if (filters.due_before) {
    query = query.lte('due_at', filters.due_before)
  }

  if (filters.due_after) {
    query = query.gte('due_at', filters.due_after)
  }

  if (filters.has_parent !== undefined) {
    if (filters.has_parent) {
      query = query.not('parent_task_id', 'is', null)
    } else {
      query = query.is('parent_task_id', null)
    }
  }

  if (filters.parent_task_id) {
    query = query.eq('parent_task_id', filters.parent_task_id)
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  // Transform labels from nested structure
  if (data) {
    data.forEach((task: any) => {
      if (task.labels) {
        task.labels = task.labels.map((tl: any) => tl.label)
      }
    })
  }

  return { data, error }
}

/**
 * Server action to create a task
 */
export async function createTaskAction(input: CreateTaskInput) {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { data: null, error: new Error('Not authenticated') }
  }

  // Create task
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      title: input.title,
      description: input.description,
      status: 'pending',
      priority: input.priority || 'medium',
      due_at: input.due_at,
      start_at: input.start_at,
      estimate_minutes: input.estimate_minutes,
      parent_task_id: input.parent_task_id,
      recurrence_rule: input.recurrence_rule,
      recurrence_anchor: input.recurrence_anchor,
      sync_to_calendar: input.sync_to_calendar !== false,
      sort_order: 0,
    })
    .select()
    .single()

  if (taskError || !task) {
    return { data: null, error: taskError }
  }

  // Handle labels
  if (input.labels && input.labels.length > 0) {
    await linkLabelsToTask(supabase, user.id, task.id, input.labels)
  }

  // Handle reminders
  if (input.reminders && input.reminders.length > 0) {
    const reminderRecords = input.reminders.map((reminder) => ({
      task_id: task.id,
      remind_at: reminder.remind_at,
      channel: reminder.channel || 'notification',
      status: 'pending' as const,
    }))
    await supabase.from('reminders').insert(reminderRecords)
  }

  revalidatePath('/')
  return { data: task, error: null }
}

/**
 * Server action to update a task
 */
export async function updateTaskAction(taskId: string, input: UpdateTaskInput) {
  const supabase = await createClient()

  // Build update object
  const updates: any = {}
  if (input.title !== undefined) updates.title = input.title
  if (input.description !== undefined) updates.description = input.description
  if (input.status !== undefined) {
    updates.status = input.status
    if (input.status === 'completed' && !input.completed_at) {
      updates.completed_at = new Date().toISOString()
    }
  }
  if (input.priority !== undefined) updates.priority = input.priority
  if (input.due_at !== undefined) updates.due_at = input.due_at
  if (input.start_at !== undefined) updates.start_at = input.start_at
  if (input.completed_at !== undefined) updates.completed_at = input.completed_at
  if (input.estimate_minutes !== undefined) updates.estimate_minutes = input.estimate_minutes
  if (input.actual_minutes !== undefined) updates.actual_minutes = input.actual_minutes
  if (input.sort_order !== undefined) updates.sort_order = input.sort_order
  if (input.parent_task_id !== undefined) updates.parent_task_id = input.parent_task_id
  if (input.recurrence_rule !== undefined) updates.recurrence_rule = input.recurrence_rule
  if (input.sync_to_calendar !== undefined) updates.sync_to_calendar = input.sync_to_calendar

  // Update task
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single()

  if (taskError || !task) {
    return { data: null, error: taskError }
  }

  // Update labels if provided
  if (input.labels !== undefined) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      // Remove existing labels
      await supabase.from('task_labels').delete().eq('task_id', taskId)
      // Add new labels
      if (input.labels.length > 0) {
        await linkLabelsToTask(supabase, user.id, taskId, input.labels)
      }
    }
  }

  // Update reminders if provided
  if (input.reminders !== undefined) {
    // Remove existing reminders
    await supabase.from('reminders').delete().eq('task_id', taskId)
    // Add new reminders
    if (input.reminders.length > 0) {
      const reminderRecords = input.reminders.map((reminder) => ({
        task_id: taskId,
        remind_at: reminder.remind_at,
        channel: reminder.channel || 'notification',
        status: 'pending' as const,
      }))
      await supabase.from('reminders').insert(reminderRecords)
    }
  }

  revalidatePath('/')
  return { data: task, error: null }
}

/**
 * Server action to delete a task
 */
export async function deleteTaskAction(taskId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('tasks').delete().eq('id', taskId)

  revalidatePath('/')
  return { error }
}

/**
 * Server action to complete a task
 */
export async function completeTaskAction(taskId: string, actualMinutes?: number) {
  return updateTaskAction(taskId, {
    status: 'completed',
    completed_at: new Date().toISOString(),
    actual_minutes: actualMinutes,
  })
}

/**
 * Helper to get or create labels and link to task
 */
async function linkLabelsToTask(
  supabase: any,
  userId: string,
  taskId: string,
  labelNames: string[]
) {
  const labels = []

  for (const name of labelNames) {
    // Try to find existing label
    let { data: existingLabel } = await supabase
      .from('labels')
      .select('*')
      .eq('user_id', userId)
      .eq('name', name)
      .single()

    if (existingLabel) {
      labels.push(existingLabel)
    } else {
      // Create new label
      const { data: newLabel } = await supabase
        .from('labels')
        .insert({
          user_id: userId,
          name,
          color: getCategoryColor(name),
        })
        .select()
        .single()

      if (newLabel) {
        labels.push(newLabel)
      }
    }
  }

  if (labels.length > 0) {
    const taskLabels = labels.map((label) => ({
      task_id: taskId,
      label_id: label.id,
    }))

    await supabase.from('task_labels').insert(taskLabels)
  }
}

/**
 * Helper to get category color for labels
 */
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Learning: '#6366f1',
    Work: '#22c55e',
    Health: '#f97316',
    Personal: '#a855f7',
  }
  return colors[category] || '#6366f1'
}

/**
 * Server action to get analytics
 */
export async function getAnalyticsAction(afterDate: string) {
  const supabase = await createClient()

  // Get tasks after date
  const { data: tasks } = await getTasksAction({
    due_after: afterDate,
  })

  if (!tasks) {
    return {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      totalMinutesPlanned: 0,
      totalMinutesExecuted: 0,
      categoryBreakdown: {},
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length
  const pendingTasks = tasks.filter((t: any) => t.status === 'pending').length
  const totalMinutesPlanned = tasks.reduce((sum: number, t: any) => sum + (t.estimate_minutes || 0), 0)
  const totalMinutesExecuted = tasks.reduce((sum: number, t: any) => sum + (t.actual_minutes || 0), 0)

  // Category breakdown
  const categoryBreakdown: Record<string, { planned: number; completed: number }> = {}

  tasks.forEach((task: any) => {
    if (task.labels && task.labels.length > 0) {
      task.labels.forEach((label: any) => {
        const category = label.name
        if (!categoryBreakdown[category]) {
          categoryBreakdown[category] = { planned: 0, completed: 0 }
        }
        categoryBreakdown[category].planned++
        if (task.status === 'completed') {
          categoryBreakdown[category].completed++
        }
      })
    }
  })

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    totalMinutesPlanned,
    totalMinutesExecuted,
    categoryBreakdown,
  }
}
