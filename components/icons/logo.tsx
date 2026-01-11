"use client"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="hinaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="hinaGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="sunburstGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background circle with gradient */}
      <circle cx="30" cy="30" r="28" fill="url(#hinaGrad1)" opacity="0.15" />
      
      {/* Inner decorative ring */}
      <circle cx="30" cy="30" r="24" fill="none" stroke="url(#hinaGrad1)" strokeWidth="1" opacity="0.3" />
      
      {/* Stylized "H" representing growth/learning path */}
      <path 
        d="M18 18V42" 
        stroke="url(#hinaGrad1)" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M42 18V42" 
        stroke="url(#hinaGrad1)" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      <path 
        d="M18 30H42" 
        stroke="url(#hinaGrad1)" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Rising sun/growth element */}
      <circle cx="30" cy="12" r="5" fill="url(#sunburstGrad)" filter="url(#glow)" />
      
      {/* Sun rays */}
      <g stroke="url(#sunburstGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <line x1="30" y1="4" x2="30" y2="2" />
        <line x1="36" y1="7" x2="38" y2="5" />
        <line x1="24" y1="7" x2="22" y2="5" />
      </g>
      
      {/* Leaf/growth accent on bottom right */}
      <path 
        d="M44 44C44 44 48 40 52 40C52 44 48 48 44 48C44 48 44 44 44 44Z" 
        fill="url(#hinaGrad2)"
      />
      <path 
        d="M45 45L50 41" 
        stroke="#22c55e" 
        strokeWidth="1" 
        opacity="0.5"
      />
      
      {/* Small decorative dots */}
      <circle cx="12" cy="45" r="2" fill="url(#hinaGrad1)" opacity="0.4" />
      <circle cx="48" cy="25" r="1.5" fill="url(#sunburstGrad)" opacity="0.5" />
    </svg>
  )
}

export function LogoWithText({ className = "", size = 40 }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={size} />
      <div className="flex flex-col">
        <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Hina
        </span>
        <span className="text-[10px] text-muted-foreground -mt-1 tracking-wide">
          Plan • Learn • Grow
        </span>
      </div>
    </div>
  )
}

export function LogoMini({ className = "", size = 32 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="hinaGradMini" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#hinaGradMini)" />
      <path d="M12 12V28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 12V28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="8" r="3" fill="#fbbf24" />
    </svg>
  )
}

export default Logo
