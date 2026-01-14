# Hina - Advanced Task Management System

A comprehensive task management system built with Next.js, Supabase, and Google Calendar integration. Features include advanced task scheduling, recurrence patterns, reminders, analytics, and two-way calendar synchronization.

## Features

### Core Task Management
- ✅ Create, read, update, delete tasks
- ✅ Task categories (Learning, Work, Health, Personal)
- ✅ Priority levels (Low, Medium, High, Urgent)
- ✅ Due dates and time estimates
- ✅ Task descriptions and notes
- ✅ Subtasks support
- ✅ Task completion tracking

### Advanced Features
- 🔄 **Recurring Tasks** - Support for daily, weekly, monthly, yearly patterns with RRULE
- ⏰ **Smart Reminders** - Multiple reminder channels (notification, email, SMS)
- 📊 **Analytics Dashboard** - Track productivity, completion rates, time distribution
- 🎯 **Goal Tracking** - Monitor progress across categories
- 🔥 **Streak Tracking** - Build consistent habits
- 🤖 **AI Insights** - Pattern detection and suggestions

### Google Calendar Integration
- 📅 **Two-Way Sync** - Tasks automatically sync to Google Calendar
- 🔄 **Conflict Resolution** - Smart handling of calendar conflicts
- ✅ **Completion Status** - Marking tasks done updates calendar events
- 🔒 **Secure OAuth** - Industry-standard authentication
- 🔐 **Token Encryption** - Secure storage of access tokens

### Security & Performance
- 🔒 **Row Level Security** - User data isolation with Supabase RLS
- ⚡ **Optimized Queries** - Indexed database access
- 🚀 **Fast Performance** - <100ms p95 latency target
- 🔐 **Encrypted Tokens** - Calendar credentials securely stored
- 👤 **Per-User Isolation** - Complete data privacy

### Mobile Responsive
- 📱 Fully responsive design
- 🎨 Beautiful UI with Tailwind CSS
- 🌓 Dark mode support
- 📊 Interactive charts and visualizations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **Calendar**: Google Calendar API
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Recurrence**: RRule
- **Notifications**: Sonner

## Getting Started

### Quick Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd hina
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.local.example` to `.env.local` and fill in your values:
- Supabase URL and anon key
- Google OAuth credentials
- Encryption key (generate with: `openssl rand -hex 32`)

4. **Run database migrations**

Either use Supabase CLI or copy SQL from `supabase/migrations/001_init_tasks_schema.sql` to your Supabase SQL Editor.

5. **Start development server**
```bash
npm run dev
```

6. **Open the app**

Navigate to [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)

## Architecture

### Database Schema

```
tasks
  ├─ user_id (FK to auth.users)
  ├─ title, description
  ├─ status, priority
  ├─ due_at, start_at, completed_at
  ├─ estimate_minutes, actual_minutes
  ├─ parent_task_id (for subtasks)
  ├─ recurrence_rule (RRULE format)
  └─ sync_to_calendar

labels
  ├─ user_id
  ├─ name
  └─ color

task_labels (join table)
  ├─ task_id
  └─ label_id

reminders
  ├─ task_id
  ├─ remind_at
  ├─ channel (notification/email/sms)
  └─ status

calendar_accounts
  ├─ user_id
  ├─ provider (google/microsoft/apple)
  ├─ access_token_enc (encrypted)
  └─ refresh_token_enc (encrypted)

calendar_links
  ├─ task_id
  ├─ calendar_account_id
  ├─ external_event_id
  └─ etag (for conflict detection)

task_activity (analytics)
  ├─ task_id
  ├─ event_type
  └─ metadata

task_time_logs
  ├─ task_id
  ├─ started_at, ended_at
  └─ minutes
```

### Data Flow

```
User Action → Client Component → Server Action → Supabase (RLS) → Database
                                    ↓
                              Calendar Sync
                                    ↓
                            Google Calendar API
```

### Security

All data access is protected by Supabase Row Level Security (RLS):
- Users can only access their own tasks, labels, and data
- Calendar tokens are encrypted at rest
- OAuth tokens are never exposed to client
- API routes verify authentication

See [docs/RLS_VERIFICATION.md](docs/RLS_VERIFICATION.md) for security details.

## API Routes

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Calendar
- `GET /api/calendar/auth` - Get OAuth URL
- `GET /api/calendar/callback` - OAuth callback
- `POST /api/calendar/sync` - Trigger calendar sync

### Cron Jobs (Production)
- `/api/cron/recurring` - Process recurring tasks (daily)
- `/api/cron/reminders` - Send pending reminders (every minute)
- `/api/cron/calendar-sync` - Sync with calendar (hourly)

## Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── page.tsx           # Dashboard
│   ├── analytics/         # Analytics page
│   └── learning/          # Learning page
├── components/            # React components
├── lib/
│   ├── actions/          # Server actions
│   ├── calendar/         # Calendar integration
│   ├── supabase/         # Supabase client setup
│   ├── tasks.ts          # Task data layer
│   └── recurrence.ts     # Recurrence logic
├── supabase/
│   └── migrations/       # Database migrations
└── docs/                 # Documentation
```

### Key Files

- `lib/tasks.ts` - Core task data access layer
- `lib/actions/tasks.ts` - Server actions for tasks
- `lib/calendar/google.ts` - Google Calendar integration
- `lib/recurrence.ts` - Recurrence pattern handling
- `supabase/migrations/001_init_tasks_schema.sql` - Database schema

### Testing

Run RLS and performance tests:
```bash
npm run test:rls
npm run test:performance
```

See [docs/RLS_VERIFICATION.md](docs/RLS_VERIFICATION.md) for test details.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables (Production)

Set these in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `ENCRYPTION_KEY`

### Post-Deployment

1. Set up cron jobs for recurring tasks and reminders
2. Configure monitoring and alerts
3. Enable database backups
4. Set up error tracking (Sentry)
5. Configure rate limiting

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the [docs](./docs) folder
- Review [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)
- Open an issue on GitHub

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Offline support
- [ ] Team collaboration features
- [ ] Microsoft Calendar integration
- [ ] Apple Calendar integration
- [ ] Advanced AI insights
- [ ] Voice commands
- [ ] Pomodoro timer integration
- [ ] Time blocking features
- [ ] Eisenhower matrix view
- [ ] Kanban board view

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Google Calendar API](https://developers.google.com/calendar)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RRule](https://github.com/jakubroztocil/rrule)
