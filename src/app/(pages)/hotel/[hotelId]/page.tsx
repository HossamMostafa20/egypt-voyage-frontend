import { Button } from '@/components/ui/button'
import { Facebook, Globe, HeartIcon, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function HotelDetails() {
    return <>
        <div className="container mx-auto pb-15">
            {/* IMAGE */}
            <div className="pt-6">
                <div className="px-6">
                    <div className="relative w-full h-85 lg:h-105 overflow-hidden">
                        <Image src="/img1.png" alt="The Nile Ritz Carlton" fill priority />
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="px-6 mt-3">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* LEFT SIDE */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#FBBF6D]">The Nile Ritz-Carlton</h1>

                        {/* ICONS */}
                        <div className="flex mt-0 md:mt-1.5 lg:mt-2 gap-4 text-[#0D3B66]">
                            <Globe className="cursor-pointer hover:scale-110 transition" />
                            <Facebook className="cursor-pointer hover:scale-110 transition" />
                            <MapPin className="cursor-pointer hover:scale-110 transition" />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <Button className="w-full sm:w-auto cursor-pointer px-6 py-5 lg:px-7 lg:py-6 mb-2 md:mb-3 mt-0 lg:mt-2 rounded-full shadow-xl bg-linear-to-b from-[#D3A15C] to-[#00000055] hover:scale-95 transition">
                        Add To Favourite
                    </Button>
                </div>

                {/* INFO */}
                <div className="space-y-2 mt-2 text-[#0D3B66] font-medium">
                    <p>City : <span className="text-[#F4C27A] ml-2">Cairo</span></p>

                    <div className="flex items-center gap-2">Level :
                        <div className="flex text-[#F4C27A]">
                            {[...Array(4)].map((_, i) => (
                                <Star key={i} fill="#F4C27A" stroke="none" />
                            ))}
                            {[...Array(1)].map((_, i) => (
                                <Star key={i} />
                            ))}
                        </div>
                    </div>

                    <p>Category :<span className="text-[#F4C27A] ml-2">Hotel</span></p>
                </div>

                {/* OVERVIEW */}
                <div className="mt-5">
                    <h2 className="text-3xl font-semibold text-[#0D3B66]">Overview</h2>
                    <p className="text-[#FBBF6D] mt-2 max-w-5xl">
                        Text" refers to written or printed matter, the words of a book, or an electronic message, but it can also refer to any,Text" refers to written or printed , the words of a book, or an electronic message, but it can also refer to any
                        <span className="ml-2 underline cursor-pointer">
                            Read more...
                        </span>
                    </p>
                </div>

                {/* MAKE REVIEW BUTTON */}
                <div className="flex justify-end me-10 mt-6">
                    <button className="px-4 py-3 rounded-t-3xl bg-[#E1864F] text-white text-lg shadow-lg cursor-pointer">Make Review</button>
                </div>

                {/* REVIEWS CARD */}
                <div className="bg-[#d2ab6d] rounded-3xl shadow-2xl p-8 space-y-6">

                    {/* REVIEW 1 */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-500" />

                        <div className="flex-1">
                            <div className="flex justify-between flex-wrap">
                                <div>
                                    <h4 className="font-semibold text-lg text-[#0D3B66]">Ahmed Youssef</h4>
                                    <p className="text-sm">Egypt / 1-1-2023</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#0D3B66]">
                                        {[...Array(4)].map((_, i) => (
                                            <Star key={i} fill="#0D3B66" stroke="none" size={20} />
                                        ))}
                                        {[...Array(1)].map((_, i) => (
                                            <Star key={i} size={20} />
                                        ))}
                                    </div>

                                    <span className="text-md">very nice</span>
                                </div>
                            </div>

                            <hr className="mt-4 border-[#0D3B66]" />
                        </div>
                    </div>

                    {/* REVIEW 2 */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-500" />

                        <div className="flex-1">
                            <div className="flex justify-between flex-wrap">
                                <div>
                                    <h4 className="font-semibold text-lg text-[#0D3B66]">Hossam Omar</h4>
                                    <p className="text-sm">Egypt / 12-3-2021</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#0D3B66]">
                                        {[...Array(3)].map((_, i) => (
                                            <Star key={i} fill="#0D3B66" stroke="none" size={20} />
                                        ))}
                                        {[...Array(2)].map((_, i) => (
                                            <Star key={i} size={20} />
                                        ))}
                                    </div>

                                    <span className="text-md">good</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
