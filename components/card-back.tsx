"use client"

import type { BackgroundOption } from "./card-generator"

interface CardBackProps {
  signatureData: string | null
  designType: BackgroundOption
}

export function CardBack({ signatureData, designType }: CardBackProps) {
  // Generate random CVV
  const cvv = Math.floor(100 + Math.random() * 900).toString()

  const renderBackground = () => {
    if (!designType) return <div className="absolute inset-0 bg-gray-900 z-0"></div>

    switch (designType.id) {
      case "default":
        return <div className="absolute inset-0 bg-gray-900 z-0"></div>
      case "design1":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={designType.image || "/placeholder.svg"}
              alt="Orange cartoon character"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gray-900/80"></div>
          </div>
        )
      case "design2":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={designType.image || "/placeholder.svg"}
              alt="Anime girl with flowers"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gray-900/80"></div>
          </div>
        )
      case "design3":
        return (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={designType.image || "/placeholder.svg"}
              alt="Dark-haired anime woman"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gray-900/80"></div>
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
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gray-900/80"></div>
          </div>
        )
      default:
        return <div className="absolute inset-0 bg-gray-900 z-0"></div>
    }
  }

  return (
    <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg">
      {/* Card background */}
      {renderBackground()}

      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-b from-orange-500 to-amber-400 z-10"></div>

      {/* Magnetic stripe */}
      <div className="absolute top-8 left-12 right-0 h-10 bg-black z-20"></div>

      {/* Card issuer info */}
      <div className="absolute top-24 left-20 right-6 z-20">
        <p className="text-gray-400 text-[7px] leading-tight">
          This card is issued by Sign Financial Services pursuant to license by Mastercard International.
        </p>
      </div>

      {/* Signature strip */}
      <div className="absolute bottom-20 left-20 right-6 z-20">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-[6px]">AUTHORIZED SIGNATURE</span>
            <span className="text-gray-400 text-[6px]">NOT VALID UNLESS SIGNED</span>
          </div>
          <div className="flex justify-between gap-4">
            <div className="bg-white h-12 flex-grow rounded-sm flex items-center justify-center relative">
              {signatureData ? (
                <div className="relative w-full h-full">
                  <img src={signatureData || "/placeholder.svg"} alt="Signature" className="h-full object-contain" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <p className="font-signature text-red-600 text-sm opacity-40 rotate-[-10deg]">YOU ARE SIGNED</p>
                  </div>
                </div>
              ) : (
                <div className="ml-2 font-mono text-gray-500 text-xs italic">Signature</div>
              )}
            </div>
            <div className="bg-white px-3 py-1 rounded-sm h-12 flex items-center">
              <div className="text-gray-800 font-mono text-xs">CVV: {cvv}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and conditions */}
      <div className="absolute bottom-6 left-20 right-6 z-20">
        <p className="text-gray-400 text-[6px] leading-tight">
          Use of this card is subject to the agreement and terms and conditions of the cardholder agreement. By using
          this card, you agree to the terms and conditions set forth by the issuer.
        </p>
      </div>
    </div>
  )
}
