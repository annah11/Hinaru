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
  Zap,
  Menu
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-500" />
          Learning
        </h1>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </header>
      
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header - Desktop */}
          <header className="hidden lg:flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {/* Left Column - Timer & Character */}
            <div className="xl:col-span-2 space-y-4 lg:space-y-6">
              {/* Study Timer with Character */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500/5 via-card to-indigo-500/5 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Timer Section */}
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 mb-3 lg:mb-4">
                        <Timer className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                        <span className="font-semibold text-base lg:text-lg">Focus Timer</span>
                        {isTimerRunning && (
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                        )}
                      </div>
                      
                      {/* Timer Display */}
                      <div className="relative mb-4 lg:mb-6">
                        <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-card shadow-inner flex flex-col items-center justify-center">
                            <div className="flex items-baseline gap-0.5 sm:gap-1">
                              {/* Hours */}
                              <div className="text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono">{String(hours).padStart(2, '0')}</span>
                                <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">hrs</p>
                              </div>
                              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-muted-foreground mx-0.5 sm:mx-1">:</span>
                              {/* Minutes */}
                              <div className="text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono">{String(minutes).padStart(2, '0')}</span>
                                <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">min</p>
                              </div>
                              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-muted-foreground mx-0.5 sm:mx-1">:</span>
                              {/* Seconds */}
                              <div className="text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-blue-500">{String(seconds).padStart(2, '0')}</span>
                                <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">sec</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Animated ring when running */}
                        {isTimerRunning && (
                          <svg className="absolute inset-0 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 -rotate-90" viewBox="0 0 100 100">
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
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                          size="default"
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`${
                            isTimerRunning 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          } text-white shadow-lg px-4 sm:px-6 lg:px-8`}
                        >
                          {isTimerRunning ? (
                            <>
                              <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Start</span>
                              <span className="sm:hidden">Start</span>
                            </>
                          )}
                        </Button>
                        <Button
                          size="default"
                          variant="outline"
                          onClick={resetTimer}
                          className="px-3 sm:px-4"
                        >
                          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>

                      {/* Quick Duration Presets */}
                      <div className="flex gap-1.5 sm:gap-2 mt-3 lg:mt-4">
                        {[15, 25, 45, 60].map((mins) => (
                          <Button
                            key={mins}
                            variant={selectedDuration === mins ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedDuration(mins)}
                            className={`text-xs sm:text-sm px-2 sm:px-3 ${selectedDuration === mins ? "bg-blue-500/20 text-blue-600" : ""}`}
                          >
                            {mins}m
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Character Section - Hidden on small mobile, shown on larger screens */}
                    <div className="hidden sm:flex relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 items-center justify-center p-4 min-h-[280px] lg:min-h-[400px]">
                      <StudyingCharacter size={280} className="opacity-90 lg:hidden" />
                      <StudyingCharacter size={350} className="opacity-90 hidden lg:block" />
                      
                      {/* Floating motivation text */}
                      <div className="absolute top-3 lg:top-4 right-3 lg:right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 lg:p-3 shadow-lg">
                        <p className="text-xs lg:text-sm font-medium flex items-center gap-1.5 lg:gap-2">
                          <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500" />
                          {isTimerRunning ? "You're doing great!" : "Ready to learn?"}
                        </p>
                      </div>

                      {/* Stats overlay */}
                      <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 right-3 lg:right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 lg:p-4 shadow-lg">
                        <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
                          <div>
                            <p className="text-lg lg:text-2xl font-bold text-blue-600">{Math.round(totalLearningHours)}h</p>
                            <p className="text-[10px] lg:text-xs text-muted-foreground">This Week</p>
                          </div>
                          <div>
                            <p className="text-lg lg:text-2xl font-bold text-green-600">12</p>
                            <p className="text-[10px] lg:text-xs text-muted-foreground">Day Streak</p>
                          </div>
                          <div>
                            <p className="text-lg lg:text-2xl font-bold text-purple-600">5</p>
                            <p className="text-[10px] lg:text-xs text-muted-foreground">Sessions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stats - Only shows on small screens */}
                  <div className="sm:hidden p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-t border-border/30">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-blue-600">{Math.round(totalLearningHours)}h</p>
                        <p className="text-[10px] text-muted-foreground">This Week</p>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-green-600">12</p>
                        <p className="text-[10px] text-muted-foreground">Streak</p>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-purple-600">5</p>
                        <p className="text-[10px] text-muted-foreground">Sessions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Sessions */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="px-4 lg:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                        <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                        Recent Sessions
                      </CardTitle>
                      <CardDescription className="text-xs lg:text-sm hidden sm:block">Your latest study activities</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs lg:text-sm">
                      View All <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-4 lg:px-6">
                  <div className="space-y-2 lg:space-y-3">
                    {learningSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="p-2 lg:p-3 rounded-xl bg-blue-500/10 flex-shrink-0">
                          <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm lg:text-base truncate">{session.topic}</p>
                          <div className="flex items-center gap-2 lg:gap-3 text-xs text-muted-foreground mt-0.5 lg:mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.duration}m
                            </span>
                            <Badge variant="secondary" className="text-[9px] lg:text-[10px] hidden sm:inline-flex">
                              {session.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1.5 lg:gap-2 mb-0.5 lg:mb-1">
                            <Progress value={session.progress} className="w-12 sm:w-16 lg:w-20 h-1.5 lg:h-2" />
                            <span className="text-xs lg:text-sm font-medium">{session.progress}%</span>
                          </div>
                          <p className="text-[10px] lg:text-xs text-muted-foreground hidden sm:block">
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
            <div className="space-y-4 lg:space-y-6">
              {/* Weekly Progress */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                <CardHeader className="pb-2 lg:pb-3 px-4 lg:px-6">
                  <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                    <Target className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                    Weekly Goal
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 lg:px-6">
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
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
                        <span className="text-xl lg:text-2xl font-bold">{Math.round(totalLearningHours)}h</span>
                        <span className="text-[10px] lg:text-xs text-muted-foreground">of {weeklyGoalHours}h</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs lg:text-sm text-muted-foreground">
                    {weeklyProgress >= 100 ? (
                      <span className="text-green-500 font-medium flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" /> Goal achieved! 🎉
                      </span>
                    ) : (
                      <span>{Math.round(weeklyGoalHours - totalLearningHours)}h left to reach your goal</span>
                    )}
                  </p>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2 lg:pb-3 px-4 lg:px-6">
                  <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                    <Award className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4 px-4 lg:px-6">
                  {learningGoals.map((goal) => (
                    <div key={goal.id} className="space-y-1.5 lg:space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs lg:text-sm font-medium">{goal.title}</span>
                        <span className="text-[10px] lg:text-xs text-muted-foreground">
                          {goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-1.5 lg:h-2" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                    Add Goal
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2 lg:pb-3 px-4 lg:px-6">
                  <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3 px-4 lg:px-6">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-2 lg:gap-3 p-2.5 lg:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="p-1.5 lg:p-2 rounded-lg bg-indigo-500/10 flex-shrink-0">
                        <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs lg:text-sm font-medium truncate">{session.topic}</p>
                        <p className="text-[10px] lg:text-xs text-muted-foreground">{session.scheduledFor}</p>
                      </div>
                      <Badge variant="secondary" className="text-[9px] lg:text-[10px] flex-shrink-0">
                        {session.duration}m
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Tip */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-start gap-2 lg:gap-3">
                    <div className="p-1.5 lg:p-2 rounded-lg bg-purple-500/20 flex-shrink-0">
                      <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium text-xs lg:text-sm">AI Learning Tip</p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground mt-0.5 lg:mt-1">
                        You learn best in the morning! Consider scheduling complex topics before 11 AM.
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
