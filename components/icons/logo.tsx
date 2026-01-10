"use client"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      
      {/* Main circle background */}
      <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" opacity="0.1" />
      
      {/* Stylized H with plant elements */}
      <path 
        d="M16 14V34" 
        stroke="url(#logoGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M32 14V34" 
        stroke="url(#logoGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M16 24H32" 
        stroke="url(#logoGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      
      {/* Small sun in corner */}
      <circle cx="38" cy="10" r="4" fill="url(#sunGradient)" />
      <g stroke="url(#sunGradient)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="38" y1="3" x2="38" y2="5" />
        <line x1="38" y1="15" x2="38" y2="17" />
        <line x1="31" y1="10" x2="33" y2="10" />
        <line x1="43" y1="10" x2="45" y2="10" />
      </g>
      
      {/* Small leaf accent */}
      <path 
        d="M10 38C10 38 12 35 15 35C18 35 18 38 18 38C18 38 16 41 13 41C10 41 10 38 10 38Z" 
        fill="url(#leafGradient)" 
        opacity="0.9"
      />
    </svg>
  )
}

export function LogoWithText({ className = "", size = 32 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={size} />
      <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Hina
      </span>
    </div>
  )
}

export default Logo
