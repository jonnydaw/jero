import { inDevEnvironment } from "@/base";
import Booking from "@/components/Profile/Booking/Booking";
import { cookies } from "next/headers";

const page = async () => {
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    let vals
    try{
        // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
        const response = await fetch(`${baseApi}/booking/get-upcoming-bookings`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        vals  = (await response.json())
        //firstName = await response.text();
    
        }catch(error : any){
            console.error(error);
        }


    console.log(vals)
    
    return (

        <div>
            <Booking bookings={vals}/>
        </div>
    )
}

export default page;