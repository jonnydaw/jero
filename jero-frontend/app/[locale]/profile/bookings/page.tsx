import { inDevEnvironment } from "@/base";
import Booking from "@/components/Profile/Booking/Booking";
import { BookingProperty } from "@/types/types";
import { cookies } from "next/headers";
import { isMobile } from "react-device-detect";
import { headers } from "next/headers"
import { getSelectorsByUserAgent } from "react-device-detect"
import { getTranslations } from "next-intl/server";

const page = async () => {
    const t = await getTranslations('Errors');
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const {isMobile} = getSelectorsByUserAgent(
        (await headers()).get("user-agent") ?? ""
    )
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    }

    if(!jwtValue){
        // redirect
        return null;
    }
    const isCustomer : boolean = parseJWT(jwtValue).role === "customer";
    //console.log(isCustomer)
    let errorMessage = "";
    let vals
    try{
        // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
        const response = await fetch(`${baseApi}/booking/get-upcoming-bookings`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        vals  = (await (response.json()))
        //firstName = await response.text();
        if(response.status !== 200){
            errorMessage = "Sorry we cannot display this data at the moment"
            console.log(errorMessage)
        }
        }catch(error : any){
            console.log(error.message)
            errorMessage = errorMessage.length > 0 ? errorMessage : error.message;
        }

    if(errorMessage.length > 0){
        return (
            <div>
                <h1>{errorMessage}</h1>
            </div>
        )
    }

    //console.log(vals)
    // cannot stand js "objects" anymore. 
    const data  : Map<String, BookingProperty[]> = new Map(Object.entries(vals)) 
    //console.log("bookingdata " + JSON.stringify(data))
    return (

        <div>
            <Booking isMobile={isMobile} bookings={data} isCustomer={isCustomer}/>
        </div>
    )
}

export default page;