'use client'

import { useState } from "react";
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
            <label htmlFor="propertyTitle"> Property Title
                <input 
                type="text" 
                name="propertyTitle" 
                id="propertyTitle" 
                value={overview.propertyTitle}
                onChange={handleChange} />
            </label>

            <label htmlFor="propertyTitle"> Property Description
                <input 
                type="text" 
                name="propertyDescription" 
                id="propertyDescription" 
                value={overview.propertyDescription}
                onChange={handleChange} />
            </label>

            
                 
            <label htmlFor="propertyGuide"> Property Guide
                <textarea 
                name="propertyGuide" 
                id="propertyGuide" 
                value={overview.propertyGuide}
                rows={1} 
                cols={40}
                onChange={handleChange} />
            </label>

            <label htmlFor="propertyRules"> Property Rules
                <input 
                type="text" 
                name="propertyRules" 
                id="propertyRules" 
                value={overview.propertyRules}
                onChange={handleChange} />
            </label>
        </div>
    )
}

export default Step5AddDescription