"use client"

import { useState, useEffect } from "react"
import type { BackgroundOption } from "./card-generator"

interface CardFrontProps {
  name: string
  showCardNumber: boolean
  designType: BackgroundOption
}

export function CardFront({ name, showCardNumber, designType }: CardFrontProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  // Generate card details on component mount
  useEffect(() => {
    setCardNumber(generateCardNumber())
    setExpiryDate(generateExpiryDate())
  }, [])

  // Generate random card number for display purposes
  const generateCardNumber = () => {
    return "5678 1234 5678 " + Math.floor(1000 + Math.random() * 9000)
  }

  // Generate random expiry date
  const generateExpiryDate = () => {
    const month = Math.floor(1 + Math.random() * 12)
      .toString()
      .padStart(2, "0")
    const year = (new Date().getFullYear() + 3).toString().slice(-2)
    return `${month}/${year}`
  }

  // Mask card number to show only last 4 digits
  const maskedCardNumber = () => {
    if (showCardNumber) {
      return cardNumber
    } else {
      return "•••• •••• •••• " + cardNumber.slice(-4)
    }
  }

  const renderBackground = () => {
    if (!designType)
      return <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900 z-0"></div>

    switch (designType.id) {
      case "default":
        return <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900 z-0"></div>
      case "design1":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={designType.image || "/placeholder.svg"}
              alt="Orange cartoon character"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-gray-900/70"></div>
          </div>
        )
      case "design2":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={designType.image || "/placeholder.svg"}
              alt="Anime girl with flowers"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-gray-900/70"></div>
          </div>
        )
      case "design3":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={designType.image || "/placeholder.svg"}
              alt="Dark-haired anime woman"
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
    <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg">
      {/* Card background */}
      {renderBackground()}

      {/* Card content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        {/* Top section */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-serif italic text-white drop-shadow-md">Sign</h2>
          <div className="flex">
            <div className="w-8 h-8 rounded-full bg-red-600 opacity-100"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-400 opacity-100 -ml-3"></div>
          </div>
        </div>

        {/* Middle section - Chip */}
        <div className="flex items-center mt-4">
          <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md mr-3 grid place-items-center">
            <div className="w-7 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm"></div>
          </div>
        </div>

        {/* Card number */}
        <div className="mt-4">
          <div className="text-white font-mono text-base tracking-wider">{maskedCardNumber()}</div>
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-xs text-gray-200 uppercase mb-1">CARD HOLDER</p>
            <p className="text-white font-medium text-sm truncate max-w-[150px]">{name}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-200 uppercase mb-1">EXPIRES</p>
            <p className="text-white font-medium text-sm">{expiryDate}</p>
          </div>
        </div>

        {/* Vertical text */}
        <div className="absolute right-5 top-1/2 transform -rotate-90 origin-right">
          <span className="text-white text-xs tracking-widest uppercase">FLAT24</span>
        </div>

        {/* Debit text */}
        <div className="absolute right-6 top-6">
          <span className="text-white text-xs font-medium">debit</span>
        </div>
      </div>
    </div>
  )
}
