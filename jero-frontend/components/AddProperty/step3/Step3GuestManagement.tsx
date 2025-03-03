'use client'


import React, { useEffect, useRef, useState } from "react";
import style from "./step3.module.css"

type Pricing = {
    pricePerNight : number,
    priceIncreasePerPerson : number
}


import { useRouter } from "next/navigation";
import { styleText } from "util";


const Step3GuestManagement = () => {
    
    const [formData, setFormData] = useState<Pricing>({
        pricePerNight : 0,
        priceIncreasePerPerson : 0
    });

    const [estimation, setEstimation] = useState<string>("");
    const [days, setDays] = useState<number>(0);

    useEffect(() => {
            const num : number = days * (Number(formData.pricePerNight) + Number(formData.priceIncreasePerPerson));


            // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
            setEstimation(((Math.round(num * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
            
        
      }, [formData.pricePerNight, days, formData.priceIncreasePerPerson]);

    const router = useRouter();

    const handleChange = (e : any) => {
        const { name, value} = e.target;
        console.log(value)
        setFormData({ ...formData, [name]: value });
    }

    const handleSlide = (e : any) => {
        const { _, value} = e.target;
        console.log(value)
        setDays(value);
    }
    
    return (<div>
        <h2>Pricing</h2>
        <form>
            <label htmlFor="pricePerNight">Price per night</label>
            <input
                id="pricePerNight"
                type="digit" 
                name="pricePerNight"
                placeholder="Price per night"
                value={formData.pricePerNight}
                onChange={handleChange}
                />
            <label htmlFor="priceIncreasePerPerson">Price increase per person per night</label>
            <input
                id="priceIncreasePerPerson"
                type="digit" 
                name="priceIncreasePerPerson"
                placeholder="Price increase per person"
                value={formData.priceIncreasePerPerson}
                onChange={handleChange}
                />
        </form>
        <div>
            <h3>Earnings over time (assuming two people every visit)</h3>
            <h4>{estimation}</h4>
            <div>
            <input 
                type="range" 
                id="months" 
                name="months" 
                min="1" 
                max="366" 
                value={days}
                onChange={handleSlide}
             />
            <label htmlFor="volume">Days: {days}</label>
            </div>
        </div>

        <h2>Who can you accomdate</h2>
        <div>
            <button></button>
            <button></button>
            <button></button>
        </div>
        </div>
        


    )
}

export default Step3GuestManagement;

