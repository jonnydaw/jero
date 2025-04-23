'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BigCheckbox from "../BigCheckbox";
import style from "./step4.module.css"
import { useRouter, usePathname } from "next/navigation";
import { cookies } from "next/headers";
import AddPropertyBottomNav from "../AddPropertyBottomNav";





type Sections = {
    healthAndSafety : boolean;
    kitchen : boolean;
    transport : boolean;
    laundry : boolean;
    climateControl : boolean;
    water : boolean;
    beauty : boolean;
    entertainment : boolean;
}

import { Amenities, Beauty, ClimateControl, Entertainment, HealthAndSafety, Kitchen, Laundry, Transport, Water } from "@/types/types";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import { useTranslations } from "next-intl";

interface Props {
    isUpdate : boolean;
    data : Amenities | null;
    propertyId : string
}

const Step4Amenities = (props : Props) => {
    const t = useTranslations('Step4');
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const router = useRouter();
    const pathname = usePathname();


    if(!props.isUpdate){
        useEffect(() => {
            const beautyVal = JSON.parse(localStorage.getItem("beauty") || "{}");
            setBeautyFacilities({
                hasHairDryer: beautyVal.hasHairDryer || false,
                hasHairStraightner: beautyVal.hasHairStraightner || false,
                hasShampoo: beautyVal.hasShampoo || false,
                hasConditioner: beautyVal.hasConditioner || false,
                hasBodyWash: beautyVal.hasBodyWash || false,
            })

            const climateVal = JSON.parse(localStorage.getItem("climateControl") || "{}");
            setClimateControlFacilities({
                hasAirCon: climateVal.hasAirCon || false,
                hasFan: climateVal.hasFan || false,
                hasHeating: climateVal.hasHeating || false,
                hasWoodBurningFire: climateVal.hasWoodBurningFire || false,
            })
            
            const entertainmentVal = JSON.parse(localStorage.getItem("entertainment") || "{}");
            setEntertainmentFacilities({
                hasWifi: entertainmentVal.hasWifi || false,
                hasSmartTv: entertainmentVal.hasSmartTv || false,
                hasGym: entertainmentVal.hasGym || false,
                hasBooks: entertainmentVal.hasBooks || false,
                hasBoardGames: entertainmentVal.hasBoardGames || false,
                hasLocalMuseums: entertainmentVal.hasLocalMuseums || false,
                hasLocalBars: entertainmentVal.hasLocalBars || false,
                hasLocalTheatres: entertainmentVal.hasLocalTheatres || false,
            });

            const healthAndSafetyVal = JSON.parse(localStorage.getItem("healthAndSafety") || "{}");
            setHealthAndSafety({
                hasFireAlarm : healthAndSafetyVal.hasFireAlarm || false,
                hasCarbonMonoxideDetector: healthAndSafetyVal.hasCarbonMonoxideDetector || false,
                hasFireExtinguisher: healthAndSafetyVal.hasFireExtinguisher || false,
                hasFirstAidKit: healthAndSafetyVal.hasFirstAidKit || false,
            });

            const kitchenVal = JSON.parse(localStorage.getItem("kitchen") || "{}");
            setKitchenFacilities({
                hasKitchen: kitchenVal.hasKitchen || false,
                hasDishwasher: kitchenVal.hasDishwasher || false,
                hasMicrowave: kitchenVal.hasMicrowave || false,
                hasOven: kitchenVal.hasOven || false,
                hasHob: kitchenVal.hasHob || false,
                hasPotsAndPans: kitchenVal.hasPotsAndPans || false,
                hasCutlery: kitchenVal.hasCutlery || false,
                hasCrockery: kitchenVal.hasCrockery || false,
                hasKettle: kitchenVal.hasKettle || false,
                hasCoffeeMaker: kitchenVal.hasCoffeeMaker || false,
            });

            const laundryVal = JSON.parse(localStorage.getItem("laundry") || "{}");
            setLaundryFacilities({
                hasWashingMachine: laundryVal.hasWashingMachine || false,
                hasTumbleDryer: laundryVal.hasTumbleDryer || false,
                hasIron: laundryVal.hasIron || false,
                hasDryingRack: laundryVal.hasDryingRack || false,
            });

            const transportVal = JSON.parse(localStorage.getItem("transport") || "{}");
            setTransportFacilities({
                hasGarage: transportVal.hasGarage || false,
                hasOffStreetParking: transportVal.hasOffStreetParking || false,
                hasOnStreetParking: transportVal.hasOnStreetParking || false,
                hasReliablePublicTransportNearby: transportVal.hasReliablePublicTransportNearby || false,
            });


            const waterVal = JSON.parse(localStorage.getItem("water") || "{}");
            setWaterFacilities({
                hasDrinkingWater: waterVal.hasDrinkingWater || false,
                hasBath: waterVal.hasBath || false,
                hasPrivateToilet: waterVal.hasPrivateToilet || false,
                hasJacuzzi: waterVal.hasJacuzzi || false,
                hasShower: waterVal.hasShower || false,
                hasBidet: waterVal.hasBidet || false,
                hasSwimmingPool: waterVal.hasSwimmingPool || false,
            });

    }, []);
    } else{
        useEffect(() => {
            //console.log(props.data.beautyData)
            if(props.data){
                setBeautyFacilities(props.data.beautyData)
                setClimateControlFacilities(props.data.climateData)
                setEntertainmentFacilities(props.data.entertainmentData);
                setHealthAndSafety(props.data.healthAndSafetyData);
                setKitchenFacilities(props.data.kitchenData);
                setLaundryFacilities(props.data.laundryData);
                setTransportFacilities(props.data.transportData);
                setWaterFacilities(props.data.waterData);
            }

    }, []);
        

    }   

    const handleUpdateSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${baseApi}/property/update-amenities/${props.propertyId}`, {
                beautyData: beautyFacilities, 
                climateData: climateControlFacilities, 
                entertainmentData: entertainmentFacilities, 
                healthAndSafetyData: healthAndSafety, 
                kitchenData: kitchenFacilities, 
                laundryData: laundryFacilities, 
                transportData: transportFacilities, 
                waterData :waterFacilities

               },
                   { withCredentials: true}
               );
               alert("Updated")
               
        } catch (error) {
            alert("Property could not be updated")

        }
    }


    const handleOriginalSubmit = (e : any) => {
        e.preventDefault();
        // https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
        

        localStorage.setItem("healthAndSafety", JSON.stringify(healthAndSafety));
        localStorage.setItem("kitchen", JSON.stringify(kitchenFacilities));
        localStorage.setItem("transport", JSON.stringify(transportFacilities));
        localStorage.setItem("laundry", JSON.stringify(laundryFacilities));
        localStorage.setItem("climateControl", JSON.stringify(climateControlFacilities));
        localStorage.setItem("water", JSON.stringify(waterFacilities));
        localStorage.setItem("beauty", JSON.stringify(beautyFacilities));
        localStorage.setItem("entertainment", JSON.stringify(entertainmentFacilities));
        const locale = (pathname.split("/").at(1));
        router.push(`/${locale}/add-property/step5`);

    }

    const healthAndSafetyInfo = new Map<keyof HealthAndSafety, string[]>([
        ["hasFireAlarm", [t('fireAlarm'),"/vercel.svg"]],
        ["hasCarbonMonoxideDetector", [t('carbonMonoxide'),"/vercel.svg"]],
        ["hasFireExtinguisher", [t('fireExtinguisher'),"/vercel.svg"]],
        ["hasFirstAidKit", [t('firstAidKit'),"/vercel.svg"]]
    ]);

    const [healthAndSafety, setHealthAndSafety] = useState<HealthAndSafety>({
        hasFireAlarm : false,
        hasCarbonMonoxideDetector : false,
        hasFireExtinguisher : false,
        hasFirstAidKit: false,
    })


    const kitchenInfo = new Map<keyof Kitchen, string[]>([
        ["hasKitchen", [t('kitchen'),"/vercel.svg"]],
        ["hasDishwasher", [t('dishwasher'),"/vercel.svg"]],
        ["hasMicrowave", [t('microwave'),"/vercel.svg"]],
        ["hasOven", [t('oven'),"/vercel.svg"]],
        ["hasHob", [t('hob'),"/vercel.svg"]],
        ["hasPotsAndPans", [t('pots'),"/vercel.svg"]],
        ["hasCutlery", [t('cutlery'),"/vercel.svg"]],
        ["hasCrockery", [t('crockery'),"/vercel.svg"]],
        ["hasKettle", [t('kettle'),"/vercel.svg"]],
        ["hasCoffeeMaker", [t('coffeMaker'),"/vercel.svg"]]
    ]);


    const [kitchenFacilities, setKitchenFacilities] = useState<Kitchen>({
        hasKitchen : false,
        hasDishwasher : false,
        hasMicrowave : false,
        hasOven : false,
        hasHob : false,
        hasPotsAndPans : false,
        hasCutlery : false,
        hasCrockery : false,
        hasKettle : false,
        hasCoffeeMaker : false,
    })


    const transportInfo = new Map<keyof Transport, string[]>([
        ["hasGarage", [t('garage'),"/vercel.svg"]],
        ["hasOffStreetParking", [t('offStreetParking'),"/vercel.svg"]],
        ["hasOnStreetParking", [t('onStreetParking'),"/vercel.svg"]],
        ["hasReliablePublicTransportNearby", [t('reliablePublicTransportNearby'),"/vercel.svg"]],
    ]);

    const [transportFacilities, setTransportFacilities] = useState<Transport>({
        hasGarage : false,
        hasOffStreetParking : false,
        hasOnStreetParking : false,
        hasReliablePublicTransportNearby : false
    })


    const laundryInfo = new Map<keyof Laundry, string[]>([
        ["hasWashingMachine", [t('washingMachine'),"/vercel.svg"]],
        ["hasTumbleDryer", [t('tumbleDryer'),"/vercel.svg"]],
        ["hasIron", [t('iron'),"/vercel.svg"]],
        ["hasDryingRack", [t('dryingRack'),"/vercel.svg"]],
    ]);

    const [laundryFacilities, setLaundryFacilities] = useState<Laundry>({
        hasWashingMachine: false,
        hasTumbleDryer: false,
        hasIron : false,
        hasDryingRack : false,
    })

    const climateControlInfo = new Map<keyof ClimateControl, string[]>([
        ["hasAirCon", [t('airCon'),"/vercel.svg"]],
        ["hasFan", [t('fan'),"/vercel.svg"]],
        ["hasHeating", [t('heating'),"/vercel.svg"]],
        ["hasWoodBurningFire", [t('woodBurningFire'),"/vercel.svg"]],
    ]);

    const [climateControlFacilities, setClimateControlFacilities] = useState<ClimateControl>({
        hasAirCon: false,
        hasFan : false,
        hasHeating : false,
        hasWoodBurningFire : false
    })

    const waterInfo = new Map<keyof Water, string[]>([
        ["hasDrinkingWater", [t('drinkingWater'),"/vercel.svg"]],
        ["hasBath", [t('bath'),"/vercel.svg"]],
        ["hasPrivateToilet", [t('privateToilet'),"/vercel.svg"]],
        ["hasJacuzzi", [t('jacuzzi'),"/vercel.svg"]],
        ["hasShower", [t('shower'),"/vercel.svg"]],
        ["hasBidet", [t('bidet'),"/vercel.svg"]],
        ["hasSwimmingPool", [t('swimmingPool'),"/vercel.svg"]],
    ]);

    const [waterFacilities, setWaterFacilities] = useState<Water>({
        hasDrinkingWater : false,
        hasBath : false,
        hasPrivateToilet : false,
        hasJacuzzi : false,
        hasShower : false,
        hasBidet : false,
        hasSwimmingPool : false,
    })


    const beautyInfo = new Map<keyof Beauty, string[]>([
        ["hasHairDryer", [t('hairDryer'),"/vercel.svg"]],
        ["hasHairStraightner", [t('hairStraightner'),"/vercel.svg"]],
        ["hasShampoo", [t('shampoo'),"/vercel.svg"]],
        ["hasConditioner", [t('conditioner'),"/vercel.svg"]],
        ["hasBodyWash", [t('bodyWash'),"/vercel.svg"]],
    ]);

    const [beautyFacilities, setBeautyFacilities] = useState<Beauty>({
        hasHairDryer : false,
        hasHairStraightner : false,
        hasShampoo : false,
        hasConditioner : false,
        hasBodyWash : false,
    })

    const entertainmentInfo = new Map<keyof Entertainment, string[]>([
        ["hasWifi", [t('wifi'),"/vercel.svg"]],
        ["hasSmartTv", [t('smartTv'),"/vercel.svg"]],
        ["hasGym", [t('gym'),"/vercel.svg"]],
        ["hasBooks", [t('books'),"/vercel.svg"]],
        ["hasBoardGames", [t('boardGames'),"/vercel.svg"]],
        ["hasLocalMuseums", [t('localMuseums'),"/vercel.svg"]],
        ["hasLocalBars", [t('localBars'),"/vercel.svg"]],
        ["hasLocalTheatres", [t('localTheatres'),"/vercel.svg"]],
    ]);

    const [entertainmentFacilities, setEntertainmentFacilities] = useState<Entertainment>({
        hasWifi : false,
        hasSmartTv : false,
        hasGym : false,
        hasBooks : false,
        hasBoardGames : false,
        hasLocalMuseums : false,
        hasLocalBars : false,
        hasLocalTheatres : false,
    })




    const handleCheckChange = (e : any, setter:  Dispatch<SetStateAction<any>>, 
        getter : Kitchen | Transport | HealthAndSafety | Laundry | ClimateControl  | Water | Beauty | Entertainment) => {
        const { name, checked} = e.target;
        console.log(name)
        console.log(checked)
        setter({ ...getter, [name]: checked });
    }



    const [sectionVisibility, setSectionVisibility] = useState<Sections>({
        healthAndSafety : false,
        kitchen : false,
        transport : false,
        laundry : false,
        water : false,
        climateControl : false,
        beauty : false,
        entertainment : false,
    })







    const toggleVisibility = (e : any) => {
        const id = e.target.id as keyof Sections;         
        console.log(id)
        setSectionVisibility({ ...sectionVisibility, [id]: !sectionVisibility[id] });
        console.log(id)
        console.log(sectionVisibility[id])
        console.log()
    }

    
    return(
        <div>
            <h1 style={{textAlign: 'center'}}>{props.isUpdate ? t('updateTitle') : t('originalTitle')}</h1>

            <div className={style.options}>

            <div className={style.subsection}>
                    <div onClick={() => setSectionVisibility({ ...sectionVisibility, "healthAndSafety" : !sectionVisibility.healthAndSafety})} className={style.subsectionToggleArea}>
                        <p>{t('healthAndSafety')}</p>
                        <button id="healthAndSafety" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.healthAndSafety ? t('hide') : t('show') }</></button>
                    </div>
                    {sectionVisibility.healthAndSafety &&
                <div className={style.group}>

                {Object.entries(healthAndSafety).map(([key, value]) => (
                            <div key={key}>
                                <BigCheckbox 
                                jsxnames={key} 
                                val={value} 
                                displayName={healthAndSafetyInfo.get(key as keyof HealthAndSafety)?.at(0) || ""} 
                                imgPath={healthAndSafetyInfo.get(key as keyof HealthAndSafety)?.at(1) || ""} 
                                alt={""} 
                                handler={(e : any) => handleCheckChange(e,setHealthAndSafety,healthAndSafety)}
                            />
                            </div>
                        ))
                        }

                </div>
                }
                </div>
                <div className={style.subsection}>
                 <div  onClick={() => setSectionVisibility({ ...sectionVisibility, "kitchen" : !sectionVisibility.kitchen})} className={style.subsectionToggleArea}>
                    <p>{t('kitchen')}</p>
                    <button id="kitchen" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.kitchen ? t('hide') :t('show') }</></button>
                </div>

                    {sectionVisibility.kitchen &&
                    <div className={style.group}>
                    
           
                    {Object.entries(kitchenFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={kitchenInfo.get(key as keyof Kitchen)?.at(0) || ""} 
                                    imgPath={kitchenInfo.get(key as keyof Kitchen)?.at(1)|| ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setKitchenFacilities, kitchenFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
                        }
                </div>

                <div className={style.subsection}>                 
                    <div onClick={() => setSectionVisibility({ ...sectionVisibility, "entertainment" : !sectionVisibility.entertainment})} className={style.subsectionToggleArea}>
                    <p>{t('entertainment')}</p>
                    <button id="entertainment" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.entertainment ? t('hide') : t('show') }</></button>
                </div>
                {sectionVisibility.entertainment &&
                    <div className={style.group}>

                {Object.entries(entertainmentFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={entertainmentInfo.get(key as keyof Entertainment)?.at(0) || ""} 
                                    imgPath={entertainmentInfo.get(key as keyof Entertainment)?.at(1) || ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setEntertainmentFacilities,entertainmentFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>


            <div className={style.subsection}>
                <div onClick={() => setSectionVisibility({ ...sectionVisibility, "transport" : !sectionVisibility.transport})} className={style.subsectionToggleArea}>
                    <p>{('transport')}</p>
                    <button id="transport" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.transport ? t('hide') : t('show') }</></button>
                </div>
                {sectionVisibility.transport &&
                    <div className={style.group}>

                {Object.entries(transportFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={transportInfo.get(key as keyof Transport)?.at(0) || ""} 
                                    imgPath={transportInfo.get(key as keyof Transport)?.at(1) || ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setTransportFacilities,transportFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>


            <div className={style.subsection}>
                <div onClick={() => setSectionVisibility({ ...sectionVisibility, "laundry" : !sectionVisibility.laundry})} className={style.subsectionToggleArea}>
                    <p>{t('laundry')}</p>
                    <button id="laundry" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.laundry ? t('hide') : t('show') }</></button>
                </div>
                {sectionVisibility.laundry &&
                    <div className={style.group}>

                {Object.entries(laundryFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={laundryInfo.get(key as keyof Laundry)?.at(0) || ""} 
                                    imgPath={laundryInfo.get(key as keyof Laundry)?.at(1) || ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setLaundryFacilities,laundryFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>

            <div className={style.subsection}>
            <div onClick={() => setSectionVisibility({ ...sectionVisibility, "climateControl" : !sectionVisibility.climateControl})}className={style.subsectionToggleArea}>
                <p>{t('climateControl')}</p>
                <button id="climateControl" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.climateControl ? t('hide') : t('show') }</></button>
                </div>
                {sectionVisibility.climateControl &&
                    <div className={style.group}>

                {Object.entries(climateControlFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={climateControlInfo.get(key as keyof ClimateControl)?.at(0) || ""} 
                                    imgPath={climateControlInfo.get(key as keyof ClimateControl)?.at(1) || ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setClimateControlFacilities,climateControlFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>

            <div className={style.subsection}>
            <div onClick={() => setSectionVisibility({ ...sectionVisibility, "water" : !sectionVisibility.water})} className={style.subsectionToggleArea}>
                <p>{t('water')}</p>
                <button id="water" onClick={toggleVisibility} className={`${style.title} basicButton` }><>{sectionVisibility.water ? t('hide') :t('show') }</></button>
            </div>
                {sectionVisibility.water &&
                    <div className={style.group}>

                {Object.entries(waterFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={waterInfo.get(key as keyof Water)?.at(0) || ""} 
                                    imgPath={waterInfo.get(key as keyof Water)?.at(1) || ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setWaterFacilities,waterFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>

            <div className={style.subsection}>
            <div onClick={() => setSectionVisibility({ ...sectionVisibility, "beauty" : !sectionVisibility.beauty})} className={style.subsectionToggleArea}>
                <p>{t('beauty')}</p>
                <button id="beauty" onClick={toggleVisibility} className={`${`${style.title} basicButton` } basicButton` }><>{sectionVisibility.beauty ? t('hide') :t('show') }</></button>
            </div>
                {sectionVisibility.beauty &&
                    <div className={style.group}>

                {Object.entries(beautyFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={beautyInfo.get(key as keyof Beauty)?.at(0) || ""} 
                                    imgPath={beautyInfo.get(key as keyof Beauty)?.at(1) || ""} 
                                    alt={""} 
                                    handler={(e : any) => handleCheckChange(e,setBeautyFacilities,beautyFacilities)}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>
            {
                props.isUpdate 
                    ?
                <button onClick={handleUpdateSubmit} className="basicButton">{t('update')}</button>
                :
                <AddPropertyBottomNav
                handleSubmitFunction={handleOriginalSubmit} 
                buttonText={t('save')}
                prevSteps={[1,2,3,4,5]} />
            }

            </div>
        

        </div>
    )
}

export default Step4Amenities