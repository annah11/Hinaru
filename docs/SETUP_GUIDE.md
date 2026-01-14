# Task System Setup Guide

This guide will help you set up the complete task management system with Supabase and Google Calendar integration.

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Google Cloud account (for Calendar API)

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be provisioned
4. Note down your project URL and anon key

### 1.2 Run Database Migrations

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Run the migration:
```bash
supabase db push
```

Alternatively, copy the SQL from `supabase/migrations/001_init_tasks_schema.sql` and run it in the Supabase SQL Editor.

### 1.3 Enable Authentication

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Enable any other providers you want (Google, GitHub, etc.)

## Step 2: Google Calendar Setup

### 2.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 2.2 Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure consent screen if prompted
4. Choose "Web application"
5. Add authorized redirect URI:
   - For development: `http://localhost:3000/api/calendar/callback`
   - For production: `https://yourdomain.com/api/calendar/callback`
6. Save and note down:
   - Client ID
   - Client Secret

## Step 3: Environment Variables

### 3.1 Create .env.local

Copy `.env.local.example` to `.env.local` and fill in the values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Calendar
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/calendar/callback

# Optional: Encryption key for tokens (generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your-32-character-encryption-key
```

### 3.2 Production Environment

For production, set these in your hosting platform's environment variables (Vercel, Netlify, etc.).

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Create Test User

1. Go to the signup page
2. Create an account with email/password
3. Verify email (if required)
4. Login

## Step 7: Connect Google Calendar

1. Go to Settings page
2. Click "Connect Google Calendar"
3. Authorize the app
4. You should see "Calendar connected" message

## Step 8: Create Your First Task

1. Go to Dashboard
2. Click "Add Task" button
3. Fill in:
   - Title: "Test Task"
   - Category: Work
   - Date: Today
   - Time: Any time
   - Duration: 30 minutes
4. Click "Add Task"
5. The task should appear in the timeline

## Step 9: Verify Calendar Sync

1. Trigger a manual sync (or wait for automatic sync)
2. Go to your Google Calendar
3. You should see the task as an event

## Step 10: Set Up Automated Jobs (Production)

For recurring tasks and reminders to work automatically, set up cron jobs or Edge Functions:

### Option A: Supabase Edge Functions

Create Edge Functions that run on a schedule:

```typescript
// supabase/functions/process-recurring/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { processRecurringTasks } from "../../../lib/actions/recurrence.ts"

serve(async (req) => {
  const result = await processRecurringTasks()
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  })
})
```

Schedule it in Supabase Dashboard:
- Go to Edge Functions
- Deploy function
- Set schedule: `0 0 * * *` (daily at midnight)

### Option B: External Cron Service

Use a service like:
- Vercel Cron
- GitHub Actions
- EasyCron
- Cron-job.org

Configure to hit these endpoints:
- `/api/cron/recurring` - Daily for recurring tasks
- `/api/cron/reminders` - Every minute for reminders
- `/api/cron/calendar-sync` - Hourly for calendar sync

## Troubleshooting

### Issue: "Not authenticated" error
**Solution**: Make sure you're logged in and the session is valid. Check browser console for errors.

### Issue: Tasks not appearing
**Solution**: Check browser console for errors. Verify RLS policies are correctly set up.

### Issue: Calendar not syncing
**Solution**: 
1. Check Google OAuth credentials
2. Verify redirect URI matches exactly
3. Check access token hasn't expired
4. Look at API logs in `/api/calendar/sync`

### Issue: Slow performance
**Solution**:
1. Run `EXPLAIN ANALYZE` on slow queries
2. Verify indexes are being used
3. Check database connection pool
4. Review RLS policies for efficiency

## Next Steps

- [ ] Configure custom email templates
- [ ] Set up monitoring and alerts
- [ ] Enable backups
- [ ] Configure rate limiting
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Vercel Analytics, PostHog)
- [ ] Create user documentation
- [ ] Set up CI/CD pipeline

## Security Best Practices

1. **Never expose service_role key** - Only use anon key on client
2. **Encrypt sensitive data** - Calendar tokens, API keys
3. **Validate all inputs** - Use Zod schemas
4. **Rate limit API endpoints** - Prevent abuse
5. **Regular security audits** - Review RLS policies
6. **Keep dependencies updated** - Run `npm audit`
7. **Enable 2FA** - For Supabase and Google accounts
8. **Monitor logs** - Set up alerts for suspicious activity

## Support

If you encounter issues:
1. Check the docs in `/docs` folder
2. Review Supabase logs
3. Check Google Calendar API quotas
4. Review application logs

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Google Calendar API](https://developers.google.com/calendar)
- [Next.js Documentation](https://nextjs.org/docs)
- [RRule Documentation](https://github.com/jakubroztocil/rrule)
