

// https://stackoverflow.com/questions/74580728/get-url-params-next-js-13
const Page = async ({searchParams} : any) =>{
    console.log(await searchParams)
    const sp = await searchParams;
    return (
        
        <div>
            <h1>Search For {sp.param}</h1>
        </div>
    )
}

export default Page;