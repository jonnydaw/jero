import { inDevEnvironment } from "@/base";
import Step3GuestManagement from "@/components/AddProperty/step3/Step3GuestManagement";
import Step4Amenities from "@/components/AddProperty/step4/Step4Amenities";
import Step5AddDescription from "@/components/AddProperty/step5/Step5AddDescriptions";
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
    let descriptions;
    try{
        const response = await fetch(`${baseApi}/property/get-descriptions/${property_id}`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },
        });
        descriptions = await response.json();
        console.log(descriptions)
        }catch(error : any){
            console.error(error);
        }
    
        console.log()
    return(
        <div>
            < Step5AddDescription isUpdate={true} data={descriptions} propertyId={property_id} />
        </div>
    )

}

export default page;