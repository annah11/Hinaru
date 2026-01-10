"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  Flame,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles
} from "lucide-react"

interface WeeklyReflection {
  weekStart: string
  weekEnd: string
  totalTasks: number
  completedTasks: number
  topCategory: string
  streak: number
  highlights: string[]
  improvements: string[]
  overallScore: number
}

interface ReflectionCardProps {
  reflection?: WeeklyReflection
}

const defaultReflection: WeeklyReflection = {
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

export default function ReflectionCard({ reflection = defaultReflection }: ReflectionCardProps) {
  const [currentCard, setCurrentCard] = useState(0)
  const completionRate = Math.round((reflection.completedTasks / reflection.totalTasks) * 100)

  const cards = [
    // Card 1: Weekly Summary
    {
      title: "Weekly Summary",
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Progress ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#reflectionGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${completionRate * 2.51} 251`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{reflection.overallScore}</span>
                <span className="text-xs text-muted-foreground">Score</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-green-500/10">
              <p className="text-xl font-bold text-green-600">{reflection.completedTasks}</p>
              <p className="text-[10px] text-muted-foreground">Completed</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-500/10">
              <p className="text-xl font-bold text-orange-600">{reflection.totalTasks - reflection.completedTasks}</p>
              <p className="text-[10px] text-muted-foreground">Missed</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10">
              <p className="text-xl font-bold text-purple-600">{reflection.streak}</p>
              <p className="text-[10px] text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </div>
      )
    },
    // Card 2: Highlights
    {
      title: "Week Highlights",
      icon: Star,
      content: (
        <div className="space-y-3">
          {reflection.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="p-1.5 rounded-lg bg-green-500/20 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm flex-1">{highlight}</p>
            </div>
          ))}
          
          <div className="pt-3 border-t">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Top Category: {reflection.topCategory}</p>
                <p className="text-xs text-muted-foreground">Your most productive area this week</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Card 3: Areas for Improvement
    {
      title: "Growth Opportunities",
      icon: Lightbulb,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Here's what we noticed could help you improve:
          </p>
          
          {reflection.improvements.map((improvement, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
              <div className="p-1.5 rounded-lg bg-blue-500/20 mt-0.5">
                <Lightbulb className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-sm flex-1">{improvement}</p>
            </div>
          ))}
          
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-primary to-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Action Plan
            </Button>
          </div>
        </div>
      )
    }
  ]

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % cards.length)
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length)

  const CurrentIcon = cards[currentCard].icon

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-b border-border/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-purple-600">
              <CurrentIcon className="w-4 h-4 text-white" />
            </div>
            {cards[currentCard].title}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={prevCard} className="h-8 w-8 rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1 px-2">
              {cards.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentCard ? 'bg-primary w-4' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={nextCard} className="h-8 w-8 rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Week of {new Date(reflection.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(reflection.weekEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </CardHeader>

      <CardContent className="p-5">
        {cards[currentCard].content}
      </CardContent>
    </Card>
  )
}
