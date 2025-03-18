//https://stackoverflow.com/questions/79124951/type-error-in-next-js-route-type-params-id-string-does-not-satis

import { inDevEnvironment } from "@/base";
import { cookies } from 'next/headers'


 // https://stackoverflow.com/questions/77412027/using-next-13-5-6-app-router-how-to-get-params-of-dynamic-route
const page = async ({params}: {params: Promise<{ property_id: string }>}) => {
        const cookieStore = await cookies();
        const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
        const { property_id } = await params;
        console.log(property_id)

    let property;
    try{
        const response = await fetch(`${baseApi}/property/${property_id}`, {
            method: "GET",
        });
        property = await response.json();
        console.log(property)
        }catch(error : any){
            console.error(error);
        }
    return <p>ID: {property_id}</p>
}

export default page;