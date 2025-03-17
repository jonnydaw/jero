import { inDevEnvironment } from "@/base";
import { cookies } from "next/headers";

const page = async () => {
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;

    
    
    return (

        <div>
            <h1>hi</h1>
        </div>
    )
}

export default page;