"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer
} from "recharts"
import {
  Target,
  Plus,
  CheckCircle2,
  Circle,
  Trophy,
  Flame,
  Calendar,
  Clock,
  TrendingUp,
  Star,
  Award,
  Zap,
  BookOpen,
  Briefcase,
  Heart,
  User,
  ChevronRight,
  Edit3,
  MoreHorizontal
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"

interface Goal {
  id: string
  title: string
  description: string
  category: "Learning" | "Work" | "Health" | "Personal"
  progress: number
  target: number
  unit: string
  deadline: string
  milestones: { id: string; title: string; completed: boolean }[]
  streak?: number
  priority: "high" | "medium" | "low"
}

const goals: Goal[] = [
  {
    id: "g1",
    title: "Complete React Advanced Course",
    description: "Finish all 12 modules of the React Advanced Patterns course",
    category: "Learning",
    progress: 9,
    target: 12,
    unit: "modules",
    deadline: "2026-02-15",
    milestones: [
      { id: "m1", title: "Complete Compound Components", completed: true },
      { id: "m2", title: "Master Render Props", completed: true },
      { id: "m3", title: "Learn Custom Hooks", completed: true },
      { id: "m4", title: "Implement Context Patterns", completed: false }
    ],
    streak: 8,
    priority: "high"
  },
  {
    id: "g2",
    title: "Exercise 5 Days a Week",
    description: "Maintain consistent workout routine for better health",
    category: "Health",
    progress: 3,
    target: 5,
    unit: "days/week",
    deadline: "2026-01-31",
    milestones: [
      { id: "m5", title: "Week 1: 5 days", completed: true },
      { id: "m6", title: "Week 2: 5 days", completed: true },
      { id: "m7", title: "Week 3: 5 days", completed: false },
      { id: "m8", title: "Week 4: 5 days", completed: false }
    ],
    streak: 3,
    priority: "high"
  },
  {
    id: "g3",
    title: "Read 12 Books This Year",
    description: "One book per month for personal development",
    category: "Personal",
    progress: 1,
    target: 12,
    unit: "books",
    deadline: "2026-12-31",
    milestones: [
      { id: "m9", title: "Atomic Habits", completed: true },
      { id: "m10", title: "Deep Work", completed: false },
      { id: "m11", title: "The Psychology of Money", completed: false }
    ],
    priority: "medium"
  },
  {
    id: "g4",
    title: "Ship 3 Side Projects",
    description: "Build and launch personal projects to portfolio",
    category: "Work",
    progress: 1,
    target: 3,
    unit: "projects",
    deadline: "2026-06-30",
    milestones: [
      { id: "m12", title: "Project 1: Task Manager", completed: true },
      { id: "m13", title: "Project 2: Portfolio Site", completed: false },
      { id: "m14", title: "Project 3: API Service", completed: false }
    ],
    priority: "medium"
  }
]

const achievements = [
  { id: "a1", title: "First Goal Set", icon: "🎯", unlocked: true, date: "Jan 1" },
  { id: "a2", title: "7-Day Streak", icon: "🔥", unlocked: true, date: "Jan 8" },
  { id: "a3", title: "First Milestone", icon: "⭐", unlocked: true, date: "Jan 5" },
  { id: "a4", title: "Goal Crusher", icon: "💪", unlocked: false, description: "Complete 5 goals" },
  { id: "a5", title: "30-Day Streak", icon: "🏆", unlocked: false, description: "Maintain 30-day streak" },
  { id: "a6", title: "Category Master", icon: "🎨", unlocked: false, description: "Complete goals in all categories" }
]

const CATEGORY_STYLES = {
  Learning: { color: "#6366f1", bg: "bg-blue-500/10", text: "text-blue-500", icon: BookOpen },
  Work: { color: "#22c55e", bg: "bg-green-500/10", text: "text-green-500", icon: Briefcase },
  Health: { color: "#f97316", bg: "bg-orange-500/10", text: "text-orange-500", icon: Heart },
  Personal: { color: "#a855f7", bg: "bg-purple-500/10", text: "text-purple-500", icon: User }
}

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState("active")
  
  const totalProgress = Math.round(goals.reduce((acc, g) => acc + (g.progress / g.target) * 100, 0) / goals.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-500/5">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <Target className="w-8 h-8 text-amber-500" />
                Goals & Milestones
              </h1>
              <p className="text-muted-foreground mt-1">Track your long-term objectives and celebrate progress</p>
            </div>
            
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </header>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Goals</p>
                    <p className="text-3xl font-bold mt-1">{goals.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10">
                    <Target className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <p className="text-3xl font-bold mt-1">{totalProgress}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Streak</p>
                    <p className="text-3xl font-bold mt-1">8 days</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/10">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                    <p className="text-3xl font-bold mt-1">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <Trophy className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border shadow-sm">
              <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Active Goals
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goals.map((goal) => {
                  const style = CATEGORY_STYLES[goal.category]
                  const Icon = style.icon
                  const progressPercent = Math.round((goal.progress / goal.target) * 100)
                  const completedMilestones = goal.milestones.filter(m => m.completed).length
                  
                  const radialData = [
                    { name: 'progress', value: progressPercent, fill: style.color }
                  ]
                  
                  return (
                    <Card key={goal.id} className="border-0 shadow-lg hover:shadow-xl transition-all group">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Progress Ring */}
                          <div className="flex-shrink-0">
                            <div className="relative w-24 h-24">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                  cx="50%"
                                  cy="50%"
                                  innerRadius="70%"
                                  outerRadius="100%"
                                  barSize={8}
                                  data={radialData}
                                  startAngle={90}
                                  endAngle={-270}
                                >
                                  <RadialBar
                                    dataKey="value"
                                    cornerRadius={10}
                                    background={{ fill: 'hsl(var(--muted))' }}
                                  />
                                </RadialBarChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold">{progressPercent}%</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Goal Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge className={`${style.bg} ${style.text} border-0`}>
                                    {goal.category}
                                  </Badge>
                                  <Badge variant="outline" className={`
                                    ${goal.priority === 'high' ? 'border-red-500 text-red-500' :
                                      goal.priority === 'medium' ? 'border-yellow-500 text-yellow-500' :
                                      'border-gray-500 text-gray-500'}
                                  `}>
                                    {goal.priority}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-lg">{goal.title}</h3>
                              </div>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-5 h-5" />
                              </Button>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="font-medium text-foreground">
                                {goal.progress}/{goal.target} {goal.unit}
                              </span>
                              {goal.streak && (
                                <span className="flex items-center gap-1 text-orange-500">
                                  <Flame className="w-4 h-4" />
                                  {goal.streak} day streak
                                </span>
                              )}
                            </div>
                            
                            {/* Milestones */}
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground">
                                Milestones ({completedMilestones}/{goal.milestones.length})
                              </p>
                              <div className="space-y-1">
                                {goal.milestones.slice(0, 3).map((milestone) => (
                                  <div key={milestone.id} className="flex items-center gap-2">
                                    {milestone.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                      {milestone.title}
                                    </span>
                                  </div>
                                ))}
                                {goal.milestones.length > 3 && (
                                  <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto">
                                    +{goal.milestones.length - 3} more milestones
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
                
                {/* Add Goal Card */}
                <Card className="border-2 border-dashed border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-6 flex items-center justify-center h-full min-h-[280px]">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors mx-auto mb-4">
                        <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-semibold text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                        Add New Goal
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Set a new objective to track
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`border-0 shadow-lg text-center transition-all ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-500/10 via-card to-orange-500/10 hover:shadow-xl' 
                        : 'opacity-50 grayscale'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="text-5xl mb-3">{achievement.icon}</div>
                      <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                      {achievement.unlocked ? (
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
