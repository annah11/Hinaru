"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Zap,
  Target,
  Clock,
  Calendar,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  RefreshCcw,
  ChevronRight,
  Star,
  Flame,
  Award
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"
import { aiInsights } from "@/lib/data"

// Extended insights data
const behavioralInsights = [
  {
    id: "b1",
    category: "Time Patterns",
    title: "Morning Peak Performance",
    description: "Your completion rate is 85% higher between 9-11 AM compared to other times. This is your productivity sweet spot.",
    actionable: "Schedule your most important learning and work tasks during this window.",
    confidence: 94,
    dataPoints: 245,
    trend: "stable",
    icon: Clock
  },
  {
    id: "b2",
    category: "Category Balance",
    title: "Health Tasks Need Attention",
    description: "Health task completion has dropped 23% over the past 2 weeks. You've missed 4 gym sessions.",
    actionable: "Consider shorter 15-minute workouts on busy days or schedule health tasks earlier.",
    confidence: 88,
    dataPoints: 56,
    trend: "declining",
    icon: AlertTriangle
  },
  {
    id: "b3",
    category: "Consistency",
    title: "Weekend Warrior Pattern",
    description: "You complete 40% fewer tasks on weekends. Personal tasks especially suffer.",
    actionable: "Keep weekend plans lighter or schedule buffer time.",
    confidence: 91,
    dataPoints: 112,
    trend: "stable",
    icon: Calendar
  },
  {
    id: "b4",
    category: "Learning",
    title: "Optimal Session Length",
    description: "Your focus peaks at 45-minute sessions. Longer sessions show diminishing returns after 50 minutes.",
    actionable: "Break 90-minute learning blocks into two 45-minute sessions with a 10-minute break.",
    confidence: 87,
    dataPoints: 89,
    trend: "improving",
    icon: Brain
  }
]

const weeklyReflection = {
  week: "January 4 - 10, 2026",
  overallScore: 84,
  previousScore: 78,
  highlights: [
    { text: "Completed React Advanced Patterns module", category: "Learning" },
    { text: "5-day morning routine streak", category: "Health" },
    { text: "Finished project documentation ahead of deadline", category: "Work" }
  ],
  challenges: [
    { text: "Missed 2 evening personal tasks", suggestion: "Move to morning or early afternoon" },
    { text: "TypeScript practice sessions often cut short", suggestion: "Schedule in smaller chunks" }
  ],
  topCategory: "Work",
  growthAreas: ["Health consistency", "Evening productivity"]
}

const adaptationSuggestions = [
  {
    id: "a1",
    type: "schedule",
    title: "Reschedule Overloaded Days",
    description: "Tuesday has 8 hours of planned tasks. Redistribute 2 tasks to Wednesday.",
    impact: "high",
    effort: "low",
    accepted: false
  },
  {
    id: "a2",
    type: "duration",
    title: "Reduce Session Lengths",
    description: "Your 90-minute sessions have 60% completion. Try 60-minute sessions instead.",
    impact: "medium",
    effort: "low",
    accepted: false
  },
  {
    id: "a3",
    type: "routine",
    title: "Reinforce Morning Routine",
    description: "Your 7 AM health tasks have 92% completion. Expand this winning pattern.",
    impact: "high",
    effort: "medium",
    accepted: true
  }
]

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState("behavioral")
  const [suggestions, setSuggestions] = useState(adaptationSuggestions)
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'helpful' | 'not-helpful' | null>>({})

  const acceptSuggestion = (id: string) => {
    setSuggestions(suggestions.map(s => s.id === id ? { ...s, accepted: true } : s))
  }

  const giveFeedback = (insightId: string, feedback: 'helpful' | 'not-helpful') => {
    setFeedbackGiven({ ...feedbackGiven, [insightId]: feedback })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-purple-600">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                AI Insights
              </h1>
              <p className="text-muted-foreground mt-1">Personalized insights to optimize your productivity</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh Insights
              </Button>
              <Button className="bg-gradient-to-r from-primary to-purple-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with AI
              </Button>
            </div>
          </header>

          {/* Weekly Summary Banner */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 via-card to-purple-500/10 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{weeklyReflection.overallScore}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +{weeklyReflection.overallScore - weeklyReflection.previousScore}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Weekly Performance</h2>
                    <p className="text-muted-foreground">{weeklyReflection.week}</p>
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      6 points improvement from last week
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-center p-4 rounded-xl bg-card shadow-sm">
                    <p className="text-3xl font-bold text-green-500">12</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card shadow-sm">
                    <p className="text-3xl font-bold text-blue-500">38</p>
                    <p className="text-xs text-muted-foreground">Tasks Done</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card shadow-sm">
                    <p className="text-3xl font-bold text-purple-500">22h</p>
                    <p className="text-xs text-muted-foreground">Time Invested</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border shadow-sm">
              <TabsTrigger value="behavioral" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Behavioral Insights
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="reflection" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Weekly Reflection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="behavioral" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {behavioralInsights.map((insight) => {
                  const Icon = insight.icon
                  const trendColor = insight.trend === 'improving' ? 'text-green-500' : 
                                     insight.trend === 'declining' ? 'text-red-500' : 'text-muted-foreground'
                  
                  return (
                    <Card key={insight.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${
                              insight.trend === 'improving' ? 'bg-green-500/10' :
                              insight.trend === 'declining' ? 'bg-red-500/10' : 'bg-primary/10'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                insight.trend === 'improving' ? 'text-green-500' :
                                insight.trend === 'declining' ? 'text-red-500' : 'text-primary'
                              }`} />
                            </div>
                            <div>
                              <Badge variant="secondary" className="mb-1">{insight.category}</Badge>
                              <h3 className="font-semibold text-lg">{insight.title}</h3>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm">
                              {insight.trend === 'improving' && <TrendingUp className={`w-4 h-4 ${trendColor}`} />}
                              {insight.trend === 'declining' && <TrendingDown className={`w-4 h-4 ${trendColor}`} />}
                              <span className={trendColor}>{insight.trend}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{insight.confidence}% confidence</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{insight.description}</p>
                        
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-primary">Recommendation</p>
                              <p className="text-sm text-muted-foreground">{insight.actionable}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Based on {insight.dataPoints} data points
                          </p>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Was this helpful?</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`h-8 w-8 ${feedbackGiven[insight.id] === 'helpful' ? 'bg-green-500/10 text-green-500' : ''}`}
                              onClick={() => giveFeedback(insight.id, 'helpful')}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`h-8 w-8 ${feedbackGiven[insight.id] === 'not-helpful' ? 'bg-red-500/10 text-red-500' : ''}`}
                              onClick={() => giveFeedback(insight.id, 'not-helpful')}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {suggestions.map((suggestion) => (
                  <Card 
                    key={suggestion.id} 
                    className={`border-0 shadow-lg transition-all ${
                      suggestion.accepted 
                        ? 'bg-gradient-to-br from-green-500/10 via-card to-green-500/5' 
                        : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className={`
                          ${suggestion.type === 'schedule' ? 'bg-blue-500/10 text-blue-600' :
                            suggestion.type === 'duration' ? 'bg-orange-500/10 text-orange-600' :
                            'bg-purple-500/10 text-purple-600'
                          } border-0
                        `}>
                          {suggestion.type}
                        </Badge>
                        {suggestion.accepted && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{suggestion.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{suggestion.description}</p>
                      
                      <div className="flex gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Impact</p>
                          <Badge variant="outline" className={`
                            ${suggestion.impact === 'high' ? 'border-green-500 text-green-600' :
                              suggestion.impact === 'medium' ? 'border-yellow-500 text-yellow-600' :
                              'border-gray-500 text-gray-600'
                            }
                          `}>
                            {suggestion.impact}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Effort</p>
                          <Badge variant="outline">{suggestion.effort}</Badge>
                        </div>
                      </div>
                      
                      {!suggestion.accepted ? (
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-primary to-purple-600"
                            onClick={() => acceptSuggestion(suggestion.id)}
                          >
                            Accept
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Dismiss
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-green-600 text-center font-medium">
                          ✓ Applied to your schedule
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reflection" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Highlights */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Week Highlights
                    </CardTitle>
                    <CardDescription>Things you did great this week</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {weeklyReflection.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{highlight.text}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">{highlight.category}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Challenges */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-500" />
                      Areas for Improvement
                    </CardTitle>
                    <CardDescription>Opportunities to grow next week</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {weeklyReflection.challenges.map((challenge, index) => (
                      <div key={index} className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                        <div className="flex items-start gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <p className="font-medium">{challenge.text}</p>
                        </div>
                        <div className="ml-8 p-2 rounded bg-card flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <p className="text-sm text-muted-foreground">{challenge.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Growth Areas */}
                <Card className="border-0 shadow-lg lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Focus Areas for Next Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {weeklyReflection.growthAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="font-medium">{area}</span>
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
