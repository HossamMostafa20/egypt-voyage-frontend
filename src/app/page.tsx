import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function App() {
  return <>
    <div className="relative min-h-screen flex items-center justify-center text-center bg-[url('/Web-bg.png')] bg-cover bg-center" >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80"></div>

      {/* Content */}
      <div className="relative px-6 max-w-4xl animate-fadeIn">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
          Welcome To <span className="text-[#D4A373]">Egypt Voyage</span>
        </h1>

        <p className="mx-auto mt-6 text-lg sm:text-xl text-white/90 leading-relaxed">
          Egypt Voyage is a smart tourism management platform that brings Egypt’s top destinations together in one place. Explore hotels, restaurants, landmarks, and travel programs with personalized recommendations to plan your perfect trip easily and confidently.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10">
          <Link href="/home">
            <Button className="px-8 py-7 rounded-xl bg-[#D4A373] text-white font-semibold shadow-xl hover:bg-[#C38E5E] hover:scale-105 transition-all duration-300 cursor-pointer">
              Explore Now
            </Button>
          </Link>

          <Link href="/program">
            <Button className="px-8 py-7 rounded-xl border-2 border-white text-white bg-white/10 font-semibold shadow-lg hover:bg-white hover:text-[#0D3B66] hover:scale-105 transition-all duration-300 cursor-pointer">
              Browse Programs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </>
}
