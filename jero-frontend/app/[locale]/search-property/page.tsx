import axios from "axios";
import { inDevEnvironment } from "@/base";
import SearchResults from "@/components/SearchResults/SearchResults";
// https://stackoverflow.com/questions/65436443/how-to-access-locale-in-custom-app-on-server-side-in-next-js
import { getLocale } from "next-intl/server";
import { headers } from "next/headers"
import { getSelectorsByUserAgent } from "react-device-detect"



// https://stackoverflow.com/questions/74580728/get-url-params-next-js-13
const Page = async ({searchParams} : any) =>{
    console.log(await searchParams)
    const sp = await searchParams;
    const locale =  await getLocale();
    console.log(locale)
    const {isMobile} = getSelectorsByUserAgent(
      (await headers()).get("user-agent") ?? ""
  )
    // const fullUrl = heads.get('referer') || "";
    // console.log(fullUrl)


    let dataProperties;
    console.log(sp)
    try {
      console.log("ttry")
      const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
      const response = await axios.get(`${base}/property/search-properties`, {
        params : sp
      });
      console.log(response.data)
      dataProperties = response.data;
    } catch (error) {
        console.error(error);
        console.log(JSON.stringify(sp));
    }

    let overviewData = "hi";
    // try {
    //   console.log("ttry")
    //   const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    //   const response = await axios.get(`${base}/location/location-overview`, {
    //     params : {...sp,"locale" : locale}
    //   });
    //   console.log(response.data)
    //   overviewData = response.data;
    // } catch (error) {
    //     console.error(error)
    // }

    return (
        <div>
            <h1>Search For {sp.location}</h1>
            <SearchResults propertyAttributes={dataProperties} locationOverview={overviewData} isMobile={isMobile} />
        </div>
    )
}

export default Page;