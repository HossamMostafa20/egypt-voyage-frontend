import { HotelI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params';
import HotelsDetailsClient from './HotelsDetailsClient';

export default async function HotelDetails({ params }: { params: Params }) {

    let { hotelId } = await params;
    console.log(hotelId);

    const response = await fetch('http://egyptvoyage.runasp.net/api/Hotels/' + hotelId);
    const hotel: HotelI = await response.json();
    console.log(hotel);

    return <>
        <HotelsDetailsClient hotel={hotel} />;
    </>
}
