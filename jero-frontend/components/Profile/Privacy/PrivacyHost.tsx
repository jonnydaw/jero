'use client'

import { useState } from "react";
import style from "./privacy.module.css"
import { inDevEnvironment } from "@/base";
import axios from "axios";
import { useTranslations } from "next-intl";

interface FormData {
    showProfileOnPropertyPage : boolean;
    showProfileAfterBooking : boolean
    allowAnalysisOnBookings : boolean
}


const PrivacyHost = (props : FormData) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const t = useTranslations('Privacy');
    const [formData, setFormData] = useState<FormData>(
        {
        showProfileOnPropertyPage: props.showProfileOnPropertyPage,
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
            const response = await axios.put(`${baseApi}/profile/update-privacy-host`, {
                showProfileOnPropertyPage :  formData.showProfileOnPropertyPage,
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
                <h3>{t('preBookingProfilePrivacy')}</h3>
                </div>
                    <div className={style.items}>
                        <div className={style.selectItem}>
                            <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"doNotshowProfileOnPropertyPage"} 
                                    name="showProfileOnPropertyPage"
                                    value={"false"}
                                    checked={!formData.showProfileOnPropertyPage}
                            />
                                <label htmlFor={"doNotshowProfileOnPropertyPage"}>{t('doNotshowProfileOnPropertyPage')}</label>
                                </div>
                                <div className={style.selectItem}>
                            <input 
                                    onChange={handleChange} 
                                    type='radio'  
                                    id={"showProfileOnPropertyPage"} 
                                    name="showProfileOnPropertyPage"
                                    value={"true"}
                                    checked={formData.showProfileOnPropertyPage}
                            />
                            <label htmlFor={"showProfileOnPropertyPage"}>{t('showProfileOnPropertyPage')}</label>
                            </div>
                            
        
                </div>
                </fieldset>

                <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>{t('postBookingProfilePrivacy')}</h3>
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
                                <label htmlFor={"doNotshowProfileAfterBooking"}>{t('doNotshowProfileAfterBooking')}</label>
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
                            <label htmlFor={"showProfileAfterBooking"}>{t('showProfileAfterBooking')}</label>
                            </div>
                            
        
                </div>
                </fieldset>
               
                <fieldset className={style.fields}>
                <div className={style.underlineDiv}>
                <h3>{t('bookingAnalysis')}</h3>
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
                                <label htmlFor={"doNotallowAnalysisOnBookings"}>{t('doNotallowAnalysisOnBookings')}</label>
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
                            <label htmlFor={"allowAnalysisOnBookings"}>{t('allowAnalysisOnBookings')}</label>
                            </div>
                            
        
                </div>
                </fieldset>

                <button className="basicButton">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default PrivacyHost;