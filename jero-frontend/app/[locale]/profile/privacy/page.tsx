import { inDevEnvironment } from "@/base";
import Privacy from "@/components/Profile/Privacy/Privacy";
import { cookies } from "next/headers";

const page = async () => {

    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
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
            <Privacy showNameOnReviews={settings.review} showProfileAfterBooking={settings.profile} allowAnalysisOnBookings={settings.analysis}/>
        </div>
    )
}

export default page;