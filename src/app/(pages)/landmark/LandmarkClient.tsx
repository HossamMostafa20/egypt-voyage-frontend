"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/context/FavoriteContext";
import { LandmarkI } from "@/interfaces";
import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function LandmarkClient({ landmarks }: { landmarks: LandmarkI[] }) {

    const { toggleFavorite, isFavorite, loading } = useFavorites();

    const [search, setSearch] = useState("");
    const filteredLandmarks = useMemo(() => {
        const s = search.trim().toLowerCase();
        if (!s) return landmarks;
        return landmarks.filter((l) =>
            l.landmarkName.toLowerCase().includes(s)
        );
    }, [landmarks, search]);

    return <>
        <form className="max-w-md mx-auto p-2 lg:p-3.5">
            <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
            <div className="flex gap-2 relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                </div>
                <Input type='search' id='search' className="ps-9" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button type="button" className="cursor-pointer bg-[#0D3B66]">Search</Button>
            </div>
        </form>

        <div className='container mx-auto p-2 lg:p-1.5 xl:p-2 md:p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch'>
            {filteredLandmarks.map((landmark) => {
                const isFav = isFavorite(landmark.id, "landmark");
                return (
                    <div key={landmark.id} className='p-0.5'>
                        <Card className="flex flex-col transform transition-all duration-500 hover:shadow-[0_0_13px_rgba(0,0,0,0.15)] hover:shadow-black">
                            <Link href={'/landmark/' + landmark.id}>
                                <div className="relative w-full aspect-4/3">
                                    <Image src={landmark.imageCover} alt={landmark.landmarkName} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover rounded-t-xl" />
                                </div>
                                <CardHeader className="flex-1">
                                    <CardTitle className="mt-2.5">{landmark.landmarkName.split(" ").slice(0, 6).join(" ")}</CardTitle>
                                    <CardAction className='justify-self-start mt-2'>{landmark.location.city}</CardAction>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex mt-1.5 items-center'>
                                            {Array.from({ length: landmark.rating }, (_, index) => (
                                                <StarIcon key={index} className='w-5 h-5 fill-yellow-300 text-yellow-300' />
                                            ))}
                                            <div className='ms-1.5 text-lg text-yellow-300'>{landmark.rating}</div>
                                        </div>
                                        <span className="font-bold mt-2 text-yellow-500">{landmark.price} EGP</span>
                                    </div>
                                    <CardDescription className='mt-2.5 mb-1.5 line-clamp-2'>{landmark.description}</CardDescription>
                                </CardHeader>
                            </Link>

                            <Button className={`mt-2.5 cursor-pointer mx-7 py-5 mb-5 bg-linear-to-b transition-all duration-300 from-[#D3A15C] to-[#00000055] text-white`} onClick={() => toggleFavorite(landmark.id, "landmark")} disabled={loading}>
                                <HeartIcon className={`me-2 size-5 transition-all duration-300 ${isFav ? "fill-white text-white scale-110" : ""}`} />
                                {isFav ? "Remove From Favourite" : "Add To Favourite"}
                            </Button>
                        </Card>
                    </div>
                );
            })}
        </div>
    </>
}
