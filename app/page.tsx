"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar
} from "recharts"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Flame,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Brain,
  BookOpen,
  Briefcase,
  Heart,
  User,
  MoreHorizontal
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"
import DashboardTimeline from "@/components/dashboard-timeline"
import TaskInputScreen from "@/components/task-input-screen"
import CelebrationCard from "@/components/celebration-card"
import {
  sampleTasks,
  weeklyAnalytics,
  categoryStats,
  aiInsights,
  timeDistribution,
  hourlyProductivity,
  categoryColors
} from "@/lib/data"

const CATEGORY_COLORS = {
  Learning: "#6366f1",
  Work: "#22c55e",
  Health: "#f97316",
  Personal: "#a855f7"
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-xl p-3 backdrop-blur-sm">
        <p className="font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [showTaskInput, setShowTaskInput] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleTaskComplete = () => {
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2500)
  }

  // Calculate stats
  const totalPlanned = sampleTasks.length
  const completed = sampleTasks.filter(t => t.completionStatus === "completed").length
  const partial = sampleTasks.filter(t => t.completionStatus === "partial").length
  const pending = sampleTasks.filter(t => t.completionStatus === "pending").length
  const adherenceRate = Math.round(((completed + partial * 0.5) / totalPlanned) * 100)

  const totalMinutesPlanned = sampleTasks.reduce((acc, t) => acc + t.duration, 0)
  const totalMinutesExecuted = sampleTasks.reduce((acc, t) => acc + (t.actualDuration || 0), 0)

  // Greeting based on time
  const hour = currentTime.getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                  {greeting}, <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">John</span>
                </h1>
                <div className="animate-bounce">👋</div>
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="text-foreground font-medium ml-2">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowTaskInput(!showTaskInput)}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </header>

          {/* Task Input Modal */}
          {showTaskInput && (
            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <TaskInputScreen onClose={() => setShowTaskInput(false)} />
            </div>
          )}

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Plan Adherence */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Plan Adherence</p>
                  <p className="text-3xl font-bold">{adherenceRate}%</p>
                </div>
                <Progress value={adherenceRate} className="mt-3 h-2" />
              </CardContent>
            </Card>

            {/* Tasks Completed */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-500/10 via-card to-card shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors" />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">{pending} pending</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-3xl font-bold">{completed}<span className="text-lg text-muted-foreground">/{totalPlanned}</span></p>
                </div>
                <div className="flex gap-1 mt-3">
                  {sampleTasks.slice(0, 8).map((task, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                        task.completionStatus === 'completed' ? 'bg-green-500' :
                        task.completionStatus === 'partial' ? 'bg-yellow-500' :
                        task.completionStatus === 'pending' ? 'bg-muted' : 'bg-red-500'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Tracked */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-500/10 via-card to-card shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors" />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/10">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-0">
                    {Math.round((totalMinutesExecuted / totalMinutesPlanned) * 100)}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Time Executed</p>
                  <p className="text-3xl font-bold">{Math.floor(totalMinutesExecuted / 60)}h <span className="text-lg text-muted-foreground">/ {Math.floor(totalMinutesPlanned / 60)}h</span></p>
                </div>
                <Progress value={(totalMinutesExecuted / totalMinutesPlanned) * 100} className="mt-3 h-2" />
              </CardContent>
            </Card>

            {/* Streak */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500/10 via-card to-card shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <Flame className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold">12 <span className="text-lg text-muted-foreground">days</span></p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Best streak: 18 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Timeline - Takes 2 columns */}
            <div className="xl:col-span-2">
              <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>Drag tasks to reschedule • Click to mark complete</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <DashboardTimeline onTaskComplete={handleTaskComplete} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - AI Insights & Quick Stats */}
            <div className="space-y-6">
              {/* AI Insights Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500/5 via-card to-purple-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-purple-600">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    AI Insights
                    <span className="ml-auto flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiInsights.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-3 rounded-xl border transition-all hover:shadow-md cursor-pointer group ${
                        insight.type === 'celebration' 
                          ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/40' 
                          : insight.type === 'warning'
                          ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/20 hover:border-red-500/40'
                          : 'bg-card/50 border-border/50 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          insight.type === 'celebration' ? 'bg-amber-500/20' :
                          insight.type === 'warning' ? 'bg-red-500/20' :
                          insight.type === 'suggestion' ? 'bg-blue-500/20' : 'bg-primary/20'
                        }`}>
                          {insight.type === 'celebration' ? <Sparkles className="w-4 h-4 text-amber-500" /> :
                           insight.type === 'warning' ? <AlertCircle className="w-4 h-4 text-red-500" /> :
                           insight.type === 'suggestion' ? <Zap className="w-4 h-4 text-blue-500" /> :
                           <Brain className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{insight.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{insight.message}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/10">
                    View All Insights <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              {/* Category Breakdown Mini */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Category Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryStats.map((cat) => {
                      const Icon = cat.category === 'Learning' ? BookOpen :
                                   cat.category === 'Work' ? Briefcase :
                                   cat.category === 'Health' ? Heart : User
                      return (
                        <div key={cat.category} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg`} style={{ backgroundColor: `${CATEGORY_COLORS[cat.category]}20` }}>
                                <Icon className="w-3.5 h-3.5" style={{ color: CATEGORY_COLORS[cat.category] }} />
                              </div>
                              <span className="text-sm font-medium">{cat.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{cat.adherenceRate}%</span>
                              {cat.trend > 0 ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                              )}
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                              style={{
                                width: `${cat.adherenceRate}%`,
                                backgroundColor: CATEGORY_COLORS[cat.category]
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Performance Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Weekly Performance</CardTitle>
                  <CardDescription>Tasks completed vs planned this week</CardDescription>
                </div>
                <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe} className="w-auto">
                  <TabsList className="h-8">
                    <TabsTrigger value="week" className="text-xs px-3 h-7">Week</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs px-3 h-7">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyAnalytics} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      stroke="hsl(var(--muted-foreground))"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke="hsl(var(--muted-foreground))"
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="planned" 
                      fill="#6366f1" 
                      radius={[4, 4, 0, 0]} 
                      name="Planned"
                      opacity={0.3}
                    />
                    <Bar 
                      dataKey="completed" 
                      fill="#22c55e" 
                      radius={[4, 4, 0, 0]} 
                      name="Completed"
                    />
                    <Bar 
                      dataKey="partial" 
                      fill="#f59e0b" 
                      radius={[4, 4, 0, 0]} 
                      name="Partial"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Time Distribution Pie Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Time Distribution</CardTitle>
                <CardDescription>Where your time goes this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={timeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {timeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="middle" 
                        align="right"
                        layout="vertical"
                        formatter={(value, entry: any) => (
                          <span className="text-sm">
                            {value} <span className="text-muted-foreground">({Math.round(entry.payload.value / 60)}h)</span>
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productivity Heatmap */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Productivity by Hour</CardTitle>
              <CardDescription>Your most productive times during the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={hourlyProductivity} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 11 }} 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }} 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#productivityGradient)" 
                    name="Productivity"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Celebration Card */}
          {showCelebration && <CelebrationCard />}
        </div>
      </main>
    </div>
  )
}
