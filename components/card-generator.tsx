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
import { Share2, Download, RotateCw, Eye, EyeOff, FileSignature, Upload } from "lucide-react"
import { TwitterShareModal } from "./twitter-share-modal"
import { ImageUpload } from "./image-upload"

// Define the background options
export type BackgroundOption = {
  id: string
  name: string
  thumbnail: string
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
    name: "$SIGN DADDY",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-uzQbIW8_400x400.jpg-gQe8jL60UPgj8rqmpFgRxJ3u2e436A.jpeg",
  },
  {
    id: "design2",
    name: "$SIGN INTERN",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cEmLS0J5_400x400.jpg-Su6fX7oIrTJHYVyU2l5qUmplW0hHMG.jpeg",
  },
  {
    id: "design3",
    name: "$SIGN INTERN",
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
  const [customBackground, setCustomBackground] = useState<BackgroundOption | null>(null)
  const [showUploadSection, setShowUploadSection] = useState(false)
  const frontCardRef = useRef<HTMLDivElement>(null)
  const backCardRef = useRef<HTMLDivElement>(null)
  const combinedCardRef = useRef<HTMLDivElement>(null)
  const [showTwitterModal, setShowTwitterModal] = useState(false)
  const [twitterImageUrl, setTwitterImageUrl] = useState("")

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

      setTwitterImageUrl(dataUrl)
      setShowTwitterModal(true)
    } catch (error) {
      console.error("Error generating image for Twitter:", error)
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
    if (design === "custom" && customBackground) {
      setDesignType(customBackground)
    } else {
      const selectedDesign = BACKGROUND_OPTIONS.find((bg) => bg.id === design) || BACKGROUND_OPTIONS[0]
      setDesignType(selectedDesign)
    }
  }

  const handleImageUploaded = (imageDataUrl: string) => {
    const newCustomBackground: BackgroundOption = {
      id: "custom",
      name: "Custom Upload",
      thumbnail: imageDataUrl,
      image: imageDataUrl,
    }
    setCustomBackground(newCustomBackground)
    setDesignType(newCustomBackground)
  }

  // Combine standard backgrounds with custom background if available
  const allBackgroundOptions = customBackground ? [...BACKGROUND_OPTIONS, customBackground] : BACKGROUND_OPTIONS

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-orange-950 rounded-xl p-6 mb-8 shadow-lg orange-glow">
        <div className="mb-6">
          <Label htmlFor="name" className="text-orange-200 mb-2 block font-medium">
            Enter your name or username
          </Label>
          <div className="flex gap-3">
            <Input
              id="name"
              placeholder="e.g. John Doe"
              value={name}
              onChange={handleNameChange}
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-orange-500"
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-orange-300 text-lg font-medium">Choose Card Background Design</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowUploadSection(!showUploadSection)}
                  className="flex items-center gap-2 bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
                >
                  <Upload className="h-4 w-4" />
                  {showUploadSection ? "Hide Upload" : "Upload Custom Background"}
                </Button>
              </div>

              {showUploadSection && (
                <div className="mb-6 p-4 bg-orange-900/30 rounded-lg border border-orange-800/50">
                  <h4 className="text-orange-200 text-md mb-4">Upload Your Custom Background</h4>
                  <ImageUpload onImageUploaded={handleImageUploaded} />
                  {customBackground && (
                    <p className="text-green-400 text-sm mt-3">
                      ✓ Custom background uploaded and selected! You can now use it for your card and stickers.
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {allBackgroundOptions.map((option) => (
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
                        designType.id === option.id ? "border-orange-500" : "border-orange-800/30"
                      } bg-slate-800 p-2 hover:bg-slate-700 hover:border-orange-500 cursor-pointer transition-all ${
                        designType.id === option.id ? "orange-glow" : ""
                      }`}
                    >
                      <div className="w-full h-24 rounded-md mb-2 overflow-hidden relative">
                        {option.id === "default" ? (
                          <div className="w-full h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-700"></div>
                        ) : option.id === "combined" ? (
                          <div className="w-full h-full grid grid-cols-3 gap-0.5">
                            {BACKGROUND_OPTIONS.slice(1, 4).map((bg) => (
                              <div key={bg.id} className="relative overflow-hidden h-full">
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
                        ) : option.thumbnail ? (
                          <div className="w-full h-full">
                            <img
                              src={option.thumbnail || "/placeholder.svg"}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                      <span className="text-sm font-medium text-orange-200">{option.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Switch id="show-number" checked={showCardNumber} onCheckedChange={toggleCardNumber} />
                <Label htmlFor="show-number" className="text-orange-200 cursor-pointer">
                  {showCardNumber ? (
                    <span className="flex items-center">
                      <EyeOff className="h-4 w-4 mr-2 text-orange-300" /> Hide Card Number
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-2 text-orange-300" /> Show Card Number
                    </span>
                  )}
                </Label>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowSignaturePad(!showSignaturePad)}
                className="flex items-center gap-2 bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
              >
                <FileSignature className="h-4 w-4" />
                {signatureData ? "Change Signature" : "Sign Document"}
              </Button>
            </div>

            {showSignaturePad && (
              <div className="mb-6 p-4 bg-orange-900/30 rounded-lg border border-orange-800/50">
                <h3 className="text-orange-200 text-lg mb-4">Sign Your Document</h3>
                <SignaturePad onSignatureComplete={handleSignatureComplete} />
              </div>
            )}

            <Tabs defaultValue="front" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-orange-900/30 p-1">
                <TabsTrigger
                  value="front"
                  className="data-[state=active]:bg-orange-700 data-[state=active]:text-white text-orange-200"
                >
                  Front View
                </TabsTrigger>
                <TabsTrigger
                  value="back"
                  className="data-[state=active]:bg-orange-700 data-[state=active]:text-white text-orange-200"
                >
                  Back View
                </TabsTrigger>
                <TabsTrigger
                  value="combined"
                  className="data-[state=active]:bg-orange-700 data-[state=active]:text-white text-orange-200"
                >
                  Combined View
                </TabsTrigger>
                <TabsTrigger
                  value="stickers"
                  className="data-[state=active]:bg-orange-700 data-[state=active]:text-white text-orange-200"
                >
                  Stickers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="front" className="flex flex-col items-center">
                <div ref={frontCardRef} className="mb-6 w-full max-w-md">
                  <div className="holographic holographic-card">
                    <CardFront name={name} showCardNumber={showCardNumber} designType={designType} />
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => downloadCard("front")}
                    className="flex items-center gap-2 bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Front
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="back" className="flex flex-col items-center">
                <div ref={backCardRef} className="mb-6 w-full max-w-md">
                  <div className="holographic holographic-card">
                    <CardBack signatureData={signatureData} designType={designType} />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => downloadCard("back")}
                  className="flex items-center gap-2 mt-4 bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
                >
                  <Download className="h-4 w-4" />
                  Download Back
                </Button>
              </TabsContent>

              <TabsContent value="combined" className="flex flex-col items-center">
                <div
                  ref={combinedCardRef}
                  className="mb-6 w-full max-w-md p-6 bg-orange-950 rounded-xl border border-orange-900/50"
                >
                  <h3 className="text-lg font-bold text-orange-300 mb-4 text-center">Your Sign Crypto Card</h3>
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-orange-400 mb-2 text-center text-xs">Front</h4>
                      <div className="holographic holographic-card">
                        <CardFront name={name} showCardNumber={showCardNumber} designType={designType} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-orange-400 mb-2 text-center text-xs">Back</h4>
                      <div className="holographic holographic-card">
                        <CardBack signatureData={signatureData} designType={designType} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => downloadCard("combined")}
                    className="flex items-center gap-2 bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Combined
                  </Button>
                  <Button
                    onClick={shareToTwitter}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Share2 className="h-4 w-4" />
                    Share to Twitter
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="stickers" className="flex flex-col items-center">
                <StickerGenerator
                  name={name}
                  designType={designType}
                  signatureData={signatureData}
                  customBackground={customBackground}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
      {showTwitterModal && (
        <TwitterShareModal
          imageUrl={twitterImageUrl}
          designName={designType.name}
          onClose={() => setShowTwitterModal(false)}
          onDownload={() => {
            const link = document.createElement("a")
            link.download = `sign-crypto-card-${designType.id}.png`
            link.href = twitterImageUrl
            link.click()
          }}
        />
      )}
    </div>
  )
}
