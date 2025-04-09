import axios from "axios";
import { inDevEnvironment } from "@/base";
import SearchResults from "@/components/SearchResults/SearchResults";
// https://stackoverflow.com/questions/65436443/how-to-access-locale-in-custom-app-on-server-side-in-next-js
import { getLocale } from "next-intl/server";
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
    // const fullUrl = heads.get('referer') || "";
    // console.log(fullUrl)
    const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";


    let dataProperties;
    //console.log(sp.location)
    try {
      console.log("ttry")
      const response = await axios.get(`${base}/property/search-properties`, {
        params : sp,

      });
      console.log("response: " + JSON.stringify(response.data))
      dataProperties = response.data;
    } catch (error) {
        console.error(error);
        console.log(JSON.stringify(sp));
    }
    if(!dataProperties){
      return(
        <div>
          <h1>No properties found</h1>
        </div>
      )
    }

    const actualLocation = dataProperties[0].searched;
    console.log("actual " + actualLocation)
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
      //firstName = await response.text();
  
      }catch(error : any){
          console.error(error);
      }
    // try {
    //   console.log("ttry")
    //   const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    //   const response = await axios.get(`${base}/location/location-overview`, {params : sp},
    //     {withCredentials: true}
    //   );
    //   console.log(response.data)
    //   overviewData = response.data;
    // } catch (error) {
    //     //console.error(error)
    // }
    console.log("overview " + overviewData);
    //overviewData = "hi"


    return (
        <div>
            <h1>Search For {sp.location}</h1>
            <SearchResults propertyAttributes={dataProperties} locationOverview={overviewData} isMobile={isMobile} />
        </div>
    )
}

export default Page;