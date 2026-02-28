import { RestaurantI } from '@/interfaces/restaurant'
import RestaurantClient from './RestaurantClient'

export default async function Restaurant() {

  const response = await fetch('http://egyptvoyage.runasp.net/api/Restaurants');
  const restaurants: RestaurantI[] = await response.json();

  return <>
    <RestaurantClient restaurants={restaurants} />
  </>
}
