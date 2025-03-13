"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface ClockProps {
  hours: number
  minutes: number
  setHours: (hours: number) => void
  setMinutes: (minutes: number) => void
}

export function Clock({ hours, minutes, setHours, setMinutes }: ClockProps) {
  const [isDragging, setIsDragging] = useState<"hour" | "minute" | null>(null)
  const [hourAngle, setHourAngle] = useState(0)
  const [minuteAngle, setMinuteAngle] = useState(0)

  useEffect(() => {
    setHourAngle((hours % 12) * 30 + minutes * 0.5)
    setMinuteAngle(minutes * 6)
  }, [hours, minutes])

  const handleMouseDown = (hand: "hour" | "minute") => {
    setIsDragging(hand)
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360

    if (isDragging === "hour") {
      const newHours = Math.round(angle / 30) % 12
      setHours(newHours === 0 ? 12 : newHours)
    } else {
      const newMinutes = Math.round(angle / 6) % 60
      setMinutes(newMinutes)
    }
  }

  return (
    <div className="relative">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-pointer"
      >
        {/* Clock face */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="white"
          stroke="#E2E8F0"
          strokeWidth="4"
          className="dark:fill-gray-800 dark:stroke-gray-700"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180)
          const x1 = 120 + 90 * Math.sin(angle)
          const y1 = 120 - 90 * Math.cos(angle)
          const x2 = 120 + 100 * Math.sin(angle)
          const y2 = 120 - 100 * Math.cos(angle)

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#64748B"
              strokeWidth="3"
              className="dark:stroke-gray-400"
            />
          )
        })}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 === 0) return null

          const angle = i * 6 * (Math.PI / 180)
          const x1 = 120 + 95 * Math.sin(angle)
          const y1 = 120 - 95 * Math.cos(angle)
          const x2 = 120 + 100 * Math.sin(angle)
          const y2 = 120 - 100 * Math.cos(angle)

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#94A3B8"
              strokeWidth="1"
              className="dark:stroke-gray-500"
            />
          )
        })}

        {/* Hour numbers */}
        {[...Array(12)].map((_, i) => {
          const hour = i === 0 ? 12 : i
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const x = 120 + 75 * Math.cos(angle)
          const y = 120 + 75 * Math.sin(angle)

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#1E293B"
              className="dark:fill-gray-200"
            >
              {hour}
            </text>
          )
        })}

        {/* Center dot */}
        <circle cx="120" cy="120" r="4" fill="#3B82F6" className="dark:fill-blue-400" />

        {/* Hour hand */}
        <g transform={`rotate(${hourAngle}, 120, 120)`}>
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="85"
            stroke="#1E293B"
            strokeWidth="6"
            strokeLinecap="round"
            className="dark:stroke-gray-200"
            onMouseDown={() => handleMouseDown("hour")}
          />
        </g>

        {/* Minute hand */}
        <g transform={`rotate(${minuteAngle}, 120, 120)`}>
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="70"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            className="dark:stroke-blue-400"
            onMouseDown={() => handleMouseDown("minute")}
          />
          <circle
            cx="120"
            cy="70"
            r="4"
            fill="#3B82F6"
            className="dark:fill-blue-400"
            onMouseDown={() => handleMouseDown("minute")}
          />
        </g>
      </svg>

      <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">Drag the hands to set the time</div>
    </div>
  )
}

