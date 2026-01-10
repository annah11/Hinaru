"use client"

interface IllustrationProps {
  className?: string
  size?: number
}

export function EmptyStateIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="emptyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="emptyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="100" cy="100" r="80" fill="url(#emptyGrad1)" opacity="0.1" />
      
      {/* Clipboard */}
      <rect x="60" y="45" width="80" height="110" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="75" y="35" width="50" height="20" rx="4" fill="#e2e8f0" />
      <circle cx="100" cy="45" r="5" fill="#cbd5e1" />
      
      {/* Lines on clipboard */}
      <rect x="70" y="70" width="60" height="8" rx="2" fill="#e2e8f0" />
      <rect x="70" y="85" width="50" height="8" rx="2" fill="#e2e8f0" />
      <rect x="70" y="100" width="55" height="8" rx="2" fill="#e2e8f0" />
      <rect x="70" y="115" width="40" height="8" rx="2" fill="#e2e8f0" />
      
      {/* Checkmark circle */}
      <circle cx="100" cy="135" r="15" fill="url(#emptyGrad2)" />
      <path d="M93 135L98 140L108 130" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Floating elements */}
      <circle cx="40" cy="60" r="6" fill="url(#emptyGrad1)" opacity="0.3" />
      <circle cx="160" cy="80" r="4" fill="url(#emptyGrad2)" opacity="0.4" />
      <circle cx="50" cy="140" r="5" fill="#f97316" opacity="0.3" />
      <circle cx="155" cy="130" r="3" fill="#a855f7" opacity="0.4" />
    </svg>
  )
}

export function SuccessIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      
      {/* Outer glow */}
      <circle cx="100" cy="100" r="70" fill="url(#successGrad)" opacity="0.1" />
      <circle cx="100" cy="100" r="55" fill="url(#successGrad)" opacity="0.15" />
      
      {/* Main circle */}
      <circle cx="100" cy="100" r="40" fill="url(#successGrad)" />
      
      {/* Checkmark */}
      <path d="M80 100L95 115L120 85" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Celebration particles */}
      <circle cx="50" cy="50" r="4" fill="#fbbf24" />
      <circle cx="150" cy="60" r="3" fill="#f97316" />
      <circle cx="45" cy="130" r="3" fill="#8b5cf6" />
      <circle cx="155" cy="140" r="4" fill="#3b82f6" />
      <circle cx="100" cy="30" r="3" fill="#ec4899" />
      
      {/* Stars */}
      <path d="M60 80L62 85L67 85L63 88L65 93L60 90L55 93L57 88L53 85L58 85L60 80Z" fill="#fbbf24" />
      <path d="M140 110L142 115L147 115L143 118L145 123L140 120L135 123L137 118L133 115L138 115L140 110Z" fill="#fbbf24" />
    </svg>
  )
}

export function LearningIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="learnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <circle cx="100" cy="100" r="75" fill="url(#learnGrad)" opacity="0.1" />
      
      {/* Book base */}
      <path d="M50 70C50 70 75 75 100 75C125 75 150 70 150 70V145C150 145 125 150 100 150C75 150 50 145 50 145V70Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Book spine */}
      <line x1="100" y1="75" x2="100" y2="150" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Left page lines */}
      <rect x="58" y="85" width="35" height="4" rx="1" fill="#cbd5e1" />
      <rect x="58" y="95" width="30" height="4" rx="1" fill="#cbd5e1" />
      <rect x="58" y="105" width="32" height="4" rx="1" fill="#cbd5e1" />
      <rect x="58" y="115" width="28" height="4" rx="1" fill="#cbd5e1" />
      
      {/* Right page lines */}
      <rect x="107" y="85" width="35" height="4" rx="1" fill="#cbd5e1" />
      <rect x="107" y="95" width="30" height="4" rx="1" fill="#cbd5e1" />
      <rect x="107" y="105" width="32" height="4" rx="1" fill="#cbd5e1" />
      <rect x="107" y="115" width="28" height="4" rx="1" fill="#cbd5e1" />
      
      {/* Lightbulb */}
      <circle cx="100" cy="45" r="18" fill="url(#learnGrad)" />
      <path d="M92 50H108" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M94 55H106" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M96 60H104" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 35V30" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <path d="M115 40L120 35" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <path d="M85 40L80 35" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      
      {/* Floating elements */}
      <circle cx="45" cy="100" r="4" fill="#8b5cf6" opacity="0.5" />
      <circle cx="155" cy="90" r="3" fill="#22c55e" opacity="0.5" />
    </svg>
  )
}

export function AnalyticsIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="analyticsGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="analyticsGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="analyticsGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="analyticsGrad4" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <circle cx="100" cy="100" r="75" fill="#6366f1" opacity="0.05" />
      
      {/* Chart base */}
      <rect x="40" y="50" width="120" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* Grid lines */}
      <line x1="50" y1="80" x2="150" y2="80" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
      <line x1="50" y1="120" x2="150" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
      
      {/* Bar chart */}
      <rect x="55" y="90" width="18" height="50" rx="4" fill="url(#analyticsGrad1)" />
      <rect x="80" y="75" width="18" height="65" rx="4" fill="url(#analyticsGrad2)" />
      <rect x="105" y="85" width="18" height="55" rx="4" fill="url(#analyticsGrad3)" />
      <rect x="130" y="60" width="18" height="80" rx="4" fill="url(#analyticsGrad4)" />
      
      {/* Trend line */}
      <path d="M64 88L89 73L114 83L139 58" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="64" cy="88" r="4" fill="#ec4899" />
      <circle cx="89" cy="73" r="4" fill="#ec4899" />
      <circle cx="114" cy="83" r="4" fill="#ec4899" />
      <circle cx="139" cy="58" r="4" fill="#ec4899" />
      
      {/* Floating elements */}
      <circle cx="170" cy="50" r="6" fill="#fbbf24" opacity="0.6" />
      <circle cx="30" cy="80" r="4" fill="#22c55e" opacity="0.5" />
      <circle cx="175" cy="130" r="5" fill="#8b5cf6" opacity="0.4" />
    </svg>
  )
}

export function CelebrationIllustration({ className = "", size = 200 }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="70" fill="#fef3c7" opacity="0.3" />
      
      {/* Trophy */}
      <path d="M80 60H120V90C120 102 112 110 100 110C88 110 80 102 80 90V60Z" fill="#fbbf24" />
      <rect x="70" y="50" width="60" height="15" rx="4" fill="#f59e0b" />
      <rect x="90" y="110" width="20" height="20" fill="#f59e0b" />
      <rect x="75" y="125" width="50" height="12" rx="3" fill="#fbbf24" />
      
      {/* Trophy shine */}
      <path d="M85 70V85C85 92 90 97 97 97" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      
      {/* Handles */}
      <path d="M80 65C70 65 65 75 65 85C65 95 75 100 80 100" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M120 65C130 65 135 75 135 85C135 95 125 100 120 100" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none" />
      
      {/* Star on trophy */}
      <path d="M100 75L103 83L111 83L105 88L107 96L100 92L93 96L95 88L89 83L97 83L100 75Z" fill="white" />
      
      {/* Confetti */}
      <rect x="45" y="40" width="8" height="8" rx="1" fill="#ef4444" transform="rotate(15 45 40)" />
      <rect x="150" y="50" width="6" height="6" rx="1" fill="#3b82f6" transform="rotate(-20 150 50)" />
      <rect x="50" y="120" width="7" height="7" rx="1" fill="#22c55e" transform="rotate(30 50 120)" />
      <rect x="145" y="110" width="8" height="8" rx="1" fill="#a855f7" transform="rotate(-15 145 110)" />
      
      <circle cx="40" cy="80" r="5" fill="#ec4899" />
      <circle cx="160" cy="85" r="4" fill="#f97316" />
      <circle cx="55" cy="150" r="4" fill="#6366f1" />
      <circle cx="150" cy="145" r="5" fill="#10b981" />
      <circle cx="100" cy="30" r="4" fill="#eab308" />
      
      {/* Sparkle stars */}
      <path d="M35 60L37 65L42 65L38 68L40 73L35 70L30 73L32 68L28 65L33 65L35 60Z" fill="#fbbf24" />
      <path d="M165 70L167 75L172 75L168 78L170 83L165 80L160 83L162 78L158 75L163 75L165 70Z" fill="#fbbf24" />
    </svg>
  )
}

export default {
  EmptyStateIllustration,
  SuccessIllustration,
  LearningIllustration,
  AnalyticsIllustration,
  CelebrationIllustration
}
