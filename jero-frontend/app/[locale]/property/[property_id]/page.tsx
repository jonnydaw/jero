
 // https://stackoverflow.com/questions/77412027/using-next-13-5-6-app-router-how-to-get-params-of-dynamic-route
export const page = ({ params }: { params: { property_id: string } }) => {

  return <p>Post: {params?.property_id}</p>
}

export default page;