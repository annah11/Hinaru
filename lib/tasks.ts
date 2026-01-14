import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import { RRule } from 'rrule'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskCategory = 'Learning' | 'Work' | 'Health' | 'Personal'

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  due_at?: string
  start_at?: string
  completed_at?: string
  estimate_minutes?: number
  actual_minutes?: number
  sort_order: number
  parent_task_id?: string
  recurrence_rule?: string
  recurrence_anchor?: string
  sync_to_calendar: boolean
  created_at: string
  updated_at: string
  labels?: Label[]
  reminders?: Reminder[]
  subtasks?: Task[]
}

export interface Label {
  id: string
  user_id: string
  name: string
  color: string
  created_at: string
  updated_at: string
}

export interface Reminder {
  id: string
  task_id: string
  remind_at: string
  channel: 'notification' | 'email' | 'sms'
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
  sent_at?: string
  created_at: string
  updated_at: string
}

export interface TaskActivity {
  id: string
  task_id: string
  user_id: string
  event_type: string
  event_at: string
  metadata: Record<string, any>
  created_at: string
}

export interface TaskTimeLog {
  id: string
  task_id: string
  user_id: string
  started_at: string
  ended_at?: string
  minutes?: number
  source: 'manual' | 'timer' | 'auto'
  created_at: string
  updated_at: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  category?: TaskCategory
  priority?: TaskPriority
  due_at?: string
  start_at?: string
  estimate_minutes?: number
  parent_task_id?: string
  recurrence_rule?: string
  recurrence_anchor?: string
  sync_to_calendar?: boolean
  labels?: string[] // Label names
  reminders?: Array<{
    remind_at: string
    channel?: 'notification' | 'email' | 'sms'
  }>
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  due_at?: string
  start_at?: string
  completed_at?: string
  estimate_minutes?: number
  actual_minutes?: number
  sort_order?: number
  parent_task_id?: string
  recurrence_rule?: string
  sync_to_calendar?: boolean
  labels?: string[] // Label names to replace existing
  reminders?: Array<{
    remind_at: string
    channel?: 'notification' | 'email' | 'sms'
  }>
}

export interface TaskFilters {
  status?: TaskStatus | TaskStatus[]
  priority?: TaskPriority | TaskPriority[]
  due_before?: string
  due_after?: string
  has_parent?: boolean
  parent_task_id?: string
  search?: string
  labels?: string[]
}

/**
 * Get tasks with optional filters and related data
 */
export async function getTasks(
  filters: TaskFilters = {},
  options: {
    includeLabels?: boolean
    includeReminders?: boolean
    includeSubtasks?: boolean
    limit?: number
    offset?: number
  } = {}
): Promise<{ data: Task[] | null; error: any }> {
  const supabase = createClient()

  let query = supabase
    .from('tasks')
    .select(`
      *,
      ${options.includeLabels ? 'labels:task_labels(label:labels(*)),' : ''}
      ${options.includeReminders ? 'reminders(*),' : ''}
      ${options.includeSubtasks ? 'subtasks:tasks!parent_task_id(*)' : ''}
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

  // Pagination
  if (options.limit) {
    query = query.limit(options.limit)
  }
  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  // Transform labels from nested structure
  if (data && options.includeLabels) {
    data.forEach((task: any) => {
      if (task.labels) {
        task.labels = task.labels.map((tl: any) => tl.label)
      }
    })
  }

  return { data, error }
}

/**
 * Get a single task by ID with related data
 */
export async function getTask(
  taskId: string,
  options: {
    includeLabels?: boolean
    includeReminders?: boolean
    includeSubtasks?: boolean
  } = {}
): Promise<{ data: Task | null; error: any }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      ${options.includeLabels ? 'labels:task_labels(label:labels(*)),' : ''}
      ${options.includeReminders ? 'reminders(*),' : ''}
      ${options.includeSubtasks ? 'subtasks:tasks!parent_task_id(*)' : ''}
    `)
    .eq('id', taskId)
    .single()

  // Transform labels
  if (data && options.includeLabels && data.labels) {
    data.labels = data.labels.map((tl: any) => tl.label)
  }

  return { data, error }
}

/**
 * Create a task with labels and reminders in a transaction-like manner
 */
export async function createTask(
  input: CreateTaskInput
): Promise<{ data: Task | null; error: any }> {
  const supabase = createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
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
    await linkLabelsToTask(task.id, input.labels)
  }

  // Handle reminders
  if (input.reminders && input.reminders.length > 0) {
    await createReminders(task.id, input.reminders)
  }

  // Fetch complete task with relations
  return getTask(task.id, {
    includeLabels: true,
    includeReminders: true,
  })
}

/**
 * Update a task and optionally its labels/reminders
 */
export async function updateTask(
  taskId: string,
  input: UpdateTaskInput
): Promise<{ data: Task | null; error: any }> {
  const supabase = createClient()

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
    // Remove existing labels
    await supabase.from('task_labels').delete().eq('task_id', taskId)
    // Add new labels
    if (input.labels.length > 0) {
      await linkLabelsToTask(taskId, input.labels)
    }
  }

  // Update reminders if provided
  if (input.reminders !== undefined) {
    // Remove existing reminders
    await supabase.from('reminders').delete().eq('task_id', taskId)
    // Add new reminders
    if (input.reminders.length > 0) {
      await createReminders(taskId, input.reminders)
    }
  }

  // Fetch complete updated task
  return getTask(taskId, {
    includeLabels: true,
    includeReminders: true,
  })
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: string): Promise<{ error: any }> {
  const supabase = createClient()

  const { error } = await supabase.from('tasks').delete().eq('id', taskId)

  return { error }
}

/**
 * Complete a task
 */
export async function completeTask(
  taskId: string,
  actualMinutes?: number
): Promise<{ data: Task | null; error: any }> {
  return updateTask(taskId, {
    status: 'completed',
    completed_at: new Date().toISOString(),
    actual_minutes: actualMinutes,
  })
}

/**
 * Get or create labels by name (upsert pattern)
 */
async function getOrCreateLabels(labelNames: string[]): Promise<Label[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const labels: Label[] = []

  for (const name of labelNames) {
    // Try to find existing label
    let { data: existingLabel } = await supabase
      .from('labels')
      .select('*')
      .eq('user_id', user.id)
      .eq('name', name)
      .single()

    if (existingLabel) {
      labels.push(existingLabel)
    } else {
      // Create new label
      const { data: newLabel } = await supabase
        .from('labels')
        .insert({
          user_id: user.id,
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

  return labels
}

/**
 * Link labels to a task
 */
async function linkLabelsToTask(taskId: string, labelNames: string[]): Promise<void> {
  const supabase = createClient()
  const labels = await getOrCreateLabels(labelNames)

  if (labels.length > 0) {
    const taskLabels = labels.map((label) => ({
      task_id: taskId,
      label_id: label.id,
    }))

    await supabase.from('task_labels').insert(taskLabels)
  }
}

/**
 * Create reminders for a task
 */
async function createReminders(
  taskId: string,
  reminders: Array<{ remind_at: string; channel?: 'notification' | 'email' | 'sms' }>
): Promise<void> {
  const supabase = createClient()

  const reminderRecords = reminders.map((reminder) => ({
    task_id: taskId,
    remind_at: reminder.remind_at,
    channel: reminder.channel || 'notification',
    status: 'pending' as const,
  }))

  await supabase.from('reminders').insert(reminderRecords)
}

/**
 * Get all labels for the current user
 */
export async function getLabels(): Promise<{ data: Label[] | null; error: any }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('labels')
    .select('*')
    .order('name')

  return { data, error }
}

/**
 * Get task activity for analytics
 */
export async function getTaskActivity(
  filters: {
    taskId?: string
    eventType?: string
    afterDate?: string
    limit?: number
  } = {}
): Promise<{ data: TaskActivity[] | null; error: any }> {
  const supabase = createClient()

  let query = supabase
    .from('task_activity')
    .select('*')
    .order('event_at', { ascending: false })

  if (filters.taskId) {
    query = query.eq('task_id', filters.taskId)
  }

  if (filters.eventType) {
    query = query.eq('event_type', filters.eventType)
  }

  if (filters.afterDate) {
    query = query.gte('event_at', filters.afterDate)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  return { data, error }
}

/**
 * Get task time logs
 */
export async function getTaskTimeLogs(
  filters: {
    taskId?: string
    afterDate?: string
    limit?: number
  } = {}
): Promise<{ data: TaskTimeLog[] | null; error: any }> {
  const supabase = createClient()

  let query = supabase
    .from('task_time_logs')
    .select('*')
    .order('started_at', { ascending: false })

  if (filters.taskId) {
    query = query.eq('task_id', filters.taskId)
  }

  if (filters.afterDate) {
    query = query.gte('started_at', filters.afterDate)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  return { data, error }
}

/**
 * Start a time log for a task
 */
export async function startTimeLog(
  taskId: string
): Promise<{ data: TaskTimeLog | null; error: any }> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { data: null, error: new Error('Not authenticated') }
  }

  const { data, error } = await supabase
    .from('task_time_logs')
    .insert({
      task_id: taskId,
      user_id: user.id,
      started_at: new Date().toISOString(),
      source: 'timer',
    })
    .select()
    .single()

  return { data, error }
}

/**
 * End a time log for a task
 */
export async function endTimeLog(
  timeLogId: string
): Promise<{ data: TaskTimeLog | null; error: any }> {
  const supabase = createClient()
  const endedAt = new Date().toISOString()

  // Get the time log to calculate minutes
  const { data: timeLog } = await supabase
    .from('task_time_logs')
    .select('*')
    .eq('id', timeLogId)
    .single()

  if (!timeLog) {
    return { data: null, error: new Error('Time log not found') }
  }

  const startedAt = new Date(timeLog.started_at)
  const minutes = Math.round((new Date(endedAt).getTime() - startedAt.getTime()) / 60000)

  const { data, error } = await supabase
    .from('task_time_logs')
    .update({
      ended_at: endedAt,
      minutes,
    })
    .eq('id', timeLogId)
    .select()
    .single()

  return { data, error }
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
 * Get analytics data for dashboard
 */
export async function getAnalytics(
  afterDate: string
): Promise<{
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  totalMinutesPlanned: number
  totalMinutesExecuted: number
  categoryBreakdown: Record<string, { planned: number; completed: number }>
}> {
  const supabase = createClient()

  // Get tasks after date
  const { data: tasks } = await getTasks({
    due_after: afterDate,
  }, {
    includeLabels: true,
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
  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length
  const totalMinutesPlanned = tasks.reduce((sum, t) => sum + (t.estimate_minutes || 0), 0)
  const totalMinutesExecuted = tasks.reduce((sum, t) => sum + (t.actual_minutes || 0), 0)

  // Category breakdown
  const categoryBreakdown: Record<string, { planned: number; completed: number }> = {}
  
  tasks.forEach((task) => {
    if (task.labels && task.labels.length > 0) {
      task.labels.forEach((label) => {
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
