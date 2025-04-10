import { inDevEnvironment } from "@/base";
import UpdatePropertyImages from "@/components/Profile/ManageProperties/UpdatePropertyImages/UpdatePropertyImages";
import { cookies } from "next/headers";

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
    if(!id){
        return(
            <h1>no</h1>
        )
    }
    let propertyImages;
    try{
        const response = await fetch(`${baseApi}/property/get-property-images/${property_id}`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },
        });
        propertyImages = await response.json();
        console.log(propertyImages)
        }catch(error : any){
            console.error(error);
        }

    return(
        <div>
            <UpdatePropertyImages imgUrls={propertyImages} propertyId={property_id}/>
        </div>
    )

}

export default page;