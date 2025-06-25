"use client"

import { useState, useEffect } from "react"

export function useStreamingText(fullText: string, speed = 50, shouldStart = false) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText("")
      setIsComplete(false)
      return
    }

    let currentIndex = 0
    setDisplayedText("")
    setIsComplete(false)

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [fullText, speed, shouldStart])

  return { displayedText, isComplete }
}
