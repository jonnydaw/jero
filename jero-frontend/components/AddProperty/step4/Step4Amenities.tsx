'use client'
import { useState } from "react";
import BigCheckbox from "../BigCheckbox";
import style from "./step4.module.css"

type Amenities = {
    hasKitchen : boolean;
    hasWashingMachine: boolean;
    hasTumbleDryer: boolean;
    hasJacuzzi: boolean;
    hasGym: boolean;
    hasHairdryer: boolean;
    hasAirCon: boolean;
    hasWifi: boolean;
    hasBalcony: boolean;
    hasSwimmingPool: boolean;
    hasGarden: boolean;
    hasBath : boolean
}


const Step4Amenities = () => {

    const [amenities, setAmenities] = useState<Amenities>({
        hasKitchen : false,
        hasWashingMachine: false,
        hasTumbleDryer:false,
        hasJacuzzi: false,
        hasGym: false,
        hasHairdryer: false,
        hasAirCon: false,
        hasWifi: false,
        hasBalcony:false,
        hasSwimmingPool: false,
        hasGarden: false,
        hasBath : false,
    });

    const handleCheckChange = (e : any) => {
        const { name, checked} = e.target;
        console.log(name)
        console.log(checked)
        setAmenities({ ...amenities, [name]: checked });
    }
    return(
        <div>
            <h1>Amenities</h1>

            <div className={style.options}>

                <BigCheckbox 
                    jsxnames={"hasKitchen"} 
                    val={amenities.hasKitchen} 
                    displayName={"Kitchen"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasWashingMachine"} 
                    val={amenities.hasWashingMachine} 
                    displayName={"Washing Machine"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasTumbleDryer"} 
                    val={amenities.hasTumbleDryer} 
                    displayName={"Tumble Dryer"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasJacuzzi"} 
                    val={amenities.hasJacuzzi} 
                    displayName={"Jacuzzi"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasGym"} 
                    val={amenities.hasGym} 
                    displayName={"Gym"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />

                <BigCheckbox 
                    jsxnames={"hasHairdryer"} 
                    val={amenities.hasHairdryer} 
                    displayName={"Hairdryer"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />


                <BigCheckbox 
                    jsxnames={"hasAirCon"} 
                    val={amenities.hasAirCon} 
                    displayName={"Air conditioning"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasWifi"} 
                    val={amenities.hasWifi} 
                    displayName={"Wi-Fi"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasBalcony"} 
                    val={amenities.hasBalcony} 
                    displayName={"Balcony"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />
                <BigCheckbox 
                    jsxnames={"hasSwimmingPool"} 
                    val={amenities.hasSwimmingPool} 
                    displayName={"Swimming Pool"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />

                <BigCheckbox 
                    jsxnames={"hasGarden"} 
                    val={amenities.hasGarden} 
                    displayName={"Garden"} 
                    imgPath={"/vercel.svg"} 
                    alt={""} 
                    handler={handleCheckChange}
                />


                <BigCheckbox 
                    jsxnames={"hasBath"} 
                    val={amenities.hasBath} 
                    displayName={"Bath"} 
                    imgPath={"/vercel.svg   "} 
                    alt={""} 
                    handler={handleCheckChange}
                />
            </div>
        </div>
    )
}

export default Step4Amenities