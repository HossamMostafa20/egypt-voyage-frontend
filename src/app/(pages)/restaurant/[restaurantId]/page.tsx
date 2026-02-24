import Slider from '@/components/Slider/Slider'
import { Button } from '@/components/ui/button'
import { RestaurantI } from '@/interfaces'
import { Facebook, Globe, MapPin, Star, StarIcon } from 'lucide-react'
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function RestaurantDetails({ params }: { params: Params }) {

    let { restaurantId } = await params;
    console.log(restaurantId);

    const response = await fetch('http://egyptvoyage.runasp.net/api/Restaurants/' + restaurantId);
    const restaurant: RestaurantI = await response.json();
    console.log(restaurant);

    const totalStars = 5
    const safeRating = Math.min(
        Math.max(restaurant.rating ?? 0, 0),
        totalStars
    )

    return <>
        <div className="pb-20">
            <div className="container mx-auto px-6">
                {/* IMAGE */}
                <div className="pt-10">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <Slider images={restaurant.images} />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="mt-8">

                    {/* HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="space-y-3">
                            {/* <h1 className="text-3xl lg:text-4xl font-bold text-[#0D3B66]">{landmark.landmarkName}</h1> */}

                            <div className="flex items-center gap-6 text-[#0D3B66]">
                                <h1 className="text-3xl lg:text-4xl font-bold text-[#0D3B66]">{restaurant.restaurantName}</h1>
                                <Link href={restaurant.location.address}>
                                    <MapPin className="cursor-pointer mt-2 hover:scale-110 transition" />
                                </Link>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <Button className="px-8 py-6 rounded-full shadow-lg bg-[#daab65] text-white hover:bg-[#c3985c] transition cursor-pointer">
                            Add To Favourite
                        </Button>
                    </div>

                    {/* INFO GRID */}
                    <div className=" mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl">
                        {/* City */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-sm tracking-wide">City</p>
                            <p className="font-semibold text-white text-lg sm:text-xl">{restaurant.location.city}</p>
                        </div>

                        {/* Opening Hour */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-sm tracking-wide">Opening Hour</p>
                            <p className="font-semibold text-white text-lg sm:text-xl">{restaurant.openingHour}</p>
                        </div>

                        {/* Closing Hour */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-sm tracking-wide">Closing Hour</p>
                            <p className="font-semibold text-white text-lg sm:text-xl">{restaurant.closingHour}</p>
                        </div>

                        {/* CuisineType */}
                        <div className="space-y-1">
                            <p className="text-white/75 text-sm tracking-wide">CuisineType</p>
                            <p className="font-semibold text-white text-lg sm:text-xl">{restaurant.cuisineType}</p>
                        </div>

                        {/* Rating */}
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <p className="text-white/75 text-sm tracking-wide">Level</p>
                            <div className="flex justify-center gap-1.5">
                                {Array.from({ length: totalStars }, (_, index) => {
                                    const isFilled = index < Math.floor(safeRating)
                                    return (<StarIcon key={index} className={`w-5 h-5 sm:w-6 sm:h-6 transition ${isFilled ? "text-yellow-400 fill-yellow-400" : "text-white/30"}`} />)
                                })}
                            </div>
                        </div>
                    </div>

                    {/* OVERVIEW */}
                    {/* <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl">
                        <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
                        <p className="text-white/85 leading-relaxed">{restaurant.description}</p>
                    </div> */}


                    {/* REVIEW BUTTON */}
                    <div className="flex justify-end mt-10">
                        <Button className="px-8 py-6 rounded-full bg-linear-to-r from-[#D3A15C] to-[#B48A4A] text-white shadow-xl hover:scale-95 transition cursor-pointer">
                            Make Review
                        </Button>
                    </div>


                    {/* REVIEWS */}
                    <div className="mt-5 space-y-6">
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
                    </div>

                </div>
            </div>
        </div>
    </>
}
