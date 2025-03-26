'use client'


import React, { useEffect, useRef, useState } from "react";
import style from "./step3.module.css"
import bottomNavStyle from "../AddPropertyNavigation.module.css"

type GuestManagement = {
    pricePerNight : number,
    priceIncreasePerPerson : number;
    acceptsChildren: boolean;
    acceptsPets : boolean;
    disabilityFriendly : boolean;
    minGuests : number;
    maxGuests : number;
    numBedrooms : number;
    numBathrooms : number;
    doubleBeds : number;
    singleBeds : number;
    hammocks : number;
    sofaBeds : number;
}

type Errors = {
    pricePerNight : string | null,
    priceIncreasePerPerson : string | null
    acceptsChildren: string | null,
    acceptsPets : string | null,
    disabilityFriendly : string | null
    minGuests : string | null,
    maxGuests : string | null,
    
}


import { usePathname, useRouter } from "next/navigation";
import BigCheckbox from "../BigCheckbox";
import { Link } from "@/i18n/routing";
import AddPropertyBottomNav from "../AddPropertyBottomNav";


const Step3GuestManagement = () => {
    /*
    
        localStorage.setItem("pricePerNight", String(formData.pricePerNight));
        localStorage.setItem("priceIncreasePerPerson", String(formData.priceIncreasePerPerson));
        localStorage.setItem("acceptsChildren", String(formData.acceptsChildren));
        localStorage.setItem("acceptsPets", String(formData.acceptsPets));
        localStorage.setItem("disabilityFriendly", String(formData.disabilityFriendly));
        localStorage.setItem("minGuests", String(formData.minGuests));
        localStorage.setItem("maxGuests",String(formData.maxGuests));
    */

        // https://stackoverflow.com/questions/76300847/getting-referenceerror-localstorage-is-not-defined-even-after-adding-use-clien

        ////wouihfe
    useEffect(() => {
            const step3Val = JSON.parse(localStorage.getItem("step3") || "{}");
        // console.log(step3Val.pricePerNight)
        setFormData({
            pricePerNight: step3Val.pricePerNight || 0,
            priceIncreasePerPerson: Number(step3Val.priceIncreasePerPerson) || 0,
            acceptsChildren: step3Val.acceptsChildren || false,
            acceptsPets: step3Val.acceptsPets || false,
            disabilityFriendly: step3Val.disabilityFriendly || false,
            minGuests: Number(step3Val.minGuests) || 0,
            maxGuests: Number(step3Val.maxGuests) || 0,
            numBedrooms : Number(step3Val.numBedrooms) || 0,
            numBathrooms : Number(step3Val.numBathrooms) || 0,
            doubleBeds : Number(step3Val.doubleBeds) || 0,
            singleBeds : Number(step3Val.singleBeds) || 0,
            hammocks : Number(step3Val.hammocks) || 0,
            sofaBeds : Number(step3Val.sofaBeds) || 0,
        });
    }, []);

 

    const [formData, setFormData] = useState<GuestManagement>({
        pricePerNight : 0,
        priceIncreasePerPerson : 0,
        acceptsChildren : false,
        acceptsPets : false,
        disabilityFriendly : false,
        minGuests : 0,
        maxGuests : 0,
        numBedrooms : 0,
        numBathrooms : 0,
        doubleBeds : 0,
        singleBeds : 0,
        hammocks : 0,
        sofaBeds : 0
    });




    const [errors, setErrors] = useState<Errors>({
        pricePerNight : null,
        priceIncreasePerPerson : null,
        acceptsChildren : null,
        acceptsPets : null,
        disabilityFriendly : null,
        minGuests : null,
        maxGuests : null
    });

    const [estimation, setEstimation] = useState<string>("");
    const [days, setDays] = useState<number>(30);


    useEffect(() => {
            const num : number = days * (Number(formData.pricePerNight) + Number(formData.priceIncreasePerPerson));


            // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
            setEstimation(((Math.round(num * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
            
        
      }, [formData.pricePerNight, days, formData.priceIncreasePerPerson]);

    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e : any) => {
        const { name, value} = e.target;
        console.log(value)
        if(value < 0){
            setFormData({ ...formData, [name]: 0 });
        }else{
        setFormData({ ...formData, [name]: value });
        }
    }

    const handleCheckChange = (e : any) => {
        const { name, checked} = e.target;
        console.log(name)
        console.log(checked)
        setFormData({ ...formData, [name]: checked });
    }

    const handleSlide = (e : any) => {
        const { _, value} = e.target;
        console.log(value)
        setDays(value);
    }

    const potentialBedProblem = () : boolean => {
        console.log("maxguests" + (formData.maxGuests));
        console.log("Bed count" + (formData.doubleBeds * 2 + formData.singleBeds + formData.hammocks + formData.sofaBeds));

        if(Number(formData.maxGuests) > Number(formData.doubleBeds * 2 + formData.singleBeds + formData.hammocks + formData.sofaBeds)){
            return true;
        }
        return false;
    }
    
    const validate = () : boolean => {
      
        let flag = true;
        let messages: Errors = { ...errors };
        console.log("maxg " + formData.maxGuests)
        console.log("ming " + formData.minGuests)
        if (formData.maxGuests <= 0) {
            messages.maxGuests = "Cannot be less than zero";
            flag = false;
        }
    
        if (formData.maxGuests < formData.minGuests) {
            console.log("hit");
            messages.maxGuests += "Cannot be less than minGuests";
            messages.minGuests = "Cannot be more than max guest count";
            flag = false;
        }

        setErrors(messages);
        return flag;
    }
    
    const handleSubmit = (e :any) => {
        e.preventDefault(); 
        if(potentialBedProblem()){
            if(!confirm("Bed count seems low. pls check")){
                return;
            }

        }
        const continueWithSubmit = validate();
        console.log(continueWithSubmit)
        if(!continueWithSubmit){
            return;
        }

        localStorage.setItem("step3", JSON.stringify(formData))
        // const pricing : number[] = [formData.pricePerNight, formData.priceIncreasePerPerson];
        // localStorage.setItem("pricing", JSON.stringify(pricing));

        // const who : Map<string, boolean> = new Map();

        // localStorage.setItem("acceptsChildren", String(formData.acceptsChildren));
        // localStorage.setItem("acceptsPets", String(formData.acceptsPets));
        // localStorage.setItem("disabilityFriendly", String(formData.disabilityFriendly));


        // localStorage.setItem("minGuests", String(formData.minGuests));
        // localStorage.setItem("maxGuests",String(formData.maxGuests));
        // localStorage.setItem("doubleBeds",String(formData.doubleBeds));
        // localStorage.setItem("singleBeds",String(formData.singleBeds));
        // localStorage.setItem("hammocks",String(formData.hammocks));
        // localStorage.setItem("sofaBeds", String(formData.singleBeds))

        const locale = (pathname.split("/").at(1));
        router.push(`/${locale}/add-property/step4`);
    }

    return (
        <div className={style.container}>
        <h1 className={style.shiftLeft}>Pricing & Guest Management</h1>
        <section className={style.section}>
            <h2>Pricing</h2>
            <div className={style.pricing}>
            <label htmlFor="pricePerNight">Price per night
            <div>
            <span>£</span>
            <input
                id="pricePerNight"
                type="number" 
                min="0"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                />
            </div>
            </label>
            <label htmlFor="priceIncreasePerPerson">Price increase per person per night
                <div>
            <span>£</span>
            <input
                id="priceIncreasePerPerson"
                type="number" 
                min="0"
                name="priceIncreasePerPerson"
                value={formData.priceIncreasePerPerson}
                onChange={handleChange}
                />
                </div>
            </label>
          
        </div>
        <div>
            <h2>Earnings over time (assuming two people every visit)</h2>
            <div id={style.earningsEst}>
            <strong>£{estimation}</strong>
            <input 
                type="range" 
                id="days" 
                name="days" 
                min="1" 
                max="366" 
                value={days}
                onChange={handleSlide}
             />
            <label htmlFor="days">Days: {days}</label>
            </div>
            </div>
        </section>

        <section className={style.section}>
        <h2>Who can you accommodate</h2>
        <div className={style.options}>

            <BigCheckbox 
                jsxnames={"acceptsChildren"}
                val={formData.acceptsChildren}
                displayName="Accept Children"
                imgPath="/child-svgrepo-com.svg"
                alt="Child icon"
                handler={handleCheckChange}
            />

            <BigCheckbox 
                jsxnames={"acceptsPets"}
                val={formData.acceptsPets}
                displayName="Accept pets"
                imgPath="/pet-14-svgrepo-com.svg"
                alt="Pet icon"
                handler={handleCheckChange}
            />


            <BigCheckbox 
                jsxnames={"disabilityFriendly"}
                val={formData.disabilityFriendly}
                displayName="Disability Friendly"
                imgPath="/Accessibility_Icon_final.svg"
                alt="Disabled icon"
                handler={handleCheckChange}
            />
        </div>
        </section>

        <section className={style.section}>
        <h2>How many can stay?</h2>
            <div id={style.guestSection}>
            <div className={style.flat}>
        <label htmlFor="minGuests">Minimum number of guests
            <input
                id="minGuests"
                type="number" 
                min="0"
                name="minGuests"
                placeholder="Min Guests"
                value={formData.minGuests}
                onChange={handleChange}
                />
            </label>
            <label htmlFor="maxGuests">Maximum number of guests 
            <input
                id="maxGuests"
                type="number" 
                min={0}
                name="maxGuests"
                placeholder="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                />
                {errors.maxGuests && errors.maxGuests}
            </label>
            </div>

            <div className={style.flat}>

            <label htmlFor="numBedrooms">Number of Bedrooms
            <input
                id="numBedrooms"
                type="number" 
                min={0}
                name="numBedrooms"
                placeholder="numBedrooms"
                value={formData.numBedrooms}
                onChange={handleChange}
                />
                {errors.maxGuests && errors.maxGuests}
            </label>

            <label htmlFor="numBathrooms">Number of Bathrooms
            <input
                id="numBathrooms"
                type="number" 
                min="0"
                name="numBathrooms"
                placeholder="numBathrooms"
                value={formData.numBathrooms}
                onChange={handleChange}
                />
            </label>
            </div>

            <div className={style.flat}>
            <label htmlFor="doubleBeds">Double Beds
            <input
                id="doubleBeds"
                type="number" 
                min={0}
                name="doubleBeds"
                placeholder="doubleBeds"
                value={formData.doubleBeds}
                onChange={handleChange}
                />
            </label>
            
            <label htmlFor="singleBeds">Single Beds
            <input
                id="singleBeds"
                type="number" 
                min={0}
                name="singleBeds"
                placeholder="singleBeds"
                value={formData.singleBeds}
                onChange={handleChange}
                />
            </label>
            
            <label htmlFor="hammocks">Hammocks
            <input
                id="hammocks"
                type="number" 
                min={0}
                name="hammocks"
                placeholder="hammocks"
                value={formData.hammocks}
                onChange={handleChange}
                />

            </label>

            <label htmlFor="sofaBeds">sofa Beds
            <input
                id="sofaBeds"
                type="number" 
                min={0}
                name="sofaBeds"
                placeholder="sofaBeds"
                value={formData.sofaBeds}
                onChange={handleChange}
                />
            </label>
            </div>
            </div>
            </section>
            <AddPropertyBottomNav
                handleSubmitFunction={handleSubmit} 
                buttonText="Save and Continue to the next step."
                prevSteps={[1,2]} />
        </div>
        


    )
}

export default Step3GuestManagement;

