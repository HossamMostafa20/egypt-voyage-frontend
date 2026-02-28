import { LandmarkI } from '@/interfaces'
import LandmarkClient from './LandmarkClient'

export default async function Landmark() {

  const response = await fetch('http://egyptvoyage.runasp.net/api/Landmarks');
  const landmarks: LandmarkI[] = await response.json();

  return <>
    <LandmarkClient landmarks={landmarks} />
  </>
}
