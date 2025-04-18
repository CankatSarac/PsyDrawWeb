"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, Save } from "lucide-react"

interface AnalysisResultProps {
  image: string
  onBack: () => void
}

export function AnalysisResult({ image, onBack }: AnalysisResultProps) {
  const insights = [
    "Shows strong spatial awareness and organization skills",
    "Color choices indicate a positive emotional state",
    "Details suggest attention and focus capabilities",
  ]

  return (
    <div className="flex flex-col p-4 pb-20">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 text-[#4A4A4A]">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
        <img
          src={image || "/placeholder.svg"}
          alt="Analyzed drawing"
          className="w-full h-full object-contain bg-white"
        />
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#FFB88E]/20 flex items-center justify-center mr-3">
              <span className="text-xl">😊</span>
            </div>
            <h2 className="text-xl font-bold text-[#4A4A4A]">Creative and Imaginative</h2>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-sm font-medium text-[#4A4A4A] mb-2">Key Insights:</h3>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#FFB88E] mr-2">•</span>
                <span className="text-[#4A4A4A]">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Save className="mr-1 h-3 w-3" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Share2 className="mr-1 h-3 w-3" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="mr-1 h-3 w-3" />
              Export
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="text-xs text-[#4A4A4A]/70 mt-2 p-3 bg-gray-100 rounded-lg">
        <p className="font-medium mb-1">⚠️ Disclaimer</p>
        <p>
          This analysis is not a clinical diagnosis. If you have concerns about your child's development, please consult
          a qualified healthcare professional.
        </p>
        <Button variant="link" className="text-xs p-0 h-auto mt-1 text-[#FFB88E]">
          Find help
        </Button>
      </div>
    </div>
  )
}
