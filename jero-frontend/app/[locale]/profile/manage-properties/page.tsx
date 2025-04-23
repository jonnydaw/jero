import { inDevEnvironment } from "@/base";
import ManageProperties from "@/components/Profile/ManageProperties/ManageProperties";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect"


const page = async () => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const {isMobile} = getSelectorsByUserAgent(
        (await headers()).get("user-agent") ?? ""
    )
    const t = await getTranslations('PropertyUpdateModal');
    let dataProperties;
    ;
    try{
        // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
        const response = await fetch(`${baseApi}/property/get-owner-properties`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        dataProperties = (await response.json())
        //firstName = await response.text();
    
        }catch(error : any){
            console.error(error);
        }

        if(!dataProperties){
            return(
              <div>
                <h1>No properties found</h1>
              </div>
            )
          }

    //console.log("mange " + JSON.stringify(dataProperties))
    
    return (
        <div>
            <div style={{textAlign: "center", "margin" : "1em", fontSize:"x-large"}}>
              <Link  href={`/add-property/step1`}>{t('add')}</Link>
              </div>
            <ManageProperties propertyAttributes={dataProperties} isMobile={isMobile}/>
        </div>
    )
}

export default page;