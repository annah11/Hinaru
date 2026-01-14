/**
 * Script to test Row Level Security policies
 * Run with: npx tsx scripts/test-rls.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function testRLS() {
  console.log('🔒 Testing Row Level Security...\n')

  // Create service client (bypasses RLS)
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

  // Create two test users
  console.log('1. Creating test users...')
  const { data: user1 } = await serviceClient.auth.admin.createUser({
    email: 'test1@example.com',
    password: 'testpassword123',
    email_confirm: true,
  })

  const { data: user2 } = await serviceClient.auth.admin.createUser({
    email: 'test2@example.com',
    password: 'testpassword123',
    email_confirm: true,
  })

  if (!user1?.user || !user2?.user) {
    console.error('❌ Failed to create test users')
    return
  }

  console.log('✅ Test users created')
  console.log(`   User 1: ${user1.user.id}`)
  console.log(`   User 2: ${user2.user.id}\n`)

  // Create client for user 1
  const { data: session1 } = await serviceClient.auth.signInWithPassword({
    email: 'test1@example.com',
    password: 'testpassword123',
  })

  const client1 = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: {
      headers: {
        Authorization: `Bearer ${session1.session?.access_token}`,
      },
    },
  })

  // Create client for user 2
  const { data: session2 } = await serviceClient.auth.signInWithPassword({
    email: 'test2@example.com',
    password: 'testpassword123',
  })

  const client2 = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: {
      headers: {
        Authorization: `Bearer ${session2.session?.access_token}`,
      },
    },
  })

  // Test 1: User 1 creates a task
  console.log('2. Testing task creation and isolation...')
  const { data: task1, error: createError } = await client1
    .from('tasks')
    .insert({
      user_id: user1.user.id,
      title: 'User 1 Task',
      status: 'pending',
      priority: 'medium',
    })
    .select()
    .single()

  if (createError) {
    console.error('❌ User 1 failed to create task:', createError)
  } else {
    console.log('✅ User 1 created task successfully')
  }

  // Test 2: User 2 tries to read User 1's task
  const { data: task1AsUser2, error: readError } = await client2
    .from('tasks')
    .select('*')
    .eq('id', task1?.id)

  if (task1AsUser2 && task1AsUser2.length > 0) {
    console.error('❌ SECURITY ISSUE: User 2 can read User 1\'s task!')
  } else {
    console.log('✅ User 2 cannot read User 1\'s task (RLS working)')
  }

  // Test 3: User 2 tries to update User 1's task
  const { error: updateError } = await client2
    .from('tasks')
    .update({ title: 'Hacked by User 2' })
    .eq('id', task1?.id)

  const { data: taskAfterUpdate } = await client1
    .from('tasks')
    .select('*')
    .eq('id', task1?.id)
    .single()

  if (taskAfterUpdate?.title === 'Hacked by User 2') {
    console.error('❌ SECURITY ISSUE: User 2 can update User 1\'s task!')
  } else {
    console.log('✅ User 2 cannot update User 1\'s task (RLS working)')
  }

  // Test 4: User 2 tries to delete User 1's task
  const { error: deleteError } = await client2
    .from('tasks')
    .delete()
    .eq('id', task1?.id)

  const { data: taskAfterDelete } = await client1
    .from('tasks')
    .select('*')
    .eq('id', task1?.id)
    .single()

  if (!taskAfterDelete) {
    console.error('❌ SECURITY ISSUE: User 2 can delete User 1\'s task!')
  } else {
    console.log('✅ User 2 cannot delete User 1\'s task (RLS working)')
  }

  // Test 5: Test labels isolation
  console.log('\n3. Testing labels isolation...')
  const { data: label1 } = await client1
    .from('labels')
    .insert({
      user_id: user1.user.id,
      name: 'User 1 Label',
      color: '#FF0000',
    })
    .select()
    .single()

  const { data: labelsAsUser2 } = await client2
    .from('labels')
    .select('*')
    .eq('id', label1?.id)

  if (labelsAsUser2 && labelsAsUser2.length > 0) {
    console.error('❌ SECURITY ISSUE: User 2 can read User 1\'s labels!')
  } else {
    console.log('✅ Labels are properly isolated')
  }

  // Cleanup
  console.log('\n4. Cleaning up...')
  await serviceClient.auth.admin.deleteUser(user1.user.id)
  await serviceClient.auth.admin.deleteUser(user2.user.id)
  console.log('✅ Test users deleted')

  console.log('\n✨ RLS tests completed!')
}

testRLS().catch(console.error)
