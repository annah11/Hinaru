"use client"

interface IllustrationProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

export function TaskManagementIllustration({ className = "", size = 200, style }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Phone/Dashboard mockup */}
      <rect x="50" y="30" width="100" height="140" rx="12" fill="white" opacity="0.95" />
      <rect x="55" y="40" width="90" height="120" rx="8" fill="#e8f5f3" />
      
      {/* Header bar */}
      <rect x="60" y="45" width="80" height="20" rx="4" fill="#0d9488" />
      <circle cx="70" cy="55" r="4" fill="white" opacity="0.8" />
      <rect x="78" y="52" width="30" height="6" rx="2" fill="white" opacity="0.6" />
      
      {/* Task list items */}
      <rect x="60" y="72" width="80" height="18" rx="4" fill="white" />
      <circle cx="70" cy="81" r="4" fill="#0d9488" />
      <rect x="78" y="78" width="40" height="6" rx="2" fill="#94a3b8" />
      
      <rect x="60" y="94" width="80" height="18" rx="4" fill="white" />
      <circle cx="70" cy="103" r="4" stroke="#0d9488" strokeWidth="2" fill="none" />
      <rect x="78" y="100" width="50" height="6" rx="2" fill="#94a3b8" />
      
      <rect x="60" y="116" width="80" height="18" rx="4" fill="white" />
      <circle cx="70" cy="125" r="4" fill="#0d9488" />
      <rect x="78" y="122" width="35" height="6" rx="2" fill="#94a3b8" />
      
      {/* Progress indicator */}
      <rect x="60" y="140" width="80" height="15" rx="4" fill="white" />
      <rect x="65" y="145" width="50" height="5" rx="2" fill="#0d9488" />
      
      {/* Character - person with clipboard */}
      <g transform="translate(5, 55)">
        {/* Body */}
        <ellipse cx="30" cy="90" rx="18" ry="22" fill="#0d9488" />
        {/* Head */}
        <circle cx="30" cy="55" r="15" fill="#fcd5ce" />
        {/* Hair */}
        <ellipse cx="30" cy="48" rx="14" ry="10" fill="#4a3728" />
        <ellipse cx="18" cy="52" rx="4" ry="8" fill="#4a3728" />
        <ellipse cx="42" cy="52" rx="4" ry="8" fill="#4a3728" />
        {/* Face */}
        <circle cx="26" cy="55" r="2" fill="#2d3748" />
        <circle cx="34" cy="55" r="2" fill="#2d3748" />
        <path d="M27 62 Q30 65 33 62" stroke="#c9756b" strokeWidth="1.5" fill="none" />
        {/* Arm holding clipboard */}
        <ellipse cx="44" cy="82" rx="6" ry="12" fill="#0d9488" transform="rotate(-20 44 82)" />
        <ellipse cx="48" cy="92" rx="5" ry="4" fill="#fcd5ce" />
      </g>
      
      {/* Floating elements */}
      {/* Gear */}
      <g transform="translate(155, 50)">
        <circle cx="15" cy="15" r="12" fill="#0d9488" opacity="0.2" />
        <circle cx="15" cy="15" r="8" stroke="#0d9488" strokeWidth="3" fill="none" />
        <circle cx="15" cy="15" r="3" fill="#0d9488" />
        {/* Gear teeth */}
        <rect x="13" y="2" width="4" height="6" rx="1" fill="#0d9488" />
        <rect x="13" y="22" width="4" height="6" rx="1" fill="#0d9488" />
        <rect x="2" y="13" width="6" height="4" rx="1" fill="#0d9488" />
        <rect x="22" y="13" width="6" height="4" rx="1" fill="#0d9488" />
      </g>
      
      {/* Spring/coil */}
      <g transform="translate(155, 100)">
        <ellipse cx="15" cy="10" rx="12" ry="5" stroke="#0d9488" strokeWidth="2" fill="none" />
        <ellipse cx="15" cy="20" rx="12" ry="5" stroke="#0d9488" strokeWidth="2" fill="none" />
        <ellipse cx="15" cy="30" rx="12" ry="5" stroke="#0d9488" strokeWidth="2" fill="none" />
        <ellipse cx="15" cy="40" rx="12" ry="5" stroke="#0d9488" strokeWidth="2" fill="none" />
      </g>
      
      {/* Checkmark badge */}
      <g transform="translate(160, 150)">
        <circle cx="12" cy="12" r="12" fill="#0d9488" opacity="0.3" />
        <circle cx="12" cy="12" r="8" fill="#0d9488" />
        <path d="M8 12 L11 15 L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      {/* Small decorative elements */}
      <circle cx="170" cy="35" r="4" fill="#0d9488" opacity="0.3" />
      <circle cx="185" cy="75" r="3" fill="#0d9488" opacity="0.2" />
      <circle cx="175" cy="180" r="5" fill="#0d9488" opacity="0.2" />
    </svg>
  )
}

export function SignupIllustration({ className = "", size = 200, style }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Calendar/planner mockup */}
      <rect x="55" y="35" width="90" height="110" rx="10" fill="white" opacity="0.95" />
      <rect x="55" y="35" width="90" height="25" rx="10" fill="#0d9488" />
      <rect x="55" y="50" width="90" height="10" fill="#0d9488" />
      
      {/* Calendar header */}
      <rect x="65" y="42" width="35" height="8" rx="2" fill="white" opacity="0.7" />
      
      {/* Calendar grid */}
      <g fill="#e8f5f3">
        <rect x="62" y="68" width="18" height="18" rx="3" />
        <rect x="84" y="68" width="18" height="18" rx="3" />
        <rect x="106" y="68" width="18" height="18" rx="3" />
        <rect x="128" y="68" width="10" height="18" rx="3" />
        
        <rect x="62" y="90" width="18" height="18" rx="3" />
        <rect x="84" y="90" width="18" height="18" rx="3" fill="#0d9488" opacity="0.3" />
        <rect x="106" y="90" width="18" height="18" rx="3" />
        <rect x="128" y="90" width="10" height="18" rx="3" />
        
        <rect x="62" y="112" width="18" height="18" rx="3" />
        <rect x="84" y="112" width="18" height="18" rx="3" />
        <rect x="106" y="112" width="18" height="18" rx="3" fill="#0d9488" opacity="0.3" />
      </g>
      
      {/* Check marks on calendar */}
      <path d="M88 78 L91 81 L97 75" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
      <path d="M110 120 L113 123 L119 117" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
      
      {/* Character - person organizing */}
      <g transform="translate(0, 60)">
        {/* Body */}
        <ellipse cx="35" cy="85" rx="16" ry="20" fill="#0d9488" />
        {/* Legs */}
        <ellipse cx="28" cy="115" rx="6" ry="12" fill="#374151" />
        <ellipse cx="42" cy="115" rx="6" ry="12" fill="#374151" />
        {/* Head */}
        <circle cx="35" cy="52" r="14" fill="#fcd5ce" />
        {/* Hair - bun style */}
        <circle cx="35" cy="42" r="12" fill="#4a3728" />
        <circle cx="35" cy="35" r="6" fill="#4a3728" />
        {/* Face */}
        <circle cx="31" cy="52" r="2" fill="#2d3748" />
        <circle cx="39" cy="52" r="2" fill="#2d3748" />
        <path d="M32 58 Q35 61 38 58" stroke="#c9756b" strokeWidth="1.5" fill="none" />
        {/* Arms */}
        <ellipse cx="48" cy="78" rx="5" ry="10" fill="#0d9488" transform="rotate(-30 48 78)" />
        <ellipse cx="52" cy="70" rx="4" ry="3" fill="#fcd5ce" />
      </g>
      
      {/* Floating elements - productivity themed */}
      {/* Clock */}
      <g transform="translate(150, 40)">
        <circle cx="18" cy="18" r="16" fill="#0d9488" opacity="0.2" />
        <circle cx="18" cy="18" r="12" stroke="#0d9488" strokeWidth="2" fill="white" />
        <circle cx="18" cy="18" r="2" fill="#0d9488" />
        <path d="M18 10 V18" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 18 L24 22" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Lightbulb */}
      <g transform="translate(155, 95)">
        <path d="M15 5 C8 5 3 11 3 18 C3 23 6 27 10 29 L10 35 L20 35 L20 29 C24 27 27 23 27 18 C27 11 22 5 15 5" 
              fill="#fbbf24" opacity="0.3" />
        <path d="M15 8 C10 8 6 12 6 18 C6 22 8 25 11 27 L11 32 L19 32 L19 27 C22 25 24 22 24 18 C24 12 20 8 15 8" 
              stroke="#0d9488" strokeWidth="2" fill="none" />
        <path d="M11 32 L11 36 L19 36 L19 32" stroke="#0d9488" strokeWidth="2" fill="none" />
        <path d="M12 24 L18 24" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Star */}
      <g transform="translate(165, 155)">
        <path d="M10 0 L12.5 7.5 L20 7.5 L14 12.5 L16.5 20 L10 15 L3.5 20 L6 12.5 L0 7.5 L7.5 7.5 Z" 
              fill="#0d9488" opacity="0.5" />
      </g>
      
      {/* Small decorative dots */}
      <circle cx="175" cy="80" r="4" fill="#0d9488" opacity="0.2" />
      <circle cx="160" cy="145" r="3" fill="#0d9488" opacity="0.3" />
      <circle cx="180" cy="180" r="5" fill="#0d9488" opacity="0.2" />
    </svg>
  )
}

export function AuthCharacter({ className = "", size = 400, style }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="authSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd5ce" />
          <stop offset="100%" stopColor="#f8b4a8" />
        </linearGradient>
        <linearGradient id="authHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a3728" />
          <stop offset="100%" stopColor="#2d1f14" />
        </linearGradient>
        <linearGradient id="authShirt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>
      
      {/* Background decorations */}
      <circle cx="80" cy="100" r="30" fill="#6366f1" opacity="0.1" />
      <circle cx="320" cy="80" r="25" fill="#22c55e" opacity="0.1" />
      <circle cx="350" cy="280" r="20" fill="#f97316" opacity="0.1" />
      <circle cx="60" cy="320" r="25" fill="#8b5cf6" opacity="0.1" />
      
      {/* Floating icons */}
      <g className="animate-bounce" style={{ animationDuration: "3s" }}>
        <circle cx="100" cy="60" r="20" fill="#22c55e" opacity="0.2" />
        <path d="M92 60L98 66L108 54" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      <g className="animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }}>
        <circle cx="300" cy="100" r="18" fill="#f97316" opacity="0.2" />
        <path d="M300 92V100M300 108V108.01" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Character sitting on block */}
      {/* Block/Chair */}
      <rect x="130" y="300" width="140" height="80" rx="8" fill="#fbbf24" />
      <rect x="130" y="300" width="140" height="10" rx="4" fill="#f59e0b" />
      
      {/* Legs */}
      <ellipse cx="170" cy="360" rx="20" ry="35" fill="#374151" />
      <ellipse cx="230" cy="360" rx="20" ry="35" fill="#374151" />
      
      {/* Feet */}
      <ellipse cx="165" cy="385" rx="25" ry="12" fill="#1f2937" />
      <ellipse cx="235" cy="385" rx="25" ry="12" fill="#1f2937" />
      
      {/* Body */}
      <ellipse cx="200" cy="270" rx="55" ry="60" fill="url(#authShirt)" />
      
      {/* Arms */}
      <ellipse cx="130" cy="250" rx="18" ry="45" fill="url(#authShirt)" transform="rotate(-15 130 250)" />
      <ellipse cx="270" cy="250" rx="18" ry="45" fill="url(#authShirt)" transform="rotate(15 270 250)" />
      
      {/* Hands holding phone */}
      <ellipse cx="175" cy="240" rx="15" ry="12" fill="url(#authSkin)" />
      <ellipse cx="225" cy="240" rx="15" ry="12" fill="url(#authSkin)" />
      
      {/* Phone */}
      <rect x="160" y="200" width="80" height="120" rx="10" fill="url(#phoneGrad)" />
      <rect x="165" y="210" width="70" height="95" rx="5" fill="#3b82f6" />
      {/* Phone screen content */}
      <circle cx="200" cy="245" r="15" fill="white" opacity="0.3" />
      <path d="M192 245L198 251L210 239" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="175" y="270" width="50" height="6" rx="2" fill="white" opacity="0.4" />
      <rect x="180" y="282" width="40" height="6" rx="2" fill="white" opacity="0.3" />
      
      {/* Neck */}
      <rect x="185" y="175" width="30" height="25" fill="url(#authSkin)" />
      
      {/* Head */}
      <ellipse cx="200" cy="130" rx="55" ry="60" fill="url(#authSkin)" />
      
      {/* Hair */}
      <ellipse cx="200" cy="90" rx="58" ry="40" fill="url(#authHair)" />
      <ellipse cx="150" cy="110" rx="18" ry="30" fill="url(#authHair)" />
      <ellipse cx="250" cy="110" rx="18" ry="30" fill="url(#authHair)" />
      {/* Ponytail */}
      <ellipse cx="260" cy="95" rx="25" ry="45" fill="url(#authHair)" transform="rotate(30 260 95)" />
      
      {/* Face */}
      {/* Eyes looking at phone */}
      <ellipse cx="178" cy="130" rx="10" ry="12" fill="white" />
      <ellipse cx="222" cy="130" rx="10" ry="12" fill="white" />
      <circle cx="180" cy="134" r="6" fill="#1f2937" />
      <circle cx="224" cy="134" r="6" fill="#1f2937" />
      <circle cx="182" cy="132" r="2" fill="white" />
      <circle cx="226" cy="132" r="2" fill="white" />
      
      {/* Eyebrows */}
      <path d="M165 115C172 110 185 110 192 115" stroke="#4a3728" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M208 115C215 110 228 110 235 115" stroke="#4a3728" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Nose */}
      <path d="M200 140L194 152L200 152" stroke="#e5a89a" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Happy smile */}
      <path d="M182 165C190 175 210 175 218 165" stroke="#c9756b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      {/* Blush */}
      <ellipse cx="160" cy="150" rx="10" ry="6" fill="#fca5a5" opacity="0.5" />
      <ellipse cx="240" cy="150" rx="10" ry="6" fill="#fca5a5" opacity="0.5" />
      
      {/* Security elements floating */}
      <g className="animate-pulse">
        <circle cx="340" cy="200" r="25" fill="#6366f1" opacity="0.15" />
        <rect x="330" y="190" width="20" height="25" rx="3" fill="none" stroke="#6366f1" strokeWidth="2" />
        <circle cx="340" cy="200" r="3" fill="#6366f1" />
        <path d="M340 203V210" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Stars */}
      <path d="M70 200L73 208L81 208L75 213L77 221L70 216L63 221L65 213L59 208L67 208L70 200Z" fill="#fbbf24" opacity="0.7" className="animate-pulse" />
      <path d="M330 350L332 355L337 355L333 358L334 363L330 360L326 363L327 358L323 355L328 355L330 350Z" fill="#6366f1" opacity="0.5" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
    </svg>
  )
}

export function DataSecurityIllustration({ className = "", size = 300, style }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {/* Background decoration */}
      <circle cx="150" cy="150" r="120" fill="url(#shieldGrad)" opacity="0.1" />
      <circle cx="150" cy="150" r="90" fill="url(#shieldGrad)" opacity="0.1" />
      
      {/* Shield */}
      <path 
        d="M150 40C150 40 80 60 80 120C80 180 150 250 150 250C150 250 220 180 220 120C220 60 150 40 150 40Z" 
        fill="url(#shieldGrad)" 
        opacity="0.9"
      />
      <path 
        d="M150 55C150 55 95 72 95 120C95 168 150 230 150 230C150 230 205 168 205 120C205 72 150 55 150 55Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        opacity="0.3"
      />
      
      {/* Lock icon on shield */}
      <rect x="125" y="110" width="50" height="45" rx="5" fill="white" opacity="0.9" />
      <rect x="125" y="110" width="50" height="15" rx="5" fill="#e0e7ff" />
      <path 
        d="M135 110V95C135 86.716 141.716 80 150 80C158.284 80 165 86.716 165 95V110" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none"
      />
      <circle cx="150" cy="135" r="8" fill="url(#shieldGrad)" />
      <path d="M150 140V150" stroke="url(#shieldGrad)" strokeWidth="4" strokeLinecap="round" />
      
      {/* Key floating */}
      <g className="animate-bounce" style={{ animationDuration: "3s" }}>
        <ellipse cx="60" cy="200" rx="20" ry="20" fill="url(#keyGrad)" opacity="0.2" />
        <circle cx="55" cy="195" r="10" fill="none" stroke="url(#keyGrad)" strokeWidth="3" />
        <path d="M62 200L78 216" stroke="url(#keyGrad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M72 210L78 210" stroke="url(#keyGrad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M68 214L74 214" stroke="url(#keyGrad)" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Checkmark circles */}
      <g className="animate-pulse">
        <circle cx="240" cy="100" r="20" fill="#22c55e" opacity="0.2" />
        <path d="M232 100L238 106L250 94" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <circle cx="230" cy="220" r="15" fill="#22c55e" opacity="0.15" />
        <path d="M224 220L228 224L238 214" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      {/* Data dots */}
      <circle cx="80" cy="80" r="4" fill="#6366f1" opacity="0.5" />
      <circle cx="220" cy="70" r="3" fill="#8b5cf6" opacity="0.4" />
      <circle cx="260" cy="160" r="4" fill="#a855f7" opacity="0.5" />
      <circle cx="40" cy="140" r="3" fill="#6366f1" opacity="0.4" />
    </svg>
  )
}

export function WelcomeIllustration({ className = "", size = 300, style }: IllustrationProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="welcomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      {/* Decorative circles */}
      <circle cx="150" cy="150" r="100" fill="url(#welcomeGrad)" opacity="0.1" />
      <circle cx="80" cy="80" r="40" fill="#f97316" opacity="0.1" />
      <circle cx="220" cy="220" r="35" fill="#22c55e" opacity="0.1" />
      
      {/* Waving hand */}
      <g transform="translate(100, 80)" className="animate-bounce" style={{ animationDuration: "2s" }}>
        <ellipse cx="50" cy="60" rx="40" ry="50" fill="#fcd5ce" />
        {/* Fingers */}
        <ellipse cx="25" cy="25" rx="10" ry="25" fill="#fcd5ce" transform="rotate(-10 25 25)" />
        <ellipse cx="45" cy="15" rx="10" ry="30" fill="#fcd5ce" />
        <ellipse cx="65" cy="18" rx="10" ry="28" fill="#fcd5ce" transform="rotate(5 65 18)" />
        <ellipse cx="82" cy="28" rx="9" ry="25" fill="#fcd5ce" transform="rotate(15 82 28)" />
        <ellipse cx="95" cy="50" rx="8" ry="20" fill="#fcd5ce" transform="rotate(30 95 50)" />
        {/* Palm detail */}
        <path d="M35 70C45 75 55 75 65 70" stroke="#f8b4a8" strokeWidth="2" fill="none" opacity="0.5" />
      </g>
      
      {/* Sparkles */}
      <g className="animate-pulse">
        <path d="M60 150L65 160L75 160L67 167L70 177L60 170L50 177L53 167L45 160L55 160L60 150Z" fill="#fbbf24" />
      </g>
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <path d="M240 100L243 107L250 107L245 111L247 118L240 114L233 118L235 111L230 107L237 107L240 100Z" fill="#6366f1" opacity="0.7" />
      </g>
      <g className="animate-pulse" style={{ animationDelay: "0.6s" }}>
        <path d="M200 230L202 235L207 235L203 238L205 243L200 240L195 243L197 238L193 235L198 235L200 230Z" fill="#22c55e" opacity="0.6" />
      </g>
      
      {/* Hearts */}
      <path d="M250 150C250 145 255 140 260 140C265 140 270 145 270 150C270 160 260 170 260 170C260 170 250 160 250 150Z" fill="#ec4899" opacity="0.6" className="animate-pulse" />
      <path d="M40 200C40 197 43 194 46 194C49 194 52 197 52 200C52 206 46 212 46 212C46 212 40 206 40 200Z" fill="#f97316" opacity="0.5" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
    </svg>
  )
}

export default {
  AuthCharacter,
  DataSecurityIllustration,
  WelcomeIllustration,
  TaskManagementIllustration,
  SignupIllustration
}
