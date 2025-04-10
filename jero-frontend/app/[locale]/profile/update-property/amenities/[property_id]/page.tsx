import { inDevEnvironment } from "@/base";
import Step3GuestManagement from "@/components/AddProperty/step3/Step3GuestManagement";
import Step4Amenities from "@/components/AddProperty/step4/Step4Amenities";
import UpdatePropertyImages from "@/components/Profile/ManageProperties/UpdatePropertyImages/UpdatePropertyImages";

import { cookies } from "next/headers";

const page = async ({params}: {params: Promise<{ property_id : string }>}) => {
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
    if(!id){
        return(
            <h1>no</h1>
        )
    }
    let amenities;
    try{
        const response = await fetch(`${baseApi}/property/get-amenities/${property_id}`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },
        });
        amenities = await response.json();
        console.log(amenities)
        }catch(error : any){
            console.error(error);
        }
    
        console.log()
    return(
        <div>
            <Step4Amenities isUpdate={true} data={amenities} propertyId={property_id} />
        </div>
    )

}

export default page;