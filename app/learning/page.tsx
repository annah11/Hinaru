"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  AreaChart,
  Area
} from "recharts"
import {
  BookOpen,
  Clock,
  Target,
  Trophy,
  Play,
  Pause,
  CheckCircle2,
  Circle,
  Flame,
  Star,
  Brain,
  Lightbulb,
  TrendingUp,
  Calendar,
  ChevronRight,
  PlayCircle,
  BookMarked,
  GraduationCap,
  Zap
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"

// Learning data
const learningTopics = [
  { 
    id: "1", 
    title: "React Advanced Patterns", 
    category: "Frontend", 
    progress: 75, 
    totalModules: 12, 
    completedModules: 9,
    estimatedTime: "4h remaining",
    lastAccessed: "2 hours ago",
    color: "#6366f1"
  },
  { 
    id: "2", 
    title: "TypeScript Deep Dive", 
    category: "Languages", 
    progress: 60, 
    totalModules: 15, 
    completedModules: 9,
    estimatedTime: "6h remaining",
    lastAccessed: "Yesterday",
    color: "#3b82f6"
  },
  { 
    id: "3", 
    title: "System Design Fundamentals", 
    category: "Architecture", 
    progress: 40, 
    totalModules: 20, 
    completedModules: 8,
    estimatedTime: "10h remaining",
    lastAccessed: "3 days ago",
    color: "#8b5cf6"
  },
  { 
    id: "4", 
    title: "GraphQL & Apollo", 
    category: "Backend", 
    progress: 85, 
    totalModules: 10, 
    completedModules: 8,
    estimatedTime: "1.5h remaining",
    lastAccessed: "4 days ago",
    color: "#ec4899"
  },
  { 
    id: "5", 
    title: "Testing Best Practices", 
    category: "Quality", 
    progress: 50, 
    totalModules: 8, 
    completedModules: 4,
    estimatedTime: "3h remaining",
    lastAccessed: "5 days ago",
    color: "#22c55e"
  }
]

const weeklyLearning = [
  { day: "Mon", minutes: 90, sessions: 2 },
  { day: "Tue", minutes: 60, sessions: 1 },
  { day: "Wed", minutes: 120, sessions: 3 },
  { day: "Thu", minutes: 45, sessions: 1 },
  { day: "Fri", minutes: 75, sessions: 2 },
  { day: "Sat", minutes: 30, sessions: 1 },
  { day: "Sun", minutes: 0, sessions: 0 }
]

const learningStreak = [
  { week: "W1", hours: 8 },
  { week: "W2", hours: 10 },
  { week: "W3", hours: 7 },
  { week: "W4", hours: 12 },
  { week: "W5", hours: 9 },
  { week: "W6", hours: 11 },
  { week: "W7", hours: 8 },
  { week: "W8", hours: 10 }
]

const upcomingSessions = [
  { id: "s1", topic: "TypeScript Generics Practice", time: "2:00 PM", duration: 60, type: "Practice" },
  { id: "s2", topic: "React Hooks Deep Dive", time: "4:00 PM", duration: 45, type: "Video" },
  { id: "s3", topic: "System Design: Caching", time: "Tomorrow 9:00 AM", duration: 90, type: "Reading" }
]

const achievements = [
  { id: "a1", title: "7-Day Streak", icon: "🔥", unlocked: true, date: "Jan 8, 2026" },
  { id: "a2", title: "First Course Complete", icon: "🎓", unlocked: true, date: "Jan 5, 2026" },
  { id: "a3", title: "100 Hours Learned", icon: "⏱️", unlocked: false, progress: 78 },
  { id: "a4", title: "5 Topics Mastered", icon: "🏆", unlocked: false, progress: 40 }
]

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

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isStudying, setIsStudying] = useState(false)

  const totalMinutesThisWeek = weeklyLearning.reduce((acc, d) => acc + d.minutes, 0)
  const totalSessions = weeklyLearning.reduce((acc, d) => acc + d.sessions, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-blue-500" />
                Learning Hub
              </h1>
              <p className="text-muted-foreground mt-1">Track your learning journey and grow your skills</p>
            </div>
            
            <Button 
              onClick={() => setIsStudying(!isStudying)}
              className={`shadow-lg ${isStudying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }`}
            >
              {isStudying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  End Session
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </>
              )}
            </Button>
          </header>

          {/* Active Session Banner */}
          {isStudying && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-8 animate-in slide-in-from-top-2">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Currently learning</p>
                    <h3 className="text-xl font-bold">React Advanced Patterns</h3>
                    <p className="text-sm opacity-80 mt-1">Module 9: Custom Hooks Deep Dive</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-mono font-bold">23:45</p>
                  <p className="text-sm opacity-80">Session Time</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold mt-1">{Math.floor(totalMinutesThisWeek / 60)}h {totalMinutesThisWeek % 60}m</p>
                <p className="text-xs text-muted-foreground mt-2">{totalSessions} sessions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10">
                    <BookMarked className="w-6 h-6 text-indigo-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">Topics in Progress</p>
                <p className="text-3xl font-bold mt-1">{learningTopics.length}</p>
                <p className="text-xs text-muted-foreground mt-2">2 near completion</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <Target className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">Avg</span>
                </div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold mt-1">62%</p>
                <Progress value={62} className="mt-2 h-1.5" />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 via-card to-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/10">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-2xl">🔥</span>
                </div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-3xl font-bold mt-1">8 <span className="text-lg text-muted-foreground">days</span></p>
                <p className="text-xs text-muted-foreground mt-2">Best: 14 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Overview
              </TabsTrigger>
              <TabsTrigger value="topics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Topics
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Chart */}
                <Card className="lg:col-span-2 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Learning Activity</CardTitle>
                    <CardDescription>Your study time this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={weeklyLearning} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="minutes" name="Minutes" fill="#6366f1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {session.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{session.duration}m</span>
                        </div>
                        <p className="font-medium text-sm">{session.topic}</p>
                        <p className="text-xs text-muted-foreground mt-1">{session.time}</p>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-primary hover:text-primary">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Trend */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Learning Progress Trend</CardTitle>
                  <CardDescription>Your weekly learning hours over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={learningStreak} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="learningGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#learningGradient)" name="Hours" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningTopics.map((topic) => (
                  <Card key={topic.id} className="border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge 
                          className="border-0"
                          style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
                        >
                          {topic.category}
                        </Badge>
                        <Button size="icon" variant="ghost" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="w-5 h-5" />
                        </Button>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{topic.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ width: `${topic.progress}%`, backgroundColor: topic.color }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{topic.completedModules}/{topic.totalModules} modules</span>
                          <span>{topic.estimatedTime}</span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          Last accessed: {topic.lastAccessed}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add New Topic Card */}
                <Card className="border-2 border-dashed border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[240px]">
                    <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors mb-4">
                      <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Add New Topic</p>
                    <p className="text-sm text-muted-foreground mt-1">Start a new learning journey</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Learning Schedule</CardTitle>
                  <CardDescription>Your planned learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                      const sessions = index < 5 ? [
                        { time: '9:00 AM', topic: 'React Advanced', duration: 45 },
                        { time: '2:00 PM', topic: 'TypeScript', duration: 30 }
                      ] : index === 5 ? [
                        { time: '10:00 AM', topic: 'System Design', duration: 60 }
                      ] : []
                      
                      return (
                        <div key={day} className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="w-24 flex-shrink-0">
                            <p className="font-semibold">{day}</p>
                            <p className="text-xs text-muted-foreground">
                              {sessions.length} session{sessions.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex-1 flex flex-wrap gap-2">
                            {sessions.length > 0 ? sessions.map((session, i) => (
                              <div key={i} className="px-3 py-2 rounded-lg bg-primary/10 text-sm">
                                <span className="font-medium">{session.topic}</span>
                                <span className="text-muted-foreground ml-2">{session.time} • {session.duration}m</span>
                              </div>
                            )) : (
                              <span className="text-sm text-muted-foreground">No sessions scheduled</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`border-0 shadow-lg transition-all ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-500/10 via-card to-orange-500/10' 
                        : 'opacity-60'
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-4">{achievement.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                      {achievement.unlocked ? (
                        <div>
                          <Badge className="bg-green-500/10 text-green-600 border-0">Unlocked</Badge>
                          <p className="text-xs text-muted-foreground mt-2">{achievement.date}</p>
                        </div>
                      ) : (
                        <div>
                          <Progress value={achievement.progress} className="h-2 mb-2" />
                          <p className="text-sm text-muted-foreground">{achievement.progress}% complete</p>
                        </div>
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
