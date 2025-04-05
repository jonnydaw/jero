'use client'

import { useState } from "react";
import style from "./privacy.module.css"
import { inDevEnvironment } from "@/base";
import axios from "axios";

interface FormData {
    showNameOnReviews : boolean;
    showProfileAfterBooking : boolean
    allowAnalysisOnBookings : boolean
}


const PrivacyCustomer = (props : FormData) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    const [formData, setFormData] = useState<FormData>(
        {
        showNameOnReviews : props.showNameOnReviews,
        showProfileAfterBooking : props.showProfileAfterBooking,
        allowAnalysisOnBookings : props.allowAnalysisOnBookings,
        }
    );  
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name] : value === "true" });
        console.log(formData)
      };

      const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.put(`${baseApi}/profile/update-privacy`, {
                showNameOnReviews :  formData.showNameOnReviews,
                showProfileAfterBooking : formData.showProfileAfterBooking,
                allowAnalysisOnBookings : formData.allowAnalysisOnBookings,

               },
                   { withCredentials: true}
               );
               console.log(response.status);
               
        } catch (error) {
            
        }
    }

    
    return(
        <div id={style.container}>
            <div id={style.formArea}>
            <form onSubmit={handleSubmit}>
            <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>Review Privacy</h3>
                </div>
                    <div className={style.items}>
                        <div className={style.selectItem}>
                            <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"doNotshowNameOnReviews"} 
                                    name="showNameOnReviews"
                                    value={"false"}
                                    checked={!formData.showNameOnReviews}
                            />
                                <label htmlFor={"doNotshowNameOnReviews"}>{"Dont show name on reviews"}</label>
                                </div>
                                <div className={style.selectItem}>
                            <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"showNameOnReviews"} 
                                    name="showNameOnReviews"
                                    value={"true"}
                                    checked={formData.showNameOnReviews}
                            />
                            <label htmlFor={"showNameOnReviews"}>{"showNameOnReviews"}</label>
                            </div>
                            
        
                </div>
                </fieldset>

                <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>Booking Privacy</h3>
                </div>
                    <div className={style.items}>
                        <div className={style.selectItem}>
                        <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"doNotshowProfileAfterBooking"} 
                                    name="showProfileAfterBooking"
                                    value={"false"}
                                    checked={!formData.showProfileAfterBooking}
                            />
                                <label htmlFor={"doNotshowProfileAfterBooking"}>{"Dont show profile after booking"}</label>
                                </div>

                                <div className={style.selectItem}>
                                <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"showProfileAfterBooking"} 
                                    name="showProfileAfterBooking"
                                    value={"true"}
                                    checked={formData.showProfileAfterBooking}
                            />
                            <label htmlFor={"showProfileAfterBooking"}>{"showProfileAfterBooking"}</label>
                            </div>
                            
        
                </div>
                </fieldset>
               
                <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>Booking Analysis</h3>
                </div>
                    <div className={style.items}>
                        <div className={style.selectItem}>
                        <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"doNotallowAnalysisOnBookings"} 
                                    name="allowAnalysisOnBookings"
                                    value={"false"}
                                    checked={!formData.allowAnalysisOnBookings}
                            />
                                <label htmlFor={"doNotshowProfileAfterBooking"}>{"Dont allow booking analysis"}</label>
                                </div>

                                <div className={style.selectItem}>
                                <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"allowAnalysisOnBookings"} 
                                    name="allowAnalysisOnBookings"
                                    value={"true"}
                                    checked={formData.allowAnalysisOnBookings}
                            />
                            <label htmlFor={"allowAnalysisOnBookings"}>{"allowAnalysisOnBookings"}</label>
                            </div>
                            
        
                </div>
                </fieldset>

                <button className="basicButton">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default PrivacyCustomer;