"use client"

interface PatternProps {
  className?: string
}

export function DotPattern({ className = "" }: PatternProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary/5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>
    </div>
  )
}

export function GridPattern({ className = "" }: PatternProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
    </div>
  )
}

export function GradientBlob({ className = "" }: PatternProps) {
  return (
    <div className={`absolute -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Top right blob */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      {/* Bottom left blob */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      {/* Center accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl" />
    </div>
  )
}

export function WavePattern({ className = "" }: PatternProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 -z-10 overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="relative block w-full h-24"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          fill="url(#waveGrad)"
        />
      </svg>
    </div>
  )
}

export function FloatingShapes({ className = "" }: PatternProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/20 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-green-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-orange-500/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      {/* Floating squares */}
      <div className="absolute top-1/3 left-20 w-4 h-4 bg-pink-500/10 rounded rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-cyan-500/10 rounded rotate-12 animate-bounce" style={{ animationDuration: '4s' }} />
      
      {/* Lines */}
      <div className="absolute top-1/4 right-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/10 to-transparent rotate-45" />
      <div className="absolute bottom-1/4 left-1/3 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -rotate-12" />
    </div>
  )
}

export function RadialGlow({ className = "", color = "primary" }: PatternProps & { color?: string }) {
  const colorClasses: Record<string, string> = {
    primary: "from-primary/20",
    blue: "from-blue-500/20",
    green: "from-green-500/20",
    orange: "from-orange-500/20",
    purple: "from-purple-500/20",
    pink: "from-pink-500/20"
  }
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-radial ${colorClasses[color] || colorClasses.primary} to-transparent`} />
    </div>
  )
}

export function ParticlesBackground({ className = "" }: PatternProps) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }))
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

export default {
  DotPattern,
  GridPattern,
  GradientBlob,
  WavePattern,
  FloatingShapes,
  RadialGlow,
  ParticlesBackground
}
