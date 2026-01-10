"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, PartyPopper, Sparkles, Star, Trophy } from "lucide-react"

interface CelebrationCardProps {
  message?: string
  onClose?: () => void
}

const celebrationMessages = [
  { emoji: "🎉", title: "Amazing work!", subtitle: "You're crushing it today!" },
  { emoji: "🌟", title: "Fantastic!", subtitle: "Another task in the bag!" },
  { emoji: "🔥", title: "On fire!", subtitle: "Keep that momentum going!" },
  { emoji: "💪", title: "Power move!", subtitle: "Nothing can stop you!" },
  { emoji: "🚀", title: "Liftoff!", subtitle: "You're soaring high today!" },
  { emoji: "⭐", title: "Stellar!", subtitle: "You're a productivity star!" },
  { emoji: "🏆", title: "Champion!", subtitle: "That's how winners do it!" },
  { emoji: "💎", title: "Brilliant!", subtitle: "Every task completed is a gem!" }
]

const confettiColors = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", 
  "#ec4899", "#f43f5e", "#f97316", "#eab308",
  "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6"
]

export default function CelebrationCard({ message, onClose }: CelebrationCardProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string; size: number; rotation: number }>>([])
  const [randomMessage] = useState(() => celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)])

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360
    }))
    setConfetti(particles)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Confetti background */}
      <div className="absolute inset-0 overflow-hidden">
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-confetti"
            style={{
              left: `${particle.x}%`,
              top: "-20px",
              animationDelay: `${particle.delay}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div
              style={{
                width: particle.size,
                height: particle.size * 1.5,
                backgroundColor: particle.color,
                transform: `rotate(${particle.rotation}deg)`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px"
              }}
            />
          </div>
        ))}
      </div>

      {/* Celebration Card */}
      <Card className="relative bg-gradient-to-br from-white via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30 border-0 shadow-2xl pointer-events-auto animate-in zoom-in-95 fade-in duration-300 max-w-sm mx-4">
        {/* Close button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse" />

        <CardContent className="relative p-8 text-center">
          {/* Floating icons */}
          <div className="absolute top-4 left-4 animate-bounce" style={{ animationDelay: "0.1s" }}>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="absolute top-6 right-8 animate-bounce" style={{ animationDelay: "0.3s" }}>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="absolute bottom-8 left-6 animate-bounce" style={{ animationDelay: "0.5s" }}>
            <PartyPopper className="w-5 h-5 text-pink-400" />
          </div>
          <div className="absolute bottom-6 right-4 animate-bounce" style={{ animationDelay: "0.2s" }}>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>

          {/* Main emoji */}
          <div className="text-7xl mb-4 animate-bounce">
            {randomMessage.emoji}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {message || randomMessage.title}
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground mb-6">
            {randomMessage.subtitle}
          </p>

          {/* Stats badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-medium">12 day streak</span>
            <span className="text-xs text-muted-foreground">• 84% today</span>
          </div>

          {/* Action button */}
          <Button 
            onClick={onClose}
            className="w-full mt-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Keep Going
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
