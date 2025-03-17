import { inDevEnvironment } from "@/base";
import ManageProfile from "@/components/Profile/ManageProfile/ManageProfile";
import { cookies } from "next/headers";

const page = async () => {
    
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;


    
    
    return (

        <div>
            <ManageProfile firstName={""} lastName={""} introduction={""} imgLink={""} />
        </div>
    )
}

export default page;