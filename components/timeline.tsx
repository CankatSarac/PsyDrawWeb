"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { ChevronRight } from "lucide-react"
import { AnalysisResult } from "@/components/analysis-result"

interface TimelineItem {
  id: number
  image: string
  date: string
  headline: string
  insights: string[]
}

export function Timeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([])
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)

  useEffect(() => {
    const storedTimeline = localStorage.getItem("timeline")
    if (storedTimeline) {
      setTimeline(JSON.parse(storedTimeline))
    }
  }, [])

  if (selectedItem) {
    return <AnalysisResult image={selectedItem.image} onBack={() => setSelectedItem(null)} />
  }

  if (timeline.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 pb-20 h-[70vh]">
        <div className="w-16 h-16 rounded-full bg-[#FFB88E]/20 flex items-center justify-center mb-4">
          <span className="text-2xl">🖼️</span>
        </div>
        <h3 className="text-lg font-medium text-center text-[#4A4A4A]">No Analyses Yet</h3>
        <p className="text-sm text-center text-[#4A4A4A]/70 mt-2 max-w-xs">
          Capture your first drawing to see psychological insights appear here
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      <h2 className="text-lg font-medium text-[#4A4A4A] mb-2">Your Analysis History</h2>

      {timeline.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex">
            <div className="w-24 h-24 bg-white flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt="Drawing" className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-3 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#4A4A4A]">{item.headline}</h3>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedItem(item)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-[#4A4A4A]/70 mt-1 line-clamp-2">{item.insights[0]}</p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}
