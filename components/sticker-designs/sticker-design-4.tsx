"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign4({ name, background }: StickerDesignProps) {
  // Format name with .sign suffix
  const displayName = name ? `${name}.sign` : ""

  return (
    <div className="relative w-64 h-64">
      {/* Square design with rounded corners */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-orange-500 flex flex-col items-center justify-center p-5 overflow-hidden">
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

        {/* Chip as main focus */}
        <div className="w-16 h-12 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md mb-4 grid place-items-center relative z-10">
          <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-yellow-600/50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[1px] h-full bg-yellow-600/50"></div>
          </div>
        </div>

        {/* Logo */}
        <div className="text-xl font-serif italic text-white mb-2 drop-shadow-md z-10">Sign</div>

        {/* Name */}
        <div className="text-white font-medium text-sm mb-3 max-w-[80%] text-center truncate z-10 drop-shadow-md">
          {displayName}
        </div>

        {/* Card circles */}
        <div className="flex z-10">
          <div className="w-6 h-6 rounded-full bg-red-600 opacity-100"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-100 -ml-2"></div>
        </div>

        {/* Debit text */}
        <div className="absolute bottom-4 text-white text-xs font-medium z-10 drop-shadow-md">debit</div>
      </div>
    </div>
  )
}
