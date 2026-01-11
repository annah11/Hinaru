"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TaskManagementIllustration, SignupIllustration } from "@/components/decorative/auth-illustrations"
import { 
  Mail, 
  User,
  Lock, 
  Eye, 
  EyeOff,
  Check,
  X
} from "lucide-react"

interface AuthPageProps {
  initialMode?: "login" | "signup"
}

export function AuthPage({ initialMode = "login" }: AuthPageProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  // Signup state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isSignupLoading, setIsSignupLoading] = useState(false)

  // Password validation
  const passwordChecks = {
    length: signupPassword.length >= 8,
    number: /\d/.test(signupPassword),
    lowercase: /[a-z]/.test(signupPassword),
    uppercase: /[A-Z]/.test(signupPassword)
  }
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length

  const handleModeSwitch = (newMode: "login" | "signup") => {
    if (mode === newMode || isAnimating) return
    setIsAnimating(true)
    
    // Update URL without full navigation
    const newUrl = newMode === "login" ? "/auth/login" : "/auth/signup"
    window.history.pushState({}, "", newUrl)
    
    setTimeout(() => {
      setMode(newMode)
      setTimeout(() => {
        setIsAnimating(false)
      }, 50)
    }, 300)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoginLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoginLoading(false)
    router.push("/")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSignupLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSignupLoading(false)
    router.push("/")
  }

  const isLogin = mode === "login"

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* ===== MOBILE LAYOUT ===== */}
      <div className="flex flex-col w-full lg:hidden min-h-screen">
        {/* Top Teal Header Section */}
        <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 px-6 pt-10 pb-24 flex-shrink-0">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-teal-300/20 rounded-full blur-xl" />
          </div>
          
          {/* Header Content */}
          <div className="relative z-10 pr-28">
            <h1 className="text-xl font-bold text-white leading-tight">
              {isLogin ? (
                <>Log in to stay on <span className="text-teal-200">top of</span> your tasks and projects.</>
              ) : (
                <>Create Your Account and <span className="text-teal-200">Simplify Your Workday</span></>
              )}
            </h1>
          </div>
          
          {/* Illustration - positioned higher */}
          <div className="absolute -bottom-4 right-2 z-10">
            {isLogin ? (
              <TaskManagementIllustration size={130} />
            ) : (
              <SignupIllustration size={130} />
            )}
          </div>
        </div>

        {/* White Card Form Section */}
        <div className="relative flex-1 bg-white dark:bg-slate-900 -mt-8 rounded-t-[2rem] px-6 pt-6 pb-6 shadow-xl overflow-y-auto">
          {/* Form Header */}
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-foreground">{isLogin ? "Login" : "Sign up"}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isLogin ? "Don't Have An Account?" : "Already Have An Account?"}{" "}
              <button 
                onClick={() => handleModeSwitch(isLogin ? "signup" : "login")}
                className="text-teal-600 font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Forms Container with Animation */}
          <div className="relative overflow-hidden">
            {/* Login Form */}
            <div className={`transition-all duration-500 ease-in-out ${
              isLogin 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-full absolute inset-0"
            }`}>
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your name or email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-12 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="remember-mobile" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                    />
                    <Label htmlFor="remember-mobile" className="text-sm text-muted-foreground cursor-pointer">
                      Remember Me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-teal-600 font-medium hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base shadow-lg shadow-teal-600/25"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : "Login"}
                </Button>
              </form>
            </div>

            {/* Signup Form */}
            <div className={`transition-all duration-500 ease-in-out ${
              !isLogin 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-full absolute inset-0"
            }`}>
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="h-12 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="h-12 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="remember-signup-mobile" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                    />
                    <Label htmlFor="remember-signup-mobile" className="text-sm text-muted-foreground cursor-pointer">
                      Remember Me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-teal-600 font-medium hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base shadow-lg shadow-teal-600/25"
                  disabled={isSignupLoading || passwordStrength < 2}
                >
                  {isSignupLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </div>
                  ) : "Sign Up"}
                </Button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-sm text-muted-foreground">Or Continue With</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 h-12 rounded-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 transition-all duration-200 flex items-center justify-center gap-2 text-white font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              Apple
            </button>
            <button className="flex-1 h-12 rounded-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 transition-all duration-200 flex items-center justify-center gap-2 text-white font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:flex w-full min-h-screen relative overflow-hidden">
        {/* Sliding Panel Container */}
        <div className="absolute inset-0 flex">
          {/* Left Panel - Form Container */}
          <div className={`w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="w-full max-w-md px-8">
              {/* Login Form */}
              <div className={`transition-all duration-500 ${
                isLogin ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
              }`}>
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-2">Sign In</h1>
                  <p className="text-muted-foreground">Welcome back! Please enter your details.</p>
                </div>

                {/* Social Login Icons */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md">
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-sm text-muted-foreground">Or use your account</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="h-14 pl-12 pr-4 bg-muted/50 border-0 rounded-xl text-base focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="h-14 pl-12 pr-12 bg-muted/50 border-0 rounded-xl text-base focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
                      Forget your password?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-medium text-base shadow-lg shadow-teal-700/25"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : "Sign In"}
                  </Button>
                </form>
              </div>

              {/* Signup Form */}
              <div className={`transition-all duration-500 ${
                !isLogin ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
              }`}>
                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold text-foreground mb-2">Create Account</h1>
                  <p className="text-muted-foreground">Join Hina and start your productivity journey</p>
                </div>

                {/* Social Login Icons */}
                <div className="flex items-center justify-center gap-4 mb-5">
                  <button className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md">
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-all duration-200 flex items-center justify-center hover:scale-105 hover:shadow-md">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-sm text-muted-foreground">Or register with email</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="h-12 pl-12 pr-4 bg-muted/50 border-0 rounded-xl text-base focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    {signupName.length > 2 && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="h-12 pl-12 pr-4 bg-muted/50 border-0 rounded-xl text-base focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    {signupEmail.includes("@") && signupEmail.includes(".") && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="h-12 pl-12 pr-12 bg-muted/50 border-0 rounded-xl text-base focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {signupPassword && (
                    <div className="space-y-2 p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              passwordStrength === 4 ? "bg-green-500" :
                              passwordStrength >= 2 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground min-w-[50px]">
                          {passwordStrength === 4 ? "Strong" : passwordStrength >= 2 ? "Medium" : "Weak"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <div className={`flex items-center gap-1 ${passwordChecks.length ? "text-green-500" : "text-muted-foreground"}`}>
                          {passwordChecks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          8+ characters
                        </div>
                        <div className={`flex items-center gap-1 ${passwordChecks.number ? "text-green-500" : "text-muted-foreground"}`}>
                          {passwordChecks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          One number
                        </div>
                        <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? "text-green-500" : "text-muted-foreground"}`}>
                          {passwordChecks.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          Lowercase
                        </div>
                        <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? "text-green-500" : "text-muted-foreground"}`}>
                          {passwordChecks.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          Uppercase
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 pt-1">
                    <Checkbox 
                      id="terms-desktop" 
                      checked={agreeTerms} 
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms-desktop" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                      I agree to the <Link href="/terms" className="text-teal-600 hover:underline">Terms</Link> and{" "}
                      <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-medium text-base shadow-lg shadow-teal-700/25"
                    disabled={isSignupLoading || !agreeTerms || passwordStrength < 2}
                  >
                    {isSignupLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </div>
                    ) : "Create Account"}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Panel - Decorative Slider */}
          <div className={`absolute top-0 bottom-0 w-1/2 transition-all duration-700 ease-in-out ${
            isLogin ? "right-0" : "left-0"
          }`}>
            <div className="relative w-full h-full bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 overflow-hidden">
              {/* Decorative blurred shapes */}
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute w-96 h-96 bg-red-500/30 rounded-full blur-[100px] transition-all duration-1000 ${
                  isLogin ? "top-1/4 right-1/4" : "top-1/3 left-1/4"
                }`} />
                <div className={`absolute w-80 h-80 bg-orange-500/25 rounded-full blur-[80px] transition-all duration-1000 ${
                  isLogin ? "bottom-1/4 left-1/4" : "bottom-1/3 right-1/4"
                }`} />
                <div className={`absolute w-64 h-64 bg-pink-500/20 rounded-full blur-[60px] transition-all duration-1000 ${
                  isLogin ? "top-1/2 right-1/3" : "top-1/2 left-1/3"
                }`} />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12 text-white">
                {/* Login Side Message */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-12 transition-all duration-500 ${
                  isLogin ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}>
                  <div className="mb-8">
                    <TaskManagementIllustration size={200} className="opacity-90" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4 text-center">Hey There!</h2>
                  <p className="text-lg text-white/80 mb-8 text-center max-w-sm leading-relaxed">
                    Start your productivity journey and step into an amazing new experience with Hina.
                  </p>
                  <button 
                    onClick={() => handleModeSwitch("signup")}
                    className="px-10 py-3.5 rounded-full border-2 border-white/50 text-white font-medium hover:bg-white/10 transition-all duration-300 hover:border-white hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Signup Side Message */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-12 transition-all duration-500 ${
                  !isLogin ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}>
                  <div className="mb-8">
                    <SignupIllustration size={200} className="opacity-90" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4 text-center">Welcome Back!</h2>
                  <p className="text-lg text-white/80 mb-8 text-center max-w-sm leading-relaxed">
                    Already have an account? Sign in to continue your productivity journey with Hina.
                  </p>
                  <button 
                    onClick={() => handleModeSwitch("login")}
                    className="px-10 py-3.5 rounded-full border-2 border-white/50 text-white font-medium hover:bg-white/10 transition-all duration-300 hover:border-white hover:scale-105"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background for form side */}
          <div className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-700 ease-in-out -z-10 ${
            isLogin ? "left-0" : "right-0"
          }`} />
        </div>
      </div>
    </div>
  )
}
