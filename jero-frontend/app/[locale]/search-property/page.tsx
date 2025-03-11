import axios from "axios";


// https://stackoverflow.com/questions/74580728/get-url-params-next-js-13
const Page = async ({searchParams} : any) =>{
    console.log(await searchParams)
    const sp = await searchParams;
    console.log(sp)
    try {
      console.log("ttry")
      const response = await axios.get("https://api.jero.travel/property/search-properties", {
        params : sp
      });
      console.log(response.data)
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            <h1>Search For {sp.location}</h1>
        </div>
    )
}

export default Page;