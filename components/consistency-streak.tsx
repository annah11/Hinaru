"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, TrendingUp, Calendar, Star } from "lucide-react"

export default function ConsistencyStreak() {
  const streakCount = 12
  const bestStreak = 18
  const weekProgress = [
    { day: "M", date: 4, completed: true, tasks: 7 },
    { day: "T", date: 5, completed: true, tasks: 6 },
    { day: "W", date: 6, completed: true, tasks: 8 },
    { day: "T", date: 7, completed: true, tasks: 5 },
    { day: "F", date: 8, completed: true, tasks: 7 },
    { day: "S", date: 9, completed: false, tasks: 2, isToday: false },
    { day: "S", date: 10, completed: false, tasks: 0, isToday: true }
  ]

  const completedDays = weekProgress.filter(d => d.completed).length
  const percentage = (streakCount / 30) * 100

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Consistency Streak</h3>
              <p className="text-white/70 text-xs">Keep the fire burning!</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-0 text-lg font-bold px-3">
            🔥 {streakCount}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-5">
        {/* Streak Ring */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.64} 264`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                {streakCount}
              </div>
              <div className="text-xs text-muted-foreground font-medium">days</div>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                Best: {bestStreak}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <p className="text-lg font-bold text-orange-600">{completedDays}</p>
            <p className="text-[10px] text-muted-foreground">This Week</p>
          </div>
          <div className="p-2 rounded-lg bg-muted">
            <p className="text-lg font-bold">{bestStreak}</p>
            <p className="text-[10px] text-muted-foreground">Best Ever</p>
          </div>
          <div className="p-2 rounded-lg bg-green-500/10">
            <p className="text-lg font-bold text-green-600">+8%</p>
            <p className="text-[10px] text-muted-foreground">vs Last Week</p>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              This Week
            </p>
            <p className="text-xs text-muted-foreground">{completedDays}/7 days</p>
          </div>
          
          <div className="flex gap-2 justify-between">
            {weekProgress.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                <div
                  className={`
                    relative w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold
                    transition-all duration-200 cursor-pointer
                    ${day.isToday 
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                      : ""
                    }
                    ${day.completed 
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30" 
                      : day.isToday
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }
                    group-hover:scale-110
                  `}
                >
                  {day.completed ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <span>{day.date}</span>
                  )}
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-foreground text-background text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      {day.tasks} tasks
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation message */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <p className="text-xs text-center">
            <span className="font-medium">🎯 6 more days</span> to beat your best streak!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
