// Comprehensive data store for the productivity app

export type TaskCategory = "Learning" | "Work" | "Health" | "Personal"
export type CompletionStatus = "completed" | "partial" | "missed" | "unknown" | "pending"

export interface Task {
  id: string
  title: string
  description?: string
  category: TaskCategory
  scheduledTime: string
  duration: number // in minutes
  actualDuration?: number
  completionStatus: CompletionStatus
  confidenceScore: number // 0-100
  date: string
  tags?: string[]
}

export interface LearningSession {
  id: string
  topic: string
  duration: number
  completedAt: string
  category: string
  progress: number // 0-100
}

export interface DailyStats {
  date: string
  planned: number
  completed: number
  partial: number
  missed: number
  adherenceRate: number
  plannedMinutes: number
  executedMinutes: number
}

export interface CategoryStats {
  category: TaskCategory
  planned: number
  completed: number
  partial: number
  missed: number
  adherenceRate: number
  trend: number // percentage change from last week
}

export interface AIInsight {
  id: string
  type: "pattern" | "suggestion" | "celebration" | "warning"
  title: string
  message: string
  actionable?: string
  priority: "high" | "medium" | "low"
  category?: TaskCategory
  timestamp: string
}

export interface WeeklyReflection {
  weekStart: string
  weekEnd: string
  totalTasks: number
  completedTasks: number
  topCategory: TaskCategory
  streak: number
  highlights: string[]
  improvements: string[]
  overallScore: number
}

// Sample Tasks Data
export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "React Advanced Patterns",
    description: "Deep dive into compound components and render props",
    category: "Learning",
    scheduledTime: "09:00",
    duration: 90,
    actualDuration: 85,
    completionStatus: "completed",
    confidenceScore: 95,
    date: "2026-01-10",
    tags: ["react", "frontend"]
  },
  {
    id: "2",
    title: "Morning Yoga Session",
    category: "Health",
    scheduledTime: "07:00",
    duration: 30,
    actualDuration: 30,
    completionStatus: "completed",
    confidenceScore: 100,
    date: "2026-01-10",
    tags: ["wellness", "routine"]
  },
  {
    id: "3",
    title: "Team Standup Meeting",
    category: "Work",
    scheduledTime: "10:30",
    duration: 30,
    actualDuration: 25,
    completionStatus: "completed",
    confidenceScore: 90,
    date: "2026-01-10"
  },
  {
    id: "4",
    title: "Project Documentation",
    category: "Work",
    scheduledTime: "11:00",
    duration: 60,
    actualDuration: 45,
    completionStatus: "partial",
    confidenceScore: 65,
    date: "2026-01-10",
    tags: ["documentation", "priority"]
  },
  {
    id: "5",
    title: "TypeScript Generics Practice",
    category: "Learning",
    scheduledTime: "14:00",
    duration: 60,
    completionStatus: "pending",
    confidenceScore: 0,
    date: "2026-01-10",
    tags: ["typescript", "practice"]
  },
  {
    id: "6",
    title: "Gym Workout",
    category: "Health",
    scheduledTime: "17:00",
    duration: 60,
    completionStatus: "pending",
    confidenceScore: 0,
    date: "2026-01-10"
  },
  {
    id: "7",
    title: "Read 'Atomic Habits'",
    category: "Personal",
    scheduledTime: "20:00",
    duration: 45,
    completionStatus: "pending",
    confidenceScore: 0,
    date: "2026-01-10"
  },
  {
    id: "8",
    title: "Code Review PR #234",
    category: "Work",
    scheduledTime: "15:00",
    duration: 45,
    completionStatus: "pending",
    confidenceScore: 0,
    date: "2026-01-10"
  }
]

// Weekly Analytics Data
export const weeklyAnalytics: DailyStats[] = [
  { date: "Mon", planned: 8, completed: 7, partial: 1, missed: 0, adherenceRate: 94, plannedMinutes: 420, executedMinutes: 395 },
  { date: "Tue", planned: 7, completed: 5, partial: 1, missed: 1, adherenceRate: 79, plannedMinutes: 380, executedMinutes: 310 },
  { date: "Wed", planned: 9, completed: 8, partial: 1, missed: 0, adherenceRate: 94, plannedMinutes: 450, executedMinutes: 420 },
  { date: "Thu", planned: 6, completed: 6, partial: 0, missed: 0, adherenceRate: 100, plannedMinutes: 320, executedMinutes: 320 },
  { date: "Fri", planned: 8, completed: 6, partial: 2, missed: 0, adherenceRate: 88, plannedMinutes: 400, executedMinutes: 350 },
  { date: "Sat", planned: 4, completed: 4, partial: 0, missed: 0, adherenceRate: 100, plannedMinutes: 180, executedMinutes: 180 },
  { date: "Sun", planned: 3, completed: 2, partial: 1, missed: 0, adherenceRate: 83, plannedMinutes: 150, executedMinutes: 125 }
]

// Monthly trend data for charts
export const monthlyTrend = [
  { week: "Week 1", adherence: 78, tasks: 42 },
  { week: "Week 2", adherence: 82, tasks: 45 },
  { week: "Week 3", adherence: 86, tasks: 48 },
  { week: "Week 4", adherence: 89, tasks: 50 }
]

// Category breakdown
export const categoryStats: CategoryStats[] = [
  { category: "Learning", planned: 18, completed: 15, partial: 2, missed: 1, adherenceRate: 89, trend: 12 },
  { category: "Work", planned: 22, completed: 19, partial: 2, missed: 1, adherenceRate: 91, trend: 5 },
  { category: "Health", planned: 14, completed: 12, partial: 1, missed: 1, adherenceRate: 89, trend: -3 },
  { category: "Personal", planned: 10, completed: 8, partial: 1, missed: 1, adherenceRate: 85, trend: 8 }
]

// Learning sessions
export const learningSessions: LearningSession[] = [
  { id: "l1", topic: "React Advanced Patterns", duration: 90, completedAt: "2026-01-10T10:30:00", category: "Frontend", progress: 75 },
  { id: "l2", topic: "TypeScript Generics", duration: 60, completedAt: "2026-01-09T14:00:00", category: "Languages", progress: 60 },
  { id: "l3", topic: "System Design Fundamentals", duration: 45, completedAt: "2026-01-08T09:00:00", category: "Architecture", progress: 40 },
  { id: "l4", topic: "GraphQL & Apollo", duration: 60, completedAt: "2026-01-07T15:00:00", category: "Backend", progress: 85 },
  { id: "l5", topic: "Testing Best Practices", duration: 45, completedAt: "2026-01-06T11:00:00", category: "Quality", progress: 50 }
]

// AI Insights
export const aiInsights: AIInsight[] = [
  {
    id: "ai1",
    type: "pattern",
    title: "Morning Learning Champion",
    message: "You complete 85% of learning tasks scheduled before 11 AM. Your morning focus is exceptional!",
    actionable: "Consider moving more learning tasks to morning slots",
    priority: "high",
    category: "Learning",
    timestamp: "2026-01-10T08:00:00"
  },
  {
    id: "ai2",
    type: "celebration",
    title: "12-Day Streak! 🔥",
    message: "Amazing consistency! You've maintained your streak for 12 consecutive days.",
    priority: "medium",
    timestamp: "2026-01-10T07:00:00"
  },
  {
    id: "ai3",
    type: "suggestion",
    title: "Evening Task Optimization",
    message: "Tasks after 7 PM have 40% lower completion. Try shorter 15-20 min tasks instead.",
    actionable: "Split evening tasks into smaller chunks",
    priority: "medium",
    category: "Personal",
    timestamp: "2026-01-09T20:00:00"
  },
  {
    id: "ai4",
    type: "warning",
    title: "Health Tasks Declining",
    message: "Health task completion dropped 15% this week. Your wellbeing matters!",
    actionable: "Add a reminder 10 minutes before health activities",
    priority: "high",
    category: "Health",
    timestamp: "2026-01-09T18:00:00"
  },
  {
    id: "ai5",
    type: "pattern",
    title: "Work-Life Balance",
    message: "Great balance! Work tasks stay within work hours 92% of the time.",
    priority: "low",
    category: "Work",
    timestamp: "2026-01-08T17:00:00"
  }
]

// Weekly reflection
export const weeklyReflection: WeeklyReflection = {
  weekStart: "2026-01-04",
  weekEnd: "2026-01-10",
  totalTasks: 45,
  completedTasks: 38,
  topCategory: "Work",
  streak: 12,
  highlights: [
    "Completed React Advanced Patterns course section",
    "Perfect gym attendance this week",
    "Finished project documentation ahead of schedule"
  ],
  improvements: [
    "Evening task completion could improve",
    "Consider shorter learning sessions on weekends"
  ],
  overallScore: 84
}

// Time distribution for pie charts
export const timeDistribution = [
  { name: "Learning", value: 420, color: "#6366f1" },
  { name: "Work", value: 580, color: "#22c55e" },
  { name: "Health", value: 180, color: "#f97316" },
  { name: "Personal", value: 150, color: "#a855f7" }
]

// Hourly productivity data
export const hourlyProductivity = [
  { hour: "6AM", productivity: 40 },
  { hour: "7AM", productivity: 65 },
  { hour: "8AM", productivity: 80 },
  { hour: "9AM", productivity: 95 },
  { hour: "10AM", productivity: 92 },
  { hour: "11AM", productivity: 88 },
  { hour: "12PM", productivity: 70 },
  { hour: "1PM", productivity: 65 },
  { hour: "2PM", productivity: 85 },
  { hour: "3PM", productivity: 90 },
  { hour: "4PM", productivity: 82 },
  { hour: "5PM", productivity: 75 },
  { hour: "6PM", productivity: 60 },
  { hour: "7PM", productivity: 50 },
  { hour: "8PM", productivity: 45 },
  { hour: "9PM", productivity: 35 }
]

// Category colors
export const categoryColors: Record<TaskCategory, { bg: string; text: string; accent: string }> = {
  Learning: { bg: "bg-blue-500", text: "text-blue-600", accent: "#6366f1" },
  Work: { bg: "bg-green-500", text: "text-green-600", accent: "#22c55e" },
  Health: { bg: "bg-orange-500", text: "text-orange-600", accent: "#f97316" },
  Personal: { bg: "bg-purple-500", text: "text-purple-600", accent: "#a855f7" }
}

// Completion status info
export const completionStatusInfo: Record<CompletionStatus, { label: string; color: string; icon: string }> = {
  completed: { label: "Completed", color: "#22c55e", icon: "✓" },
  partial: { label: "Partial", color: "#f59e0b", icon: "◐" },
  missed: { label: "Missed", color: "#ef4444", icon: "✗" },
  unknown: { label: "Unknown", color: "#94a3b8", icon: "?" },
  pending: { label: "Pending", color: "#6366f1", icon: "○" }
}
