"use client"

import type React from "react"

import { useState, useRef } from "react"
import { CardFront } from "./card-front"
import { CardBack } from "./card-back"
import { SignaturePad } from "@/components/signature-pad"
import { StickerGenerator } from "./sticker-generator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toPng } from "html-to-image"
import { Share2, Download, RotateCw, Eye, EyeOff, FileSignature } from "lucide-react"

// Define the background options
export type BackgroundOption = {
  id: string
  name: string
  thumbnail?: string
  image?: string
}

// Define the background options
export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: "default",
    name: "Default Gradient",
    thumbnail: "",
    image: "",
  },
  {
    id: "design1",
    name: "Orange Character",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
  },
  {
    id: "design2",
    name: "Blonde Girl",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
  },
  {
    id: "design3",
    name: "Dark-haired Woman",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj6JdUuXcAABdcw.jpg-rqjxYUFD9Y81xl4pR5p8Zci57BxXRQ.jpeg",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gj6JdUuXcAABdcw.jpg-rqjxYUFD9Y81xl4pR5p8Zci57BxXRQ.jpeg",
  },
  {
    id: "combined",
    name: "Combined Design",
    thumbnail: "",
    image: "",
  },
]

export function CardGenerator() {
  const [name, setName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [designType, setDesignType] = useState<BackgroundOption>(BACKGROUND_OPTIONS[0])
  const frontCardRef = useRef<HTMLDivElement>(null)
  const backCardRef = useRef<HTMLDivElement>(null)
  const combinedCardRef = useRef<HTMLDivElement>(null)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const generateCard = () => {
    if (!name.trim()) return
    setIsGenerating(true)

    // Simulate generation delay for better UX
    setTimeout(() => {
      setIsGenerating(false)
    }, 800)
  }

  const downloadCard = async (side: "front" | "back" | "combined") => {
    let ref
    let filename

    if (side === "front") {
      ref = frontCardRef
      filename = "sign-crypto-card-front.png"
    } else if (side === "back") {
      ref = backCardRef
      filename = "sign-crypto-card-back.png"
    } else {
      ref = combinedCardRef
      filename = "sign-crypto-card-combined.png"
    }

    if (!ref.current) return

    try {
      const dataUrl = await toPng(ref.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: side === "combined" ? "#0f172a" : "transparent",
      })

      const link = document.createElement("a")
      link.download = filename
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  const shareToTwitter = async () => {
    if (!combinedCardRef.current) return

    try {
      const dataUrl = await toPng(combinedCardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#0f172a",
      })

      const text = `Check out my personalized Sign Crypto Card! Create yours now.`
      const url = window.location.href
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`

      window.open(twitterUrl, "_blank")
    } catch (error) {
      console.error("Error sharing to Twitter:", error)
    }
  }

  const toggleCardNumber = () => {
    setShowCardNumber(!showCardNumber)
  }

  const handleSignatureComplete = (data: string) => {
    setSignatureData(data)
    setShowSignaturePad(false)
  }

  const handleDesignChange = (design: string) => {
    const selectedDesign = BACKGROUND_OPTIONS.find((bg) => bg.id === design) || BACKGROUND_OPTIONS[0]
    setDesignType(selectedDesign)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <div className="mb-6">
          <Label htmlFor="name" className="text-white mb-2 block">
            Enter your name or username
          </Label>
          <div className="flex gap-3">
            <Input
              id="name"
              placeholder="e.g. John Doe"
              value={name}
              onChange={handleNameChange}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button
              onClick={generateCard}
              disabled={!name.trim() || isGenerating}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Card"
              )}
            </Button>
          </div>
        </div>

        {name.trim() && !isGenerating && (
          <div className="mt-8">
            <div className="w-full mb-6">
              <h3 className="text-white text-lg font-medium mb-4">Choose Card Background Design</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {BACKGROUND_OPTIONS.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <input
                      type="radio"
                      id={`design-${option.id}`}
                      name="design"
                      value={option.id}
                      checked={designType.id === option.id}
                      onChange={() => handleDesignChange(option.id)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`design-${option.id}`}
                      className={`flex flex-col items-center justify-between rounded-md border-2 ${
                        designType.id === option.id ? "border-orange-500" : "border-slate-700"
                      } bg-slate-800 p-2 hover:bg-slate-700 hover:border-orange-500 cursor-pointer`}
                    >
                      <div className="w-full h-24 rounded-md mb-2 overflow-hidden relative">
                        {option.id === "default" ? (
                          <div className="w-full h-full bg-gradient-to-r from-orange-500 via-amber-400 to-gray-900"></div>
                        ) : option.id === "combined" ? (
                          <div className="w-full h-full grid grid-cols-3 gap-0.5">
                            {BACKGROUND_OPTIONS.slice(1, 4).map((bg) => (
                              <div key={bg.id} className="relative overflow-hidden">
                                {bg.thumbnail && (
                                  <img
                                    src={bg.thumbnail || "/placeholder.svg"}
                                    alt={bg.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          option.thumbnail && (
                            <img
                              src={option.thumbnail || "/placeholder.svg"}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                          )
                        )}
                      </div>
                      <span className="text-sm font-medium text-white">{option.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Switch id="show-number" checked={showCardNumber} onCheckedChange={toggleCardNumber} />
                <Label htmlFor="show-number" className="text-white cursor-pointer">
                  {showCardNumber ? (
                    <span className="flex items-center">
                      <EyeOff className="h-4 w-4 mr-2" /> Hide Card Number
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" /> Show Card Number
                    </span>
                  )}
                </Label>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowSignaturePad(!showSignaturePad)}
                className="flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
              >
                <FileSignature className="h-4 w-4" />
                {signatureData ? "Change Signature" : "Sign Document"}
              </Button>
            </div>

            {showSignaturePad && (
              <div className="mb-6 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-white text-lg mb-4">Sign Your Document</h3>
                <SignaturePad onSignatureComplete={handleSignatureComplete} />
              </div>
            )}

            <Tabs defaultValue="front" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-800">
                <TabsTrigger value="front">Front View</TabsTrigger>
                <TabsTrigger value="back">Back View</TabsTrigger>
                <TabsTrigger value="combined">Combined View</TabsTrigger>
                <TabsTrigger value="stickers">Stickers</TabsTrigger>
              </TabsList>

              <TabsContent value="front" className="flex flex-col items-center">
                <div ref={frontCardRef} className="mb-6 w-full max-w-md">
                  <CardFront name={name} showCardNumber={showCardNumber} designType={designType} />
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => downloadCard("front")}
                    className="flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Front
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="back" className="flex flex-col items-center">
                <div ref={backCardRef} className="mb-6 w-full max-w-md">
                  <CardBack signatureData={signatureData} designType={designType} />
                </div>
                <Button
                  variant="outline"
                  onClick={() => downloadCard("back")}
                  className="flex items-center gap-2 mt-4 bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
                >
                  <Download className="h-4 w-4" />
                  Download Back
                </Button>
              </TabsContent>

              <TabsContent value="combined" className="flex flex-col items-center">
                <div ref={combinedCardRef} className="mb-6 w-full max-w-md p-6 bg-slate-900 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">Your Sign Crypto Card</h3>
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-gray-400 mb-2 text-center text-xs">Front</h4>
                      <CardFront name={name} showCardNumber={showCardNumber} designType={designType} />
                    </div>
                    <div>
                      <h4 className="text-gray-400 mb-2 text-center text-xs">Back</h4>
                      <CardBack signatureData={signatureData} designType={designType} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => downloadCard("combined")}
                    className="flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Combined
                  </Button>
                  <Button
                    onClick={shareToTwitter}
                    className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a94df] text-white"
                  >
                    <Share2 className="h-4 w-4" />
                    Share to Twitter
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="stickers" className="flex flex-col items-center">
                <StickerGenerator name={name} designType={designType} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
