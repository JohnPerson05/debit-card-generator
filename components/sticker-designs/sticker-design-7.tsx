"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
  signatureData?: string | null
}

export function StickerDesign7({ background, signatureData }: StickerDesignProps) {
  const renderBackground = () => {
    if (!background) return <div className="absolute inset-0 bg-gray-900 z-0"></div>

    switch (background.id) {
      case "default":
        return <div className="absolute inset-0 bg-gray-900 z-0"></div>
      case "design1":
      case "design2":
      case "design3":
      case "custom":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={background.image || "/placeholder.svg"}
              alt={background.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gray-900/80"></div>
          </div>
        )
      case "combined":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 gap-0">
              {[
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj6JdUuXcAABdcw.jpg-rqjxYUFD9Y81xl4pR5p8Zci57BxXRQ.jpeg",
              ].map((src, index) => (
                <div key={index} className="relative overflow-hidden">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Design ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gray-900/80"></div>
          </div>
        )
      default:
        return <div className="absolute inset-0 bg-gray-900 z-0"></div>
    }
  }

  return (
    <div className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg">
      {/* Card background */}
      {renderBackground()}

      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-b from-orange-500 to-amber-400 z-10"></div>

      {/* Magnetic stripe */}
      <div className="absolute top-6 left-8 right-0 h-8 bg-black z-20"></div>

      {/* Signature strip */}
      <div className="absolute bottom-6 left-12 right-4 z-20">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-[6px]">AUTHORIZED SIGNATURE</span>
            <span className="text-gray-400 text-[6px]">NOT VALID UNLESS SIGNED</span>
          </div>
          <div className="flex justify-between gap-2">
            <div className="bg-white h-8 flex-grow rounded-sm flex items-center justify-center relative">
              {signatureData ? (
                <div className="relative w-full h-full">
                  <img src={signatureData || "/placeholder.svg"} alt="Signature" className="h-full object-contain" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <p className="font-signature text-red-600 text-xs opacity-40 rotate-[-10deg]">YOU ARE SIGNED</p>
                  </div>
                </div>
              ) : (
                <div className="ml-2 font-mono text-gray-500 text-[8px] italic">Signature</div>
              )}
            </div>
            <div className="bg-white px-2 py-1 rounded-sm h-8 flex items-center">
              <div className="text-gray-800 font-mono text-[8px]">CVV: 123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
