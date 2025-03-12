'use client'

import { useState } from "react";
import style from "./Step5.module.css"
import AddPropertyBottomNav from "../AddPropertyBottomNav";
import axios from "axios";
import { inDevEnvironment } from "@/base";


type Overview = {
    propertyTitle : string;
    propertyDescription : string;
    propertyGuide : string;
    propertyRules : string;
    // propertyCheckInTime : string;
    // propertyCheckoutTime : string;
}
const Step5AddDescription = () => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const [overview, setOverview] = useState<Overview>({
        propertyTitle : "",
        propertyDescription : "",
        propertyGuide : "",
        propertyRules : "",
        // propertyCheckInTime : "",
        // propertyCheckoutTime : "",
    });

    const handleChange = (e : any) => {
        const {value , name} = e.target;
        setOverview({...overview, [name] :  value})
    }
    
    const handleSubmit = async (e : any) => {
        e.preventDefault();
        // done in case the user leaves still
        localStorage.setItem("overview",JSON.stringify(overview));

        const addressData = JSON.parse(localStorage.getItem("addressAndCoordinates") || "");
        const beautyData = JSON.parse(localStorage.getItem("beauty") || "");
        const climateData = JSON.parse(localStorage.getItem("climateControl")|| "");
        const entertainmentData = JSON.parse(localStorage.getItem("entertainment")|| "");
        const healthAndSafetyData = JSON.parse(localStorage.getItem("healthAndSafety")|| "");
        const imagesData = JSON.parse(localStorage.getItem("images")|| "");
        const kitchenData = JSON.parse(localStorage.getItem("kitchen")|| "");
        const laundryData = JSON.parse(localStorage.getItem("laundry")|| "");
        const overviewData = JSON.parse(localStorage.getItem("overview")|| "");
        console.log(overviewData);
        const step3Data = JSON.parse(localStorage.getItem("step3")|| "");
        const transportData = JSON.parse(localStorage.getItem("transport")|| "");
        const waterData = JSON.parse(localStorage.getItem("water")|| "");



        try {
            const response = await axios.post(`${baseApi}/property/add_property`, {
                addressData : (addressData),
                beautyData : beautyData,
                climateData : climateData,
                entertainmentData : entertainmentData,
                healthAndSafetyData : healthAndSafetyData,
                imagesData : imagesData,
                kitchenData : kitchenData,
                laundryData : laundryData,
                overviewData : overviewData,
                step3Data : step3Data,
                transportData : transportData,
                waterData : waterData,
               },
                   { withCredentials: true}
               );
               console.log(response.status);
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>Description</h1>
            <div id={style.textAreaContainer}>
            <label htmlFor="propertyTitle"> Property Title
                <textarea
                placeholder="Title of your choice. e.g. Modern, 2 bedroom apartment in a quiet neighbourhood. Perfect for weekend trips, or long stays."
                name="propertyTitle"
                rows={3} 
                id="propertyTitle" 
                value={overview.propertyTitle}
                onChange={handleChange} />
            </label>

            <label htmlFor="propertyTitle"> Property Description
                <textarea
                placeholder="A more detailed insight into the property, the area, nearby attractions etc."
                name="propertyDescription" 
                id="propertyDescription" 
                rows={6}
                value={overview.propertyDescription}
                onChange={handleChange} />
            </label>

            
                 
            <label htmlFor="propertyGuide"> Property Guide (we will only show this to users who have a confirmed booking)
                <textarea 
                placeholder="For example, extra directions if the property is hard to find, where to put rubbish etc."
                name="propertyGuide" 
                id="propertyGuide" 
                rows={6}
                value={overview.propertyGuide}
                onChange={handleChange} />
            </label>

            <label htmlFor="propertyRules"> Property Rules
                <textarea 
                placeholder="For example, no parties, no guests not in the original booking etc."
                name="propertyRules" 
                id="propertyRules" 
                rows={6}
                value={overview.propertyRules}
                onChange={handleChange} />
            </label>

            <AddPropertyBottomNav
                handleSubmitFunction={handleSubmit} 
                buttonText="Thank you for going through all the steps. Click here to add your property."
                prevSteps={[1,2,3,4]} />
            </div>
        </div>
    )
}

export default Step5AddDescription