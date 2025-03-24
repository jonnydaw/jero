import { inDevEnvironment } from "@/base";
import Booking from "@/components/Profile/Booking/Booking";
import { BookingProperty } from "@/types/types";
import { cookies } from "next/headers";

const page = async () => {
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
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
    console.log(isCustomer)
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
    
        }catch(error : any){
            console.error(error);
        }


    console.log(vals)
    // cannot stand js "objects" anymore. 
    const data  : Map<String, BookingProperty[]> = new Map(Object.entries(vals)) 
    return (

        <div>
            <Booking bookings={data} isCustomer={isCustomer}/>
        </div>
    )
}

export default page;