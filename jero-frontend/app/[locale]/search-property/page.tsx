import axios from "axios";
import { inDevEnvironment } from "@/base";
import SearchResults from "@/components/SearchResults/SearchResults";
// https://stackoverflow.com/questions/65436443/how-to-access-locale-in-custom-app-on-server-side-in-next-js
import { getLocale, getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers"
import { getSelectorsByUserAgent } from "react-device-detect"



// https://stackoverflow.com/questions/74580728/get-url-params-next-js-13
const Page = async ({searchParams} : any) =>{
    console.log(await searchParams)
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
    const sp = await searchParams;
    const locale =  await getLocale();
    console.log(locale)
    const {isMobile} = getSelectorsByUserAgent(
      (await headers()).get("user-agent") ?? ""
  )

    const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const t = await getTranslations("SearchResults");
    
    // https://stackoverflow.com/questions/64251462/how-do-i-return-array-of-keys-that-have-only-empty-values-in-the-objects
    let emptyKeys = Object.keys(sp).filter(key => sp[key] === '');;
    
    if(emptyKeys.length > 0){
      return(
        <div>
          <h1 style={{textAlign: "center", "padding" : "1em"}}>You need the {emptyKeys}</h1>
        </div>
      )
    }


    let dataProperties;

    try {
      const response = await axios.get(`${base}/property/search-properties`, {
        params : sp,

      });

      dataProperties = response.data;
    } catch (error : any) {
        if(error.status === 404){
          return(
                <div>
                  <h1 style={{textAlign: "center", "padding" : "1em"}}>Sorry This Location Is Not supported</h1>
                </div>
              )
        }else if(error.status === 400){
          
          return(
            <div>
              <h1 style={{textAlign: "center", "padding" : "1em"}}>{JSON.stringify(sp)}</h1>
            </div>
          )
        }
    }
    
    // console.log(dataProperties)
    if(dataProperties.length === 0){
      // console.log("hit")
      return(
        <div>
          <h1>{t('noneFound')}</h1>
        </div>
      )
    }

    const actualLocation = dataProperties[0].searched;
    let overviewData;
    try{
      // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
      const response = await fetch(`${base}/location/location-overview?location=${actualLocation}&start=${sp.startdate}`, {
          method: "GET",
          headers: {
              Cookie: `NEXT_LOCALE=${localeCookie};`
          },
      });
      overviewData  = (await (response.json()))
      console.log(overviewData)
  
      }catch(error : any){
          console.error(error);
      }

    //console.log("overview " + overviewData);



    return (
        <div style={{paddingTop : "1vh"}}>
            <h1 style={{paddingLeft : "1em"}}>{t('showing')} {sp.location}</h1>
            <SearchResults propertyAttributes={dataProperties} locationOverview={overviewData} isMobile={isMobile} />
        </div>
    )
}

export default Page;