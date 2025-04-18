"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Smile, Shield, Zap } from "lucide-react"

const carouselItems = [
  {
    title: "Instant Insights",
    description: "Take a photo of your child's drawing and get psychological insights in seconds.",
    icon: <Zap className="h-12 w-12 text-[#FFB88E]" />,
  },
  {
    title: "Kid-Friendly",
    description: "Designed with children in mind - safe, simple, and engaging.",
    icon: <Smile className="h-12 w-12 text-[#FFB88E]" />,
  },
  {
    title: "Privacy First",
    description: "Your child's data is encrypted and never shared without your permission.",
    icon: <Shield className="h-12 w-12 text-[#FFB88E]" />,
  },
]

export function OnboardingCarousel() {
  const [open, setOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding
    const onboardingSeen = localStorage.getItem("onboardingSeen")
    if (!onboardingSeen) {
      setOpen(true)
    } else {
      setHasSeenOnboarding(true)
    }
  }, [])

  const handleNext = () => {
    if (currentSlide < carouselItems.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      completeOnboarding()
    }
  }

  const completeOnboarding = () => {
    localStorage.setItem("onboardingSeen", "true")
    setHasSeenOnboarding(true)
    setOpen(false)

    // Initialize remaining credits if not already set
    if (!localStorage.getItem("remainingCredits")) {
      localStorage.setItem("remainingCredits", "3")
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg p-0 border-none">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            {carouselItems.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === currentSlide ? "bg-[#FFB88E]" : "bg-gray-200"}`}
              />
            ))}
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="p-0 flex flex-col items-center text-center">
              {carouselItems[currentSlide].icon}
              <h2 className="text-2xl font-bold mt-4 text-[#4A4A4A]">{carouselItems[currentSlide].title}</h2>
              <p className="text-[#4A4A4A] mt-2">{carouselItems[currentSlide].description}</p>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={handleSkip} className="text-[#4A4A4A]">
              Skip
            </Button>
            <Button onClick={handleNext} className="bg-[#FFB88E] hover:bg-[#FFB88E]/90 text-white">
              {currentSlide < carouselItems.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
