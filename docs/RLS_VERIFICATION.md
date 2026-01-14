# Row Level Security (RLS) Verification Guide

This document outlines how to verify that Row Level Security is correctly configured and performing well for the task management system.

## RLS Policies Overview

All tables have RLS enabled with policies that ensure users can only access their own data.

### Tasks Table
- Users can SELECT/INSERT/UPDATE/DELETE only tasks where `user_id = auth.uid()`
- Indexes: `tasks(user_id, status, due_at)`, `tasks(user_id, updated_at)`

### Labels Table
- Users can SELECT/INSERT/UPDATE/DELETE only labels where `user_id = auth.uid()`

### Task Labels Join Table
- Users can SELECT/INSERT/DELETE task_labels only for their own tasks (via subquery)

### Reminders Table
- Users can SELECT/INSERT/UPDATE/DELETE reminders only for their own tasks (via subquery)

### Calendar Accounts & Links
- Users can only access their own calendar accounts and links

### Task Activity & Time Logs
- Users can SELECT/INSERT only their own activity and time logs

## Verification Tests

### 1. Test User Isolation

```sql
-- As User A
INSERT INTO tasks (user_id, title, status, priority)
VALUES (auth.uid(), 'Test Task A', 'pending', 'medium')
RETURNING id;

-- As User B (should not see User A's task)
SELECT * FROM tasks WHERE title = 'Test Task A';
-- Should return 0 rows

-- As User B (try to update User A's task)
UPDATE tasks SET title = 'Hacked' WHERE title = 'Test Task A';
-- Should update 0 rows
```

### 2. Test Join Table Security

```sql
-- As User A, create a task and label
INSERT INTO tasks (user_id, title) VALUES (auth.uid(), 'My Task') RETURNING id as task_id;
INSERT INTO labels (user_id, name) VALUES (auth.uid(), 'My Label') RETURNING id as label_id;

-- Link them
INSERT INTO task_labels (task_id, label_id) VALUES ('task_id', 'label_id');

-- As User B, try to access the task_label
SELECT * FROM task_labels WHERE task_id = 'task_id';
-- Should return 0 rows (protected by subquery policy)
```

### 3. Test Query Performance

Run `EXPLAIN ANALYZE` on key queries to ensure indexes are being used:

```sql
-- Test 1: Get user's pending tasks
EXPLAIN ANALYZE
SELECT * FROM tasks
WHERE user_id = 'user-uuid'
AND status = 'pending'
AND due_at > NOW()
ORDER BY due_at ASC
LIMIT 10;

-- Expected: Index Scan using idx_tasks_user_status_due
-- Execution time: < 5ms

-- Test 2: Get tasks with labels
EXPLAIN ANALYZE
SELECT t.*, array_agg(l.*) as labels
FROM tasks t
LEFT JOIN task_labels tl ON t.id = tl.task_id
LEFT JOIN labels l ON tl.label_id = l.id
WHERE t.user_id = 'user-uuid'
GROUP BY t.id
ORDER BY t.updated_at DESC
LIMIT 20;

-- Expected: Index Scan, execution time < 10ms

-- Test 3: Get task activity
EXPLAIN ANALYZE
SELECT * FROM task_activity
WHERE user_id = 'user-uuid'
AND event_at > NOW() - INTERVAL '7 days'
ORDER BY event_at DESC
LIMIT 100;

-- Expected: Index Scan using idx_task_activity_user
```

### 4. Test Concurrent Access

```javascript
// Simulate multiple concurrent requests from same user
const promises = Array.from({ length: 10 }, (_, i) =>
  createTask({
    title: `Concurrent Task ${i}`,
    user_id: userId,
  })
);

await Promise.all(promises);

// Verify all 10 tasks were created
const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', userId)
  .ilike('title', 'Concurrent Task%');

console.log(`Created ${data.length} tasks`); // Should be 10
```

### 5. Test Data Leakage via Error Messages

```sql
-- Try to access another user's task by ID
SELECT * FROM tasks WHERE id = 'other-user-task-id';
-- Should return 0 rows, NOT an error that reveals task exists
```

## Performance Benchmarks

### Expected Performance Targets

| Operation | Target | Index Used |
|-----------|--------|------------|
| Get user tasks (10 items) | < 5ms | `idx_tasks_user_updated` |
| Get task with labels | < 10ms | `idx_tasks_user_status_due` + `idx_task_labels_task` |
| Create task + labels | < 50ms | Multiple inserts with triggers |
| Update task status | < 10ms | Primary key + triggers |
| Get analytics (7 days) | < 100ms | `idx_task_activity_user` |

### Load Testing

Use a tool like k6 or Apache Bench to simulate:
- 100 concurrent users
- Each performing 10 task operations
- Target: < 100ms p95 latency

## Security Checklist

- [ ] RLS is enabled on all tables
- [ ] Service role key is NEVER exposed to client
- [ ] Anon key is used for client-side operations
- [ ] All policies use `auth.uid()` for user identification
- [ ] Subquery policies are used for join tables
- [ ] No direct foreign key constraints bypass RLS
- [ ] Calendar tokens are encrypted in database
- [ ] API routes verify user authentication
- [ ] No sensitive data in client-side state

## Monitoring

### Set up alerts for:
1. Slow queries (> 100ms)
2. Failed RLS policy checks (unauthorized access attempts)
3. High database connection count
4. Calendar API rate limits

### Log queries for analysis:
```sql
-- Enable query logging in Supabase dashboard
-- Monitor for queries not using indexes
```

## Common Issues & Solutions

### Issue: Slow task queries
**Solution**: Ensure `user_id` is always included in WHERE clause to use indexes

### Issue: N+1 queries for labels
**Solution**: Use the provided data layer functions that fetch relations in single query

### Issue: Calendar sync conflicts
**Solution**: Use etag-based optimistic concurrency control

### Issue: Token expiration
**Solution**: Implement automatic token refresh in calendar sync job

## Automated Tests

Create integration tests that verify:
1. Users cannot access other users' data
2. All CRUD operations respect RLS
3. Queries use appropriate indexes
4. Performance meets targets

```typescript
// Example test
describe('RLS Verification', () => {
  it('should prevent cross-user task access', async () => {
    const userA = await createTestUser()
    const userB = await createTestUser()
    
    const taskA = await createTask(userA, { title: 'Task A' })
    
    const supabaseB = createClientAs(userB)
    const { data } = await supabaseB
      .from('tasks')
      .select('*')
      .eq('id', taskA.id)
    
    expect(data).toHaveLength(0)
  })
})
```

## Production Readiness Checklist

- [ ] All RLS policies tested
- [ ] Query performance verified
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Rate limiting implemented
- [ ] Error handling robust
- [ ] Documentation complete
