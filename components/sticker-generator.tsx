"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { StickerDesign1 } from "./sticker-designs/sticker-design-1"
import { StickerDesign2 } from "./sticker-designs/sticker-design-2"
import { StickerDesign3 } from "./sticker-designs/sticker-design-3"
import { StickerDesign4 } from "./sticker-designs/sticker-design-4"
import { StickerDesign5 } from "./sticker-designs/sticker-design-5"
import { StickerDesign6 } from "./sticker-designs/sticker-design-6"
import { StickerDesign7 } from "./sticker-designs/sticker-design-7"
import type { BackgroundOption } from "./card-generator"
import { BackgroundSpecificStickers } from "./background-specific-stickers"
import { CustomStickerGenerator } from "./custom-sticker-generator"

interface StickerGeneratorProps {
  name: string
  designType: BackgroundOption
  signatureData?: string | null
  customBackground?: BackgroundOption | null
}

const STICKER_DESIGNS = [
  {
    id: "design1",
    name: "Classic Orange",
    component: StickerDesign1,
  },
  {
    id: "design2",
    name: "Minimal White",
    component: StickerDesign2,
  },
  {
    id: "design3",
    name: "Gradient Circle",
    component: StickerDesign3,
  },
  {
    id: "design4",
    name: "Chip Focus",
    component: StickerDesign4,
  },
  {
    id: "design5",
    name: "Modern Badge",
    component: StickerDesign5,
  },
  {
    id: "design6",
    name: "Card Front",
    component: StickerDesign6,
  },
  {
    id: "design7",
    name: "Card Back",
    component: StickerDesign7,
  },
]

export function StickerGenerator({ name, designType, signatureData, customBackground }: StickerGeneratorProps) {
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0)
  const stickerRef = useRef<HTMLDivElement>(null)

  const currentDesign = STICKER_DESIGNS[currentDesignIndex]
  const StickerComponent = currentDesign.component

  const nextDesign = () => {
    setCurrentDesignIndex((prev) => (prev + 1) % STICKER_DESIGNS.length)
  }

  const prevDesign = () => {
    setCurrentDesignIndex((prev) => (prev - 1 + STICKER_DESIGNS.length) % STICKER_DESIGNS.length)
  }

  const downloadSticker = async () => {
    if (!stickerRef.current) return

    try {
      const dataUrl = await toPng(stickerRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "transparent",
      })

      const link = document.createElement("a")
      link.download = `sign-card-sticker-${currentDesign.id}-${designType.id}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating sticker image:", error)
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-orange-300 mb-4">Card Stickers for Keychains</h3>
      <p className="text-orange-200 mb-6">
        Choose from different sticker designs that you can download and use as keychains.
      </p>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-xs mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevDesign}
            className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-orange-200 font-medium">
            {currentDesignIndex + 1}/{STICKER_DESIGNS.length}: {currentDesign.name}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextDesign}
            className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={stickerRef}
          className="mb-6 p-4 flex items-center justify-center bg-transparent"
          style={{ width: "300px", height: "300px" }}
        >
          <div
            className={`holographic ${
              currentDesign.id.includes("design1") ||
              currentDesign.id.includes("design2") ||
              currentDesign.id.includes("design3") ||
              currentDesign.id.includes("circle")
                ? "holographic-circle"
                : currentDesign.id.includes("design5")
                  ? "holographic-hexagon"
                  : "holographic-card"
            }`}
          >
            {currentDesign.id === "design7" ? (
              <StickerDesign7 name={name} background={designType} signatureData={signatureData} />
            ) : (
              <StickerComponent name={name} background={designType} />
            )}
          </div>
        </div>

        <Button
          onClick={downloadSticker}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Download className="h-4 w-4" />
          Download Sticker
        </Button>
      </div>

      <BackgroundSpecificStickers name={name} signatureData={signatureData} customBackground={customBackground} />

      <CustomStickerGenerator name={name} signatureData={signatureData} />
    </div>
  )
}
