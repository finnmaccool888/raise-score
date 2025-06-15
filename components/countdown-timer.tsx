"use client"

import { useState, useEffect } from "react"
import type { JSX } from "react/jsx-runtime"

export function CountdownTimer() {
  const calculateTimeLeft = () => {
    // Set a fixed future date for the countdown for demonstration
    const difference = +new Date("2025-12-31T23:59:59") - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents: JSX.Element[] = []

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl font-bold">
          {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase text-gray-300">{interval}</span>
      </div>,
    )
  })

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-6 font-mono">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  )
}
