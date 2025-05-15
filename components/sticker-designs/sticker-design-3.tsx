"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign3({ name, background }: StickerDesignProps) {
  // Format name with .sign suffix
  const displayName = name ? `${name}.sign` : ""

  return (
    <div className="relative w-64 h-64">
      {/* Gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-gray-900 flex items-center justify-center p-3">
        {/* Inner circle */}
        <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative border-4 border-white/20 overflow-hidden">
          {/* Background */}
          {background && background.id !== "default" && (
            <div className="absolute inset-0">
              {background.id === "combined" ? (
                <div className="absolute inset-0 grid grid-cols-3 gap-0">
                  {[
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj6JdUuXcAABdcw.jpg-rqjxYUFD9Y81xl4pR5p8Zci57BxXRQ.jpeg",
                  ].map((src, index) => (
                    <div key={index} className="relative overflow-hidden h-full">
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`Design ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        onError={(e) => {
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
              ) : background.image ? (
                <img
                  src={background.image || "/placeholder.svg"}
                  alt={background.name}
                  className="w-full h-full object-cover opacity-60 rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    e.currentTarget.parentElement!.classList.add(
                      "bg-gradient-to-br",
                      "from-orange-800/40",
                      "to-gray-900/60",
                    )
                  }}
                />
              ) : null}
              <div className="absolute inset-0 bg-black/30 rounded-full"></div>
            </div>
          )}

          {/* Logo */}
          <div className="text-2xl font-serif italic text-white mb-1 drop-shadow-md z-10">Sign</div>

          {/* Horizontal line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 my-2 z-10"></div>

          {/* Name */}
          <div className="text-white font-medium text-sm mb-2 max-w-[80%] text-center truncate z-10 drop-shadow-md">
            {displayName}
          </div>

          {/* Card circles */}
          <div className="flex mt-1 z-10">
            <div className="w-5 h-5 rounded-full bg-red-600 opacity-100"></div>
            <div className="w-5 h-5 rounded-full bg-yellow-400 opacity-100 -ml-2"></div>
          </div>

          {/* Curved text at bottom */}
          <div className="absolute bottom-6 text-white text-xs font-medium tracking-widest z-10 drop-shadow-md">
            CRYPTO CARD
          </div>
        </div>
      </div>
    </div>
  )
}
