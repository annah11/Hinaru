import { google } from 'googleapis'
import type { Task } from '@/lib/tasks'

const SCOPES = ['https://www.googleapis.com/auth/calendar.events']

/**
 * Create OAuth2 client
 */
export function createOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

/**
 * Get authorization URL for OAuth flow
 */
export function getAuthUrl(): string {
  const oauth2Client = createOAuth2Client()

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // Force consent to get refresh token
  })
}

/**
 * Exchange authorization code for tokens
 */
export async function getTokensFromCode(code: string): Promise<{
  access_token: string
  refresh_token: string
  expiry_date: number
}> {
  const oauth2Client = createOAuth2Client()
  const { tokens } = await oauth2Client.getToken(code)

  if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
    throw new Error('Failed to get required tokens')
  }

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiry_date: tokens.expiry_date,
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string
  expiry_date: number
}> {
  const oauth2Client = createOAuth2Client()
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  const { credentials } = await oauth2Client.refreshAccessToken()

  if (!credentials.access_token || !credentials.expiry_date) {
    throw new Error('Failed to refresh access token')
  }

  return {
    access_token: credentials.access_token,
    expiry_date: credentials.expiry_date,
  }
}

/**
 * Get authenticated calendar client
 */
function getCalendarClient(accessToken: string) {
  const oauth2Client = createOAuth2Client()
  oauth2Client.setCredentials({ access_token: accessToken })

  return google.calendar({ version: 'v3', auth: oauth2Client })
}

/**
 * Convert task to Google Calendar event
 */
function taskToEvent(task: Task): any {
  const event: any = {
    summary: task.title,
    description: task.description || '',
    start: {},
    end: {},
  }

  // Set start and end times
  if (task.start_at) {
    event.start.dateTime = task.start_at
    event.start.timeZone = 'UTC'
  } else if (task.due_at) {
    event.start.dateTime = task.due_at
    event.start.timeZone = 'UTC'
  }

  // Calculate end time based on estimate
  if (task.estimate_minutes && event.start.dateTime) {
    const endDate = new Date(event.start.dateTime)
    endDate.setMinutes(endDate.getMinutes() + task.estimate_minutes)
    event.end.dateTime = endDate.toISOString()
    event.end.timeZone = 'UTC'
  } else if (event.start.dateTime) {
    // Default to 1 hour
    const endDate = new Date(event.start.dateTime)
    endDate.setHours(endDate.getHours() + 1)
    event.end.dateTime = endDate.toISOString()
    event.end.timeZone = 'UTC'
  }

  // Add labels as extended properties
  if (task.labels && task.labels.length > 0) {
    event.extendedProperties = {
      private: {
        labels: task.labels.map((l) => l.name).join(','),
        priority: task.status,
      },
    }
  }

  // Add reminders
  if (task.estimate_minutes) {
    event.reminders = {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 15 },
        { method: 'email', minutes: 60 },
      ],
    }
  }

  // Add recurrence if applicable
  if (task.recurrence_rule) {
    event.recurrence = [task.recurrence_rule]
  }

  return event
}

/**
 * Create a calendar event for a task
 */
export async function createCalendarEvent(
  accessToken: string,
  task: Task,
  calendarId: string = 'primary'
): Promise<{ eventId: string; etag: string }> {
  const calendar = getCalendarClient(accessToken)
  const event = taskToEvent(task)

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
  })

  if (!response.data.id || !response.data.etag) {
    throw new Error('Failed to create calendar event')
  }

  return {
    eventId: response.data.id,
    etag: response.data.etag,
  }
}

/**
 * Update a calendar event
 */
export async function updateCalendarEvent(
  accessToken: string,
  eventId: string,
  task: Task,
  etag: string,
  calendarId: string = 'primary'
): Promise<{ etag: string }> {
  const calendar = getCalendarClient(accessToken)
  const event = taskToEvent(task)

  // If task is completed, mark event as cancelled
  if (task.status === 'completed') {
    event.status = 'cancelled'
  }

  try {
    const response = await calendar.events.update({
      calendarId,
      eventId,
      requestBody: event,
      // Use etag for optimistic concurrency control
      headers: {
        'If-Match': etag,
      },
    })

    if (!response.data.etag) {
      throw new Error('Failed to update calendar event')
    }

    return {
      etag: response.data.etag,
    }
  } catch (err: any) {
    // Handle conflict (412 Precondition Failed)
    if (err.code === 412) {
      throw new Error('Calendar event was modified by another source. Please refresh and try again.')
    }
    throw err
  }
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(
  accessToken: string,
  eventId: string,
  calendarId: string = 'primary'
): Promise<void> {
  const calendar = getCalendarClient(accessToken)

  await calendar.events.delete({
    calendarId,
    eventId,
  })
}

/**
 * Get calendar event by ID
 */
export async function getCalendarEvent(
  accessToken: string,
  eventId: string,
  calendarId: string = 'primary'
): Promise<any> {
  const calendar = getCalendarClient(accessToken)

  const response = await calendar.events.get({
    calendarId,
    eventId,
  })

  return response.data
}

/**
 * List calendar events modified after a certain time
 */
export async function listModifiedEvents(
  accessToken: string,
  updatedMin: string,
  calendarId: string = 'primary'
): Promise<any[]> {
  const calendar = getCalendarClient(accessToken)

  const response = await calendar.events.list({
    calendarId,
    updatedMin,
    singleEvents: true,
    orderBy: 'updated',
  })

  return response.data.items || []
}

/**
 * Sync tasks with Google Calendar (two-way)
 */
export async function syncTasksWithCalendar(
  accessToken: string,
  tasks: Task[],
  existingLinks: Record<string, { eventId: string; etag: string }>,
  lastSyncTime: string
): Promise<{
  created: number
  updated: number
  conflicts: Array<{ taskId: string; reason: string }>
}> {
  const stats = {
    created: 0,
    updated: 0,
    conflicts: [] as Array<{ taskId: string; reason: string }>,
  }

  // Get modified events from Google Calendar
  const modifiedEvents = await listModifiedEvents(accessToken, lastSyncTime)
  const modifiedEventIds = new Set(modifiedEvents.map((e) => e.id))

  for (const task of tasks) {
    if (!task.sync_to_calendar) continue

    const existingLink = existingLinks[task.id]

    try {
      if (existingLink) {
        // Check for conflicts
        if (modifiedEventIds.has(existingLink.eventId)) {
          // Event was modified in Google Calendar - potential conflict
          const event = await getCalendarEvent(accessToken, existingLink.eventId)
          
          // Compare updated timestamps
          const eventUpdated = new Date(event.updated)
          const taskUpdated = new Date(task.updated_at)

          if (eventUpdated > taskUpdated) {
            // Google Calendar is newer - mark as conflict
            stats.conflicts.push({
              taskId: task.id,
              reason: 'Event modified in Google Calendar after task was updated',
            })
            continue
          }
        }

        // Update existing event
        const { etag } = await updateCalendarEvent(
          accessToken,
          existingLink.eventId,
          task,
          existingLink.etag
        )
        
        // Update etag in database
        existingLinks[task.id].etag = etag
        stats.updated++
      } else {
        // Create new event
        const { eventId, etag } = await createCalendarEvent(accessToken, task)
        
        // Store link in database
        existingLinks[task.id] = { eventId, etag }
        stats.created++
      }
    } catch (err: any) {
      stats.conflicts.push({
        taskId: task.id,
        reason: err.message || 'Unknown error',
      })
    }
  }

  return stats
}
