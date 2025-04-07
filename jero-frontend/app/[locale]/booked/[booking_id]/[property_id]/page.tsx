import { cookies, headers } from "next/headers";
import { inDevEnvironment } from "@/base";
import { redirect } from 'next/navigation'
import PropertyBooked from "@/components/Property/booked/PropertyBooked";
import { getSelectorsByUserAgent } from "react-device-detect"
import { NextResponse } from "next/server";




const page = async ({params}: {params: Promise<{ booking_id : string, property_id : string }>;}) => {
    const {isMobile} = getSelectorsByUserAgent(
        (await headers()).get("user-agent") ?? ""
    )
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const rtValue = cookieStore.get("RT")?.value;

    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    if(!jwtValue || ! rtValue){
        redirect(`/${locale}`);
    }
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    };
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const internal = inDevEnvironment ? "http://localhost:3000" : "https://www.jero.travel";

    const id = jwtValue ? parseJWT(jwtValue).id : null;
    const { property_id }: {property_id: string} = await params;
    const { booking_id }: {booking_id: string} = await params;

    console.log(`${internal}/${locale}`)

    let property;
    let errorFlag: boolean = false; 
    //https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
    let redirectPath: string | null = null
    try{
        const response = await fetch(`${baseApi}/property/booked-property/${booking_id}/${property_id}`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        if(response.status !== 200){
            redirectPath = locale
        }
        property = await response.json();
        console.log(property)
        }catch(error : any){
            console.error("weeoe")
            console.error(error);
            // redirect(`/${locale}`);
        } finally{
            // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
            if (redirectPath)
                redirect(`/${redirectPath}`)
        }
    
    return(
        <div>
            
            <PropertyBooked propertyAttributes={
                {
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
                    guide : property.guide,
                    address : property.address
                }
            } userDeets={{
                id: null,
                role: null,
                startDate: "",
                endDate: "",
                numAdults: 0,
                numChildren: 0,
                numPets: 0
            }} isMobile={isMobile}/>
        </div>
    )
}

export default page;