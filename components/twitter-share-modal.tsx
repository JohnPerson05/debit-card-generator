"use client"

import { Button } from "@/components/ui/button"
import { X, Twitter, Download, Info } from "lucide-react"

interface TwitterShareModalProps {
  imageUrl: string
  designName: string
  onClose: () => void
  onDownload: () => void
}

export function TwitterShareModal({ imageUrl, designName, onClose, onDownload }: TwitterShareModalProps) {
  const openTwitter = () => {
    const text = `Check out my personalized Sign Crypto Card with ${designName} background! Create yours now.`
    const url = window.location.href
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-orange-950 rounded-xl max-w-md w-full p-6 relative my-4 max-h-[90vh] overflow-y-auto border border-orange-800/30 orange-glow">
        <button
          onClick={onClose}
          className="sticky top-0 float-right text-orange-300 hover:text-white z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6 pt-2">
          <div className="bg-orange-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Twitter className="h-6 w-6 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-orange-300">Share to Twitter</h3>
        </div>

        <div className="mb-6">
          <div className="bg-orange-900/30 rounded-lg p-4 mb-4 border border-orange-800/30">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-orange-200">
                Twitter doesn&apos;t allow direct image uploads from websites. To share your card with the image:
              </p>
            </div>
          </div>

          <ol className="list-decimal pl-5 text-orange-200 space-y-2 text-sm">
            <li>First download your card image</li>
            <li>Click the &quot;Share to Twitter&quot; button below</li>
            <li>When Twitter opens, compose your tweet</li>
            <li>Click the image icon and upload the card image you just downloaded</li>
            <li>Post your tweet with the image attached</li>
          </ol>
        </div>

        <div className="mb-4 rounded-lg overflow-hidden border border-orange-800/50">
          <div className="holographic holographic-card">
            <img src={imageUrl || "/placeholder.svg"} alt="Your card preview" className="w-full h-auto" />
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-2">
          <Button
            onClick={onDownload}
            className="w-full flex items-center justify-center gap-2 bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
          >
            <Download className="h-4 w-4" />
            Download Card Image
          </Button>
          <Button
            onClick={openTwitter}
            className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Twitter className="h-4 w-4" />
            Share to Twitter
          </Button>
        </div>
      </div>
    </div>
  )
}
