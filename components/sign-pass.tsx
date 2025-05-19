"use client"

import type React from "react"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, ChevronLeft, ChevronRight, Upload, Camera } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import type { BackgroundOption } from "./card-generator"

interface SignPassProps {
  name: string
  designType: BackgroundOption
}

export function SignPass({ name }: SignPassProps) {
  const [twitterHandle, setTwitterHandle] = useState("")
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0)
  const [birthDate, setBirthDate] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [nationality, setNationality] = useState("")
  const [gender, setGender] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [givenName, setGivenName] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [country, setCountry] = useState("PHILIPPINES")
  const [flagColors, setFlagColors] = useState<string[]>(["#1a3a4a", "#ff3e96", "#0072c6"])
  const frontCardRef = useRef<HTMLDivElement>(null)
  const backCardRef = useRef<HTMLDivElement>(null)
  const passportRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generate a random ID number
  const [idNumber] = useState(() => {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
  })

  // Generate a random passport-style number
  const [passportNumber] = useState(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    //const randomLetters =
    //  letters.charAt(Math.floor(Math.random() * letters.length)) +
   //   letters.charAt(Math.floor(Math.random() * letters.length))
    const randomNumbers = Math.floor(1000000 + Math.random() * 9000000).toString()
    return letters.substring(0, 2) + randomNumbers
  })

  // Pass designs
  const PASS_DESIGNS = [
    {
      id: "id-card",
      name: "ID Card",
      type: "card",
    },
    {
      id: "passport",
      name: "Passport",
      type: "passport",
    },
  ]

  const currentDesign = PASS_DESIGNS[currentDesignIndex]

  const nextDesign = () => {
    setCurrentDesignIndex((prev) => (prev + 1) % PASS_DESIGNS.length)
  }

  const prevDesign = () => {
    setCurrentDesignIndex((prev) => (prev - 1 + PASS_DESIGNS.length) % PASS_DESIGNS.length)
  }

  const downloadFrontCard = async () => {
    if (!frontCardRef.current) return

    try {
      // Create a canvas with the same dimensions
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Set dimensions
      canvas.width = 500
      canvas.height = 280
      
      // Create a temporary image
      const img = new Image()
      
      // Convert the element to data URL first
      const tempDataUrl = await toPng(frontCardRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "white",
        width: 500, 
        height: 280
      })
      
      // When image loads, draw it with rounded corners
      img.onload = () => {
        // Create rounded rectangle
        ctx.beginPath()
        const radius = 12 // equivalent to rounded-xl
        ctx.moveTo(radius, 0)
        ctx.lineTo(canvas.width - radius, 0)
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius)
        ctx.lineTo(canvas.width, canvas.height - radius)
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height)
        ctx.lineTo(radius, canvas.height)
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius)
        ctx.lineTo(0, radius)
        ctx.quadraticCurveTo(0, 0, radius, 0)
        ctx.closePath()
        
        // Clip to the rounded rectangle
        ctx.clip()
        
        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // Get the final image and download it
        const finalDataUrl = canvas.toDataURL('image/png')
        const link = document.createElement("a")
        link.download = `sign-card-front-${name.replace(/\s+/g, "-").toLowerCase()}.png`
        link.href = finalDataUrl
        link.click()
      }
      
      img.src = tempDataUrl
    } catch (error) {
      console.error("Error generating front card image:", error)
    }
  }

  const downloadBackCard = async () => {
    if (!backCardRef.current) return

    try {
      // Create a canvas with the same dimensions
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Set dimensions
      canvas.width = 500
      canvas.height = 280
      
      // Create a temporary image
      const img = new Image()
      
      // Convert the element to data URL first
      const tempDataUrl = await toPng(backCardRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "white",
        width: 500, 
        height: 280
      })
      
      // When image loads, draw it with rounded corners
      img.onload = () => {
        // Create rounded rectangle
        ctx.beginPath()
        const radius = 12 // equivalent to rounded-xl
        ctx.moveTo(radius, 0)
        ctx.lineTo(canvas.width - radius, 0)
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius)
        ctx.lineTo(canvas.width, canvas.height - radius)
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height)
        ctx.lineTo(radius, canvas.height)
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius)
        ctx.lineTo(0, radius)
        ctx.quadraticCurveTo(0, 0, radius, 0)
        ctx.closePath()
        
        // Clip to the rounded rectangle
        ctx.clip()
        
        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // Get the final image and download it
        const finalDataUrl = canvas.toDataURL('image/png')
        const link = document.createElement("a")
        link.download = `sign-card-back-${name.replace(/\s+/g, "-").toLowerCase()}.png`
        link.href = finalDataUrl
        link.click()
      }
      
      img.src = tempDataUrl
    } catch (error) {
      console.error("Error generating back card image:", error)
    }
  }

  const downloadPassport = async () => {
    if (!passportRef.current) return

    try {
      // Create a canvas with the same dimensions
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Get the dimensions of the passport
      const passportWidth = 350
      const passportHeight = passportRef.current.clientHeight
      
      // Set canvas dimensions
      canvas.width = passportWidth
      canvas.height = passportHeight
      
      // Create a temporary image
      const img = new Image()
      
      // Convert the element to data URL first
      const tempDataUrl = await toPng(passportRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "white",
        width: passportWidth
      })
      
      // When image loads, draw it with rounded corners
      img.onload = () => {
        // Create rounded rectangle
        ctx.beginPath()
        const radius = 16 // equivalent to rounded-2xl
        ctx.moveTo(radius, 0)
        ctx.lineTo(canvas.width - radius, 0)
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius)
        ctx.lineTo(canvas.width, canvas.height - radius)
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height)
        ctx.lineTo(radius, canvas.height)
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius)
        ctx.lineTo(0, radius)
        ctx.quadraticCurveTo(0, 0, radius, 0)
        ctx.closePath()
        
        // Clip to the rounded rectangle
        ctx.clip()
        
        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // Get the final image and download it
        const finalDataUrl = canvas.toDataURL('image/png')
        const link = document.createElement("a")
        link.download = `sign-passport-${name.replace(/\s+/g, "-").toLowerCase()}.png`
        link.href = finalDataUrl
        link.click()
      }
      
      img.src = tempDataUrl
    } catch (error) {
      console.error("Error generating passport image:", error)
    }
  }

  // Format the Twitter URL for the QR code
  const getTwitterUrl = () => {
    const handle = twitterHandle.startsWith("@") ? twitterHandle.substring(1) : twitterHandle
    return `https://twitter.com/${handle}`
  }

  // Format the date for display
  const formatDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.getFullYear()
    return `${day}th ${month}, ${year}`
  }

  // Calculate expiry date (4 years from now)
  const formatExpiryDate = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 4)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Generate MRZ (Machine Readable Zone) for passport
  const generateMRZ = () => {
    // Format name for MRZ
    const formatMRZName = (inputName: string) => {
      // Convert to uppercase and replace spaces with <
      return inputName.toUpperCase().replace(/\s+/g, "<")
    }

    const lastName = name.split(" ")[0] || "SAMPLE"
    const firstName = givenName || (name.includes(" ") ? name.split(" ").slice(1).join(" ") : "NAME")

    const formattedLastName = formatMRZName(lastName).padEnd(10, "<")
    const formattedFirstName = formatMRZName(firstName).padEnd(10, "<")

    // Create a 3-letter country code from the country name
    const countryCode =
      country
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 3)
        .toUpperCase() || "PHL"

    const passportNum = passportNumber.padEnd(9, "<")
    const nationalityCode = countryCode
    const birthDateFormatted = birthDate ? birthDate.replace(/[^0-9]/g, "").substring(0, 6) : "010101" // Default if not provided
    const genderCode = gender === "F" ? "F" : "M" // Default to M if not F
    const expiryDate = "010230" // Default expiry
    const personalNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString()

    // Simplified to two lines for better formatting
    const line1 = `P<${nationalityCode}${formattedLastName}<<${formattedFirstName}`
    const line2 = `${passportNum}${nationalityCode}${birthDateFormatted}${genderCode}${expiryDate}${personalNumber}`

    return (
      <>
        <div className="font-mono text-[9px] tracking-wider overflow-auto whitespace-nowrap">{line1}</div>
        <div className="font-mono text-[9px] tracking-wider overflow-auto whitespace-nowrap">{line2}</div>
      </>
    )
  }

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Get display name
  const getDisplayName = () => {
    if (!name) return { surname: "Sample", givenName: "Name" }

    const parts = name.split(" ")
    return {
      surname: parts[0] || "Sample",
      givenName: givenName || (parts.length > 1 ? parts.slice(1).join(" ") : "Name"),
    }
  }

  const displayName = getDisplayName()

  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-bold text-orange-300 mb-4">SIGN PASS</h3>
      <p className="text-orange-200 mb-6">Create your official SIGN ID card or passport with your personal details.</p>

      <div className="mb-6 p-4 bg-orange-900/30 rounded-lg border border-orange-800/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="twitter-handle" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.9 3.54 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" /></svg></span>
              Twitter Handle
            </Label>
            <div className="flex rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-orange-700 bg-orange-900/50 text-orange-300 text-sm">
                @
              </span>
              <Input
                id="twitter-handle"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                placeholder="username"
                className="rounded-l-none bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 shadow-inner"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="given-name" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
              Given Name
            </Label>
            <Input
              id="given-name"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              placeholder="John"
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 rounded-lg shadow-inner"
            />
          </div>

          <div>
            <Label htmlFor="middle-name" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
              Middle Name
            </Label>
            <Input
              id="middle-name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Doe"
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 rounded-lg shadow-inner"
            />
          </div>

          <div>
            <Label htmlFor="birth-date" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
              Date of Birth
            </Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="01/01/01"
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 rounded-lg shadow-inner"
            />
          </div>

          <div>
            <Label htmlFor="birth-place" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
              Place of Birth
            </Label>
            <Input
              id="birth-place"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="Quezon City"
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 rounded-lg shadow-inner"
            />
          </div>

          <div>
            <Label htmlFor="nationality" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg></span>
              Nationality
            </Label>
            <Input
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Filipino"
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 rounded-lg shadow-inner"
            />
          </div>

          <div>
            <Label htmlFor="gender" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></span>
              Gender
            </Label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-lg bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 h-10 px-3 py-2 transition-all duration-150 shadow-inner"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="M/F">M/F</option>
            </select>
          </div>

          <div>
            <Label htmlFor="country" className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg></span>
              Country
            </Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="PHILIPPINES"
              className="bg-slate-800 border-orange-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-150 rounded-lg shadow-inner"
            />
          </div>

          <div>
            <Label className="text-orange-200 mb-2 block flex items-center gap-1">
              <span className="inline-flex items-center"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3h-1a2 2 0 00-2 2v1" /></svg></span>
              Flag Colors
            </Label>
            <div className="flex space-x-2">
              {flagColors.map((color, index) => (
                <div key={index} className="flex-1">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...flagColors]
                      newColors[index] = e.target.value
                      setFlagColors(newColors)
                    }}
                    className="w-full h-10 rounded-md cursor-pointer border-2 border-orange-700 focus:border-orange-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Label className="text-orange-200 mb-2 block">Profile Photo</Label>
          <div className="flex items-center gap-4">
            <div
              className="w-24 h-24 border-2 border-dashed border-orange-700 rounded-md flex items-center justify-center bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors"
              onClick={triggerFileInput}
            >
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center text-orange-300">
                  <Camera className="h-8 w-8 mb-1" />
                  <span className="text-xs">Add Photo</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <Button
                variant="outline"
                onClick={triggerFileInput}
                className="w-full bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {profileImage ? "Change Photo" : "Upload Photo"}
              </Button>
              <p className="text-xs text-orange-300 mt-1">Upload a passport-style photo for your ID card</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevDesign}
          className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-orange-200 font-medium">
          {currentDesignIndex + 1}/{PASS_DESIGNS.length}: {currentDesign.name}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={nextDesign}
          className="bg-orange-900/50 text-orange-100 hover:bg-orange-800 border-orange-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {currentDesign.type === "card" ? (
        <div className="space-y-8">
          {/* Front Card */}
           <div className="flex flex-col items-center my-10 relative">
             <div
               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-10"
               style={{
                 width: 500,
                 height: 280,
                 boxSizing: 'border-box',
                 fontFamily: 'Inter, Arial, sans-serif',
                 WebkitFontSmoothing: 'antialiased',
                 MozOsxFontSmoothing: 'grayscale',
                 padding: 0,
                 margin: 0,
                 background: '#fff',
               }}
             >
               <div ref={frontCardRef} className="w-full h-full flex flex-col">
                 {/* Header */}
                 <div className="flex items-center px-5 py-2 relative" style={{ backgroundColor: '#f97316', borderBottom: '1px solid #ddd' }}>
                   <div className="flex-1">
                     <h2 className="text-white font-bold text-sm tracking-wide uppercase">Republic of {country}</h2>
                     <p className="text-white text-[8px]">Permanent Resident Card</p>
                   </div>
                   <div className="flex items-center">
                     <div className="w-10 h-8 flex items-center">
                       {flagColors.slice(0, 3).map((color, index) => (
                         <div key={index} className="h-5 w-2.5 mx-0.5" style={{ backgroundColor: color }}></div>
                       ))}
                     </div>
                   </div>
                 </div>
                 
                 {/* Main Content */}
                 <div className="flex-1 relative bg-white" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='220' viewBox='0 0 500 220'%3E%3Cpath d='M250,60 C180,60 120,120 120,190 C120,190 180,190 250,190 C320,190 380,190 380,190 C380,120 320,60 250,60 Z' fill='%23f5f5f5' opacity='0.1' /%3E%3C/svg%3E")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}>
                   {/* Semi-transparent portrait watermark */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none" style={{ zIndex: 1 }}>
                     <div className="w-48 h-48 flex items-center justify-center">
                       <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                         <path d="M50,10 C30,10 15,25 15,45 C15,60 25,72 35,75 C25,80 10,95 10,115 C10,115 35,105 50,105 C65,105 90,115 90,115 C90,95 75,80 65,75 C75,72 85,60 85,45 C85,25 70,10 50,10 Z" fill="#000" />
                       </svg>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-3 h-full relative p-5" style={{ zIndex: 2 }}>
                     {/* Left Column - Information */}
                     <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-2">
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Surname</div>
                         <div className="text-gray-800 text-[10px] font-medium">{displayName.surname}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Name</div>
                         <div className="text-gray-800 text-[10px] font-medium">{displayName.givenName}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Middle Name</div>
                         <div className="text-gray-800 text-[10px] font-medium">{middleName || 'Max'}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Sex</div>
                         <div className="text-gray-800 text-[10px] font-medium">{gender || 'M/F'}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Date of Birth</div>
                         <div className="text-gray-800 text-[10px] font-medium">{birthDate || '01/01/1900'}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Type</div>
                         <div className="text-gray-800 text-[10px] font-medium">Business - Multiple Entries</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Entry Period Until</div>
                         <div className="text-gray-800 text-[10px] font-medium">{formatExpiryDate()}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Date of Expiry</div>
                         <div className="text-gray-800 text-[10px] font-medium">{formatExpiryDate()}</div>
                       </div>
                       <div>
                         <div className="text-gray-600 text-[8px] font-medium">Date of Issue</div>
                         <div className="text-gray-800 text-[10px] font-medium">{formatDate()}</div>
                       </div>
                     </div>
                     
                     {/* Right Column - Photo */}
                     <div className="col-span-1 flex justify-center items-start">
                       <div className="w-28 h-32 bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center shadow-sm">
                         {profileImage ? (
                           <img
                             src={profileImage || '/placeholder.svg'}
                             alt="Profile"
                             className="w-full h-full object-cover"
                           />
                         ) : (
                           <span className="text-gray-400 text-[10px]">No Photo</span>
                         )}
                       </div>
                     </div>
                   </div>
                   
                   {/* Signature - at bottom left*/}
                   <div className="absolute bottom-3 left-5">
                     <p className="font-signature text-blue-600 text-sm">{name || 'Jaypeee'}</p>
                   </div>
                   
                   {/* Camera icon - bottom right */}
                   <div className="absolute bottom-3 right-8">
                     <div className="h-6 w-6 flex items-center justify-center bg-blue-50 rounded-full border border-blue-200">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z" fill="#0072c6"/>
                         <path d="M20 5H17.4L15.8 3H8.2L6.6 5H4C2.3 5 1 6.3 1 8V19C1 20.7 2.3 22 4 22H20C21.7 22 23 20.7 23 19V8C23 6.3 21.7 5 20 5ZM12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18Z" fill="#0072c6"/>
                       </svg>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             <Button
               onClick={downloadFrontCard}
               className="flex items-center mt-2 gap-2 bg-orange-600 hover:bg-orange-700 text-white"
             >
               <Download className="h-4 w-4" />
               Download Front
             </Button>
           </div>

          {/* Back Card */}
           <div className="flex flex-col items-center my-10 relative">
             <div
               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-10"
               style={{
                 width: 500,
                 height: 280,
                 boxSizing: 'border-box',
                 fontFamily: 'Inter, Arial, sans-serif',
                 WebkitFontSmoothing: 'antialiased',
                 MozOsxFontSmoothing: 'grayscale',
                 padding: 0,
                 margin: 0,
                 background: '#fff',
               }}
             >
               <div ref={backCardRef} className="w-full h-full flex flex-col">
                 {/* Header with ID number and barcode */}
                 <div className="bg-gray-100 py-1.5 px-5 border-b border-gray-200 flex items-center justify-between">
                   <h2 className="text-gray-800 font-medium text-sm">{idNumber.substring(0, 7)}</h2>
                   <div>
                     <div className="h-4 w-[200px]">
                       {/* Simulated barcode */}
                       <div className="flex h-full items-center">
                         {Array.from({ length: 40 }).map((_, i) => (
                           <div key={i} className="h-full w-[1.5px] bg-gray-800 mx-[1px]" style={{ height: i % 2 === 0 ? '100%' : '70%' }}></div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 {/* Main Content */}
                 <div className="flex-1 px-5 py-3 relative">
                   {/* Background watermark */}
                   <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                     <div className="w-64 h-64 overflow-hidden">
                       <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                         <circle cx="50" cy="50" r="40" fill="#000" />
                         <path d="M50,10 C30,10 15,25 15,45 C15,60 25,72 35,75 C25,80 10,95 10,115 C10,115 35,105 50,105 C65,105 90,115 90,115 C90,95 75,80 65,75 C75,72 85,60 85,45 C85,25 70,10 50,10 Z" fill="#000" opacity="0.3" />
                       </svg>
                     </div>
                   </div>

                   <div className="grid grid-cols-12 gap-2 h-full relative" style={{ zIndex: 2 }}>
                     {/* Left Column - Information */}
                     <div className="col-span-8 flex flex-col justify-between h-full">
                       <div className="space-y-2">
                         <div className="flex flex-col">
                           <div className="text-gray-500 text-[8px] font-medium">ID</div>
                           <div className="text-gray-800 text-[10px] font-medium">{idNumber}</div>
                         </div>
                         <div className="flex flex-col">
                           <div className="text-gray-500 text-[8px] font-medium">Type</div>
                           <div className="text-gray-800 text-[10px] font-medium">Business - Multiple Entries</div>
                         </div>
                         <div className="flex flex-col">
                           <div className="text-gray-500 text-[8px] font-medium">Place of Birth</div>
                           <div className="text-gray-800 text-[10px] font-medium">{birthPlace || 'Shanghai'}</div>
                         </div>
                         <div className="flex flex-col">
                           <div className="text-gray-500 text-[8px] font-medium">Nationality</div>
                           <div className="text-gray-800 text-[10px] font-medium">{nationality || "People's Republic of China"}</div>
                         </div>
                       </div>
                       
                       {/* Signature below content */}
                       <div className="flex items-center mt-2 space-x-1">
                         <p className="font-signature text-blue-600 text-sm">{name || 'Jaypeee'}</p>
                       </div>
                     </div>
                     
                     {/* Right Column - QR Code */}
                     <div className="col-span-4 flex flex-col items-end justify-between">
                       {/* Emblem */}
                       <div className="flex items-center justify-center" style={{ width: 40, height: 40 }}>
                         <div className="w-full h-full flex items-center justify-center">
                           <svg width="32" height="32" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                             <path d="M25 5C18 5 12.5 10 12.5 17C12.5 21 15 24.5 18.75 26C15 27.5 10 32 10 40C10 40 17.5 37.5 25 37.5C32.5 37.5 40 40 40 40C40 32 35 27.5 31.25 26C35 24.5 37.5 21 37.5 17C37.5 10 32 5 25 5Z" fill="#fbbf24" />
                             <path d="M25 10C20 10 16.25 13.75 16.25 17.5C16.25 20.5 18.25 23 21 24C18.25 25 13.75 29 13.75 35C13.75 35 19.25 33 25 33C30.75 33 36.25 35 36.25 35C36.25 29 31.75 25 29 24C31.75 23 33.75 20.5 33.75 17.5C33.75 13.75 30 10 25 10Z" fill="#92400e" />
                           </svg>
                         </div>
                       </div>
                       
                       {/* QR Code */}
                       <div className="bg-white rounded-sm" style={{ width: 80, height: 80 }}>
                         {twitterHandle ? (
                           <QRCodeSVG
                             value={getTwitterUrl()}
                             size={80}
                             bgColor={'#ffffff'}
                             fgColor={'#000000'}
                             level={'H'}
                             includeMargin={false}
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-sm">
                             <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-0.5">
                               {Array.from({ length: 16 }).map((_, i) => (
                                 <div key={i} className={`w-full h-full ${i % 3 === 0 ? 'bg-gray-800' : 'bg-transparent'}`}></div>
                               ))}
                             </div>
                           </div>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="px-5 py-0.5 text-[7px] text-gray-500 text-center border-t border-gray-100">
                   This card certifies the holder as a permanent resident of Republic of {country}
                 </div>
                 
                 {/* MRZ Zone */}
                 <div className="px-5 py-2 font-mono text-[9px] tracking-wider text-gray-800 bg-gray-100 border-t border-gray-200">
                   <div className="whitespace-normal font-mono" style={{ fontFamily: 'Courier, monospace', letterSpacing: '0.1em', wordBreak: 'break-all' }}>
                     P&lt;PHIJAYPEEE&lt;&lt;&lt;&lt;&lt;NAME&lt;&lt;&lt;&lt;&lt; L11640412&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 4PHI830101MF2509127&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06
                   </div>
                 </div>
               </div>
             </div>

             <Button
               onClick={downloadBackCard}
               className="flex items-center mt-2 gap-2 bg-orange-600 hover:bg-orange-700 text-white"
             >
               <Download className="h-4 w-4" />
               Download Back
             </Button>
           </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-center text-gray-800 font-medium mb-4">Passport</h4>
          <div className="flex justify-center">
            <div
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              style={{
                width: 350,
                minHeight: 500,
                boxSizing: 'border-box',
                fontFamily: 'Inter, Arial, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                padding: 0,
                margin: 0,
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h4 className="text-center text-gray-800 font-medium mb-2 mt-2 text-[15px]">Passport</h4>
              <div ref={passportRef} className="w-full rounded-lg overflow-hidden shadow-lg mx-auto" style={{ minHeight: 500 }}>
                {/* Passport Design - Orange Cover */}
                <div className="relative w-full bg-gradient-to-b from-orange-500 to-orange-600" style={{ height: '160px', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  {/* Texture overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fillOpacity="0.4" fillRule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E\')',
                      backgroundSize: "8px 8px",
                    }}
                  ></div>

                  {/* Content */}
                  <div className="flex flex-col items-center justify-between h-full p-8 relative">
                    {/* Title */}
                    <div className="text-center">
                      <h2 className="text-amber-100 font-serif italic text-4xl mb-1">Sign</h2>
                      <p className="text-white tracking-[0.3em] text-sm">FOUNDATION</p>
                    </div>

                    {/* Logo */}
                    <div className="my-4">
                      <div className="h-20 w-20 rounded-full border-2 border-amber-200/50 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-amber-100/10 flex items-center justify-center">
                          <span className="text-amber-100 font-serif italic text-4xl">S</span>
                        </div>
                      </div>
                    </div>

                    {/* Passport text */}
                    <div className="text-center mt-auto">
                      <p className="text-amber-100 tracking-[0.3em] text-lg">PASSPORT</p>
                    </div>
                  </div>
                </div>

                {/* Passport data page */}
                <div className="bg-white p-4 border-t border-gray-200" style={{ minHeight: 320, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-500 text-[10px]">Type</p>
                        <p className="text-gray-800 text-[11px]">P</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px]">Passport No.</p>
                        <p className="text-gray-800 text-[11px]">{passportNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px]">Surname</p>
                        <p className="text-gray-800 text-[11px]">{displayName.surname}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px]">Given Names</p>
                        <p className="text-gray-800 text-[11px]">{displayName.givenName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px]">Nationality</p>
                        <p className="text-gray-800 text-[11px]">{nationality || 'Filipino'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px]">Date of Birth</p>
                        <p className="text-gray-800 text-[11px]">{birthDate || '01/01/01'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px]">Place of Birth</p>
                        <p className="text-gray-800 text-[11px]">{birthPlace || 'Quezon City'}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="flex flex-row gap-2 w-full justify-end">
                        {/* Passport chip icon */}
                        <div className="h-6 w-10 border-2 border-amber-200/50 rounded-md flex items-center justify-center mt-1">
                          <div className="h-1 w-8 bg-amber-200/50 rounded"></div>
                        </div>
                        <div className="bg-gray-100 h-20 w-16 flex items-center justify-center border border-gray-300 overflow-hidden rounded-md">
                          {profileImage ? (
                            <img
                              src={profileImage || '/placeholder.svg'}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-[10px]">No Photo</span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 w-full mt-2">
                        <div className="flex flex-row gap-4">
                          <div>
                            <p className="text-gray-500 text-[10px]">Sex</p>
                            <p className="text-gray-800 text-[11px]">{gender || 'M'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-[10px]">Date of Issue</p>
                            <p className="text-gray-800 text-[11px]">{formatDate()}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-4">
                          <div>
                            <p className="text-gray-500 text-[10px]">Date of Expiry</p>
                            <p className="text-gray-800 text-[11px]">{formatExpiryDate()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-[10px]">Authority</p>
                            <p className="text-gray-800 text-[11px]">SIGN FOUNDATION</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <p className="font-signature text-blue-600 text-sm">{name || 'Jaypeee'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* QR Code */}
                  <div className="mt-2 flex justify-between items-center">
                    <div className="bg-white p-1 border border-gray-200 rounded-md flex items-center justify-center" style={{ width: 60, height: 60 }}>
                      {twitterHandle ? (
                        <QRCodeSVG
                          value={getTwitterUrl()}
                          size={50}
                          bgColor={'#ffffff'}
                          fgColor={'#000000'}
                          level={'H'}
                          includeMargin={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-[8px] text-center p-1 rounded-md">
                          Enter Twitter handle
                        </div>
                      )}
                    </div>
                  </div>
                  {/* MRZ Zone */}
                  <div className="mt-2 bg-gray-50 p-2 border border-gray-200 rounded-md font-mono text-[9px] tracking-wider text-gray-800">
                    {generateMRZ()}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-center">
                <Button
                  onClick={downloadPassport}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Download className="h-4 w-4" />
                  Download Passport
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}




