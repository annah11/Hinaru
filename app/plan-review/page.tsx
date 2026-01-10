"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  RefreshCcw,
  ArrowRight,
  Grip,
  Trash2,
  Edit3,
  Plus,
  CloudOff,
  Cloud,
  Zap,
  BookOpen,
  Briefcase,
  Heart,
  User,
  CalendarCheck,
  CalendarX,
  RotateCcw,
  Send
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"

interface PlannedTask {
  id: string
  title: string
  category: "Learning" | "Work" | "Health" | "Personal"
  time: string
  duration: number
  synced: boolean
  aiSuggestion?: string
  conflict?: boolean
  selected: boolean
}

const initialPlannedTasks: PlannedTask[] = [
  { id: "1", title: "Morning Yoga & Meditation", category: "Health", time: "07:00", duration: 30, synced: true, selected: true },
  { id: "2", title: "React Advanced Patterns - Module 10", category: "Learning", time: "09:00", duration: 90, synced: true, selected: true },
  { id: "3", title: "Team Standup Meeting", category: "Work", time: "10:30", duration: 30, synced: true, selected: true },
  { id: "4", title: "Project Documentation", category: "Work", time: "11:00", duration: 60, synced: true, aiSuggestion: "Consider splitting into 2x30min sessions for better focus", selected: true },
  { id: "5", title: "Lunch Break", category: "Personal", time: "12:30", duration: 45, synced: false, selected: true },
  { id: "6", title: "TypeScript Generics Practice", category: "Learning", time: "14:00", duration: 60, synced: true, conflict: true, selected: true },
  { id: "7", title: "Code Review Session", category: "Work", time: "14:30", duration: 60, synced: true, conflict: true, selected: true },
  { id: "8", title: "Gym Workout", category: "Health", time: "17:00", duration: 60, synced: false, selected: true },
  { id: "9", title: "Read 'Atomic Habits'", category: "Personal", time: "20:00", duration: 45, synced: false, aiSuggestion: "Your completion rate drops after 8 PM. Consider 7 PM instead?", selected: true }
]

const aiSuggestions = [
  {
    id: "s1",
    type: "optimization",
    title: "Conflict Detected",
    message: "TypeScript Practice and Code Review overlap at 2:30 PM",
    action: "Move TypeScript to 3:30 PM",
    applied: false
  },
  {
    id: "s2",
    type: "pattern",
    title: "Evening Adjustment",
    message: "Tasks after 7 PM have 40% lower completion",
    action: "Move reading to 7 PM",
    applied: false
  },
  {
    id: "s3",
    type: "balance",
    title: "Category Balance",
    message: "Today is Work-heavy (3.5h). Consider adding more breaks.",
    action: "Add 15min break after meetings",
    applied: false
  }
]

const CATEGORY_COLORS = {
  Learning: { bg: "bg-blue-500", light: "bg-blue-500/10", text: "text-blue-500", icon: BookOpen },
  Work: { bg: "bg-green-500", light: "bg-green-500/10", text: "text-green-500", icon: Briefcase },
  Health: { bg: "bg-orange-500", light: "bg-orange-500/10", text: "text-orange-500", icon: Heart },
  Personal: { bg: "bg-purple-500", light: "bg-purple-500/10", text: "text-purple-500", icon: User }
}

export default function PlanReviewPage() {
  const [tasks, setTasks] = useState(initialPlannedTasks)
  const [suggestions, setSuggestions] = useState(aiSuggestions)
  const [autoSync, setAutoSync] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, selected: !t.selected } : t))
  }

  const applyAllSuggestions = () => {
    setSuggestions(suggestions.map(s => ({ ...s, applied: true })))
    // In a real app, this would modify the tasks based on suggestions
  }

  const syncToCalendar = () => {
    setTasks(tasks.map(t => t.selected ? { ...t, synced: true } : t))
  }

  const totalDuration = tasks.filter(t => t.selected).reduce((acc, t) => acc + t.duration, 0)
  const syncedCount = tasks.filter(t => t.synced).length
  const conflictCount = tasks.filter(t => t.conflict).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <CalendarCheck className="w-8 h-8 text-green-500" />
                Plan Review
              </h1>
              <p className="text-muted-foreground mt-1">Review and sync your daily plan with Google Calendar</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm">
                <Cloud className="w-4 h-4 text-green-500" />
                <span className="text-sm">Auto-sync</span>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
              <Button 
                onClick={syncToCalendar}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Sync to Calendar
              </Button>
            </div>
          </header>

          {/* Date Navigation */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center gap-6">
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const date = new Date()
                    date.setDate(date.getDate() + offset)
                    const isSelected = offset === 0
                    
                    return (
                      <button
                        key={offset}
                        className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground shadow-lg' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span className="text-xs opacity-70">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-bold">{date.getDate()}</span>
                      </button>
                    )
                  })}
                </div>
                
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Task List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">{tasks.filter(t => t.selected).length}</p>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-500">{syncedCount}</p>
                    <p className="text-xs text-muted-foreground">Synced</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-amber-500">{conflictCount}</p>
                    <p className="text-xs text-muted-foreground">Conflicts</p>
                  </CardContent>
                </Card>
              </div>

              {/* Task List */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Today's Plan</CardTitle>
                    <CardDescription>Saturday, January 10, 2026</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {tasks.map((task) => {
                        const categoryStyle = CATEGORY_COLORS[task.category]
                        const Icon = categoryStyle.icon
                        
                        return (
                          <div
                            key={task.id}
                            className={`group flex items-start gap-4 p-4 rounded-xl border transition-all ${
                              task.conflict 
                                ? 'border-amber-500/50 bg-amber-500/5' 
                                : task.selected 
                                  ? 'border-border/50 hover:border-primary/30 bg-card' 
                                  : 'border-border/30 bg-muted/30 opacity-60'
                            }`}
                          >
                            <Checkbox
                              checked={task.selected}
                              onCheckedChange={() => toggleTask(task.id)}
                              className="mt-1"
                            />
                            
                            <Grip className="w-5 h-5 text-muted-foreground/50 cursor-grab mt-1" />
                            
                            <div className={`p-2 rounded-lg ${categoryStyle.light}`}>
                              <Icon className={`w-4 h-4 ${categoryStyle.text}`} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{task.title}</h4>
                                {task.synced && (
                                  <Cloud className="w-4 h-4 text-green-500" />
                                )}
                                {task.conflict && (
                                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                                )}
                              </div>
                              
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {task.time}
                                </span>
                                <span>{task.duration}min</span>
                                <Badge variant="secondary" className={`text-xs ${categoryStyle.light} ${categoryStyle.text} border-0`}>
                                  {task.category}
                                </Badge>
                              </div>
                              
                              {task.aiSuggestion && (
                                <div className="mt-2 p-2 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-2">
                                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  <p className="text-xs text-muted-foreground">{task.aiSuggestion}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* AI Suggestions */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 via-card to-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Suggestions
                  </CardTitle>
                  <CardDescription>Optimize your day with AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`p-3 rounded-xl border transition-all ${
                        suggestion.applied 
                          ? 'border-green-500/30 bg-green-500/5' 
                          : 'border-border/50 bg-card hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className={`text-xs ${
                          suggestion.type === 'optimization' ? 'bg-amber-500/10 text-amber-600' :
                          suggestion.type === 'pattern' ? 'bg-blue-500/10 text-blue-600' :
                          'bg-purple-500/10 text-purple-600'
                        } border-0`}>
                          {suggestion.type}
                        </Badge>
                        {suggestion.applied && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="font-medium text-sm mb-1">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground mb-3">{suggestion.message}</p>
                      {!suggestion.applied && (
                        <Button size="sm" variant="outline" className="w-full text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          {suggestion.action}
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <Button 
                    onClick={applyAllSuggestions}
                    className="w-full bg-gradient-to-r from-primary to-purple-600"
                  >
                    Apply All Suggestions
                  </Button>
                </CardContent>
              </Card>

              {/* Calendar Preview */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    Calendar Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {/* Timeline visualization */}
                    <div className="relative pl-4 border-l-2 border-muted">
                      {tasks.filter(t => t.selected).slice(0, 6).map((task, index) => {
                        const categoryStyle = CATEGORY_COLORS[task.category]
                        
                        return (
                          <div key={task.id} className="relative pb-4 last:pb-0">
                            <div className={`absolute -left-[9px] w-4 h-4 rounded-full ${categoryStyle.bg}`} />
                            <div className="ml-4">
                              <p className="text-xs text-muted-foreground">{task.time}</p>
                              <p className="text-sm font-medium truncate">{task.title}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    {tasks.filter(t => t.selected).length > 6 && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        +{tasks.filter(t => t.selected).length - 6} more tasks
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Time by Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>).map((category) => {
                    const categoryTasks = tasks.filter(t => t.category === category && t.selected)
                    const duration = categoryTasks.reduce((acc, t) => acc + t.duration, 0)
                    const percentage = totalDuration > 0 ? (duration / totalDuration) * 100 : 0
                    const style = CATEGORY_COLORS[category]
                    
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(duration / 60)}h {duration % 60}m
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${style.bg}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
