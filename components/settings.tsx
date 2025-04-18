"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, CreditCard, HelpCircle, ExternalLink, Trash2 } from "lucide-react"

export function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)

  const clearData = () => {
    if (confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
      localStorage.removeItem("timeline")
      localStorage.setItem("remainingCredits", "3")
      alert("All data has been cleared.")
    }
  }

  return (
    <div className="p-4 pb-20">
      <h2 className="text-xl font-bold text-[#4A4A4A] mb-4">Settings</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Account</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Subscription
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Daily drawing prompts</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Privacy</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Share data to improve AI</span>
              </div>
              <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
            </div>
            <p className="text-xs text-[#4A4A4A]/70">
              Your privacy is our priority. We never share your child's drawings without your explicit permission.
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Help & Support</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ & Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Privacy Policy
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Data</h3>
          <Button variant="destructive" className="w-full" onClick={clearData}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All Data
          </Button>
          <p className="text-xs text-[#4A4A4A]/70 mt-2">
            This will delete all your saved analyses and reset your account.
          </p>
        </div>

        <div className="text-center text-xs text-[#4A4A4A]/50 mt-8">
          <p>DrawingInsight v1.0.0</p>
          <p>© 2025 DrawingInsight</p>
        </div>
      </div>
    </div>
  )
}
