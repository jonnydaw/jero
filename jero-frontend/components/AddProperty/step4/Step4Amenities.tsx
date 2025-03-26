'use client'
import { Dispatch, SetStateAction, useState } from "react";
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

import { Beauty, ClimateControl, Entertainment, HealthAndSafety, Kitchen, Laundry, Transport, Water } from "@/types/types";



const Step4Amenities = () => {

    const router = useRouter();
    const pathname = usePathname();

    const handleSubmit = (e : any) => {
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
        ["hasFireAlarm", ["Fire Alarm","/vercel.svg"]],
        ["hasCarbonMonoxideDetector", ["Carbon Monoxide Detector","/vercel.svg"]],
        ["hasFireExtinguisher", ["Fire extinguisher","/vercel.svg"]],
        ["hasFirstAidKit", ["First Aid Kit","/vercel.svg"]]
    ]);

    const [healthAndSafety, setHealthAndSafety] = useState<HealthAndSafety>({
        hasFireAlarm : false,
        hasCarbonMonoxideDetector : false,
        hasFireExtinguisher : false,
        hasFirstAidKit: false,
    })


    const kitchenInfo = new Map<keyof Kitchen, string[]>([
        ["hasKitchen", ["Kitchen","/vercel.svg"]],
        ["hasDishwasher", ["Dishwasher","/vercel.svg"]],
        ["hasMicrowave", ["Microwave","/vercel.svg"]],
        ["hasOven", ["Oven","/vercel.svg"]],
        ["hasHob", ["Hob","/vercel.svg"]],
        ["hasPotsAndPans", ["Pots and Pans","/vercel.svg"]],
        ["hasCutlery", ["Cutlery","/vercel.svg"]],
        ["hasCrockery", ["Crockery","/vercel.svg"]],
        ["hasKettle", ["Kettle","/vercel.svg"]],
        ["hasCoffeeMaker", ["Coffee Maker","/vercel.svg"]]
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
        ["hasGarage", ["Garage","/vercel.svg"]],
        ["hasOffStreetParking", ["Off Street Parking","/vercel.svg"]],
        ["hasOnStreetParking", ["On Street Parking","/vercel.svg"]],
        ["hasReliablePublicTransportNearby", ["Reliable Public Transport Nearby","/vercel.svg"]],
    ]);

    const [transportFacilities, setTransportFacilities] = useState<Transport>({
        hasGarage : false,
        hasOffStreetParking : false,
        hasOnStreetParking : false,
        hasReliablePublicTransportNearby : false
    })


    const laundryInfo = new Map<keyof Laundry, string[]>([
        ["hasWashingMachine", ["Washing Machine","/vercel.svg"]],
        ["hasTumbleDryer", ["Tumble Dryer","/vercel.svg"]],
        ["hasIron", ["Iron","/vercel.svg"]],
        ["hasDryingRack", ["Drying Rack","/vercel.svg"]],
    ]);

    const [laundryFacilities, setLaundryFacilities] = useState<Laundry>({
        hasWashingMachine: false,
        hasTumbleDryer: false,
        hasIron : false,
        hasDryingRack : false,
    })

    const climateControlInfo = new Map<keyof ClimateControl, string[]>([
        ["hasAirCon", ["Air Conditioning","/vercel.svg"]],
        ["hasFan", ["Fan","/vercel.svg"]],
        ["hasHeating", ["Heating","/vercel.svg"]],
        ["hasWoodBurningFire", ["Wood Burning Fire","/vercel.svg"]],
    ]);

    const [climateControlFacilities, setClimateControlFacilities] = useState<ClimateControl>({
        hasAirCon: false,
        hasFan : false,
        hasHeating : false,
        hasWoodBurningFire : false
    })

    const waterInfo = new Map<keyof Water, string[]>([
        ["hasDrinkingWater", ["Drinking Water","/vercel.svg"]],
        ["hasBath", ["Bath","/vercel.svg"]],
        ["hasPrivateToilet", ["Private Toiler","/vercel.svg"]],
        ["hasJacuzzi", ["Jacuzzi","/vercel.svg"]],
        ["hasShower", ["Shower","/vercel.svg"]],
        ["hasBidet", ["Bidet","/vercel.svg"]],
        ["hasSwimmingPool", ["Swimming Pool","/vercel.svg"]],
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
        ["hasHairDryer", ["Hair Dryer","/vercel.svg"]],
        ["hasHairStraightner", ["Hair Straightner","/vercel.svg"]],
        ["hasShampoo", ["Shampoo","/vercel.svg"]],
        ["hasConditioner", ["Conditioner","/vercel.svg"]],
        ["hasBodyWash", ["Body wash","/vercel.svg"]],
    ]);

    const [beautyFacilities, setBeautyFacilities] = useState<Beauty>({
        hasHairDryer : false,
        hasHairStraightner : false,
        hasShampoo : false,
        hasConditioner : false,
        hasBodyWash : false,
    })

    const entertainmentInfo = new Map<keyof Entertainment, string[]>([
        ["hasWifi", ["Wi-Fi","/vercel.svg"]],
        ["hasSmartTv", ["Smart Tv Straightner","/vercel.svg"]],
        ["hasGym", ["Gym","/vercel.svg"]],
        ["hasBooks", ["Books","/vercel.svg"]],
        ["hasBoardGames", ["Board Games","/vercel.svg"]],
        ["hasLocalMuseums", ["Nearby Museums","/vercel.svg"]],
        ["hasLocalBars", ["Neaby Bars","/vercel.svg"]],
        ["hasLocalTheatres", ["Nearby Theatres","/vercel.svg"]],
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
        setSectionVisibility({ ...sectionVisibility, [id]: !sectionVisibility[id] });
        console.log(id)
        console.log(sectionVisibility[id])
        console.log()
    }

    
    return(
        <div>
            <h1>Amenities</h1>

            <div className={style.options}>

            <div className={style.subsection}>
                    <div className={style.subsectionToggleArea}>
                        <p>Health and Safety</p>
                        <button id="healthAndSafety" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.healthAndSafety ? `Hide` : ` Show`}</></button>
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
                 <div className={style.subsectionToggleArea}>
                    <p>Kitchen</p>
                    <button id="kitchen" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.kitchen ? `Hide` : `Show`}</></button>
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
                    <div className={style.subsectionToggleArea}>
                    <p>Entertainment</p>
                    <button id="entertainment" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.entertainment ? `Hide` : ` Show`}</></button>
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
                <div className={style.subsectionToggleArea}>
                    <p>Transport</p>
                    <button id="transport" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.transport ? `Hide` : ` Show`}</></button>
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
                <div className={style.subsectionToggleArea}>
                    <p>Laundry</p>
                    <button id="laundry" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.laundry ? `Hide` : ` Show`}</></button>
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
            <div className={style.subsectionToggleArea}>
                <p>Climate Control</p>
                <button id="climateControl" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.climateControl ? `Hide` : ` Show`}</></button>
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
            <div className={style.subsectionToggleArea}>
                <p>Water</p>
                <button id="water" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.water ? `Hide` : `Show`}</></button>
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
            <div className={style.subsectionToggleArea}>
                <p>Beauty</p>
                <button id="beauty" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.beauty ? `Hide` : `Show`}</></button>
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
            <AddPropertyBottomNav
                handleSubmitFunction={handleSubmit} 
                buttonText="Save and Continue to the final step."
                prevSteps={[1,2,3]} />
            </div>
        

        </div>
    )
}

export default Step4Amenities