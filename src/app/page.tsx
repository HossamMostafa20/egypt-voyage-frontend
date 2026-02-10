import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function App() {
  return <>
    <div className="px-6 py-40 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#0D3B66]">Welcome To Egypt Voyage</h1>
      <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-slate-700 drop-shadow-md">
        Egypt Voyage is a smart tourism management platform that brings Egypt’s top destinations together in one place.
        Explore hotels, restaurants, landmarks, and travel programs with personalized recommendations to plan your perfect trip easily and confidently.      </p>
      <div className="flex flex-row sm:flex-row justify-center items-center space-x-6 mt-5">
        <Link href={'/home'}>
          <Button className="px-6 py-7 rounded-lg bg-[#D4A373] text-white font-semibold shadow-lg hover:bg-[#C38E5E] hover:shadow-xl active:scale-95 transition-all duration-300 cursor-pointer">
            Explore Now
          </Button>
        </Link>

        <Link href={'/program'}>
          <Button className="px-6 py-7 rounded-lg border-2 border-[#0D3B66] text-[#0D3B66] bg-white/20 font-semibold shadow-md hover:bg-[#0D3B66] hover:text-white hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer">
            Browse Programs
          </Button>
        </Link>
      </div>
    </div>
  </>
}
