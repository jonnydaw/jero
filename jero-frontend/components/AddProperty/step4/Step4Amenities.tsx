'use client'
import { useState } from "react";
import BigCheckbox from "../BigCheckbox";
import style from "./step4.module.css"
/*
Categories:
health and safety
cleaning 
hygiene
transport
water
entertainment


*/
type Sections = {
    healthAndSafety : boolean;
    kitchen : boolean;
    transport : boolean;
    laundry : boolean;
    entertainment : boolean;
}

type HealthAndSafety = {
    hasFireAlarm : boolean;
    hasCarbonMonoxideDetector : boolean;
    hasFireExtinguisher : boolean;
    hasFirstAidKit : boolean;
}

type Kitchen = {
    hasKitchen : boolean;
    hasDishwasher : boolean;
    hasMicrowave : boolean;
    hasOven : boolean;
    hasHob : boolean;
    hasPotsAndPans : boolean;
    hasCutlery : boolean;
    hasCrockery : boolean;
    hasKettle : boolean;
    hasCoffeeMaker : boolean;
}

type Transport = {
    hasGarage : boolean;
    hasOffStreetParking : boolean;
    hasOnStreetParking : boolean;
    hasReliablePublicTransportNearby : boolean;
}

// type Laundry = {}
// type Amenities = {

//     // health and safety


//     // kitchen


//     // transport


//     // laundry
//     hasWashingMachine: boolean;
//     hasTumbleDryer: boolean;

//     // climate control
//     hasAirCon: boolean;
//     hasFan : boolean,
//     hasHeating : boolean,


//     hasJacuzzi: boolean;
//     hasGym: boolean;
//     hasHairdryer: boolean;
//     hasWifi: boolean;
//     hasBalcony: boolean;
//     hasSwimmingPool: boolean;
//     hasGarden: boolean;
//     hasBath : boolean;
//     hasSmartTv : boolean
// }


const Step4Amenities = () => {

    const healthAndSafetyInfo = new Map<keyof HealthAndSafety, string[]>([
        ["hasFireAlarm", ["Fire Alarm","/vercel.svg"]],
        ["hasCarbonMonoxideDetector", ["Carbon Monoxide Detector","/vercel.svg"]],
        ["hasFireExtinguisher", ["Fire extinguisher","/vercel.svg"]],
        ["hasFirstAidKit", ["First Aid Kit","/vercel.svg"]]
    ]);

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

    const transportInfo = new Map<keyof Transport, string[]>([
        ["hasGarage", ["Garage","/vercel.svg"]],
        ["hasOffStreetParking", ["Off Street Parking","/vercel.svg"]],
        ["hasOnStreetParking", ["On Street Parking","/vercel.svg"]],
        ["hasReliablePublicTransportNearby", ["Reliable Public Transport Nearby","/vercel.svg"]],
    ]);
    
    const [healthAndSafety, setHealthAndSafety] = useState<HealthAndSafety>({
        // h&s
        hasFireAlarm : false,
        hasCarbonMonoxideDetector : false,
        hasFireExtinguisher : false,
        hasFirstAidKit: false,
    })

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

    const [transportFacilities, setTransportFacilities] = useState<Transport>({
        hasGarage : false,
        hasOffStreetParking : false,
        hasOnStreetParking : false,
        hasReliablePublicTransportNearby : false
    })

        // //kitchen
       

        // // transport
        // hasGarage : false,
        // hasOffStreetParking : false,
        // hasOnStreetParking : false,
        // hasReliablePublicTransportNearby : false,

        // //laundry
        // hasWashingMachine: false,
        // hasTumbleDryer:false,
        // hasJacuzzi: false,
        // hasGym: false,
        // hasHairdryer: false,

        // //climate control
        // hasAirCon: false,
        // hasFan : false,
        // hasHeating : false,

        // hasWifi: false,
        // hasBalcony:false,
        // hasSwimmingPool: false,
        // hasGarden: false,
        // hasBath : false,
        // hasSmartTv : false,

   // });

    const [sectionVisibility, setSectionVisibility] = useState<Sections>({
        healthAndSafety : false,
        kitchen : false,
        transport : false,
        laundry : false,
        entertainment : false,
    })

    const handleHealthAndSafetyCheckChange = (e : any) => {
        const { name, checked} = e.target;
        console.log(name)
        console.log(checked)
        setHealthAndSafety({ ...healthAndSafety, [name]: checked });
    }

    const handleKitchenCheckChange = (e : any) => {
        const { name, checked} = e.target;
        console.log(name)
        console.log(checked)
        setKitchenFacilities({ ...kitchenFacilities, [name]: checked });
    }

    const handleTransportCheckChange = (e : any) => {
        const { name, checked} = e.target;
        console.log(name)
        console.log(checked)
        setTransportFacilities({ ...transportFacilities, [name]: checked });
    }

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
                    <button id="healthAndSafety" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.healthAndSafety ? `Hide Health and Safety Options` : `Show Health and Safety Options`}</></button>
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
                                handler={handleHealthAndSafetyCheckChange}
                            />
                            </div>
                        ))
                        }

                </div>
                }
                </div>
                <div className={style.subsection}>
                    <button id="kitchen" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.kitchen ? `Hide Kitchen Options` : `Show Kitchen Options`}</></button>
                    {sectionVisibility.kitchen &&
                    <div className={style.group}>
                    
           
                    {Object.entries(kitchenFacilities).map(([key, value]) => (
                                <div key={key}>
                                    <BigCheckbox 
                                    jsxnames={key} 
                                    val={value} 
                                    displayName={kitchenInfo.get(key as keyof Kitchen)?.at(0) || ""} 
                                    imgPath={kitchenInfo.get(key as keyof Kitchen)?.at(1) || ""} 
                                    alt={""} 
                                    handler={handleKitchenCheckChange}
                                />
                                </div>
                            ))
                            }

                </div>
                        }
                </div>

            <div className={style.subsection}>
                <button id="transport" onClick={toggleVisibility} className={style.title}><>{sectionVisibility.transport ? `Hide Transport Options` : `Show Transport Options`}</></button>
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
                                    handler={handleTransportCheckChange}
                                />
                                </div>
                            ))
                            }

                </div>
    
            }
            </div>


            </div>
        </div>
    )
}

export default Step4Amenities