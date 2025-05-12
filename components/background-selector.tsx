"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type BackgroundOption = {
  id: string
  name: string
  thumbnail: string
  image?: string
}

// Define the background options
export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: "default",
    name: "Default Gradient",
    thumbnail: "/backgrounds/default-thumb.png",
    image: "",
  },
  {
    id: "abstract1",
    name: "Abstract Wave",
    thumbnail: "/backgrounds/abstract1-thumb.png",
    image: "/backgrounds/abstract1.png",
  },
  {
    id: "abstract2",
    name: "Geometric Pattern",
    thumbnail: "/backgrounds/abstract2-thumb.png",
    image: "/backgrounds/abstract2.png",
  },
  {
    id: "abstract3",
    name: "Fluid Colors",
    thumbnail: "/backgrounds/abstract3-thumb.png",
    image: "/backgrounds/abstract3.png",
  },
  {
    id: "combined",
    name: "Combined Design",
    thumbnail: "/backgrounds/combined-thumb.png",
    image: "/backgrounds/combined.png",
  },
]

interface BackgroundSelectorProps {
  selectedBackground: BackgroundOption
  onSelectBackground: (background: BackgroundOption) => void
}

export function BackgroundSelector({ selectedBackground, onSelectBackground }: BackgroundSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(
    BACKGROUND_OPTIONS.findIndex((bg) => bg.id === selectedBackground.id),
  )

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + BACKGROUND_OPTIONS.length) % BACKGROUND_OPTIONS.length
    setCurrentIndex(newIndex)
    onSelectBackground(BACKGROUND_OPTIONS[newIndex])
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % BACKGROUND_OPTIONS.length
    setCurrentIndex(newIndex)
    onSelectBackground(BACKGROUND_OPTIONS[newIndex])
  }

  return (
    <div className="w-full">
      <h3 className="text-white text-sm font-medium mb-3">Background Design</h3>
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full h-16 bg-slate-800 rounded-md overflow-hidden">
            {selectedBackground.id === "default" ? (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900"></div>
            ) : (
              <div className="absolute inset-0">
                <img
                  src={selectedBackground.thumbnail || "/placeholder.svg"}
                  alt={selectedBackground.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <p className="text-white text-xs mt-2">{selectedBackground.name}</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
