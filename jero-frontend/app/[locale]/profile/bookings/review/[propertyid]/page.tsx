import { inDevEnvironment } from "@/base";
import Review from "@/components/Profile/Booking/Review/Review";
import { cookies } from "next/headers";

const page = async ({params}: {params: Promise<{ property_id : string }>;}) => {
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    }
    const id = jwtValue ? parseJWT(jwtValue).id : null;
    console.log("id" + id);
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const { property_id }: {property_id: string} = await params;

    return (
        <div>
            <Review/>
        </div>
    )

}

export default page