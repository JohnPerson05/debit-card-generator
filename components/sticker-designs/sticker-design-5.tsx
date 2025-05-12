import type { BackgroundOption } from "../background-selector"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign5({ name, background }: StickerDesignProps) {
  return (
    <div className="relative w-64 h-64">
      {/* Hexagon shape with border */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Hexagon background */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <polygon
              points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25"
              fill="url(#hexGradient)"
              className="drop-shadow-lg"
            />
            <polygon points="50 5, 88.3 27.5, 88.3 72.5, 50 95, 11.7 72.5, 11.7 27.5" fill="#1f2937" />
          </svg>

          {/* Custom background */}
          {background.id !== "default" && (
            <div
              className="absolute inset-0"
              style={{ clipPath: "polygon(50% 5%, 88.3% 27.5%, 88.3% 72.5%, 50% 95%, 11.7% 72.5%, 11.7% 27.5%)" }}
            >
              <img
                src={background.image || "/placeholder.svg"}
                alt={background.name}
                className="w-full h-full object-cover opacity-60"
              />
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
              {name}
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
