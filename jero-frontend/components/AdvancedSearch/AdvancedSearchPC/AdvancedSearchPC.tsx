'use client'
import Form from 'next/form'
import style from "./AdvancedSearchPC.module.css"
import GuestToggler from '../../Navbar/NavbarPC/GuestDropdown/GuestToggler'
import { useEffect, useState } from 'react'
import { GuestCounts } from '@/app/types/types'
import MultiRangeSlider from "multi-range-slider-react";
import { SiBitly } from 'react-icons/si'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

type Attractions = {
    museums : boolean;
    nightlife : boolean;
    architecture : boolean;
    biodiversity : boolean ;
    cuisine : boolean;
    historical : boolean
}

interface GettingAround {
    carFriendly : boolean;
    disabledFriendly : boolean;
    walkable : boolean;
    bicycleFriendly: boolean;
    goodPublicTransport : boolean;
}

interface FormData {
    start : string;
    end : string;
    count : GuestCounts;
    attractions : Attractions;
    holidayType : string;
    tourismLevels : string
    guestTypes : string;
    gettingAround : GettingAround;
}

export const AdvancedSearchPC = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const t = useTranslations('SmartSearch');

    const [minEndDate, setMinEndDate] = useState<string>("");
    const router = useRouter();
    const pathname = usePathname();
    const [chosenCount, setChosenCount] = useState<GuestCounts>({adultCount : 1, childCount : 0, petCount : 0});
    const [selectedAttractions, setSelectedAttractions] = useState<Attractions>({
        museums : false,
        nightlife : false,
        architecture : false,
        biodiversity : false,
        cuisine : false,
        historical : false,
    },);

    const [selectedGettingArounds, setSelectedGettingArounds] = useState<GettingAround>({
        carFriendly : false,
        disabledFriendly : false,
        walkable : false,
        bicycleFriendly: false,
        goodPublicTransport: false,
    },);

    const [formData, setFormData] = useState<FormData>(
        {
        start: "",
        end : "",
        count: chosenCount,
        attractions : selectedAttractions,
        holidayType : "any",
        tourismLevels : "any",
        guestTypes : "",
        gettingAround : selectedGettingArounds,
    }
);    
    const locationTypes : string[] = ["any", "beach","city","skiing", "village"] ;
    const tourismLevelsOptions : string[] = ["any", "low", "medium" , "high"];
    const attractionTypes : string[] = [
        "museums", 
        "nightlife", 
        "architecture", 
        "biodiversity",
        "cuisine",
        "historical"
    ];

    const gettingAroundOptions : string[] = [
        "carFriendly",
        "disabledFriendly",
        "walkable",
        "bicycleFriendly",
        "goodPublicTransport"
    ]

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name] : value });
        if(name === `start`){
          let startPlusDay : Date = new Date(value);
          startPlusDay.setDate(startPlusDay.getDate() + 1);
          const minEndDate = startPlusDay.toISOString().split("T")[0]; 
          setMinEndDate(minEndDate);
        }
      };

    const [minValue, set_minValue] = useState(18);
const [maxValue, set_maxValue] = useState(26);
    const handleInput = (e : any) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    const handleSubmit = (e : any) => {
            e.preventDefault();
            console.log("ga " + JSON.stringify(formData.attractions))
            console.log("ga " + JSON.stringify(formData.gettingAround))
            console.log("ga " + JSON.stringify(formData.holidayType))
            localStorage.setItem("start",String(formData.start))
            localStorage.setItem("end", formData.end);
            const params = new URLSearchParams();
            params.set("startdate",formData.start);
            params.set("enddate",formData.end);
            params.set("numadults",String(formData.count.adultCount));
            params.set("numchildren",String(formData.count.childCount));
            params.set("numpets",String(formData.count.petCount));
            params.set("attractions",Object.entries(formData.attractions).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&'));
            params.set("holidayType", formData.holidayType);
            params.set("tourismLevels", formData.tourismLevels);
            params.set("minTemp", String(minValue));
            params.set("maxTemp",String(maxValue));
            params.set("gettingAround",Object.entries(formData.gettingAround).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&'));

        
        
        
            // https://stackoverflow.com/questions/58306983/how-do-i-add-a-query-param-to-router-push-in-nextjs
            const locale = (pathname.split("/").at(1));
            router.push(`/${locale}/smart-search-property?${params.toString()}`);
        
            // try {
            //   console.log("ttry")
            //   const response = await axios.get("http://localhost:8080/property/search-properties", {
            //     params : {location : formData.where}
            //   });
            //   console.log(response.data)
            // } catch (error) {
            //     console.error(error)
            // }
          
    }   ;

    useEffect(() => {
        setFormData(({ ...formData, count : chosenCount }));
      }, 
      [chosenCount]
    );

    useEffect(() => {
        setFormData(({ ...formData, attractions : selectedAttractions }));
      }, 
      [selectedAttractions]
    );

    useEffect(() => {
        setFormData(({ ...formData, gettingAround : selectedGettingArounds }));
      }, 
      [selectedGettingArounds]
    );

    return(
        <div id={style.container}>
            <div id={style.formArea}>
            <form onSubmit={handleSubmit}>
            <fieldset className={style.fields}>
                </fieldset>
            <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>{t('when')}</h3>
                </div>
                
                <div className={`${style.inputContainer} ${style.dateArea}`}>
                
                <div className={style.dateInput}>
                <label htmlFor="startDate">{t('start')}</label>
                <input 
                    required
                    aria-required
                    id="startDate" 
                    type="date" 
                    name="start" 
                    value={formData.start}
                    min={currentDate}
                    onChange={handleChange}
                />
                </div>
                
                <div className={style.dateInput}>
                <label htmlFor="endDate">{t('end')}</label>
                <input 
                    required
                    aria-required
                    id="endDate" 
                    type="date" 
                    name="end" 
                    value={formData.end}
                    min={minEndDate}
                    onChange={handleChange}
                />
                </div>
                
                </div>
                </fieldset>
                <fieldset className={style.fields} >
                <div className={style.underlineDiv}>
                <h3>{t('who')}</h3>
                </div>
                <GuestToggler count={chosenCount} setCount={setChosenCount} disabled={[]} max={999999} min={1}/>
                </fieldset>
                <fieldset  className={style.fields} >
                <div className={style.underlineDiv}>
                 <h3>{t('weather')} (°C)</h3>
                 <MultiRangeSlider
                 id={style.rangeSlider}
                    style={{border : "none", boxShadow : "none"}}
                    min={-20}
                    barInnerColor='black'
                    max={50}
                    step={1}
                    minValue={minValue}
                    maxValue={maxValue}
                    ruler={false}
                    label={true}
                    onInput={(e) => {
                        handleInput(e);
                    }}/>
                </div>
                <div className={style.underlineDiv}>
                 <h3>{t('attractions')}</h3>
                 <div className={style.items}>
                    
                    {
                        attractionTypes.map((item, idx) => (
                            <div className={style.selectItem} key={idx}>
                            <input 
                                    onChange={() => setSelectedAttractions({...selectedAttractions, [item as keyof Attractions] : !selectedAttractions[item as keyof Attractions]})} 
                                    type='checkbox'  
                                    id={item} 
                                    name="attractions"
                                    value={item}
                            />
                                <label htmlFor={item}>{t(item)}</label>
        
                            </div>
                        ))
                    }
                 
                    </div>
                </div>
                <div className={style.underlineDiv}>
                 <h3>{t('locationType')}</h3>
                    <div className={style.items}>
                    
                    {
                        locationTypes.map((item, idx) => (
                            <div className={style.selectItem} key={idx}>
                            <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={item} 
                                    name="holidayType"
                                    value={item}
                                    checked={formData.holidayType == item}
                            />
                                <label htmlFor={item}>{t(item)}</label>
        
                            </div>
                        ))
                    }
                 
                    </div>
                </div>
                <div className={style.underlineDiv}>
                 <h3>{t('tourismLevels')}</h3>
                 <div className={style.items}>
                    
                    {
                        tourismLevelsOptions.map((item, idx) => (
                            <div className={style.selectItem} key={idx}>
                            <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={item} 
                                    name="tourismLevels"
                                    value={item}
                                    checked={formData.tourismLevels === item}
                            />
                                <label htmlFor={item}>{t(item)}</label>
        
                            </div>
                        ))
                    }
                </div>
                </div>
                <div className={style.underlineDiv}>
                    <h3>{t('gettingAround')}</h3>        
                    <div className={style.items}>
                    
                    {
                        gettingAroundOptions.map((item, idx) => (
                            <div className={style.selectItem} key={idx}>
                            <input 
                                    onChange={() => setSelectedGettingArounds({...selectedGettingArounds, [item as keyof GettingAround] : !selectedGettingArounds[item as keyof GettingAround]})} 
                                    type='checkbox'  
                                    id={item} 
                                    name="gettingAround"
                                    value={item}
                            />
                                <label htmlFor={item}>{t(item)}</label>
        
                            </div>
                        ))
                    }
                </div>        
                </div>
                </fieldset>
                <button  style={{display : "flex", justifySelf:"center"}}className='basicButton'>{t('search')}</button>
                </form>
            </div>
        </div>
    )
}