'use client'

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import style from "./Step1AddProperty.module.css"
import next from 'next';
import { useRouter, usePathname } from 'next/navigation';
import { inDevEnvironment } from '@/base';

interface LocationResults {
    locationName : string,
    lat : number,
    lon : number,
    osm_id : string,
    osm_type : string
}

interface Address {

}

const osmTypeToChar = new Map<string,string>();
osmTypeToChar.set("node","N");
osmTypeToChar.set("way","W");
osmTypeToChar.set("relation","R");
osmTypeToChar.set("polygon","P");





const Step1AddProperty = () => {
    
    const [formData, setFormData] = useState<string>("");
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    //const [coords, setCoords] = useState<number[]>([0,0]);
    const [zoom, setZoom] = useState<number>(1)
    const [results, setResults] = useState<LocationResults[]>(
        // [{
        //     locationName : "",
        //     lat : 0,
        //     lon : 0
        // }]
    );
    const [chosen, setChosen] = useState<LocationResults>();


    const address = useRef<Address>("");
    const pathname = usePathname();
    

    // https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map/Map'),
        { 
          loading: () => <p>A map is loading</p>,
          ssr: false,
        }
      ), [chosen])

      const router = useRouter();
      const handleChange = (e : any) => {
        setFormData(e.target.value);
      }

      const handleSubmit = async (e: any) => {
        setChosen(undefined);
        setZoom(1);
        e.preventDefault();
        try {
            const response = await fetch(`/api/osm?q=${formData}`)
            const res = await response.json();
            setResults(res);
            console.log(res);
            const locationResults = res.map((element: any) => ({
                locationName: element.display_name,
                lat: element.lat,
                lon: element.lon,
                osm_id : element.osm_id,
                osm_type : element.osm_type
              }));
            
              setResults(locationResults); 
        } catch (error) {
            console.error(error)
        }
      }

      const handleSave = async (e : any) => {
        e.preventDefault();
        if(chosen){
  //          try {
                // const country = chosen.locationName.split(",").pop()?.trim()
                // const response = await fetch(`http://localhost:8080/country/get_country?country_name=${country}`, {
                //     next: {
                //         revalidate: 60 * 60 * 24 * 2,
                //     },
                // });
                    const type = osmTypeToChar.get(chosen.osm_type)
                    const newResponse = await fetch(`/api/osmId?osm_id=${type}${chosen.osm_id}`)
                    //console.log(await newResponse.json())
                    const data = await newResponse.json();
                    const addressData = data[0].address;
                    console.log("madres" + chosen.locationName);
                    const query = new URLSearchParams(addressData).toString();
                    console.log(query)

                    try {
                        const response = await fetch(`${baseApi}/location/get_location?${query}`, {
                            next: {
                                revalidate: 60 * 60 * 24 * 2,
                            },
                        });
                    const data  = await response.json()
                    console.log(data)
                    if(response.status === 404){
                        alert("Sorry we are not supporting that location yet.")
                    }
                    alert(data)
                    const combo = {...chosen, "hierarchy":data}
                    //const addressAndCoordinates : string[] = [chosen?.locationName, String(chosen.lat), String(chosen.lon), data]
                    localStorage.setItem("addressAndCoordinates", JSON.stringify(combo));
                    localStorage.set
                    // localStorage.setItem("address", chosen?.locationName);
                    // localStorage.setItem("lat", String(chosen.lat));
                    // localStorage.setItem("lon", String(chosen.lon)); 
                    const locale = (pathname.split("/").at(1));
                    router.push(`/${locale}/add-property/step2`);

                //}
            } catch (error) {
                //if(error.sta)
            }
        }

        }

      const handleRadioChange = (e : any, item : LocationResults) => {
        if(e.target.checked){
            console.log(item);
            setChosen(item);
            setZoom(15)
        }

      }
    
    
    return(
        <div id={style.container}>
                <Map position={[chosen?.lat || 0, chosen?.lon || 0]} zoom={zoom}/>
                <form  onSubmit={handleSubmit}>
                    <input onChange={handleChange}type="text" placeholder='Enter property location' value={formData}/>
                    <button>Search</button>
                </form>
            
           { results && 
            <> 
                <h3>Please choose your address</h3>
                <form onSubmit={handleSave}>
                {results.map((item, index) => (
                    <div key={index}>
                        <label htmlFor={item.locationName}>{item.locationName}</label>
                        <input 
                            onChange={(e) => handleRadioChange(e, item)} 
                            type='radio'  
                            id={item.locationName} 
                            name="address"
                            checked={chosen===item}
                            placeholder={item.locationName}/>
                    </div>
                ))}
                <button>Save address and continue.</button>
                </form>
            </>    
             }

        </div>
    )
}

export default Step1AddProperty;