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

### 5. Update the Card Components

Update the card components to include the signature functionality.

### 6. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` in your browser to see the application running.

### 7. Build for Production

When you're ready to deploy your application:

\`\`\`bash
npm run build
\`\`\`

This will create an optimized production build in the `.next` folder.

### 8. Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

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

### Changing the "YOU ARE SIGNED" Text

You can modify the text and styling in the `card-back.tsx` file:

## License

This project is licensed under the MIT License - see the LICENSE file for details.
