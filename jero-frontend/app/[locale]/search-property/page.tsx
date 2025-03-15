import axios from "axios";
import { inDevEnvironment } from "@/base";
import SearchResults from "@/components/SearchResults/SearchResults";


// https://stackoverflow.com/questions/74580728/get-url-params-next-js-13
const Page = async ({searchParams} : any) =>{
    console.log(await searchParams)
    const sp = await searchParams;
    let data;
    console.log(sp)
    try {
      console.log("ttry")
      const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
      const response = await axios.get(`${base}/property/search-properties`, {
        params : sp
      });
      console.log(response.data)
      data = response.data;
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            <h1>Search For {sp.location}</h1>
            <SearchResults propertyAttributes={data}  />
        </div>
    )
}

export default Page;