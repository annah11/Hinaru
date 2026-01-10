"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  PartyPopper,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  X,
  RefreshCw
} from "lucide-react"

interface AIInsight {
  id: string
  type: "pattern" | "suggestion" | "celebration" | "warning"
  title: string
  message: string
  actionable?: string
  priority: "high" | "medium" | "low"
  category?: string
  timestamp: string
}

interface AIInsightsPanelProps {
  insights?: AIInsight[]
  onAction?: (insightId: string, action: string) => void
}

const defaultInsights: AIInsight[] = [
  {
    id: "1",
    type: "celebration",
    title: "12-Day Streak! 🔥",
    message: "Amazing consistency! You've maintained your streak for 12 consecutive days. That's better than 85% of users!",
    priority: "high",
    timestamp: new Date().toISOString()
  },
  {
    id: "2",
    type: "pattern",
    title: "Morning Learning Champion",
    message: "You complete 85% of learning tasks scheduled before 11 AM. Your morning focus is exceptional!",
    actionable: "Move more learning tasks to morning slots",
    priority: "high",
    category: "Learning",
    timestamp: new Date().toISOString()
  },
  {
    id: "3",
    type: "suggestion",
    title: "Evening Task Optimization",
    message: "Tasks after 7 PM have 40% lower completion. Consider shorter 15-20 min tasks in the evening instead.",
    actionable: "Split evening tasks into smaller chunks",
    priority: "medium",
    category: "Personal",
    timestamp: new Date().toISOString()
  },
  {
    id: "4",
    type: "warning",
    title: "Health Tasks Declining",
    message: "Health task completion dropped 15% this week. Your wellbeing matters! Let's get back on track.",
    actionable: "Add reminders 10 minutes before health activities",
    priority: "high",
    category: "Health",
    timestamp: new Date().toISOString()
  }
]

const typeConfig = {
  pattern: { 
    icon: TrendingUp, 
    color: "text-blue-500", 
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    gradientFrom: "from-blue-500/10",
    gradientTo: "to-cyan-500/10"
  },
  suggestion: { 
    icon: Lightbulb, 
    color: "text-amber-500", 
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    gradientFrom: "from-amber-500/10",
    gradientTo: "to-orange-500/10"
  },
  celebration: { 
    icon: PartyPopper, 
    color: "text-purple-500", 
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    gradientFrom: "from-purple-500/10",
    gradientTo: "to-pink-500/10"
  },
  warning: { 
    icon: AlertCircle, 
    color: "text-red-500", 
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    gradientFrom: "from-red-500/10",
    gradientTo: "to-orange-500/10"
  }
}

const priorityBadge = {
  high: "bg-red-500/20 text-red-600 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-600 border-amber-500/30",
  low: "bg-green-500/20 text-green-600 border-green-500/30"
}

export default function AIInsightsPanel({ insights = defaultInsights, onAction }: AIInsightsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const visibleInsights = insights.filter(i => !dismissedIds.has(i.id))

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set(prev).add(id))
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setDismissedIds(new Set())
    }, 1000)
  }

  const handleFeedback = (insightId: string, helpful: boolean) => {
    onAction?.(insightId, helpful ? "helpful" : "not_helpful")
    // Could show a toast or animate feedback
  }

  return (
    <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-card via-card to-indigo-500/5">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <Brain className="w-4 h-4 text-white" />
            </div>
            AI Insights
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh}
            className="h-8 w-8 rounded-full"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {visibleInsights.length} insights based on your activity
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {visibleInsights.length === 0 ? (
          <div className="text-center py-8">
            <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="font-medium">All caught up!</p>
            <p className="text-sm text-muted-foreground mt-1">
              New insights will appear as you complete tasks
            </p>
          </div>
        ) : (
          visibleInsights.map((insight) => {
            const config = typeConfig[insight.type]
            const Icon = config.icon
            const isExpanded = expandedId === insight.id

            return (
              <div
                key={insight.id}
                className={`
                  group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer
                  bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} ${config.borderColor}
                  hover:shadow-md
                `}
                onClick={() => setExpandedId(isExpanded ? null : insight.id)}
              >
                {/* Dismiss button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDismiss(insight.id)
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bgColor} shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{insight.title}</p>
                      {insight.priority === "high" && (
                        <Badge variant="outline" className={`${priorityBadge[insight.priority]} text-[10px] px-1.5 py-0`}>
                          High
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-xs text-muted-foreground mt-1 ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {insight.message}
                    </p>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        {insight.actionable && (
                          <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                            <p className="text-xs font-medium mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-primary" />
                              Suggested Action
                            </p>
                            <p className="text-xs text-muted-foreground">{insight.actionable}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleFeedback(insight.id, true)
                              }}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-500 transition-colors"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Helpful
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleFeedback(insight.id, false)
                              }}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <ThumbsDown className="w-3 h-3" />
                              Not helpful
                            </button>
                          </div>
                          
                          {insight.actionable && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                onAction?.(insight.id, "apply")
                              }}
                            >
                              Apply
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category badge */}
                {insight.category && (
                  <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px] px-2 py-0 bg-background/50">
                    {insight.category}
                  </Badge>
                )}
              </div>
            )
          })
        )}

        {visibleInsights.length > 0 && (
          <Button 
            variant="ghost" 
            className="w-full text-primary hover:text-primary hover:bg-primary/10 mt-2"
          >
            View All Insights
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
