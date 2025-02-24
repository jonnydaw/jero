
 // https://stackoverflow.com/questions/77412027/using-next-13-5-6-app-router-how-to-get-params-of-dynamic-route
const page = async ({params}: {params: Promise<{ property_id: string }>}) => {

    const { property_id } = await params
    return <p>ID: {property_id}</p>
}

export default page;