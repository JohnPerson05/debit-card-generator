# Virtual Crypto Card Generator

A modern web application that allows users to generate personalized virtual debit cards with their name or username. Users can view both front and back sides of the card, download the images, and share directly to Twitter.

## Features

- Simple form to input name or username
- Dynamic generation of debit card-style images
- Front and back views of the card
- Show/hide card number functionality
- Digital signature functionality with "YOU ARE SIGNED" confirmation
- Download options for front, back, or combined views
- Direct sharing to Twitter
- Responsive design

## Step-by-Step Setup Guide

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### 1. Create a New Next.js Project

\`\`\`bash
# Create a new Next.js project with TypeScript and App Router
npx create-next-app@latest debit-card-generator
\`\`\`

During the setup, select the following options:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use `src/` directory? **No**
- Would you like to use App Router? **Yes**
- Would you like to customize the default import alias (@/*)? **Yes**

### 2. Navigate to the Project Directory

\`\`\`bash
cd debit-card-generator
\`\`\`

### 3. Install Required Dependencies

\`\`\`bash
# Install shadcn/ui CLI
npm install -D @shadcn/ui

# Initialize shadcn/ui
npx shadcn@latest init

# Install required components
npx shadcn@latest add button input label tabs switch

# Install additional dependencies
npm install html-to-image lucide-react react-signature-canvas
npm install -D @types/react-signature-canvas
\`\`\`

### 4. Create Project Structure

Create the following directory structure:

\`\`\`
debit-card-generator/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── card-back.tsx
│   ├── card-front.tsx
│   ├── card-generator.tsx
│   ├── signature-pad.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── switch.tsx
│       └── tabs.tsx
├── lib/
│   └── utils.ts
├── public/
├── tailwind.config.ts
└── next.config.js
\`\`\`

### 5. Update Tailwind Configuration

Update your `tailwind.config.ts` file to include the necessary configuration, including the signature font:

\`\`\`typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        signature: ['var(--font-signature)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
\`\`\`

### 6. Update Layout to Include Signature Font

Update your `app/layout.tsx` file to include the Dancing Script font for signatures:

\`\`\`tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: '--font-signature'
})

export const metadata: Metadata = {
  title: "Virtual Crypto Card Generator",
  description: "Create your personalized virtual debit card with your name or username",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancingScript.variable}`}>{children}</body>
    </html>
  )
}
\`\`\`

### 7. Update Global CSS

Update your `app/globals.css` file to include the signature font variable:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 24 100% 50%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 24 100% 50%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 24 100% 50%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 24 100% 50%;
}

body {
  background-color: #000;
  color: #fff;
}

.font-signature {
  font-family: var(--font-signature);
}
\`\`\`

### 8. Create the Signature Pad Component

Create a new file `components/signature-pad.tsx`:

\`\`\`tsx
"use client"

import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "@/components/ui/button"
import { Trash2, Check } from 'lucide-react'

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
\`\`\`

### 9. Update the Card Components

Update the card components to include the signature functionality.

### 10. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` in your browser to see the application running.

### 11. Build for Production

When you're ready to deploy your application:

\`\`\`bash
npm run build
\`\`\`

This will create an optimized production build in the `.next` folder.

### 12. Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
\`\`\`

Follow the prompts to deploy your application.

## Using the Signature Feature

1. Generate your card by entering your name
2. Click the "Sign Document" button
3. Draw your signature on the canvas
4. Click "Sign Document" to save your signature
5. Your signature will appear on the back of the card with a red "YOU ARE SIGNED" watermark

## Customization Options

### Changing the Signature Font

You can modify the signature font by changing the imported font in `app/layout.tsx`:

\`\`\`tsx
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: '--font-signature'
})
\`\`\`

### Changing the "YOU ARE SIGNED" Text

You can modify the text and styling in the `card-back.tsx` file:

\`\`\`tsx
<p className="font-signature text-red-600 text-sm opacity-40 rotate-[-10deg]">YOU ARE SIGNED</p>
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
