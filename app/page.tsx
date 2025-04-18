import { OnboardingCarousel } from "@/components/onboarding-carousel"
import { TrialCounter } from "@/components/trial-counter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraView } from "@/components/camera-view"
import { Timeline } from "@/components/timeline"
import { Settings } from "@/components/settings"
import { Clock } from "lucide-react"
import { CameraIcon, SettingsIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#FCEBD1]">
      <div className="w-full max-w-md mx-auto">
        <OnboardingCarousel />
        <div className="p-4 flex justify-center">
          <TrialCounter />
        </div>
        <Tabs defaultValue="capture" className="w-full">
          <TabsContent value="timeline" className="mt-0">
            <Timeline />
          </TabsContent>
          <TabsContent value="capture" className="mt-0">
            <CameraView />
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            <Settings />
          </TabsContent>
          <TabsList className="fixed bottom-0 left-0 right-0 h-16 grid grid-cols-3 bg-white border-t">
            <TabsTrigger value="timeline" className="data-[state=active]:bg-[#FFB88E]/20">
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6" />
                <span className="text-xs mt-1">Timeline</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="capture" className="data-[state=active]:bg-[#FFB88E]/20">
              <div className="flex flex-col items-center">
                <CameraIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Capture</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#FFB88E]/20">
              <div className="flex flex-col items-center">
                <SettingsIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Settings</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </main>
  )
}
