"use client"

import { useState, useEffect } from "react"
import { Clock } from "@/components/clock"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, VolumeX, RefreshCw, Moon, Sun, Check } from "lucide-react"
import { formatTimeToSpeak } from "@/lib/time-formatter"
import { motion } from "framer-motion"
import { Bounce, toast } from 'react-toastify';

export default function TimeTeacher() {
  const [hours, setHours] = useState(10)
  const [minutes, setMinutes] = useState(30)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [format, setFormat] = useState("normal")
  const [muted, setMuted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run client-side code after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load preferences from localStorage only after mounting
  useEffect(() => {
    if (!mounted) return

    const savedFormat = localStorage.getItem('timeFormat')
    const savedMuted = localStorage.getItem('muted')
    const savedDark = localStorage.getItem('darkMode')

    if (savedFormat && canUseFormat(savedFormat)) {
      setFormat(savedFormat)
    } else {
      const autoFormat = minutes > 30 ? 'to' : minutes === 0 ? 'normal' : 'past'
      if (canUseFormat(autoFormat)) {
        setFormat(autoFormat)
      }
    }

    if (savedMuted) setMuted(savedMuted === 'true')
    if (savedDark) {
      const isDarkMode = savedDark === 'true'
      setIsDark(isDarkMode)
      document.documentElement.classList.toggle('dark', isDarkMode)
    }
  }, [mounted, minutes])

  // Save preferences to localStorage
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('timeFormat', format)
    localStorage.setItem('muted', muted.toString())
    localStorage.setItem('darkMode', isDark.toString())
  }, [format, muted, isDark, mounted])

  const handleTimeChange = (value: string) => {
    const [h, m] = value.split(":").map(Number)
    if (h >= 1 && h <= 12) setHours(h)
    if (m >= 0 && m <= 59) setMinutes(m)
  }

  const formatTimeForInput = () => {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const canUseFormat = (format: string) => {
    if (format === "normal") return true
    if (format === "past" && minutes > 30) return false
    if (format === "to" && minutes <= 30) return false
    return true
  }

  const handleFormatChange = (newFormat: string) => {
    if (canUseFormat(newFormat)) {
      setFormat(newFormat)
    } else {
      toast.warn(`Cannot express ${formatTimeForInput()} using "${newFormat}" format`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  const speakTime = () => {
    if (muted || !mounted) return

    setIsSpeaking(true)
    const timeText = formatTimeToSpeak(hours, minutes, format)

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(timeText)
      utterance.rate = 0.9
      utterance.onend = () => setIsSpeaking(false)

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const checkVoiceInput = () => {
    if (!mounted) return

    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
      toast.warn(`Voice recognition is not supported in your browser`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
        toast.success('Correct! Your pronunciation was correct', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(`Expected: "${expectedTime}"\nYou said: "${transcript}"`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }

    recognition.start()
  }

  const toggleDarkMode = () => {
    if (!mounted) return
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const randomizeTime = () => {
    setHours(Math.floor(Math.random() * 12) + 1)
    setMinutes(Math.floor(Math.random() * 60))
  }

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch by not rendering until mounted
  }

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
          >
            <Clock hours={hours} minutes={minutes} setHours={setHours} setMinutes={setMinutes} />
          </motion.div>

          <div className="mt-4 flex gap-2">
            <Input
              type="time"
              value={formatTimeForInput()}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-32"
            />
            <Button variant="outline" size="icon" onClick={randomizeTime}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Tabs value={format} onValueChange={handleFormatChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="normal">Normal</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="to">To</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={speakTime} disabled={isSpeaking}>
              {isSpeaking ? "Speaking..." : "Speak Time"}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          <Button onClick={checkVoiceInput} disabled={isListening}>
            {isListening ? (
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Listening...
              </span>
            ) : (
              "Check My Pronunciation"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
