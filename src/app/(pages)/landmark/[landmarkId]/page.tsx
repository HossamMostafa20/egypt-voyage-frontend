import { LandmarkI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import LandmarkDetailsClient from './LandmarkDetailsClient'

export default async function LandmarkDetails({ params }: { params: Params }) {

    let { landmarkId } = await params;
    console.log(landmarkId);

    const response = await fetch('http://egyptvoyage.runasp.net/api/Landmarks/' + landmarkId);
    const landmark: LandmarkI = await response.json();
    console.log(landmark);

    return <>
        <LandmarkDetailsClient landmark={landmark} />
    </>
}
