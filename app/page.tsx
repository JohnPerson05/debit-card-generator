import { CardGenerator } from "@/components/card-generator"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Virtual Crypto Card Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create your personalized virtual debit card with your name or username. Download it or share it directly to
            Twitter.
          </p>
        </header>
        
        <div className="h-8"></div>
        <CardGenerator />
      </div>
    </div>
  )
}