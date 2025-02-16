"use client"

import * as React from "react"
import { Square } from "lucide-react"

const pulseRotateScaleKeyframes = `@keyframes pulseRotateScale {
  0%, 100% { 
    transform: scale(1) rotate(0deg); 
    opacity: 1;
  }
  25% {
    transform: scale(1.1) rotate(90deg);
    opacity: 0.9;
  }
  50% { 
    transform: scale(0.95) rotate(180deg); 
    opacity: 0.7;
  }
  75% { 
    transform: scale(1.05) rotate(270deg); 
    opacity: 0.8;
  }
}`

interface SearchProgressProps {
  query?: string
}

export function SearchProgress({ query = "XYZ" }: SearchProgressProps) {
  const [elapsedTime, setElapsedTime] = React.useState(0)
  const [sources, setSources] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    if (isComplete) return

    const timer = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + 1
        if (newTime >= 21) {
          setIsComplete(true)
          clearInterval(timer)
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isComplete])

  React.useEffect(() => {
    if (isComplete || sources >= 5) return

    const increaseSources = () => {
      setSources((prevSources) => Math.min(prevSources + 1, 5))
      if (sources < 4) {
        scheduleNextIncrease()
      }
    }

    const scheduleNextIncrease = () => {
      const randomDelay = Math.floor(Math.random() * (4000 - 2000 + 1) + 2000) // Adjusted for faster increases
      const timeoutId = setTimeout(increaseSources, randomDelay)
      return timeoutId
    }

    const timeoutId = scheduleNextIncrease()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isComplete, sources])

  React.useEffect(() => {
    if (isComplete) return

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1
        if (newProgress >= 98) {
          clearInterval(progressInterval)
          return 98
        }
        return newProgress
      })
    }, 300)

    return () => clearInterval(progressInterval)
  }, [isComplete])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <>
      <style>{pulseRotateScaleKeyframes}</style>
      <div className="w-full max-w-3xl mx-auto">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Square
                className="w-5 h-5 text-[#a297eb] fill-[#a297eb]"
                style={{
                  animation: isComplete ? "none" : "pulseRotateScale 3s ease-in-out infinite",
                }}
              />
              <span className="text-base font-medium">{isComplete ? `Found ${query}` : `Searching for ${query}`}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#a297eb]">
                {sources} source{sources !== 1 ? "s" : ""}
              </span>
              <span className="text-black">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-[#e8e8e8] overflow-hidden">
            <div
              className="h-full bg-[#a297eb] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

