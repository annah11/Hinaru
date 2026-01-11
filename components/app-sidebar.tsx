"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  Calendar,
  Settings,
  Brain,
  Target,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Moon,
  Sun,
  LogIn,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Logo, LogoMini } from "@/components/icons/logo"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Learning", href: "/learning", icon: BookOpen },
  { name: "Plan Review", href: "/plan-review", icon: Calendar },
  { name: "AI Insights", href: "/insights", icon: Brain },
  { name: "Goals", href: "/goals", icon: Target },
]

const bottomNav = [
  { name: "Settings", href: "/settings", icon: Settings },
]

interface AppSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AppSidebar({ isOpen = false, onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (onClose) {
      onClose()
    }
  }, [pathname])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleNavClick = () => {
    // Close mobile sidebar on navigation
    if (onClose && window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          flex flex-col
          bg-gradient-to-b from-card via-card to-card/95
          border-r border-border/40
          shadow-xl shadow-black/5
          transition-all duration-300 ease-out
          ${collapsed ? "lg:w-20" : "lg:w-72"}
          w-72
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-5 border-b border-border/30">
          <Link 
            href="/" 
            className={`flex items-center gap-3 ${collapsed ? "lg:justify-center lg:w-full" : ""}`}
            onClick={handleNavClick}
          >
            <div className="relative">
              {collapsed ? (
                <>
                  <Logo size={44} className="lg:hidden" />
                  <LogoMini size={40} className="hidden lg:block" />
                </>
              ) : (
                <Logo size={44} />
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-card animate-pulse" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Hina
                </h1>
                <p className="text-xs text-muted-foreground">Plan • Learn • Grow</p>
              </div>
            )}
          </Link>
          
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className={`p-4 ${collapsed ? "lg:px-2" : ""}`}>
          <div
            className={`
              flex items-center gap-3 p-3 rounded-xl
              bg-gradient-to-r from-primary/10 to-purple-500/10
              border border-primary/20
              ${collapsed ? "lg:justify-center" : ""}
            `}
          >
            <Avatar className="h-10 w-10 ring-2 ring-primary/30 ring-offset-2 ring-offset-card">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className={`flex-1 min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="font-semibold text-sm truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">12 day streak 🔥</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className={`text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 ${collapsed ? "lg:text-center" : "px-3"}`}>
            <span className={collapsed ? "lg:hidden" : ""}>Menu</span>
            <span className={`hidden ${collapsed ? "lg:inline" : ""}`}>•</span>
          </div>
          
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            const linkContent = (
              <Link
                href={item.href}
                onClick={handleNavClick}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 group
                  ${collapsed ? "lg:justify-center" : ""}
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "" : "group-hover:scale-110"} transition-transform`} />
                <span className={`font-medium text-sm ${collapsed ? "lg:hidden" : ""}`}>{item.name}</span>
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium hidden lg:block">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return <div key={item.name}>{linkContent}</div>
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-border/30 space-y-2">
          {/* Quick Actions */}
          <div className={`flex ${collapsed ? "lg:flex-col" : ""} gap-2 mb-3`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg hover:bg-muted"
                >
                  <Bell className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={collapsed ? "right" : "top"}>Notifications</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-9 w-9 rounded-lg hover:bg-muted"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={collapsed ? "right" : "top"}>Toggle Theme</TooltipContent>
            </Tooltip>
          </div>

          {/* Settings Link */}
          {bottomNav.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl
                      transition-all duration-200
                      ${collapsed ? "lg:justify-center" : ""}
                      ${isActive 
                        ? "bg-muted text-foreground" 
                        : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`font-medium text-sm ${collapsed ? "lg:hidden" : ""}`}>{item.name}</span>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="font-medium hidden lg:block">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}

          {/* Collapse Toggle - Desktop Only */}
          <Button
            variant="ghost"
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full h-9 rounded-lg hover:bg-muted justify-center hidden lg:flex ${collapsed ? "" : "lg:justify-start"}`}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
