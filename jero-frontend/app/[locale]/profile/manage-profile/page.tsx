import { inDevEnvironment } from "@/base";
import ManageProfile from "@/components/Profile/ManageProfile/ManageProfile";
import { cookies } from "next/headers";

const page = async () => {
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;

    let propVals;
    try{
        // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
        const response = await fetch(`${baseApi}/profile/get-update-fields`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        propVals = (await response.json())
        //firstName = await response.text();
    
        }catch(error : any){
            console.error(error);
        }


    
    
    return (

        <div>
            <ManageProfile firstName={propVals.firstName || "no name"} lastName={propVals.lastName} introduction={propVals.introduction || "Your intro here"} imgLink={propVals.profileImgUrl} />
        </div>
    )
}

export default page;