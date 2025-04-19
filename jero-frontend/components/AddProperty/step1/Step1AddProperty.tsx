'use client'

import dynamic from 'next/dynamic';
import { FormEvent, useMemo, useRef, useState } from 'react';
import style from "./Step1AddProperty.module.css"
import next from 'next';
import { useRouter, usePathname } from 'next/navigation';
import { inDevEnvironment } from '@/base';
import { useTranslations } from 'next-intl';
import AddPropertyBottomNav from '../AddPropertyBottomNav';
import { Link } from "@/i18n/routing";
import bottomNavStyle from "../AddPropertyNavigation.module.css"


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
    const t = useTranslations('Step1');

    
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
          loading: () => <p>{t('loadingMap')}</p>,
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
        const notSupporting = t('notSupporting');
        console.log(t('notSupporting'))
        e.preventDefault();
        if(chosen){

                    const type = osmTypeToChar.get(chosen.osm_type)
                    const newResponse = await fetch(`/api/osmId?osm_id=${type}${chosen.osm_id}`)
                    //console.log(await newResponse.json())
                    const data = await newResponse.json();
                    const addressData = data[0].address;
                  //  console.log("madres" + chosen.locationName);
                    const query = new URLSearchParams(addressData).toString();
                    console.log("query " + query)

                    try {
                        const response = await fetch(`${baseApi}/location/get_location?${query}`);
                        const data  = await response.json()
                        console.log(data)
                        if(response.status !== 200){
                            alert(notSupporting)
                        }else{
                            const combo = {...chosen, "hierarchy":data}
                            localStorage.setItem("addressAndCoordinates", JSON.stringify(combo));
                            localStorage.set
                            alert("Your property will be tagged under :" + JSON.stringify(data))
                            const locale = (pathname.split("/").at(1));
                            router.push(`/${locale}/add-property/step2`);
                    }

                //}
            } catch (error) {
                //if(error.sta)
                alert("Sorry we are not supporting that location yet.")
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
                <Map position={[chosen?.lat || 0, chosen?.lon || 0]} zoom={zoom} isCircle={false}/>
                <form id={style.formSearch} onSubmit={handleSubmit}>
                    <input onChange={handleChange}type="text" placeholder={t('placeholder')} value={formData}/>
                    <button>{t('search')}</button>
                </form>
            
           { results && 
            <> 
                <h3>{t('choose')}</h3>
                <form  id={style.formSelect} onSubmit={handleSave}>
                {results.map((item, index) => (
                    <div className={style.selectItem} key={index}>
                    <input 
                            onChange={(e) => handleRadioChange(e, item)} 
                            type='radio'  
                            id={item.locationName} 
                            name="address"
                            checked={chosen===item}
                            placeholder={item.locationName}/>
                        <label htmlFor={item.locationName}>{item.locationName}</label>

                    </div>
                ))}
                <button>{t('save')}</button>
                </form>
            </>    
             }
            <div id={bottomNavStyle.links}>
                <Link href={"/add-property/step1"}>1</Link>
                <Link href={"/add-property/step2"}>2</Link>
                <Link href={"/add-property/step3"}>3</Link>
                <Link href={"/add-property/step4"}>4</Link>
                <Link href={"/add-property/step5"}>5</Link>
            </div>
        </div>
    )
}

export default Step1AddProperty;