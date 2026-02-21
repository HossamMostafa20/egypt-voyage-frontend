"use client"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import React from 'react'

export default function Slider({ images }: { images: string[] }) {
    return <>
        <div className="relative w-full">
            <Carousel opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 2500,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-75 sm:h-100 lg:h-125 overflow-hidden rounded-3xl">
                                <Image src={img} alt={`hotel-image-${index}`} fill className="object-center" priority />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    </>
}
