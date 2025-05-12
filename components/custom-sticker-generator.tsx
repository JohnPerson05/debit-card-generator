"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { ImageUpload } from "./image-upload"
import { StickerDesign8 } from "./sticker-designs/sticker-design-8"

interface CustomStickerGeneratorProps {
  name: string
  signatureData?: string | null
}

export function CustomStickerGenerator({ name }: CustomStickerGeneratorProps) {
  const [customImage, setCustomImage] = useState<string | null>(null)
  const stickerRef = useRef<HTMLDivElement>(null)

  const handleImageUploaded = (imageDataUrl: string) => {
    setCustomImage(imageDataUrl)
  }

  const downloadSticker = async () => {
    if (!stickerRef.current || !customImage) return

    try {
      const dataUrl = await toPng(stickerRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "transparent",
      })

      const link = document.createElement("a")
      link.download = `sign-card-custom-sticker.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating sticker image:", error)
    }
  }

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
            <div
              ref={stickerRef}
              className="mb-6 p-4 flex items-center justify-center bg-transparent"
              style={{ width: "300px", height: "300px" }}
            >
              <div className="holographic holographic-circle">
                <StickerDesign8 name={name} imageUrl={customImage} />
              </div>
            </div>

            <Button
              onClick={downloadSticker}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Download className="h-4 w-4" />
              Download Custom Sticker
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
