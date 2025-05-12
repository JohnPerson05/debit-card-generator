"use client"

import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "@/components/ui/button"
import { Trash2, Check } from "lucide-react"

interface SignaturePadProps {
  onSignatureComplete: (signatureData: string) => void
}

export function SignaturePad({ onSignatureComplete }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [isSigned, setIsSigned] = useState(false)

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear()
      setIsSigned(false)
    }
  }

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.toDataURL("image/png")
      onSignatureComplete(dataURL)
      setIsSigned(true)
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="border-2 border-slate-700 rounded-lg w-full max-w-md bg-white">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-40",
          }}
          backgroundColor="white"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          variant="outline"
          onClick={clear}
          className="flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700 border-slate-700"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
        <Button
          onClick={save}
          disabled={isSigned}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="h-4 w-4" />
          {isSigned ? "Signed" : "Sign Document"}
        </Button>
      </div>
    </div>
  )
}
