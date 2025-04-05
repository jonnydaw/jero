import { inDevEnvironment } from "@/base";
import PrivacyCustomer from "@/components/Profile/Privacy/PrivacyCustomer";
import PrivacyHost from "@/components/Profile/Privacy/PrivacyHost";
import { cookies } from "next/headers";

const page = async () => {

    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    }
    if(!jwtValue){
        return;
    }
    const isCustomer = parseJWT(jwtValue).role === "customer";
        let settings;
        try{
        // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
        const response = await fetch(`${baseApi}/profile/privacy-settings`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        settings = (await response.json())
        console.log(settings);
    
        }catch(error : any){
            console.error(error);
        }
        return(
            <div>
                <h1>Privacy</h1>
                {
                    isCustomer
                    ?
                    <PrivacyCustomer showNameOnReviews={settings.review} showProfileAfterBooking={settings.profile} allowAnalysisOnBookings={settings.analysis}/>
                    :
                    <PrivacyHost showProfileOnPropertyPage={settings.review} showProfileAfterBooking={settings.profile} allowAnalysisOnBookings={settings.analysis}/>


                }
            </div>
        )

   
}

export default page;