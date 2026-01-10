"use client"

interface IconProps {
  className?: string
  size?: number
}

export function LearningIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="learningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path 
        d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" 
        stroke="url(#learningGrad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" 
        stroke="url(#learningGrad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" fill="url(#learningGrad)" opacity="0.5" />
      <path d="M8 14H16" stroke="url(#learningGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function WorkIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="workGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="url(#workGrad)" strokeWidth="2" />
      <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="url(#workGrad)" strokeWidth="2" />
      <circle cx="12" cy="14" r="2" fill="url(#workGrad)" opacity="0.5" />
    </svg>
  )
}

export function HealthIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <path 
        d="M20.84 4.61C20.3292 4.09912 19.7228 3.69376 19.0554 3.41735C18.3879 3.14094 17.6725 2.99878 16.95 2.99878C16.2275 2.99878 15.5121 3.14094 14.8446 3.41735C14.1772 3.69376 13.5708 4.09912 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99934 7.05 2.99934C5.59096 2.99934 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54932 7.04097 1.54932 8.5C1.54932 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3509 11.8792 21.7562 11.2728 22.0327 10.6054C22.3091 9.93789 22.4512 9.22249 22.4512 8.5C22.4512 7.77751 22.3091 7.0621 22.0327 6.39464C21.7562 5.72718 21.3509 5.12075 20.84 4.61Z" 
        fill="url(#healthGrad)"
      />
      {/* Pulse line */}
      <path 
        d="M6 12H9L10 10L12 14L14 10L15 12H18" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PersonalIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="personalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="8" r="4" stroke="url(#personalGrad)" strokeWidth="2" />
      <path 
        d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" 
        stroke="url(#personalGrad)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="2" fill="url(#personalGrad)" opacity="0.3" />
    </svg>
  )
}

export function StreakFlameIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="flameGrad1" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="flameGrad2" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Outer flame */}
      <path 
        d="M12 2C12 2 7 7 7 12C7 14.5 8.5 16.5 10 17.5C10 17.5 9.5 15 11 13C11 13 12 16 14 17.5C15.5 16.5 17 14.5 17 12C17 7 12 2 12 2Z" 
        fill="url(#flameGrad1)"
      />
      {/* Inner flame */}
      <path 
        d="M12 7C12 7 10 10 10 12C10 13.5 10.75 14.5 11.5 15C11.5 15 11.25 13.5 12 12.5C12 12.5 12.5 14 13.5 15C14.25 14.5 15 13.5 15 12C15 10 12 7 12 7Z" 
        fill="url(#flameGrad2)"
      />
      {/* Core glow */}
      <ellipse cx="12" cy="14" rx="1.5" ry="2" fill="#fef3c7" opacity="0.8" />
    </svg>
  )
}

export function AISparkleIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      {/* Main star */}
      <path 
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" 
        fill="url(#sparkleGrad)"
      />
      {/* Small stars */}
      <path 
        d="M19 14L19.75 16.25L22 17L19.75 17.75L19 20L18.25 17.75L16 17L18.25 16.25L19 14Z" 
        fill="url(#sparkleGrad)" 
        opacity="0.7"
      />
      <path 
        d="M5 4L5.5 5.5L7 6L5.5 6.5L5 8L4.5 6.5L3 6L4.5 5.5L5 4Z" 
        fill="url(#sparkleGrad)" 
        opacity="0.5"
      />
    </svg>
  )
}

export function ProgressRingIcon({ className = "", size = 24, progress = 75 }: IconProps & { progress?: number }) {
  const circumference = 2 * Math.PI * 9
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      {/* Progress circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke="url(#progressGrad)" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        transform="rotate(-90 12 12)"
      />
      {/* Center checkmark for completed */}
      {progress >= 100 && (
        <path 
          d="M8 12L11 15L16 9" 
          stroke="url(#progressGrad)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export default {
  LearningIcon,
  WorkIcon,
  HealthIcon,
  PersonalIcon,
  StreakFlameIcon,
  AISparkleIcon,
  ProgressRingIcon
}
