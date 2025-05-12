"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign6({ name, background }: StickerDesignProps) {
  // Format name with .sign suffix
  const displayName = name ? `${name}.sign` : ""

  const renderBackground = () => {
    if (!background)
      return <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900 z-0"></div>

    switch (background.id) {
      case "default":
        return <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900 z-0"></div>
      case "design1":
      case "design2":
      case "design3":
      case "custom":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={background.image || "/placeholder.svg"}
              alt={background.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-gray-900/70"></div>
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
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-gray-900/60"></div>
          </div>
        )
      default:
        return <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900 z-0"></div>
    }
  }

  return (
    <div className="relative w-64 h-40 rounded-xl overflow-hidden shadow-lg">
      {/* Card background */}
      {renderBackground()}

      {/* Card content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
        {/* Top section */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-serif italic text-white drop-shadow-md">Sign</h2>
          <div className="flex">
            <div className="w-6 h-6 rounded-full bg-red-600 opacity-100"></div>
            <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-100 -ml-2"></div>
          </div>
        </div>

        {/* Middle section - Chip */}
        <div className="flex items-center mt-2">
          <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md mr-2 grid place-items-center">
            <div className="w-6 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm"></div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-xs text-gray-200 uppercase mb-1">CARD HOLDER</p>
            <p className="text-white font-medium text-xs truncate max-w-[120px]">{displayName}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-200 uppercase mb-1">EXPIRES</p>
            <p className="text-white font-medium text-xs">05/27</p>
          </div>
        </div>

        {/* Debit text */}
        <div className="absolute right-4 top-4">
          <span className="text-white text-xs font-medium">debit</span>
        </div>
      </div>
    </div>
  )
}
