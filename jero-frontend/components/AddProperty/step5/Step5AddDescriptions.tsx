'use client'

import { useState } from "react";
import style from "./Step5.module.css"


type Overview = {
    propertyTitle : string;
    propertyDescription : string;
    propertyGuide : string;
    propertyRules : string;
    propertyCheckInTime : string;
    propertyCheckoutTime : string;
}
const Step5AddDescription = () => {

    const [overview, setOverview] = useState<Overview>({
        propertyTitle : "",
        propertyDescription : "",
        propertyGuide : "",
        propertyRules : "",
        propertyCheckInTime : "",
        propertyCheckoutTime : "",
    });

    const handleChange = (e : any) => {
        const {value , name} = e.target;
        setOverview({...overview, [name] :  value})

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
            </div>
        </div>
    )
}

export default Step5AddDescription