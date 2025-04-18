"use client"

import { useEffect, useState } from "react"

export function TrialCounter() {
  const [remainingCredits, setRemainingCredits] = useState(3)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedCredits = localStorage.getItem("remainingCredits")
    if (storedCredits) {
      setRemainingCredits(Number.parseInt(storedCredits))
    } else {
      localStorage.setItem("remainingCredits", "3")
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null
  }

  const progressPercentage = (remainingCredits / 3) * 100

  return (
    <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="#FFB88E"
            strokeWidth="4"
            strokeDasharray="87.96"
            strokeDashoffset={87.96 - (progressPercentage / 100) * 87.96}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {remainingCredits}
        </span>
      </div>
      <span className="text-sm text-[#4A4A4A]">Free analyses left</span>
    </div>
  )
}
