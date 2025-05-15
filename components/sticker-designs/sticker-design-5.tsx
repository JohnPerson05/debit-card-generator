"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign5({ name, background }: StickerDesignProps) {
  // Format name with .sign suffix
  const displayName = name ? `${name}.sign` : ""

  return (
    <div className="relative w-64 h-64">
      {/* Hexagon shape with border */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Hexagon background */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7b00" />
                <stop offset="100%" stopColor="#ff5500" />
              </linearGradient>
            </defs>
            <polygon
              points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25"
              fill="url(#hexGradient)"
              style={{ filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))" }}
            />
            <polygon points="50 5, 88.3 27.5, 88.3 72.5, 50 95, 11.7 72.5, 11.7 27.5" fill="#1f2937" />
          </svg>

          {/* Custom background */}
          {background && background.id !== "default" && (
            <div
              className="absolute inset-0"
              style={{ clipPath: "polygon(50% 5%, 88.3% 27.5%, 88.3% 72.5%, 50% 95%, 11.7% 72.5%, 11.7% 27.5%)" }}
            >
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
                  className="w-full h-full object-cover opacity-60"
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
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          )}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Logo */}
            <div className="text-2xl font-serif italic text-white mb-2 drop-shadow-md">Sign</div>

            {/* Card circles */}
            <div className="flex mb-3">
              <div className="w-6 h-6 rounded-full bg-red-600 opacity-100"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-100 -ml-2"></div>
            </div>

            {/* Name */}
            <div className="text-white font-medium text-sm mb-2 max-w-[80%] text-center truncate drop-shadow-md">
              {displayName}
            </div>

            {/* Chip */}
            <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md mb-2 grid place-items-center">
              <div className="w-6 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm"></div>
            </div>

            {/* Debit text */}
            <div className="text-white text-xs font-medium mt-1 drop-shadow-md">debit</div>
          </div>
        </div>
      </div>
    </div>
  )
}
