-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_at TIMESTAMPTZ,
    start_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    estimate_minutes INTEGER,
    actual_minutes INTEGER,
    sort_order INTEGER DEFAULT 0,
    parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    recurrence_rule TEXT, -- RRULE format
    recurrence_anchor TIMESTAMPTZ, -- Base date for recurrence
    sync_to_calendar BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create labels table (user-scoped catalog)
CREATE TABLE labels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#6366f1',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, name)
);

-- Create task_labels join table
CREATE TABLE task_labels (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (task_id, label_id)
);

-- Create reminders table
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    remind_at TIMESTAMPTZ NOT NULL,
    channel TEXT NOT NULL DEFAULT 'notification' CHECK (channel IN ('notification', 'email', 'sms')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create task_activity table (immutable event stream for analytics)
CREATE TABLE task_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'created', 'updated', 'completed', 'started', 'paused', etc.
    event_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create task_time_logs table (focus/execution logs)
CREATE TABLE task_time_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    minutes INTEGER,
    source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'timer', 'auto')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create calendar_accounts table (OAuth tokens for calendar providers)
CREATE TABLE calendar_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL CHECK (provider IN ('google', 'microsoft', 'apple')),
    email TEXT NOT NULL,
    access_token_enc TEXT NOT NULL, -- Encrypted
    refresh_token_enc TEXT, -- Encrypted
    token_expires_at TIMESTAMPTZ,
    scope TEXT NOT NULL,
    sync_enabled BOOLEAN DEFAULT true,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, provider, email)
);

-- Create calendar_links table (maps tasks to external calendar events)
CREATE TABLE calendar_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    calendar_account_id UUID NOT NULL REFERENCES calendar_accounts(id) ON DELETE CASCADE,
    external_event_id TEXT NOT NULL,
    etag TEXT, -- For conflict detection
    sync_status TEXT NOT NULL DEFAULT 'synced' CHECK (sync_status IN ('synced', 'pending', 'conflict', 'error')),
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(task_id, calendar_account_id)
);

-- Create indexes for performance
CREATE INDEX idx_tasks_user_status_due ON tasks(user_id, status, due_at);
CREATE INDEX idx_tasks_user_updated ON tasks(user_id, updated_at DESC);
CREATE INDEX idx_tasks_parent ON tasks(parent_task_id) WHERE parent_task_id IS NOT NULL;
CREATE INDEX idx_tasks_recurrence ON tasks(user_id, recurrence_rule) WHERE recurrence_rule IS NOT NULL;
CREATE INDEX idx_task_labels_task ON task_labels(task_id);
CREATE INDEX idx_task_labels_label ON task_labels(label_id);
CREATE INDEX idx_reminders_task_remind ON reminders(task_id, remind_at);
CREATE INDEX idx_reminders_status_remind ON reminders(status, remind_at) WHERE status = 'pending';
CREATE INDEX idx_task_activity_task ON task_activity(task_id, event_at DESC);
CREATE INDEX idx_task_activity_user ON task_activity(user_id, event_at DESC);
CREATE INDEX idx_task_time_logs_task ON task_time_logs(task_id, started_at DESC);
CREATE INDEX idx_calendar_links_task ON calendar_links(task_id);
CREATE INDEX idx_calendar_links_account ON calendar_links(calendar_account_id);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tasks
CREATE POLICY "Users can view own tasks"
    ON tasks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
    ON tasks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
    ON tasks FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
    ON tasks FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for labels
CREATE POLICY "Users can view own labels"
    ON labels FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own labels"
    ON labels FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own labels"
    ON labels FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own labels"
    ON labels FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for task_labels (via task ownership)
CREATE POLICY "Users can view task labels for own tasks"
    ON task_labels FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = task_labels.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert task labels for own tasks"
    ON task_labels FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = task_labels.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete task labels for own tasks"
    ON task_labels FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = task_labels.task_id
        AND tasks.user_id = auth.uid()
    ));

-- RLS Policies for reminders (via task ownership)
CREATE POLICY "Users can view reminders for own tasks"
    ON reminders FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = reminders.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert reminders for own tasks"
    ON reminders FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = reminders.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can update reminders for own tasks"
    ON reminders FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = reminders.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete reminders for own tasks"
    ON reminders FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = reminders.task_id
        AND tasks.user_id = auth.uid()
    ));

-- RLS Policies for task_activity
CREATE POLICY "Users can view own task activity"
    ON task_activity FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task activity"
    ON task_activity FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS Policies for task_time_logs
CREATE POLICY "Users can view own time logs"
    ON task_time_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own time logs"
    ON task_time_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own time logs"
    ON task_time_logs FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own time logs"
    ON task_time_logs FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for calendar_accounts
CREATE POLICY "Users can view own calendar accounts"
    ON calendar_accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calendar accounts"
    ON calendar_accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar accounts"
    ON calendar_accounts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar accounts"
    ON calendar_accounts FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for calendar_links (via task ownership)
CREATE POLICY "Users can view calendar links for own tasks"
    ON calendar_links FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = calendar_links.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert calendar links for own tasks"
    ON calendar_links FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = calendar_links.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can update calendar links for own tasks"
    ON calendar_links FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = calendar_links.task_id
        AND tasks.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete calendar links for own tasks"
    ON calendar_links FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM tasks
        WHERE tasks.id = calendar_links.task_id
        AND tasks.user_id = auth.uid()
    ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_labels_updated_at BEFORE UPDATE ON labels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_task_time_logs_updated_at BEFORE UPDATE ON task_time_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_accounts_updated_at BEFORE UPDATE ON calendar_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_links_updated_at BEFORE UPDATE ON calendar_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to log task activity automatically
CREATE OR REPLACE FUNCTION log_task_activity()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO task_activity (task_id, user_id, event_type, metadata)
        VALUES (NEW.id, NEW.user_id, 'created', jsonb_build_object(
            'title', NEW.title,
            'status', NEW.status,
            'priority', NEW.priority
        ));
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Log completion
        IF (OLD.status != 'completed' AND NEW.status = 'completed') THEN
            INSERT INTO task_activity (task_id, user_id, event_type, metadata)
            VALUES (NEW.id, NEW.user_id, 'completed', jsonb_build_object(
                'title', NEW.title,
                'completed_at', NEW.completed_at,
                'estimate_minutes', NEW.estimate_minutes,
                'actual_minutes', NEW.actual_minutes
            ));
        -- Log status changes
        ELSIF (OLD.status != NEW.status) THEN
            INSERT INTO task_activity (task_id, user_id, event_type, metadata)
            VALUES (NEW.id, NEW.user_id, 'status_changed', jsonb_build_object(
                'title', NEW.title,
                'old_status', OLD.status,
                'new_status', NEW.status
            ));
        END IF;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic task activity logging
CREATE TRIGGER log_task_activity_trigger
AFTER INSERT OR UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION log_task_activity();
