"use client"

import type { BackgroundOption } from "../card-generator"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign2({ name, background }: StickerDesignProps) {
  const renderBackground = () => {
    if (!background)
      return (
        <div className="absolute inset-0 rounded-full bg-white p-2">
          <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white"
                    style={{
                      height: "1px",
                      width: "100%",
                      top: `${i * 20}%`,
                      transform: `rotate(${i * 45}deg)`,
                      transformOrigin: "center",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )

    switch (background.id) {
      case "default":
        return (
          <div className="absolute inset-0 rounded-full bg-white p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white"
                      style={{
                        height: "1px",
                        width: "100%",
                        top: `${i * 20}%`,
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: "center",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case "design1":
      case "design2":
      case "design3":
        return (
          <div className="absolute inset-0 rounded-full bg-white p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-50">
                <img
                  src={background.image || "/placeholder.svg"}
                  alt={background.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/60"></div>
              </div>
            </div>
          </div>
        )
      case "combined":
        return (
          <div className="absolute inset-0 rounded-full bg-white p-2">
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
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gray-900/60"></div>
            </div>
          </div>
        )
      default:
        return (
          <div className="absolute inset-0 rounded-full bg-white p-2">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white"
                      style={{
                        height: "1px",
                        width: "100%",
                        top: `${i * 20}%`,
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: "center",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
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
        <div className="text-xl font-serif italic text-white mb-3 drop-shadow-md">Sign</div>

        {/* Name */}
        <div className="text-white font-medium text-sm mb-3 max-w-[80%] text-center truncate">{name}</div>

        {/* Card circles */}
        <div className="flex mb-2">
          <div className="w-5 h-5 rounded-full bg-red-600 opacity-100"></div>
          <div className="w-5 h-5 rounded-full bg-yellow-400 opacity-100 -ml-2"></div>
        </div>

        {/* Debit text */}
        <div className="text-white text-xs font-medium">debit</div>
      </div>
    </div>
  )
}
