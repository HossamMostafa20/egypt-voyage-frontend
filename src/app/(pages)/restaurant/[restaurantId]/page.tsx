import { RestaurantI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import RestaurantDetailsClient from './RestaurantDetailsClient'

export default async function RestaurantDetails({ params }: { params: Params }) {

    let { restaurantId } = await params;
    console.log(restaurantId);

    const response = await fetch('http://egyptvoyage.runasp.net/api/Restaurants/' + restaurantId);
    const restaurant: RestaurantI = await response.json();
    console.log(restaurant);

    return <>
        <RestaurantDetailsClient restaurant={restaurant} />
    </>
}
