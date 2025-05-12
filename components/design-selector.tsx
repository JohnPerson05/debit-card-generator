"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BACKGROUND_OPTIONS, type BackgroundOption } from "./background-selector"

export type DesignType = BackgroundOption

interface DesignSelectorProps {
  selectedDesign: DesignType
  onDesignChange: (design: DesignType) => void
}

export function DesignSelector({ selectedDesign, onDesignChange }: DesignSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(BACKGROUND_OPTIONS.findIndex((bg) => bg.id === selectedDesign.id))

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + BACKGROUND_OPTIONS.length) % BACKGROUND_OPTIONS.length
    setCurrentIndex(newIndex)
    onDesignChange(BACKGROUND_OPTIONS[newIndex])
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % BACKGROUND_OPTIONS.length
    setCurrentIndex(newIndex)
    onDesignChange(BACKGROUND_OPTIONS[newIndex])
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
            {selectedDesign.id === "default" ? (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900"></div>
            ) : (
              <div className="absolute inset-0">
                <img
                  src={selectedDesign.thumbnail || "/placeholder.svg"}
                  alt={selectedDesign.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <p className="text-white text-xs mt-2">{selectedDesign.name}</p>
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
