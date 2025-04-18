"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Check } from "lucide-react"

interface PaywallProps {
  onClose: () => void
}

export function Paywall({ onClose }: PaywallProps) {
  const [selectedTab, setSelectedTab] = useState("subscription")

  const handlePurchase = () => {
    // In a real app, this would handle the payment processing
    // For demo purposes, we'll just add credits
    if (selectedTab === "subscription") {
      localStorage.setItem("remainingCredits", "999") // Unlimited for subscribers
    } else {
      const currentCredits = Number.parseInt(localStorage.getItem("remainingCredits") || "0")
      const newCredits = currentCredits + (selectedTab === "tokens5" ? 5 : selectedTab === "tokens20" ? 20 : 50)
      localStorage.setItem("remainingCredits", newCredits.toString())
    }
    onClose()
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#4A4A4A]">Unlock More Analyses</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="subscription" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="tokens">Token Packs</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium text-center">Monthly Plus</h3>
              <div className="text-center">
                <span className="text-3xl font-bold">$4.99</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <p className="text-sm text-center text-[#FFB88E]">First week free</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Unlimited drawing analyses",
                  "Save and export all results",
                  "Priority processing",
                  "Cancel anytime",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-[#FFB88E] mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePurchase} className="w-full bg-[#FFB88E] hover:bg-[#FFB88E]/90 text-white">
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "tokens5", count: 5, price: "$2.99" },
              { id: "tokens20", count: 20, price: "$9.99", popular: true },
              { id: "tokens50", count: 50, price: "$19.99" },
            ].map((pack) => (
              <Card key={pack.id} className={`relative ${selectedTab === pack.id ? "border-[#FFB88E]" : ""}`}>
                {pack.popular && (
                  <div className="absolute -top-2 -right-2 bg-[#FFB88E] text-white text-xs px-2 py-0.5 rounded-full">
                    Best Value
                  </div>
                )}
                <CardContent className="p-3 text-center">
                  <p className="font-bold text-lg">{pack.count}</p>
                  <p className="text-xs text-gray-500">analyses</p>
                  <p className="font-medium mt-2">{pack.price}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full text-xs"
                    onClick={() => setSelectedTab(pack.id)}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button onClick={handlePurchase} className="w-full mt-4 bg-[#FFB88E] hover:bg-[#FFB88E]/90 text-white">
            Purchase Tokens
          </Button>
        </TabsContent>
      </Tabs>

      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Payments will be charged to your App Store or Google Play account.</p>
        <div className="flex justify-center space-x-3 mt-2">
          <Button variant="link" className="text-xs p-0 h-auto">
            Terms of Service
          </Button>
          <Button variant="link" className="text-xs p-0 h-auto">
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  )
}
