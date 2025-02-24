'use client'

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import style from "./Step1AddProperty.module.css"

const Step1AddProperty = () => {
    const [formData, setFormData] = useState<string>("");
    const [coords, setCoords] = useState<number[]>([0,0]);
    const [zoom, setZoom] = useState<number>(1)

    // https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map/Map'),
        { 
          loading: () => <p>A map is loading</p>,
          ssr: false,
        }
      ), [coords])


      const handleChange = (e : any) => {
        setFormData(e.target.value);
      }

      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/osm?q=${formData}`)
            const res = await response.json();
            //console.log(res)
            const lat = res[0]?.lat
            const lon = (res[0]?.lon)
            setCoords([lat,lon])
            setZoom(10)
        } catch (error) {
            console.error(error)
        }
        


      }
    
    
    return(
        <div id={style.container}>
                <Map position={coords} zoom={zoom}/>
                <form  onSubmit={handleSubmit}>
                    <input onChange={handleChange}type="text" placeholder='Enter property location' value={formData}/>
                    <button>Search</button>
                </form>

            {/* <form>
                Location Information
                <fieldset>
                    <input type="text" placeholder="continent"/>
                    <input type="text" placeholder="country"/>
                    <input type="text" placeholder="metro area"/>
                    <input type="text" placeholder="borough"/>
                    <input type="text" placeholder=""/>
                </fieldset>
            </form> */}
        </div>
    )
}

export default Step1AddProperty;