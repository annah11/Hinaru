"use client"

import { useState, useTransition } from "react"
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
import { completeTaskAction, deleteTaskAction } from "@/lib/actions/tasks"
import { toast } from "sonner"

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  due_at?: string
  start_at?: string
  estimate_minutes?: number
  actual_minutes?: number
  labels?: Array<{ name: string; color: string }>
}

interface DashboardTimelineProps {
  tasks?: Task[]
  onTaskComplete?: () => void
  onTasksChange?: () => void
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

export default function DashboardTimeline({ tasks = [], onTaskComplete, onTasksChange }: DashboardTimelineProps) {
  const [isPending, startTransition] = useTransition()

  const handleTaskComplete = async (taskId: string) => {
    startTransition(async () => {
      try {
        const task = tasks.find(t => t.id === taskId)
        const actualMinutes = task?.estimate_minutes || undefined
        
        const { error } = await completeTaskAction(taskId, actualMinutes)
        
        if (error) {
          toast.error('Failed to complete task')
          return
        }

        toast.success('Task completed!')
        onTaskComplete?.()
        onTasksChange?.()
      } catch (err) {
        toast.error('Failed to complete task')
        console.error(err)
      }
    })
  }

  const handleTaskDelete = async (taskId: string) => {
    startTransition(async () => {
      try {
        const { error } = await deleteTaskAction(taskId)
        
        if (error) {
          toast.error('Failed to delete task')
          return
        }

        toast.success('Task deleted')
        onTasksChange?.()
      } catch (err) {
        toast.error('Failed to delete task')
        console.error(err)
      }
    })
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

  const completedCount = tasks.filter(t => t.status === "completed").length
  const inProgressCount = tasks.filter(t => t.status === "in_progress").length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? ((completedCount + inProgressCount * 0.5) / totalTasks) * 100 : 0

  // Helper to get category from labels
  const getCategory = (task: Task): keyof typeof categoryConfig => {
    if (!task.labels || task.labels.length === 0) return "work"
    const categoryName = task.labels[0].name.toLowerCase()
    if (categoryName in categoryConfig) return categoryName as keyof typeof categoryConfig
    return "work"
  }

  // Helper to format time
  const formatTime = (dateString?: string) => {
    if (!dateString) return "Not scheduled"
    try {
      const date = new Date(dateString)
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    } catch {
      return "Invalid time"
    }
  }

  // Helper to format duration
  const formatDuration = (minutes?: number) => {
    if (!minutes) return "No duration"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
    }
    return `${mins}min`
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Today's Timeline</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} completed • {inProgressCount} in progress • {totalTasks - completedCount - inProgressCount} pending
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
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No tasks scheduled for today</p>
            <p className="text-xs mt-1">Create a task to get started!</p>
          </div>
        ) : (
          <TooltipProvider>
            {tasks.map((task) => {
              const category = getCategory(task)
              const config = categoryConfig[category]
              const CategoryIcon = config.icon
              const isCompleted = task.status === "completed"
              const CompletionIcon = isCompleted ? CheckCircle : Circle

              return (
                <div
                  key={task.id}
                  className={`
                    group relative p-3 rounded-xl border-l-4 transition-all duration-200
                    ${config.borderColor} ${config.bgColor}
                    ${isCompleted ? "opacity-75" : ""}
                    hover:shadow-md
                  `}
                >
                  <div className="flex items-start gap-3">
                    {/* Completion status */}
                    <div className="pt-0.5">
                      <button
                        onClick={() => !isCompleted && handleTaskComplete(task.id)}
                        disabled={isCompleted || isPending}
                        className="focus:outline-none disabled:opacity-50"
                      >
                        <CompletionIcon 
                          className={`w-5 h-5 transition-colors ${
                            isCompleted ? "text-green-500" : "text-muted-foreground hover:text-primary"
                          }`} 
                        />
                      </button>
                    </div>

                    {/* Task content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`font-medium text-sm ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{formatTime(task.due_at)}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{formatDuration(task.estimate_minutes)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" className={`${config.bgColor} ${config.textColor} border-0 text-[10px] px-2`}>
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {category}
                          </Badge>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              {!isCompleted && (
                                <DropdownMenuItem onClick={() => handleTaskComplete(task.id)}>
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  Mark Complete
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleTaskDelete(task.id)}
                              >
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
        )}
      </CardContent>
    </Card>
  )
}
