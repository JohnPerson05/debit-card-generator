"use client"

interface CustomStickerProps {
  name: string
  imageUrl: string
}

export function StickerDesign8({ name, imageUrl }: CustomStickerProps) {
  // Format name with .sign suffix
  const displayName = name ? `${name}.sign` : ""

  return (
    <div className="relative w-64 h-64">
      {/* Circular sticker with custom image */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-orange-500">
        {/* Custom image background */}
        <div className="absolute inset-0">
          <img src={imageUrl || "/placeholder.svg"} alt="Custom background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-black/50"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
          {/* Logo */}
          <div className="text-2xl font-serif italic text-white mb-2 drop-shadow-md">Sign</div>

          {/* Card circles */}
          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-red-600 opacity-90"></div>
            <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-2"></div>
          </div>

          {/* Name with background for better readability */}
          <div className="bg-orange-900/60 px-3 py-1 rounded-full">
            <div className="text-white font-medium text-sm mb-1 max-w-[80%] text-center truncate">{displayName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
