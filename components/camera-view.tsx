"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Zap, ImageIcon } from "lucide-react"
import { Paywall } from "@/components/paywall"
import { AnalysisResult } from "@/components/analysis-result"

export function CameraView() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [remainingCredits, setRemainingCredits] = useState(3)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedCredits = localStorage.getItem("remainingCredits")
    if (storedCredits) {
      setRemainingCredits(Number.parseInt(storedCredits))
    }
  }, [])

  useEffect(() => {
    if (cameraActive) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [cameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight)

        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg")
        setCapturedImage(imageDataUrl)
        setCameraActive(false)
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    if (remainingCredits <= 0) {
      setShowPaywall(true)
      return
    }

    setIsAnalyzing(true)

    // Simulate API call to OpenAI Vision
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)

      // Decrease remaining credits
      const newCredits = remainingCredits - 1
      setRemainingCredits(newCredits)
      localStorage.setItem("remainingCredits", newCredits.toString())

      // Save to timeline
      const timeline = JSON.parse(localStorage.getItem("timeline") || "[]")
      timeline.push({
        id: Date.now(),
        image: capturedImage,
        date: new Date().toISOString(),
        headline: "Creative and Imaginative",
        insights: [
          "Shows strong spatial awareness",
          "Expresses emotions through color choices",
          "Demonstrates attention to detail",
        ],
      })
      localStorage.setItem("timeline", JSON.stringify(timeline))
    }, 3000)
  }

  const resetCamera = () => {
    setCapturedImage(null)
    setShowResults(false)
    setCameraActive(true)
  }

  if (showResults) {
    return <AnalysisResult image={capturedImage || ""} onBack={() => setShowResults(false)} />
  }

  if (showPaywall) {
    return <Paywall onClose={() => setShowPaywall(false)} />
  }

  return (
    <div className="flex flex-col items-center p-4 pb-20">
      {capturedImage ? (
        <div className="w-full">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-4">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured drawing"
              className="w-full h-full object-contain bg-white"
            />
          </div>
          <div className="flex space-x-2 justify-center">
            <Button variant="outline" onClick={resetCamera} className="flex-1">
              Retake
            </Button>
            <Button
              onClick={analyzeImage}
              className="flex-1 bg-[#FFB88E] hover:bg-[#FFB88E]/90 text-white"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Card className="w-full h-[400px] flex items-center justify-center mb-4 relative">
            {cameraActive ? (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 border-2 border-[#FFB88E] rounded-lg pointer-events-none"></div>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FFB88E]/20 flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-[#FFB88E]" />
                </div>
                <h3 className="text-lg font-medium text-[#4A4A4A]">Capture a Drawing</h3>
                <p className="text-sm text-[#4A4A4A]/70 mt-2">
                  Take a photo of your child's drawing to get psychological insights
                </p>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Upload
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
            </Button>

            {cameraActive ? (
              <Button onClick={captureImage} className="flex-1 bg-[#FFB88E] hover:bg-[#FFB88E]/90 text-white">
                <Camera className="mr-2 h-4 w-4" />
                Capture
              </Button>
            ) : (
              <Button
                onClick={() => setCameraActive(true)}
                className="flex-1 bg-[#FFB88E] hover:bg-[#FFB88E]/90 text-white"
              >
                <Camera className="mr-2 h-4 w-4" />
                Camera
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
