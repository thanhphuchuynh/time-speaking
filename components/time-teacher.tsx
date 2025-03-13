"use client"

import { useState, useEffect } from "react"
import { Clock } from "@/components/clock"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, VolumeX, RefreshCw, Moon, Sun, Check } from "lucide-react"
import { formatTimeToSpeak } from "@/lib/time-formatter"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function TimeTeacher() {
  const [hours, setHours] = useState(10)
  const [minutes, setMinutes] = useState(30)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [format, setFormat] = useState("normal")
  const [muted, setMuted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const { toast } = useToast()

  // Handle time input changes
  const handleTimeChange = (value: string) => {
    const [h, m] = value.split(":").map(Number)
    if (h >= 1 && h <= 12) setHours(h)
    if (m >= 0 && m <= 59) setMinutes(m)
  }

  // Format time for input
  const formatTimeForInput = () => {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  // Check if current time can be expressed in the selected format
  const canUseFormat = (format: string) => {
    if (format === "normal") return true
    if (format === "past" && minutes > 30) return false
    if (format === "to" && minutes <= 30) return false
    return true
  }

  // Handle format change
  const handleFormatChange = (newFormat: string) => {
    if (canUseFormat(newFormat)) {
      setFormat(newFormat)
    } else {
      toast({
        title: "Invalid Format",
        description: `Cannot express ${formatTimeForInput()} using "${newFormat}" format`,
        variant: "destructive",
      })
    }
  }

  const speakTime = () => {
    if (muted) return

    setIsSpeaking(true)
    const timeText = formatTimeToSpeak(hours, minutes, format)

    const utterance = new SpeechSynthesisUtterance(timeText)
    utterance.rate = 0.9
    utterance.onend = () => setIsSpeaking(false)

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const checkVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser",
        variant: "destructive",
      })
      return
    }

    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase()
      const expectedTime = formatTimeToSpeak(hours, minutes, format).toLowerCase()

      if (
        transcript.includes(expectedTime) ||
        transcript.replace(/[^a-z0-9]/g, "") === expectedTime.replace(/[^a-z0-9]/g, "")
      ) {
        toast({
          title: "Correct!",
          description: "Your pronunciation was correct",
          variant: "default",
          className: "bg-green-500 text-white",
        })
      } else {
        toast({
          title: "Try Again",
          description: `Expected: "${expectedTime}"\nYou said: "${transcript}"`,
          variant: "destructive",
        })
      }
    }

    recognition.start()
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const randomizeTime = () => {
    setHours(Math.floor(Math.random() * 12) + 1)
    setMinutes(Math.floor(Math.random() * 60))
  }

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Clock hours={hours} minutes={minutes} setHours={setHours} setMinutes={setMinutes} />
          </motion.div>

          <div className="flex gap-4 mt-4">
            <Button onClick={randomizeTime} variant="outline" size="icon" className="rounded-full">
              <RefreshCw className="h-5 w-5" />
              <span className="sr-only">Randomize Time</span>
            </Button>

            <Button onClick={() => setMuted(!muted)} variant="outline" size="icon" className="rounded-full">
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              <span className="sr-only">Toggle Sound</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Time Speaking Practice</h2>

          <Input
            type="time"
            value={formatTimeForInput()}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="text-3xl font-mono mb-6 text-center py-4 bg-gray-100 dark:bg-gray-700"
          />

          <Tabs defaultValue="normal" className="mb-6" onValueChange={handleFormatChange}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="normal">Normal</TabsTrigger>
              <TabsTrigger value="past" disabled={!canUseFormat("past")}>
                Using "Past"
              </TabsTrigger>
              <TabsTrigger value="to" disabled={!canUseFormat("to")}>
                Using "To"
              </TabsTrigger>
            </TabsList>
            <TabsContent value="normal" className="text-gray-600 dark:text-gray-300">
              The standard way to tell time using "o'clock", "fifteen", "thirty", etc.
            </TabsContent>
            <TabsContent value="past" className="text-gray-600 dark:text-gray-300">
              Using "past" to describe minutes after the hour (e.g., "quarter past five").
            </TabsContent>
            <TabsContent value="to" className="text-gray-600 dark:text-gray-300">
              Using "to" to describe minutes before the next hour (e.g., "ten to six").
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mb-6">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={speakTime} className="w-full py-6 text-lg" disabled={isSpeaking || muted}>
                {isSpeaking ? "Speaking..." : "Speak This Time"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={checkVoiceInput}
                variant="outline"
                className="h-full aspect-square"
                disabled={isListening}
              >
                <Check className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">{formatTimeToSpeak(hours, minutes, format)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

