import { HotelI } from '@/interfaces'
import HotelsClient from './HotelsClient'

export default async function Hotel() {

  const response = await fetch('http://egyptvoyage.runasp.net/api/Hotels');
  const hotels: HotelI[] = await response.json();

  return <>
    <HotelsClient hotels={hotels} />
  </>
}
