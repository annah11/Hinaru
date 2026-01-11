"use client"

interface StudyingCharacterProps {
  className?: string
  size?: number
  variant?: "sitting" | "reading" | "thinking"
}

export function StudyingCharacter({ className = "", size = 300, variant = "sitting" }: StudyingCharacterProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd5ce" />
          <stop offset="100%" stopColor="#f8b4a8" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a3728" />
          <stop offset="100%" stopColor="#2d1f14" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      
      {/* Background decorative elements */}
      <circle cx="350" cy="80" r="20" fill="#6366f1" opacity="0.1" />
      <circle cx="60" cy="120" r="15" fill="#22c55e" opacity="0.15" />
      <circle cx="320" cy="300" r="12" fill="#f97316" opacity="0.1" />
      
      {/* Floating elements - books/ideas */}
      <g className="animate-bounce" style={{ animationDuration: "3s" }}>
        <rect x="40" y="60" width="30" height="40" rx="3" fill="#ef4444" opacity="0.8" />
        <rect x="43" y="63" width="24" height="2" fill="white" opacity="0.5" />
        <rect x="43" y="68" width="20" height="2" fill="white" opacity="0.5" />
      </g>
      
      <g className="animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }}>
        <circle cx="350" cy="150" r="15" fill="#8b5cf6" opacity="0.3" />
        <text x="350" y="155" textAnchor="middle" fill="white" fontSize="16">💡</text>
      </g>
      
      {/* Desk/Table */}
      <rect x="80" y="280" width="250" height="15" rx="4" fill="url(#deskGrad)" />
      <rect x="90" y="295" width="20" height="80" fill="#d97706" />
      <rect x="300" y="295" width="20" height="80" fill="#d97706" />
      
      {/* Chair */}
      <rect x="160" y="300" width="80" height="10" rx="3" fill="#9333ea" />
      <rect x="175" y="310" width="50" height="60" fill="#7c3aed" />
      <rect x="155" y="240" width="90" height="60" rx="5" fill="#a855f7" />
      
      {/* Laptop on desk */}
      <g transform="translate(130, 220)">
        {/* Screen */}
        <rect x="0" y="0" width="100" height="60" rx="4" fill="#1f2937" />
        <rect x="5" y="5" width="90" height="50" rx="2" fill="#3b82f6" />
        {/* Code lines on screen */}
        <rect x="10" y="12" width="40" height="3" fill="#22c55e" opacity="0.8" />
        <rect x="10" y="20" width="60" height="3" fill="#f472b6" opacity="0.8" />
        <rect x="10" y="28" width="35" height="3" fill="#fbbf24" opacity="0.8" />
        <rect x="10" y="36" width="50" height="3" fill="#22c55e" opacity="0.8" />
        <rect x="10" y="44" width="30" height="3" fill="white" opacity="0.5" />
        {/* Base */}
        <rect x="10" y="60" width="80" height="5" rx="1" fill="url(#laptopGrad)" />
      </g>
      
      {/* Book stack on desk */}
      <g transform="translate(250, 245)">
        <rect x="0" y="20" width="50" height="10" rx="2" fill="#ef4444" />
        <rect x="3" y="10" width="44" height="10" rx="2" fill="#3b82f6" />
        <rect x="6" y="0" width="38" height="10" rx="2" fill="url(#bookGrad)" />
      </g>
      
      {/* Coffee mug */}
      <g transform="translate(100, 250)">
        <rect x="0" y="5" width="25" height="25" rx="3" fill="#f8fafc" />
        <ellipse cx="12.5" cy="7" rx="12.5" ry="4" fill="#f1f5f9" />
        <ellipse cx="12.5" cy="7" rx="8" ry="2.5" fill="#92400e" />
        <path d="M25 12C30 12 32 18 30 22C28 26 25 24 25 24" stroke="#f8fafc" strokeWidth="3" fill="none" />
        {/* Steam */}
        <path d="M10 0C10 -5 15 -5 15 0" stroke="#9ca3af" strokeWidth="1.5" fill="none" opacity="0.5" className="animate-pulse" />
      </g>
      
      {/* Character body */}
      {/* Torso */}
      <ellipse cx="200" cy="230" rx="45" ry="50" fill="url(#shirtGrad)" />
      
      {/* Arms */}
      <ellipse cx="145" cy="220" rx="15" ry="35" fill="url(#shirtGrad)" transform="rotate(-20 145 220)" />
      <ellipse cx="255" cy="220" rx="15" ry="35" fill="url(#shirtGrad)" transform="rotate(20 255 220)" />
      
      {/* Hands on laptop */}
      <ellipse cx="155" cy="260" rx="12" ry="10" fill="url(#skinGrad)" />
      <ellipse cx="245" cy="260" rx="12" ry="10" fill="url(#skinGrad)" />
      
      {/* Neck */}
      <rect x="188" y="165" width="24" height="20" fill="url(#skinGrad)" />
      
      {/* Head */}
      <ellipse cx="200" cy="130" rx="45" ry="50" fill="url(#skinGrad)" />
      
      {/* Hair */}
      <ellipse cx="200" cy="100" rx="48" ry="35" fill="url(#hairGrad)" />
      <ellipse cx="160" cy="115" rx="15" ry="25" fill="url(#hairGrad)" />
      <ellipse cx="240" cy="115" rx="15" ry="25" fill="url(#hairGrad)" />
      {/* Bangs */}
      <path d="M155 100C165 110 180 115 200 110C220 115 235 110 245 100" fill="url(#hairGrad)" />
      
      {/* Face */}
      {/* Eyes */}
      <ellipse cx="180" cy="130" rx="8" ry="10" fill="white" />
      <ellipse cx="220" cy="130" rx="8" ry="10" fill="white" />
      <circle cx="182" cy="132" r="5" fill="#1f2937" />
      <circle cx="222" cy="132" r="5" fill="#1f2937" />
      <circle cx="183" cy="130" r="2" fill="white" />
      <circle cx="223" cy="130" r="2" fill="white" />
      
      {/* Eyebrows - focused expression */}
      <path d="M170 118C175 115 185 115 190 118" stroke="#4a3728" strokeWidth="2" strokeLinecap="round" />
      <path d="M210 118C215 115 225 115 230 118" stroke="#4a3728" strokeWidth="2" strokeLinecap="round" />
      
      {/* Nose */}
      <path d="M200 140L195 150L200 150" stroke="#e5a89a" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Smile */}
      <path d="M188 160C192 166 208 166 212 160" stroke="#c9756b" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Blush */}
      <ellipse cx="165" cy="148" rx="8" ry="5" fill="#fca5a5" opacity="0.5" />
      <ellipse cx="235" cy="148" rx="8" ry="5" fill="#fca5a5" opacity="0.5" />
      
      {/* Glasses */}
      <circle cx="180" cy="130" r="15" stroke="#374151" strokeWidth="2" fill="none" />
      <circle cx="220" cy="130" r="15" stroke="#374151" strokeWidth="2" fill="none" />
      <path d="M195 130H205" stroke="#374151" strokeWidth="2" />
      <path d="M165 125L155 120" stroke="#374151" strokeWidth="2" />
      <path d="M235 125L245 120" stroke="#374151" strokeWidth="2" />
      
      {/* Thought bubbles */}
      <g className="animate-pulse">
        <circle cx="280" cy="80" r="8" fill="#e0e7ff" />
        <circle cx="295" cy="65" r="12" fill="#e0e7ff" />
        <circle cx="320" cy="50" r="20" fill="#e0e7ff" />
        <text x="320" y="55" textAnchor="middle" fontSize="14">📚</text>
      </g>
      
      {/* Sparkles around */}
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <path d="M60 200L65 210L75 210L67 217L70 227L60 220L50 227L53 217L45 210L55 210L60 200Z" fill="#fbbf24" opacity="0.7" />
      </g>
      <g className="animate-pulse" style={{ animationDelay: "0.6s" }}>
        <path d="M340 220L343 227L350 227L345 232L347 239L340 235L333 239L335 232L330 227L337 227L340 220Z" fill="#6366f1" opacity="0.5" />
      </g>
    </svg>
  )
}

export function StudyingCharacterSimple({ className = "", size = 200 }: Omit<StudyingCharacterProps, "variant">) {
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
        <linearGradient id="skinGradSimple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd5ce" />
          <stop offset="100%" stopColor="#f8b4a8" />
        </linearGradient>
        <linearGradient id="shirtGradSimple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Simple character reading a book */}
      {/* Body */}
      <ellipse cx="100" cy="140" rx="35" ry="40" fill="url(#shirtGradSimple)" />
      
      {/* Book */}
      <rect x="60" y="120" width="80" height="50" rx="3" fill="#22c55e" />
      <line x1="100" y1="120" x2="100" y2="170" stroke="#16a34a" strokeWidth="2" />
      <rect x="65" y="128" width="30" height="3" fill="white" opacity="0.5" />
      <rect x="65" y="136" width="25" height="3" fill="white" opacity="0.5" />
      <rect x="105" y="128" width="30" height="3" fill="white" opacity="0.5" />
      <rect x="105" y="136" width="25" height="3" fill="white" opacity="0.5" />
      
      {/* Head */}
      <circle cx="100" cy="70" r="35" fill="url(#skinGradSimple)" />
      
      {/* Hair */}
      <ellipse cx="100" cy="50" rx="38" ry="25" fill="#4a3728" />
      
      {/* Eyes looking at book */}
      <ellipse cx="88" cy="75" rx="5" ry="6" fill="white" />
      <ellipse cx="112" cy="75" rx="5" ry="6" fill="white" />
      <circle cx="88" cy="77" r="3" fill="#1f2937" />
      <circle cx="112" cy="77" r="3" fill="#1f2937" />
      
      {/* Smile */}
      <path d="M90 88C95 92 105 92 110 88" stroke="#c9756b" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Floating elements */}
      <circle cx="160" cy="40" r="10" fill="#fbbf24" opacity="0.3" className="animate-pulse" />
      <circle cx="40" cy="60" r="8" fill="#6366f1" opacity="0.2" className="animate-pulse" />
    </svg>
  )
}

export default StudyingCharacter
