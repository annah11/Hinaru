"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  GripVertical, 
  MoreVertical,
  CalendarCheck,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Edit2,
  Trash2,
  Copy,
  BookOpen,
  Briefcase,
  Heart,
  User
} from "lucide-react"

export interface Task {
  id: string
  title: string
  time: string
  duration: string
  category: "learning" | "work" | "health" | "personal"
  completed: boolean
  completionLevel?: "completed" | "partial" | "missed" | "unknown"
  completionConfidence?: number
  calendarAttended?: boolean
  notes?: string
}

interface DashboardTimelineProps {
  onTaskComplete?: (task: Task) => void
}

const categoryConfig = {
  learning: { 
    icon: BookOpen, 
    color: "bg-blue-500", 
    bgColor: "bg-blue-500/10", 
    textColor: "text-blue-600",
    borderColor: "border-l-blue-500"
  },
  work: { 
    icon: Briefcase, 
    color: "bg-green-500", 
    bgColor: "bg-green-500/10", 
    textColor: "text-green-600",
    borderColor: "border-l-green-500"
  },
  health: { 
    icon: Heart, 
    color: "bg-orange-500", 
    bgColor: "bg-orange-500/10", 
    textColor: "text-orange-600",
    borderColor: "border-l-orange-500"
  },
  personal: { 
    icon: User, 
    color: "bg-purple-500", 
    bgColor: "bg-purple-500/10", 
    textColor: "text-purple-600",
    borderColor: "border-l-purple-500"
  }
}

const completionLevelConfig = {
  completed: { 
    icon: CheckCircle, 
    color: "text-green-500", 
    bgColor: "bg-green-500/10",
    label: "Completed",
    description: "Task fully completed"
  },
  partial: { 
    icon: AlertCircle, 
    color: "text-yellow-500", 
    bgColor: "bg-yellow-500/10",
    label: "Partial",
    description: "Partially completed"
  },
  missed: { 
    icon: Circle, 
    color: "text-red-500", 
    bgColor: "bg-red-500/10",
    label: "Missed",
    description: "Task was missed"
  },
  unknown: { 
    icon: HelpCircle, 
    color: "text-gray-400", 
    bgColor: "bg-gray-500/10",
    label: "Unknown",
    description: "Status unclear"
  }
}

const initialTasks: Task[] = [
  { 
    id: "1", 
    title: "Morning Learning Session - TypeScript Generics", 
    time: "08:00", 
    duration: "1h", 
    category: "learning", 
    completed: true,
    completionLevel: "completed",
    completionConfidence: 95,
    calendarAttended: true
  },
  { 
    id: "2", 
    title: "Team Standup & Sprint Planning", 
    time: "09:30", 
    duration: "30min", 
    category: "work", 
    completed: true,
    completionLevel: "completed",
    completionConfidence: 100,
    calendarAttended: true
  },
  { 
    id: "3", 
    title: "Deep Work: Feature Development", 
    time: "10:00", 
    duration: "2h", 
    category: "work", 
    completed: true,
    completionLevel: "partial",
    completionConfidence: 75,
    notes: "Completed 60% of planned work"
  },
  { 
    id: "4", 
    title: "Lunch Break & Short Walk", 
    time: "12:00", 
    duration: "45min", 
    category: "health", 
    completed: true,
    completionLevel: "completed",
    completionConfidence: 90
  },
  { 
    id: "5", 
    title: "Code Review & Documentation", 
    time: "13:00", 
    duration: "1h 30min", 
    category: "work", 
    completed: false,
    completionLevel: "unknown",
    completionConfidence: 50
  },
  { 
    id: "6", 
    title: "Evening Learning - React Patterns", 
    time: "18:00", 
    duration: "1h", 
    category: "learning", 
    completed: false,
    completionLevel: "unknown"
  },
  { 
    id: "7", 
    title: "Gym - Strength Training", 
    time: "19:30", 
    duration: "1h", 
    category: "health", 
    completed: false,
    completionLevel: "unknown"
  },
  { 
    id: "8", 
    title: "Family Time & Dinner", 
    time: "20:30", 
    duration: "1h 30min", 
    category: "personal", 
    completed: false
  }
]

export default function DashboardTimeline({ onTaskComplete }: DashboardTimelineProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const handleTaskComplete = (taskId: string, level: "completed" | "partial" | "missed") => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          completed: level === "completed" || level === "partial",
          completionLevel: level,
          completionConfidence: level === "completed" ? 100 : level === "partial" ? 60 : 0
        }
        if (onTaskComplete && (level === "completed" || level === "partial")) {
          onTaskComplete(updatedTask)
        }
        return updatedTask
      }
      return task
    }))
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedTask || draggedTask === targetId) return

    const draggedIndex = tasks.findIndex(t => t.id === draggedTask)
    const targetIndex = tasks.findIndex(t => t.id === targetId)
    
    const newTasks = [...tasks]
    const [removed] = newTasks.splice(draggedIndex, 1)
    newTasks.splice(targetIndex, 0, removed)
    
    setTasks(newTasks)
    setDraggedTask(null)
  }

  const completedCount = tasks.filter(t => t.completionLevel === "completed").length
  const partialCount = tasks.filter(t => t.completionLevel === "partial").length
  const totalTasks = tasks.length
  const progressPercentage = ((completedCount + partialCount * 0.5) / totalTasks) * 100

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Today's Timeline</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} completed • {partialCount} partial • {totalTasks - completedCount - partialCount} remaining
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal">
              <Clock className="w-3 h-3 mr-1" />
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Daily Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <TooltipProvider>
          {tasks.map((task, index) => {
            const config = categoryConfig[task.category]
            const CategoryIcon = config.icon
            const completionConfig = task.completionLevel ? completionLevelConfig[task.completionLevel] : null
            const CompletionIcon = completionConfig?.icon || Circle

            return (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, task.id)}
                className={`
                  group relative p-3 rounded-xl border-l-4 transition-all duration-200
                  ${config.borderColor} ${config.bgColor}
                  ${draggedTask === task.id ? "opacity-50 scale-95" : ""}
                  ${task.completionLevel === "completed" ? "opacity-75" : ""}
                  hover:shadow-md cursor-grab active:cursor-grabbing
                `}
              >
                <div className="flex items-start gap-3">
                  {/* Drag handle */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-0.5">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* Completion status with inference */}
                  <div className="pt-0.5">
                    {task.completionLevel ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            onClick={() => {
                              const levels: ("completed" | "partial" | "missed")[] = ["completed", "partial", "missed"]
                              const currentIndex = levels.indexOf(task.completionLevel as any)
                              const nextLevel = levels[(currentIndex + 1) % levels.length]
                              handleTaskComplete(task.id, nextLevel)
                            }}
                            className="focus:outline-none"
                          >
                            <CompletionIcon className={`w-5 h-5 ${completionConfig?.color} transition-colors`} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-medium">{completionConfig?.label}</p>
                            <p className="text-xs text-muted-foreground">{completionConfig?.description}</p>
                            {task.completionConfidence && (
                              <p className="text-xs">
                                Confidence: <span className="font-medium">{task.completionConfidence}%</span>
                              </p>
                            )}
                            {task.calendarAttended && (
                              <p className="text-xs flex items-center gap-1">
                                <CalendarCheck className="w-3 h-3 text-green-500" />
                                Calendar attendance confirmed
                              </p>
                            )}
                            {task.notes && (
                              <p className="text-xs text-muted-foreground italic">{task.notes}</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <button
                        onClick={() => handleTaskComplete(task.id, "completed")}
                        className="focus:outline-none"
                      >
                        <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                      </button>
                    )}
                  </div>

                  {/* Task content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-medium text-sm ${task.completionLevel === "completed" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{task.time}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{task.duration}</span>
                          
                          {/* AI inference indicator */}
                          {task.completionConfidence !== undefined && task.completionConfidence < 100 && !task.calendarAttended && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="flex items-center gap-1 text-xs text-primary">
                                  <Sparkles className="w-3 h-3" />
                                  AI inferred
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Completion status inferred by AI based on patterns</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className={`${config.bgColor} ${config.textColor} border-0 text-[10px] px-2`}>
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {task.category}
                        </Badge>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleTaskComplete(task.id, "completed")}>
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTaskComplete(task.id, "partial")}>
                              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                              Mark Partial
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTaskComplete(task.id, "missed")}>
                              <Circle className="w-4 h-4 mr-2 text-red-500" />
                              Mark Missed
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </TooltipProvider>

        {/* Quick add button */}
        <Button variant="ghost" className="w-full mt-3 border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground">
          <span className="text-lg mr-2">+</span>
          Add another task
        </Button>
      </CardContent>
    </Card>
  )
}
