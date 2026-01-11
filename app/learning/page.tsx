"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Target,
  TrendingUp,
  CheckCircle,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  Plus,
  Sparkles,
  Timer,
  Brain,
  GraduationCap,
  Zap
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"
import { StudyingCharacter } from "@/components/decorative/studying-character"

interface LearningSession {
  id: string
  topic: string
  duration: number
  completedAt: string
  category: string
  progress: number
}

const learningSessions: LearningSession[] = [
  { id: "l1", topic: "React Advanced Patterns", duration: 90, completedAt: "2026-01-10T10:30:00", category: "Frontend", progress: 75 },
  { id: "l2", topic: "TypeScript Generics", duration: 60, completedAt: "2026-01-09T14:00:00", category: "Languages", progress: 60 },
  { id: "l3", topic: "System Design Fundamentals", duration: 45, completedAt: "2026-01-08T09:00:00", category: "Architecture", progress: 40 },
  { id: "l4", topic: "GraphQL & Apollo", duration: 60, completedAt: "2026-01-07T15:00:00", category: "Backend", progress: 85 },
  { id: "l5", topic: "Testing Best Practices", duration: 45, completedAt: "2026-01-06T11:00:00", category: "Quality", progress: 50 }
]

const learningGoals = [
  { id: "g1", title: "Complete React Course", target: 20, current: 15, unit: "hours" },
  { id: "g2", title: "Master TypeScript", target: 15, current: 9, unit: "hours" },
  { id: "g3", title: "Read 5 Tech Books", target: 5, current: 2, unit: "books" }
]

const upcomingSessions = [
  { id: "u1", topic: "React Server Components", scheduledFor: "Today, 2:00 PM", duration: 60 },
  { id: "u2", topic: "Database Optimization", scheduledFor: "Tomorrow, 10:00 AM", duration: 45 },
  { id: "u3", topic: "Microservices Patterns", scheduledFor: "Jan 12, 9:00 AM", duration: 90 }
]

export default function LearningPage() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(25) // Pomodoro default
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTimerRunning])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { hours, minutes, seconds }
  }

  const { hours, minutes, seconds } = formatTime(timerSeconds)

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimerSeconds(0)
  }

  const totalLearningHours = learningSessions.reduce((acc, s) => acc + s.duration, 0) / 60
  const weeklyGoalHours = 10
  const weeklyProgress = (totalLearningHours / weeklyGoalHours) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                Learning Hub
              </h1>
              <p className="text-muted-foreground mt-1">Track your learning journey and build new skills</p>
            </div>
            
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              New Learning Session
            </Button>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Timer & Character */}
            <div className="xl:col-span-2 space-y-6">
              {/* Study Timer with Character */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500/5 via-card to-indigo-500/5 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Timer Section */}
                    <div className="p-8 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Timer className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-lg">Focus Timer</span>
                        {isTimerRunning && (
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                        )}
                      </div>
                      
                      {/* Timer Display */}
                      <div className="relative mb-6">
                        <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                          <div className="w-48 h-48 rounded-full bg-card shadow-inner flex flex-col items-center justify-center">
                            <div className="flex items-baseline gap-1">
                              {/* Hours */}
                              <div className="text-center">
                                <span className="text-4xl font-bold font-mono">{String(hours).padStart(2, '0')}</span>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">hrs</p>
                              </div>
                              <span className="text-3xl font-bold text-muted-foreground mx-1">:</span>
                              {/* Minutes */}
                              <div className="text-center">
                                <span className="text-4xl font-bold font-mono">{String(minutes).padStart(2, '0')}</span>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">min</p>
                              </div>
                              <span className="text-3xl font-bold text-muted-foreground mx-1">:</span>
                              {/* Seconds */}
                              <div className="text-center">
                                <span className="text-4xl font-bold font-mono text-blue-500">{String(seconds).padStart(2, '0')}</span>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">sec</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Animated ring when running */}
                        {isTimerRunning && (
                          <svg className="absolute inset-0 w-56 h-56 -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="48"
                              fill="none"
                              stroke="url(#timerGrad)"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              className="animate-spin"
                              style={{ animationDuration: "8s" }}
                            />
                            <defs>
                              <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}
                      </div>
                      
                      {/* Timer Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          size="lg"
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`${
                            isTimerRunning 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          } text-white shadow-lg px-8`}
                        >
                          {isTimerRunning ? (
                            <>
                              <Pause className="w-5 h-5 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-5 h-5 mr-2" />
                              Start Learning
                            </>
                          )}
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={resetTimer}
                          className="px-4"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Quick Duration Presets */}
                      <div className="flex gap-2 mt-4">
                        {[15, 25, 45, 60].map((mins) => (
                          <Button
                            key={mins}
                            variant={selectedDuration === mins ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedDuration(mins)}
                            className={selectedDuration === mins ? "bg-blue-500/20 text-blue-600" : ""}
                          >
                            {mins}m
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Character Section */}
                    <div className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center p-4 min-h-[400px]">
                      <StudyingCharacter size={350} className="opacity-90" />
                      
                      {/* Floating motivation text */}
                      <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-500" />
                          {isTimerRunning ? "You're doing great!" : "Ready to learn?"}
                        </p>
                      </div>

                      {/* Stats overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{Math.round(totalLearningHours)}h</p>
                            <p className="text-xs text-muted-foreground">This Week</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">12</p>
                            <p className="text-xs text-muted-foreground">Day Streak</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-purple-600">5</p>
                            <p className="text-xs text-muted-foreground">Sessions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Sessions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        Recent Learning Sessions
                      </CardTitle>
                      <CardDescription>Your latest study activities</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {learningSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="p-3 rounded-xl bg-blue-500/10">
                          <BookOpen className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{session.topic}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.duration} min
                            </span>
                            <Badge variant="secondary" className="text-[10px]">
                              {session.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Progress value={session.progress} className="w-20 h-2" />
                            <span className="text-sm font-medium">{session.progress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(session.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Weekly Progress */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    Weekly Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="url(#goalGrad)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${Math.min(weeklyProgress, 100) * 2.51} 251`}
                        />
                        <defs>
                          <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{Math.round(totalLearningHours)}h</span>
                        <span className="text-xs text-muted-foreground">of {weeklyGoalHours}h</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    {weeklyProgress >= 100 ? (
                      <span className="text-green-500 font-medium flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Goal achieved! 🎉
                      </span>
                    ) : (
                      <span>{Math.round(weeklyGoalHours - totalLearningHours)}h left to reach your goal</span>
                    )}
                  </p>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{goal.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.topic}</p>
                        <p className="text-xs text-muted-foreground">{session.scheduledFor}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {session.duration}m
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Tip */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Brain className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">AI Learning Tip</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        You learn best in the morning! Consider scheduling your complex topics before 11 AM for better retention.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
