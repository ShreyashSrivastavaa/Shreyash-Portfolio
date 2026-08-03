'use client'

import { useState, useEffect } from 'react'

export default function TextType({
  text = [],
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '_',
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!text || text.length === 0) return

    const fullText = text[currentTextIndex]
    let timeout

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % text.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentTextIndex, text, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span>
      {displayedText}
      {showCursor && <span className="animate-pulse">{cursorCharacter}</span>}
    </span>
  )
}
