import type { BackgroundOption } from "../background-selector"

interface StickerDesignProps {
  name: string
  background: BackgroundOption
}

export function StickerDesign4({ name, background }: StickerDesignProps) {
  return (
    <div className="relative w-64 h-64">
      {/* Square design with rounded corners */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-orange-500 flex flex-col items-center justify-center p-5 overflow-hidden">
        {/* Background */}
        {background.id !== "default" && (
          <div className="absolute inset-0">
            <img
              src={background.image || "/placeholder.svg"}
              alt={background.name}
              className="w-full h-full object-cover opacity-60"
            />
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
          {name}
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
