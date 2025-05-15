"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign1({ name, background }: StickerDesignProps) {
  // Format name with .sign suffix
  const displayName = name ? `${name}.sign` : ""

  const renderBackground = () => {
    if (!background)
      return (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 p-2">
          <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent opacity-50"></div>
          </div>
        </div>
      )

    switch (background.id) {
      case "default":
        return (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent opacity-50"></div>
            </div>
          </div>
        )
      case "design1":
      case "design2":
      case "design3":
      case "custom":
        return (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              {background.image && (
                <div className="absolute inset-0 opacity-60">
                  <img
                    src={background.image || "/placeholder.svg"}
                    alt={background.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, replace with gradient
                      e.currentTarget.style.display = "none"
                      e.currentTarget.parentElement!.classList.add(
                        "bg-gradient-to-br",
                        "from-orange-800/40",
                        "to-gray-900/60",
                      )
                    }}
                  />
                  <div className="absolute inset-0 bg-gray-900/50"></div>
                </div>
              )}
            </div>
          </div>
        )
      case "combined":
        return (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
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
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      onError={(e) => {
                        // If image fails to load, replace with gradient
                        e.currentTarget.style.display = "none"
                        e.currentTarget.parentElement!.classList.add(
                          "bg-gradient-to-br",
                          "from-orange-800/40",
                          "to-gray-900/60",
                        )
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gray-900/50"></div>
            </div>
          </div>
        )
      default:
        return (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent opacity-50"></div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative w-64 h-64">
      {/* Outer border and background */}
      {renderBackground()}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
        {/* Logo */}
        <div className="text-2xl font-serif italic text-white mb-2 drop-shadow-md">Sign</div>

        {/* Card chip */}
        <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md mb-2 grid place-items-center">
          <div className="w-6 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm"></div>
        </div>

        {/* Name */}
        <div className="text-white font-medium text-sm mb-1 max-w-[80%] text-center truncate">{displayName}</div>

        {/* Card circles */}
        <div className="flex mt-2">
          <div className="w-6 h-6 rounded-full bg-red-600 opacity-100"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-100 -ml-2"></div>
        </div>

        {/* Debit text */}
        <div className="absolute bottom-4 text-white text-xs font-medium">debit</div>
      </div>
    </div>
  )
}
