import { RRule, RRuleSet, rrulestr } from 'rrule'

/**
 * Parse RRULE string and generate next occurrence
 */
export function getNextOccurrence(
  rruleString: string,
  after: Date = new Date()
): Date | null {
  try {
    const rule = rrulestr(rruleString)
    const next = rule.after(after, true)
    return next
  } catch (err) {
    console.error('Failed to parse RRULE:', err)
    return null
  }
}

/**
 * Generate all occurrences between two dates
 */
export function getOccurrencesBetween(
  rruleString: string,
  startDate: Date,
  endDate: Date
): Date[] {
  try {
    const rule = rrulestr(rruleString)
    return rule.between(startDate, endDate, true)
  } catch (err) {
    console.error('Failed to parse RRULE:', err)
    return []
  }
}

/**
 * Create RRULE string from simple recurrence options
 */
export function createRRule(options: {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval?: number
  count?: number
  until?: Date
  byweekday?: number[]
  bymonthday?: number
}): string {
  const freqMap = {
    daily: RRule.DAILY,
    weekly: RRule.WEEKLY,
    monthly: RRule.MONTHLY,
    yearly: RRule.YEARLY,
  }

  const ruleOptions: any = {
    freq: freqMap[options.frequency],
  }

  if (options.interval) {
    ruleOptions.interval = options.interval
  }

  if (options.count) {
    ruleOptions.count = options.count
  }

  if (options.until) {
    ruleOptions.until = options.until
  }

  if (options.byweekday) {
    ruleOptions.byweekday = options.byweekday
  }

  if (options.bymonthday) {
    ruleOptions.bymonthday = options.bymonthday
  }

  const rule = new RRule(ruleOptions)
  return rule.toString()
}

/**
 * Check if a task should create a new occurrence
 */
export function shouldCreateNextOccurrence(
  task: {
    recurrence_rule?: string
    recurrence_anchor?: string
    status: string
  }
): boolean {
  // Only create next occurrence if task is completed and has recurrence
  return !!(
    task.status === 'completed' &&
    task.recurrence_rule &&
    task.recurrence_anchor
  )
}

/**
 * Calculate reminder times based on task due date
 */
export function calculateReminderTimes(
  dueDate: Date,
  reminderOffsets: Array<{ value: number; unit: 'minutes' | 'hours' | 'days' }>
): Date[] {
  const reminders: Date[] = []

  for (const offset of reminderOffsets) {
    const reminderDate = new Date(dueDate)

    switch (offset.unit) {
      case 'minutes':
        reminderDate.setMinutes(reminderDate.getMinutes() - offset.value)
        break
      case 'hours':
        reminderDate.setHours(reminderDate.getHours() - offset.value)
        break
      case 'days':
        reminderDate.setDate(reminderDate.getDate() - offset.value)
        break
    }

    // Only add future reminders
    if (reminderDate > new Date()) {
      reminders.push(reminderDate)
    }
  }

  return reminders
}

/**
 * Parse human-readable recurrence input
 */
export function parseRecurrenceInput(input: string): string | null {
  const lowerInput = input.toLowerCase().trim()

  // Daily patterns
  if (lowerInput.match(/^every\s+day$/i)) {
    return createRRule({ frequency: 'daily' })
  }
  if (lowerInput.match(/^every\s+(\d+)\s+days?$/i)) {
    const match = lowerInput.match(/^every\s+(\d+)\s+days?$/i)
    const interval = match ? parseInt(match[1]) : 1
    return createRRule({ frequency: 'daily', interval })
  }

  // Weekly patterns
  if (lowerInput.match(/^every\s+week$/i)) {
    return createRRule({ frequency: 'weekly' })
  }
  if (lowerInput.match(/^every\s+(\d+)\s+weeks?$/i)) {
    const match = lowerInput.match(/^every\s+(\d+)\s+weeks?$/i)
    const interval = match ? parseInt(match[1]) : 1
    return createRRule({ frequency: 'weekly', interval })
  }

  // Weekday patterns
  const weekdayMap: Record<string, number> = {
    monday: RRule.MO.weekday,
    tuesday: RRule.TU.weekday,
    wednesday: RRule.WE.weekday,
    thursday: RRule.TH.weekday,
    friday: RRule.FR.weekday,
    saturday: RRule.SA.weekday,
    sunday: RRule.SU.weekday,
  }

  for (const [day, weekday] of Object.entries(weekdayMap)) {
    if (lowerInput.match(new RegExp(`^every\\s+${day}$`, 'i'))) {
      return createRRule({ frequency: 'weekly', byweekday: [weekday] })
    }
  }

  // Monthly patterns
  if (lowerInput.match(/^every\s+month$/i)) {
    return createRRule({ frequency: 'monthly' })
  }
  if (lowerInput.match(/^every\s+(\d+)\s+months?$/i)) {
    const match = lowerInput.match(/^every\s+(\d+)\s+months?$/i)
    const interval = match ? parseInt(match[1]) : 1
    return createRRule({ frequency: 'monthly', interval })
  }

  // Yearly patterns
  if (lowerInput.match(/^every\s+year$/i)) {
    return createRRule({ frequency: 'yearly' })
  }

  return null
}

/**
 * Format RRULE for human-readable display
 */
export function formatRecurrence(rruleString: string): string {
  try {
    const rule = rrulestr(rruleString)
    return rule.toText()
  } catch (err) {
    return 'Custom recurrence'
  }
}
