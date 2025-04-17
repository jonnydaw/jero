//https://stackoverflow.com/questions/79124951/type-error-in-next-js-route-type-params-id-string-does-not-satis

import { inDevEnvironment } from "@/base";
import PropertyCustomer from "@/components/Property/customer/PropertyCustomer";
import { DateTime } from "luxon";
import { cookies, headers } from 'next/headers'
import { getSelectorsByUserAgent } from "react-device-detect"



 // https://stackoverflow.com/questions/77412027/using-next-13-5-6-app-router-how-to-get-params-of-dynamic-route
 // https://stackoverflow.com/questions/74889841/how-to-get-query-params-using-server-component-next-13
const page = async ({params, searchParams}: {params: Promise<{ property_id : string }>; searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;}) => {
        const cookieStore = await cookies();
        const jwtValue = cookieStore.get("JWT")?.value;
        const parseJWT = (jwtValue : string) => {
            return (JSON.parse(atob(jwtValue.split('.')[1])))
        }
        const id = jwtValue ? parseJWT(jwtValue).id : null;
        const role = jwtValue ? parseJWT(jwtValue).role : null;
        console.log("id" + id);
        const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
        const { property_id }: {property_id: string} = await params;
        const queries = await searchParams;

        const startDate =  queries?.startdate || DateTime.now().plus({days: 30})
        const endDate =  queries?.enddate || DateTime.now().plus({days: 35})
        const adultCount =  queries?.numadults
        const childCount =  queries?.numhildren
        const petCount =  queries?.numpets
        const {isMobile} = getSelectorsByUserAgent(
            (await headers()).get("user-agent") ?? ""
        )

        const headersList = await headers()
        console.log(property_id)
        console.log("start " +String(startDate))
        console.log("fake " + String(new Date().toISOString().split('T')[0]))
        if(property_id === "67f6ae5881ebbd6dc69897e1"){
            return(
                <div>
                    <h1>Sorry this property has been deleted</h1>
                </div>
            )
        }
    
    let property;
    try{
        const response = await fetch(`${baseApi}/property/${property_id}`, {
            method: "GET",
        });
        property = await response.json();
        console.log(property)
        }catch(error : any){
            console.error(error);
        }
    
    if(!property){
        return(
            <div>
              <h1 style={{textAlign: "center", "padding" : "1em"}}>Sorry we cannot display this property right now</h1>
            </div>
        )
    }    
    return (
        <div>
            {/* <p>ID: {JSON.stringify(property)}</p> */}
            <PropertyCustomer propertyAttributes={{
                id: property_id,
                ownerId: property.ownerId,
                title: property.title,
                description: property.description,
                pricePerNight: property.pricePerNight,
                priceIncreasePerPerson: property.priceIncreasePerPerson,
                acceptsChildren: property.acceptsChildren,
                acceptsPets: property.acceptsPets,
                disabilityFriendly: property.disabilityFriendly,
                rules: property.rules,
                numberDoubleBeds: property.numberDoubleBeds,
                numberSingleBeds: property.numberSingleBeds,
                numberHammocks: property.numberHammocks,
                numberSofaBeds: property.numberSofaBeds,
                numBedrooms : property.numBedrooms,
                numBathrooms : property.numberBathrooms,
                longitude: property.longitude,
                latitude: property.latitude,
                images: property.imageUrls,
                healthAndSafety: property.healthAndSafetyData,
                kitchen: property.kitchenData,
                transport: property.transportData,
                laundry: property.laundryData,
                climateControl: property.climateData,
                water: property.waterData,
                beauty: property.beautyData,
                entertainment: property.entertainmentData,
                blockedDate: property.blockedDates,
                reviews : property.reviews,
                reviewScore : property.percentile,
                profileInfo : property.profileCardInfo,
                maxGuests: property.maxGuests,
                minGuests: property.minGuests
            }} userDeets={{
                id: id,
                role : role,
                startDate: String(startDate),
                endDate: String(endDate),
                numAdults: Number(adultCount),
                numChildren: Number(childCount),
                numPets: Number(petCount)
            }} isMobile={isMobile}  />
        </div>
    )
}

export default page;