"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  X,
  Mic,
  Image,
  Sparkles,
  Clock,
  Calendar,
  BookOpen,
  Briefcase,
  Heart,
  User,
  Plus,
  ArrowRight,
  Wand2
} from "lucide-react"

interface TaskInputScreenProps {
  onClose: () => void
  onSubmit?: (task: TaskInput) => void
}

interface TaskInput {
  title: string
  description?: string
  category: "Learning" | "Work" | "Health" | "Personal"
  scheduledTime: string
  duration: number
  date: string
}

const categoryConfig = {
  Learning: { icon: BookOpen, color: "bg-blue-500", textColor: "text-blue-600", bgColor: "bg-blue-500/10" },
  Work: { icon: Briefcase, color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-500/10" },
  Health: { icon: Heart, color: "bg-orange-500", textColor: "text-orange-600", bgColor: "bg-orange-500/10" },
  Personal: { icon: User, color: "bg-purple-500", textColor: "text-purple-600", bgColor: "bg-purple-500/10" }
}

const quickSuggestions = [
  { title: "Morning Learning Session", category: "Learning" as const, duration: 60 },
  { title: "Team Standup", category: "Work" as const, duration: 30 },
  { title: "Gym Workout", category: "Health" as const, duration: 60 },
  { title: "Reading Time", category: "Personal" as const, duration: 45 }
]

export default function TaskInputScreen({ onClose, onSubmit }: TaskInputScreenProps) {
  const [inputMode, setInputMode] = useState<"text" | "voice" | "image">("text")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<"Learning" | "Work" | "Health" | "Personal">("Work")
  const [scheduledTime, setScheduledTime] = useState("09:00")
  const [duration, setDuration] = useState(30)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = () => {
    if (!title.trim()) return
    
    const task: TaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      scheduledTime,
      duration,
      date
    }
    
    onSubmit?.(task)
    onClose()
  }

  const handleQuickAdd = (suggestion: typeof quickSuggestions[0]) => {
    setTitle(suggestion.title)
    setCategory(suggestion.category)
    setDuration(suggestion.duration)
  }

  const handleAISuggestion = () => {
    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setTitle("Deep Work: Focus Session")
      setDescription("Block time for concentrated work on your current project")
      setCategory("Work")
      setDuration(90)
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 border-b border-border/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-purple-600">
              <Plus className="w-4 h-4 text-white" />
            </div>
            Add New Task
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Input mode tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { mode: "text" as const, icon: Plus, label: "Type" },
            { mode: "voice" as const, icon: Mic, label: "Voice" },
            { mode: "image" as const, icon: Image, label: "Image" }
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={inputMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setInputMode(mode)}
              className={inputMode === mode ? "bg-gradient-to-r from-primary to-purple-600" : ""}
            >
              <Icon className="w-4 h-4 mr-1" />
              {label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAISuggestion}
            disabled={isProcessing}
            className="ml-auto border-primary/30 text-primary hover:bg-primary/10"
          >
            <Wand2 className={`w-4 h-4 mr-1 ${isProcessing ? 'animate-spin' : ''}`} />
            AI Suggest
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Quick Suggestions */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Quick Add</Label>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, idx) => {
              const config = categoryConfig[suggestion.category]
              const Icon = config.icon
              return (
                <Badge
                  key={idx}
                  variant="outline"
                  className={`cursor-pointer transition-all hover:scale-105 ${config.bgColor} border-0 py-1.5 px-3`}
                  onClick={() => handleQuickAdd(suggestion)}
                >
                  <Icon className={`w-3 h-3 mr-1.5 ${config.textColor}`} />
                  {suggestion.title}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Main Input */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="What do you want to accomplish?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 h-12 text-base"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 resize-none"
              rows={2}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <Label className="mb-3 block">Category</Label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((cat) => {
              const config = categoryConfig[cat]
              const Icon = config.icon
              const isSelected = category === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                    ${isSelected 
                      ? `${config.bgColor} border-current ${config.textColor}` 
                      : 'border-transparent bg-muted/50 hover:bg-muted'
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/50' : 'bg-background'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? config.textColor : 'text-muted-foreground'}`} />
                  </div>
                  <span className={`text-xs font-medium ${isSelected ? '' : 'text-muted-foreground'}`}>
                    {cat}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time & Duration */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date" className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="time" className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="duration" className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Duration
            </Label>
            <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 min</SelectItem>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="45">45 min</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="180">3 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* AI Insight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">AI Suggestion</p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your patterns, you complete {category.toLowerCase()} tasks best in the{' '}
                {parseInt(scheduledTime) < 12 ? 'morning' : 'afternoon'}. Great choice!
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            Add Task
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
