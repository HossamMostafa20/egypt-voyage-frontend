import { Button } from '@/components/ui/button'
import { Facebook, Globe, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ProgramDetails() {
    return <>
        <section className="container mx-auto pb-15">

            {/* IMAGE */}
            <div className="pt-6">
                <div className="px-6">
                    <div className="relative w-full h-85 lg:h-100 overflow-hidden">
                        <Image src="/program1.jpg" alt="Program" fill />
                    </div>
                </div>
            </div>

            {/* ===== MAIN SECTION ===== */}
            <div className="px-6 mt-3">

                {/* Title + Button */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#FBBF6D]">
                            Egypt Pyramids Tours Program
                        </h1>
                        {/* icons */}
                        <div className="flex mt-0 md:mt-1.5 lg:mt-2 gap-4 text-[#0D3B66]">
                            <Globe className="cursor-pointer hover:scale-110 transition" />
                            <Facebook className="cursor-pointer hover:scale-110 transition" />
                            <MapPin className="cursor-pointer hover:scale-110 transition" />
                        </div>
                    </div>
                    {/* Button */}
                    <Button className="w-full sm:w-auto cursor-pointer px-6 py-5 mb-2 md:mb-3 lg:px-7 lg:py-6 mt-0 lg:mt-2 rounded-full shadow-xl bg-linear-to-b from-[#D3A15C] to-[#00000055] hover:scale-95 transition">
                        Add To Favourite
                    </Button>
                </div>

                {/* ===== TIMELINE ===== */}
                <div className="relative mt-20 grid md:grid-cols-2 gap-y-16 gap-x-20">

                    {/* Vertical line */}
                    <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-[#F4C27A] -translate-x-1/2" />

                    {/* Day Item */}
                    {["1", "2", "3", "4"].map((day, i) => (
                        <div key={i} className={`space-y-2${i % 2 === 0 ? "md:text-right" : ""}`}>
                            <h2 className="text-3xl font-semibold text-[#F4C27A]"> Day{" "}
                                <span className="inline-flex items-center justify-center w-8 h-8 ml-2 text-sm rounded-full bg-linear-to-b from-gray-300 to-gray-500 text-white">
                                    {day}
                                </span>
                            </h2>

                            <p className="text-gray-200 leading-relaxed max-w-md">
                                "Text" refers to written or printed matter, the words of a book,
                                or an electronic message, but it can also refer to any readable
                                object like a street sign, painting, or even clothing.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
}
