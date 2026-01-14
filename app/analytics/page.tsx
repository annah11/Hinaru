"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Clock,
  Award,
  BarChart3,
  Activity,
  BookOpen,
  Briefcase,
  Heart,
  User,
  Download,
  Filter,
  ChevronRight,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Menu
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"
import {
  weeklyAnalytics,
  categoryStats,
  monthlyTrend,
  timeDistribution,
  hourlyProductivity
} from "@/lib/data"

const CATEGORY_COLORS = {
  Learning: "#6366f1",
  Work: "#22c55e",
  Health: "#f97316",
  Personal: "#a855f7"
}

// Extended analytics data
const weeklyComparison = [
  { week: "W1", thisMonth: 85, lastMonth: 78, target: 90 },
  { week: "W2", thisMonth: 88, lastMonth: 82, target: 90 },
  { week: "W3", thisMonth: 92, lastMonth: 79, target: 90 },
  { week: "W4", thisMonth: 89, lastMonth: 84, target: 90 }
]

const categoryPerformance = [
  { category: "Learning", completion: 89, consistency: 85, improvement: 12 },
  { category: "Work", completion: 91, consistency: 92, improvement: 5 },
  { category: "Health", completion: 78, consistency: 70, improvement: -8 },
  { category: "Personal", completion: 85, consistency: 82, improvement: 15 }
]

const radarData = [
  { subject: "Completion", A: 88, fullMark: 100 },
  { subject: "Consistency", A: 85, fullMark: 100 },
  { subject: "Punctuality", A: 72, fullMark: 100 },
  { subject: "Duration", A: 91, fullMark: 100 },
  { subject: "Balance", A: 78, fullMark: 100 },
  { subject: "Growth", A: 95, fullMark: 100 }
]

const streakHistory = [
  { day: "Jan 1", streak: 1 },
  { day: "Jan 2", streak: 2 },
  { day: "Jan 3", streak: 3 },
  { day: "Jan 4", streak: 4 },
  { day: "Jan 5", streak: 5 },
  { day: "Jan 6", streak: 0 },
  { day: "Jan 7", streak: 1 },
  { day: "Jan 8", streak: 2 },
  { day: "Jan 9", streak: 3 },
  { day: "Jan 10", streak: 4 },
  { day: "Jan 11", streak: 5 },
  { day: "Jan 12", streak: 6 },
  { day: "Jan 13", streak: 7 },
  { day: "Jan 14", streak: 8 },
  { day: "Jan 15", streak: 9 },
  { day: "Jan 16", streak: 10 },
  { day: "Jan 17", streak: 11 },
  { day: "Jan 18", streak: 12 }
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
            <span className="font-medium">{typeof entry.value === 'number' ? Math.round(entry.value) : entry.value}{entry.unit || ''}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Calculate summary stats
  const avgAdherence = Math.round(weeklyAnalytics.reduce((acc, d) => acc + d.adherenceRate, 0) / weeklyAnalytics.length)
  const totalTasks = weeklyAnalytics.reduce((acc, d) => acc + d.planned, 0)
  const completedTasks = weeklyAnalytics.reduce((acc, d) => acc + d.completed, 0)
  const totalMinutes = weeklyAnalytics.reduce((acc, d) => acc + d.executedMinutes, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
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
          <BarChart3 className="w-5 h-5 text-primary" />
          Analytics
        </h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
          </SelectContent>
        </Select>
      </header>
      
      <main className="lg:ml-72 min-h-screen transition-all duration-300 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header - Desktop */}
          <header className="hidden lg:flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                Analytics
              </h1>
              <p className="text-muted-foreground mt-1">Deep insights into your productivity patterns</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </header>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 via-card to-card">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="p-2 lg:p-3 rounded-xl bg-primary/10">
                    <Target className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-0 font-semibold text-xs hidden sm:flex">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground">Avg. Adherence</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{avgAdherence}%</p>
                <div className="mt-2 lg:mt-3 flex items-center gap-2">
                  <Progress value={avgAdherence} className="flex-1 h-1 lg:h-1.5" />
                  <span className="text-xs text-muted-foreground hidden sm:inline">Goal: 90%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 via-card to-card">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="p-2 lg:p-3 rounded-xl bg-green-500/10">
                    <Activity className="w-4 h-4 lg:w-6 lg:h-6 text-green-500" />
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-0 font-semibold text-xs hidden sm:flex">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +8
                  </Badge>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{completedTasks}<span className="text-base lg:text-lg text-muted-foreground">/{totalTasks}</span></p>
                <p className="text-xs text-muted-foreground mt-2 lg:mt-3 hidden sm:block">
                  {Math.round((completedTasks / totalTasks) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 via-card to-card">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="p-2 lg:p-3 rounded-xl bg-orange-500/10">
                    <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-orange-500" />
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">This week</span>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground">Time</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{Math.floor(totalMinutes / 60)}<span className="text-base lg:text-lg text-muted-foreground">h</span></p>
                <p className="text-xs text-muted-foreground mt-2 lg:mt-3 hidden sm:block">
                  ~{Math.round(totalMinutes / 7)}min daily
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 via-card to-card">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="p-2 lg:p-3 rounded-xl bg-purple-500/10">
                    <Award className="w-4 h-4 lg:w-6 lg:h-6 text-purple-500" />
                  </div>
                  <span className="text-xl lg:text-2xl">🏆</span>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground">Score</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">84<span className="text-base lg:text-lg text-muted-foreground">/100</span></p>
                <p className="text-xs text-green-500 mt-2 lg:mt-3 items-center gap-1 hidden sm:flex">
                  <TrendingUp className="w-3 h-3" />
                  Top 15%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Weekly Comparison */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="px-4 lg:px-6">
                <CardTitle className="text-base lg:text-lg">Weekly Comparison</CardTitle>
                <CardDescription className="text-xs lg:text-sm hidden sm:block">This month vs last month adherence</CardDescription>
              </CardHeader>
              <CardContent className="px-2 lg:px-6">
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart data={weeklyComparison} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} domain={[60, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="thisMonth" name="This Month" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lastMonth" name="Last Month" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.5} />
                    <Line type="monotone" dataKey="target" name="Target" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Radar Performance */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="px-4 lg:px-6">
                <CardTitle className="text-base lg:text-lg">Performance Radar</CardTitle>
                <CardDescription className="text-xs lg:text-sm hidden sm:block">Multi-dimensional productivity analysis</CardDescription>
              </CardHeader>
              <CardContent className="px-2 lg:px-6">
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} stroke="hsl(var(--muted-foreground))" />
                    <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <Card className="border-0 shadow-lg mb-6 lg:mb-8">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 lg:px-6">
              <div>
                <CardTitle className="text-base lg:text-lg">Category Performance</CardTitle>
                <CardDescription className="text-xs lg:text-sm hidden sm:block">Detailed breakdown by task category</CardDescription>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-28 sm:w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="px-4 lg:px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {categoryPerformance.map((cat) => {
                  const Icon = cat.category === 'Learning' ? BookOpen :
                               cat.category === 'Work' ? Briefcase :
                               cat.category === 'Health' ? Heart : User
                  const color = CATEGORY_COLORS[cat.category as keyof typeof CATEGORY_COLORS]
                  
                  return (
                    <Card key={cat.category} className="border shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                      <CardContent className="p-3 lg:p-5">
                        <div className="flex items-center justify-between mb-3 lg:mb-4">
                          <div className="p-1.5 lg:p-2.5 rounded-xl" style={{ backgroundColor: `${color}20` }}>
                            <Icon className="w-4 h-4 lg:w-5 lg:h-5" style={{ color }} />
                          </div>
                          <Badge 
                            className={`border-0 text-xs ${cat.improvement >= 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}
                          >
                            {cat.improvement >= 0 ? <ArrowUpRight className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-0.5" /> : <ArrowDownRight className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-0.5" />}
                            {Math.abs(cat.improvement)}%
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-sm lg:text-base mb-3 lg:mb-4">{cat.category}</h3>
                        
                        <div className="space-y-2 lg:space-y-3">
                          <div>
                            <div className="flex justify-between text-xs lg:text-sm mb-1">
                              <span className="text-muted-foreground">Done</span>
                              <span className="font-medium">{cat.completion}%</span>
                            </div>
                            <div className="h-1 lg:h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all group-hover:opacity-80"
                                style={{ width: `${cat.completion}%`, backgroundColor: color }}
                              />
                            </div>
                          </div>
                          
                          <div className="hidden sm:block">
                            <div className="flex justify-between text-xs lg:text-sm mb-1">
                              <span className="text-muted-foreground">Consistency</span>
                              <span className="font-medium">{cat.consistency}%</span>
                            </div>
                            <div className="h-1 lg:h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all group-hover:opacity-80"
                                style={{ width: `${cat.consistency}%`, backgroundColor: color, opacity: 0.6 }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Time & Streak Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Hourly Productivity */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="px-4 lg:px-6">
                <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  Peak Hours
                </CardTitle>
                <CardDescription className="text-xs lg:text-sm hidden sm:block">When you're most effective</CardDescription>
              </CardHeader>
              <CardContent className="px-2 lg:px-6">
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={hourlyProductivity} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="productivityFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="hour" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickLine={false} domain={[0, 100]} width={30} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="productivity" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#productivityFill)" name="Productivity %" />
                  </AreaChart>
                </ResponsiveContainer>
                
                <div className="mt-3 lg:mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Peak: 9-11 AM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">Dip: 12-1 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Streak History */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="px-4 lg:px-6">
                <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                  🔥 Streak History
                </CardTitle>
                <CardDescription className="text-xs lg:text-sm hidden sm:block">Your consistency journey</CardDescription>
              </CardHeader>
              <CardContent className="px-2 lg:px-6">
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={streakHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickLine={false} width={25} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="streak" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      dot={{ fill: '#f97316', strokeWidth: 0, r: 2 }}
                      activeDot={{ r: 4, fill: '#f97316' }}
                      name="Streak Days"
                    />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-3 lg:mt-4 grid grid-cols-3 gap-2 lg:gap-4 text-center">
                  <div className="p-2 lg:p-3 rounded-lg bg-orange-500/10">
                    <p className="text-lg lg:text-2xl font-bold text-orange-500">12</p>
                    <p className="text-xs text-muted-foreground">Current</p>
                  </div>
                  <div className="p-2 lg:p-3 rounded-lg bg-muted">
                    <p className="text-lg lg:text-2xl font-bold">18</p>
                    <p className="text-xs text-muted-foreground">Best</p>
                  </div>
                  <div className="p-2 lg:p-3 rounded-lg bg-muted">
                    <p className="text-lg lg:text-2xl font-bold">8.5</p>
                    <p className="text-xs text-muted-foreground">Avg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="px-4 lg:px-6">
              <CardTitle className="text-base lg:text-lg">Time Allocation</CardTitle>
              <CardDescription className="text-xs lg:text-sm hidden sm:block">How you distribute your time across categories</CardDescription>
            </CardHeader>
            <CardContent className="px-4 lg:px-6">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                <div className="w-full lg:w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={timeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                      >
                        {timeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-full lg:w-1/2 space-y-3 lg:space-y-4">
                  {timeDistribution.map((entry, index) => {
                    const totalTime = timeDistribution.reduce((acc, e) => acc + e.value, 0)
                    const percentage = Math.round((entry.value / totalTime) * 100)
                    
                    return (
                      <div key={entry.name} className="group">
                        <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                          <div className="flex items-center gap-2 lg:gap-3">
                            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-md" style={{ backgroundColor: entry.color }} />
                            <span className="font-medium text-sm lg:text-base">{entry.name}</span>
                          </div>
                          <div className="text-right text-sm">
                            <span className="font-semibold">{Math.floor(entry.value / 60)}h</span>
                            <span className="text-muted-foreground ml-1 lg:ml-2">({percentage}%)</span>
                          </div>
                        </div>
                        <div className="h-1.5 lg:h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all group-hover:opacity-80"
                            style={{ width: `${percentage}%`, backgroundColor: entry.color }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
