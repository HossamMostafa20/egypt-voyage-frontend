import Slider from '@/components/Slider/Slider'
import { Button } from '@/components/ui/button'
import { ProgramI } from '@/interfaces'
import { Facebook, Globe, MapPin, Star } from 'lucide-react'
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function ProgramDetails({ params }: { params: Params }) {

    let { programId } = await params;
    console.log(programId);

    const response = await fetch('http://egyptvoyage.runasp.net/api/Programs/' + programId);
    const program: ProgramI = await response.json();
    console.log(program);

    return <>
        <div className="pb-10">
            <div className="container mx-auto px-6">
                {/* IMAGE */}
                <div className="pt-10">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <Slider images={program.images} />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="mt-8">

                    {/* HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* LEFT SIDE */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-8 text-[#0D3B66]">
                                <h1 className="text-3xl lg:text-4xl font-bold text-[#0D3B66]">{program.name}</h1>
                                <Link href={program.link}>
                                    <Globe className="cursor-pointer mt-2 hover:scale-110 transition" />
                                </Link>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <Button className="px-8 py-6 rounded-full shadow-lg bg-[#daab65] text-white hover:bg-[#c3985c] transition cursor-pointer">
                            Add To Favourite
                        </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-3xl shadow-2xl">
                        {/* City */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-xs sm:text-sm tracking-wide">City</p>
                            <p className="font-semibold text-white text-base sm:text-lg md:text-xl">{program.country}</p>
                        </div>

                        {/* Duration */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-xs sm:text-sm tracking-wide">Duration</p>
                            <p className="font-semibold text-white text-base sm:text-lg md:text-xl">{program.duration}</p>
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-xs sm:text-sm tracking-wide">Price</p>
                            <p className="font-semibold text-white text-base sm:text-lg md:text-xl">{program.price.toLocaleString()} EGP</p>
                        </div>
                    </div>

                    {/* OVERVIEW */}
                    <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl">
                        <h2 className="text-2xl font-semibold text-white mb-6">Overview</h2>

                        <div className="relative">
                            {/* Timeline line */}
                            {/* <div className="absolute left-4.5 top-2 bottom-2 w-0.5 bg-linear-to-b from-[#D3A15C] via-[#D3A15C]/70 to-transparent" /> */}

                            <div className="space-y-8">
                                {program.description
                                    ?.split("\n\n")
                                    .filter((text: string) => text.trim() !== "")
                                    .map((text: string, index: number) => (
                                        <div key={index} className="relative pl-10 sm:pl-14 group transition-all duration-300">
                                            {/* Circle */}
                                            <div className="absolute left-0 sm:left-2 top-1 w-6 h-6 rounded-full bg-linear-to-br from-[#D3A15C] to-[#836c59] flex items-center justify-center shadow-md">
                                                <span className="text-white text-xs font-bold">{index + 1}</span>
                                            </div>

                                            {/* Text */}
                                            <p className="text-white/80 leading-relaxed text-sm sm:text-base group-hover:text-white transition-colors duration-300">{text.trim()}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* REVIEW BUTTON */}
                    {/* <div className="flex justify-end mt-10">
                        <Button className="px-8 py-6 rounded-full bg-linear-to-r from-[#D3A15C] to-[#B48A4A] text-white shadow-xl hover:scale-95 transition cursor-pointer">
                            Make Review
                        </Button>
                    </div> */}


                    {/* REVIEWS */}
                    {/* <div className="mt-5 space-y-6">
                        {[1, 2].map((item, index) => (
                            <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-full bg-white/20" />
                                <div className="flex-1">
                                    <div className="flex justify-between flex-wrap gap-3">
                                        <div>
                                            <h4 className="font-semibold text-white">Ahmed Youssef</h4>
                                            <p className="text-sm text-white/60">Egypt • 1-1-2023</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex text-[#F4C27A]">
                                                {[...Array(4)].map((_, i) => (
                                                    <Star key={i} fill="#F4C27A" stroke="none" size={18} />
                                                ))}
                                                <Star size={18} />
                                            </div>
                                            <span className="text-sm text-white/80">very nice</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}

                </div>
            </div>
        </div>
    </>
}
