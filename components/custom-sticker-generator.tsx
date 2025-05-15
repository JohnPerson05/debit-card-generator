"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { ImageUpload } from "./image-upload"
import { StickerDesign1 } from "./sticker-designs/sticker-design-1"
import { StickerDesign2 } from "./sticker-designs/sticker-design-2"
import { StickerDesign3 } from "./sticker-designs/sticker-design-3"
import { StickerDesign4 } from "./sticker-designs/sticker-design-4"
import { StickerDesign5 } from "./sticker-designs/sticker-design-5"
import { StickerDesign6 } from "./sticker-designs/sticker-design-6"
import { StickerDesign7 } from "./sticker-designs/sticker-design-7"
import { StickerDesign8 } from "./sticker-designs/sticker-design-8"
import type { BackgroundOption } from "./card-generator"

interface CustomStickerGeneratorProps {
  name: string
  signatureData?: string | null
}

export function CustomStickerGenerator({ name, signatureData }: CustomStickerGeneratorProps) {
  const [customImage, setCustomImage] = useState<string | null>(null)
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0)
  const stickerRef = useRef<HTMLDivElement>(null)

  // Define all sticker designs
  const STICKER_DESIGNS = [
    {
      id: "circle",
      name: "Circle Sticker",
      component: StickerDesign8,
    },
    {
      id: "classic-orange",
      name: "Classic Orange",
      component: StickerDesign1,
    },
    {
      id: "minimal-white",
      name: "Minimal White",
      component: StickerDesign2,
    },
    {
      id: "gradient-circle",
      name: "Gradient Circle",
      component: StickerDesign3,
    },
    {
      id: "chip-focus",
      name: "Chip Focus",
      component: StickerDesign4,
    },
    {
      id: "modern-badge",
      name: "Modern Badge",
      component: StickerDesign5,
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
  const StickerComponent = currentDesign.component

  const nextDesign = () => {
    setCurrentDesignIndex((prev) => (prev + 1) % STICKER_DESIGNS.length)
  }

  const prevDesign = () => {
    setCurrentDesignIndex((prev) => (prev - 1 + STICKER_DESIGNS.length) % STICKER_DESIGNS.length)
  }

  const handleImageUploaded = (imageDataUrl: string) => {
    setCustomImage(imageDataUrl)
  }

  const downloadSticker = async () => {
    if (!stickerRef.current || !customImage) return

    try {
      // Wait for all images to load or fail
      const images = Array.from(stickerRef.current.querySelectorAll("img"))
      await Promise.all(
        images.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve(null)
              } else {
                img.onload = () => resolve(null)
                img.onerror = () => {
                  // Hide broken images and apply fallback
                  img.style.display = "none"
                  if (img.parentElement) {
                    img.parentElement.classList.add("bg-gradient-to-br", "from-orange-800/40", "to-gray-900/60")
                  }
                  resolve(null)
                }
              }
            }),
        ),
      )

      const dataUrl = await toPng(stickerRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "transparent",
        filter: (node) => {
          // Skip problematic image nodes that might cause errors
          if (node.tagName === "IMG" && (node as HTMLImageElement).naturalWidth === 0) {
            return false
          }
          return true
        },
      })

      const link = document.createElement("a")
      link.download = `sign-card-custom-${currentDesign.id}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating sticker image:", error)
      // Show a more user-friendly error message
      alert("There was an error generating the sticker. Please try a different design or refresh the page.")
    }
  }

  // Create a custom background option from the uploaded image
  const customBackground: BackgroundOption | null = customImage
    ? {
        id: "custom",
        name: "Custom Upload",
        thumbnail: customImage,
        image: customImage,
      }
    : null

  return (
    <div className="w-full mt-8 border-t border-orange-800/30 pt-8">
      <h3 className="text-xl font-bold text-orange-300 mb-4">Custom Image Sticker</h3>
      <p className="text-orange-200 mb-6">Upload your own image to create a unique sticker with your name.</p>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-md mb-6">
          <ImageUpload onImageUploaded={handleImageUploaded} />
        </div>

        {customImage && (
          <>
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
                  currentDesign.id === "circle" ||
                  currentDesign.id === "classic-orange" ||
                  currentDesign.id === "minimal-white" ||
                  currentDesign.id === "gradient-circle"
                    ? "holographic-circle"
                    : currentDesign.id === "modern-badge"
                      ? "holographic-hexagon"
                      : currentDesign.id === "card-front" || currentDesign.id === "card-back"
                        ? "holographic-rectangle"
                        : "holographic-card"
                }`}
              >
                {currentDesign.id === "circle" ? (
                  <StickerDesign8 name={name} imageUrl={customImage} />
                ) : currentDesign.id === "card-back" ? (
                  <StickerDesign7 name={name} background={customBackground!} signatureData={signatureData} />
                ) : (
                  <StickerComponent name={name} background={customBackground!} imageUrl={""} />
                )}
              </div>
            </div>

            <Button
              onClick={downloadSticker}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Download className="h-4 w-4" />
              Download {currentDesign.name}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
