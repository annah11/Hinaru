"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Calendar,
  Brain,
  Download,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Check,
  ChevronRight,
  Link,
  Unlink,
  ExternalLink
} from "lucide-react"
import AppSidebar from "@/components/app-sidebar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    dailySummary: true,
    weeklyReport: true,
    aiSuggestions: true,
    streakAlerts: true
  })
  const [privacy, setPrivacy] = useState({
    shareAnalytics: false,
    calendarSync: true,
    dataRetention: "1year"
  })
  const [aiSettings, setAiSettings] = useState({
    intensity: "balanced",
    autoSuggest: true,
    learningMode: true,
    completionInference: true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <AppSidebar />
      
      <main className="ml-72 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Settings className="w-8 h-8 text-muted-foreground" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-2">
                  <nav className="space-y-1">
                    {[
                      { id: "profile", label: "Profile", icon: User },
                      { id: "notifications", label: "Notifications", icon: Bell },
                      { id: "appearance", label: "Appearance", icon: Palette },
                      { id: "integrations", label: "Integrations", icon: Calendar },
                      { id: "ai", label: "AI Settings", icon: Brain },
                      { id: "privacy", label: "Privacy & Data", icon: Shield }
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                            activeTab === item.id
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {activeTab === "profile" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                        JD
                      </div>
                      <div>
                        <Button variant="outline" className="mb-2">Change Photo</Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc-5">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                            <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                            <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="utc+0">UTC</SelectItem>
                            <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what notifications you receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { key: "taskReminders", title: "Task Reminders", description: "Get notified before scheduled tasks" },
                      { key: "dailySummary", title: "Daily Summary", description: "Receive a summary of your day each evening" },
                      { key: "weeklyReport", title: "Weekly Report", description: "Get a comprehensive weekly analytics report" },
                      { key: "aiSuggestions", title: "AI Suggestions", description: "Receive AI-powered optimization tips" },
                      { key: "streakAlerts", title: "Streak Alerts", description: "Get reminded to maintain your streaks" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) => 
                            setNotifications({ ...notifications, [item.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "appearance" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: "light", label: "Light", icon: Sun },
                          { value: "dark", label: "Dark", icon: Moon },
                          { value: "system", label: "System", icon: Monitor }
                        ].map((item) => {
                          const Icon = item.icon
                          return (
                            <button
                              key={item.value}
                              onClick={() => setTheme(item.value)}
                              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                                theme === item.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <Icon className={`w-8 h-8 ${theme === item.value ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="font-medium">{item.label}</span>
                              {theme === item.value && (
                                <Check className="w-5 h-5 text-primary" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label className="text-base font-medium mb-4 block">Accent Color</Label>
                      <div className="flex gap-3">
                        {[
                          { color: "#6366f1", name: "Indigo" },
                          { color: "#8b5cf6", name: "Purple" },
                          { color: "#ec4899", name: "Pink" },
                          { color: "#ef4444", name: "Red" },
                          { color: "#f97316", name: "Orange" },
                          { color: "#22c55e", name: "Green" },
                          { color: "#06b6d4", name: "Cyan" }
                        ].map((item) => (
                          <button
                            key={item.color}
                            className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-background ring-transparent hover:ring-foreground/20 transition-all"
                            style={{ backgroundColor: item.color }}
                            title={item.name}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "integrations" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>Connect your accounts and services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { 
                        name: "Google Calendar", 
                        description: "Sync tasks and events with Google Calendar",
                        connected: true,
                        icon: "📅"
                      },
                      { 
                        name: "Google Account", 
                        description: "Sign in and authentication",
                        connected: true,
                        icon: "🔐"
                      },
                      { 
                        name: "Notion", 
                        description: "Sync notes and documents",
                        connected: false,
                        icon: "📝"
                      },
                      { 
                        name: "Slack", 
                        description: "Receive notifications in Slack",
                        connected: false,
                        icon: "💬"
                      }
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 rounded-xl border">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{integration.icon}</span>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                        {integration.connected ? (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500/10 text-green-600 border-0">Connected</Badge>
                            <Button variant="outline" size="sm">
                              <Unlink className="w-4 h-4 mr-1" />
                              Disconnect
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Link className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "ai" && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>AI Settings</CardTitle>
                    <CardDescription>Configure how AI assists you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">Suggestion Intensity</Label>
                      <Select 
                        value={aiSettings.intensity} 
                        onValueChange={(value) => setAiSettings({ ...aiSettings, intensity: value })}
                      >
                        <SelectTrigger className="w-full max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gentle">Gentle - Minimal suggestions</SelectItem>
                          <SelectItem value="balanced">Balanced - Moderate suggestions</SelectItem>
                          <SelectItem value="proactive">Proactive - Active assistance</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-2">
                        Controls how often AI provides suggestions and interventions.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    {[
                      { key: "autoSuggest", title: "Auto-Suggest Optimizations", description: "Automatically suggest schedule improvements" },
                      { key: "learningMode", title: "Learning Mode", description: "AI learns from your behavior to improve suggestions" },
                      { key: "completionInference", title: "Completion Inference", description: "Infer task completion from patterns and signals" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={aiSettings[item.key as keyof typeof aiSettings] as boolean}
                          onCheckedChange={(checked) => 
                            setAiSettings({ ...aiSettings, [item.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Privacy & Data</CardTitle>
                      <CardDescription>Manage your data and privacy settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                        <div>
                          <p className="font-medium">Share Anonymous Analytics</p>
                          <p className="text-sm text-muted-foreground">Help improve the app by sharing usage data</p>
                        </div>
                        <Switch
                          checked={privacy.shareAnalytics}
                          onCheckedChange={(checked) => 
                            setPrivacy({ ...privacy, shareAnalytics: checked })
                          }
                        />
                      </div>
                      
                      <div>
                        <Label className="text-base font-medium mb-4 block">Data Retention</Label>
                        <Select 
                          value={privacy.dataRetention} 
                          onValueChange={(value) => setPrivacy({ ...privacy, dataRetention: value })}
                        >
                          <SelectTrigger className="w-full max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3months">3 months</SelectItem>
                            <SelectItem value="6months">6 months</SelectItem>
                            <SelectItem value="1year">1 year</SelectItem>
                            <SelectItem value="forever">Forever</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground mt-2">
                          How long to keep your analytics history.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-red-500">Danger Zone</CardTitle>
                      <CardDescription>Irreversible actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20">
                        <div>
                          <p className="font-medium">Export All Data</p>
                          <p className="text-sm text-muted-foreground">Download all your data as JSON</p>
                        </div>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20">
                        <div>
                          <p className="font-medium text-red-500">Delete Account</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
