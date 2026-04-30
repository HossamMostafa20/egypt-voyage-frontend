import { Facebook, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return <>
        <footer>
            <div className="overflow-hidden bg-linear-to-r from-[#0D3B66] via-[#0A2F52] to-[#061E36] text-[#F8DA9A] shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 px-8 md:px-14 py-12">

                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-extrabold mb-4">
                            Egypt Voyage
                        </h2>

                        <p className="max-w-md text-[#F8DA9A]/80 leading-7">
                            Explore Egypt&apos;s hotels, landmarks, restaurants, programs and virtual tours
                            with a simple and beautiful travel experience.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="w-11 h-11 rounded-full bg-[#F8DA9A] text-[#0D3B66] flex items-center justify-center hover:scale-110 transition">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="w-11 h-11 rounded-full bg-[#F8DA9A] text-[#0D3B66] flex items-center justify-center hover:scale-110 transition">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="w-11 h-11 rounded-full bg-[#F8DA9A] text-[#0D3B66] flex items-center justify-center hover:scale-110 transition">
                                <Send size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="mb-3">
                            <h3 className="text-xl font-bold">Explore</h3>
                            <span className="block w-12 h-0.75 bg-[#F8DA9A] mt-2 rounded-full"></span>
                        </div>

                        <ul className="space-y-3 text-[#F8DA9A]/80">
                            {[
                                ["Home", "/home"],
                                ["Hotels", "/hotel"],
                                ["Landmarks", "/landmark"],
                                ["Restaurants", "/restaurant"],
                                ["Programs", "/program"],
                            ].map(([label, href]) => (
                                <li key={label}>
                                    <Link href={href} className="hover:text-white transition">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="mb-3">
                            <h3 className="text-xl font-bold">Support</h3>
                            <span className="block w-12 h-0.75 bg-[#F8DA9A] mt-2 rounded-full"></span>
                        </div>


                        <ul className="space-y-4 text-[#F8DA9A]/80">
                            <li className="flex items-center gap-3">
                                Contact Us
                            </li>

                            <li className="flex items-center gap-3">
                                Help Center
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mx-8 md:mx-14 border-t border-[#F8DA9A]/25 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#F8DA9A]/70">
                    <p>© {new Date().getFullYear()} Egypt Voyage. All rights reserved.</p>

                    <div className="flex gap-5">
                        <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
