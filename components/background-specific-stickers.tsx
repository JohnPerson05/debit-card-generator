"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { StickerDesign1 } from "./sticker-designs/sticker-design-1"
import { StickerDesign6 } from "./sticker-designs/sticker-design-6"
import { StickerDesign7 } from "./sticker-designs/sticker-design-7"

interface BackgroundSpecificStickersProps {
  name: string
  signatureData?: string | null
  customBackground?: BackgroundOption | null
}

// Import background options type
import type { BackgroundOption } from "./card-generator"

export function BackgroundSpecificStickers({ name, signatureData, customBackground }: BackgroundSpecificStickersProps) {
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0)
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)
  const stickerRef = useRef<HTMLDivElement>(null)

  // Import background options from card-generator
  const BACKGROUND_OPTIONS = [
    {
      id: "default",
      name: "Default",
      thumbnail: "",
      image: "",
    },
    {
      id: "design1",
      name: "$SIGN DADDY",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
    },
    {
      id: "design2",
      name: "$SIGN CUTEST",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
    },
    {
      id: "design3",
      name: "$SIGN INTERN",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj6JdUuXcAABdcw.jpg-rqjxYUFD9Y81xl4pR5p8Zci57BxXRQ.jpeg",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj6JdUuXcAABdcw.jpg-rqjxYUFD9Y81xl4pR5p8Zci57BxXRQ.jpeg",
    },
    {
      id: "combined",
      name: "$SIGN BUILDERS",
      thumbnail: "",
      image: "",
    },
  ]

  // Add custom background if available
  const allBackgroundOptions = customBackground ? [...BACKGROUND_OPTIONS, customBackground] : BACKGROUND_OPTIONS

  const STICKER_DESIGNS = [
    {
      id: "circle",
      name: "Circle Sticker",
      component: StickerDesign1,
    },
    {
      id: "card-front",
      name: "Card Front",
      component: StickerDesign6,
    },
    {
      id: "card-back",
      name: "Card Back",
      component: StickerDesign7,
    },
  ]

  const currentDesign = STICKER_DESIGNS[currentDesignIndex]
  const currentBackground = allBackgroundOptions[currentBackgroundIndex]
  const StickerComponent = currentDesign.component

  const nextDesign = () => {
    setCurrentDesignIndex((prev) => (prev + 1) % STICKER_DESIGNS.length)
  }

  const prevDesign = () => {
    setCurrentDesignIndex((prev) => (prev - 1 + STICKER_DESIGNS.length) % STICKER_DESIGNS.length)
  }

  const nextBackground = () => {
    setCurrentBackgroundIndex((prev) => (prev + 1) % allBackgroundOptions.length)
  }

  const prevBackground = () => {
    setCurrentBackgroundIndex((prev) => (prev - 1 + allBackgroundOptions.length) % allBackgroundOptions.length)
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
      link.download = `sign-card-${currentDesign.id}-${currentBackground.id}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating sticker image:", error)
    }
  }

  return (
    <div className="w-full mt-8 border-t border-orange-800/30 pt-8">
      <h3 className="text-xl font-bold text-orange-300 mb-4">Background-Specific Stickers</h3>
      <p className="text-orange-200 mb-6">
        Create stickers with specific backgrounds, regardless of your main card design.
      </p>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
          <div>
            <h4 className="text-orange-200 text-sm font-medium mb-3">Sticker Style</h4>
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevDesign}
                className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-orange-200 font-medium text-center flex-grow">{currentDesign.name}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextDesign}
                className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-orange-200 text-sm font-medium mb-3">Background Design</h4>
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevBackground}
                className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-orange-200 font-medium text-center flex-grow">{currentBackground.name}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextBackground}
                className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={stickerRef}
          className="mb-6 p-4 flex items-center justify-center bg-transparent"
          style={{ width: "300px", height: "300px" }}
        >
          <div
            className={`holographic ${
              currentDesign.id === "circle"
                ? "holographic-circle"
                : currentDesign.id === "card-front" || currentDesign.id === "card-back"
                  ? "holographic-rectangle"
                  : "holographic-card"
            }`}
          >
            {currentDesign.id === "card-back" ? (
              <StickerDesign7 name={name} background={currentBackground} signatureData={signatureData} />
            ) : (
              <StickerComponent name={name} background={currentBackground} />
            )}
          </div>
        </div>

        <Button
          onClick={downloadSticker}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Download className="h-4 w-4" />
          Download {currentBackground.name} {currentDesign.name}
        </Button>
      </div>
    </div>
  )
}
