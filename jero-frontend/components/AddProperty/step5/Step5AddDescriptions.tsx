'use client'

import { useEffect, useState } from "react";
import style from "./Step5.module.css"
import AddPropertyBottomNav from "../AddPropertyBottomNav";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import { useTranslations } from "next-intl";
import ErrorModal from "@/components/MessageModal/ErrorModal";

interface Props {
    isUpdate: boolean 
    data: Overview | null 
    propertyId : string | null
}

type Overview = {
    propertyTitle : string;
    propertyDescription : string;
    propertyGuide : string;
    propertyRules : string;
    // propertyCheckInTime : string;
    // propertyCheckoutTime : string;
}
const Step5AddDescription = (props: Props) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const t = useTranslations('Step5');
    const [overview, setOverview] = useState<Overview>({
        propertyTitle : "",
        propertyDescription : "",
        propertyGuide : "",
        propertyRules : "",
        // propertyCheckInTime : "",
        // propertyCheckoutTime : "",
    });

    const handleChange = (e : any) => {
        const {value, name} = e.target;
        setOverview({...overview, [name] :  value})
    }

    if(props.isUpdate){
        useEffect(() => {
                if(props.data){
                    setOverview(props.data);
                }
    
        }, []);
                
    }


    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleUpdateSubmit = async (e: any) => {
        e.preventDefault();
        console.log("ov" + JSON.stringify(overview))

         try {
            const response = await axios.patch(`${baseApi}/property/update-descriptions/${props.propertyId}`, {
                newDescriptions : overview
                },
                    { withCredentials: true}
                );
                console.log(response.status);
                
        } catch (error :any) {
            const message = error.response ? error.response.data : error.message
            setErrorMessage( message)
            setShowErrorModal(true)
        }
    }
    
    const handleOriginalSubmit = async (e : any) => {
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

        if(addressData === ""){

        }


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
               
               localStorage.removeItem("addressAndCoordinates")
               localStorage.removeItem("beauty")
               localStorage.removeItem("climateControl")
               localStorage.removeItem("entertainment")
               localStorage.removeItem("healthAndSafety")
               localStorage.removeItem("images");
               localStorage.removeItem("kitchen")
               localStorage.removeItem("laundry")
               localStorage.removeItem("overview")
               localStorage.removeItem("step3")
                localStorage.removeItem("transport")
               localStorage.removeItem("water")
               console.log(response.status);
               alert("Property added");
        } catch (error : any) {
            const message = error.response ? error.response.data : error.message
            setErrorMessage( message)
            setShowErrorModal(true)
        }
    }

    return (
        <div>
            {showErrorModal && <ErrorModal error={errorMessage}/>}
            <h1 style={{textAlign: 'center'}}>{props.isUpdate ? t('updateTitle') : t('title')}</h1>
            <div id={style.textAreaContainer}>
            <label htmlFor="propertyTitle">{t('propertyTitle')}
                <textarea
                maxLength={40}
                placeholder={t('propertyPlaceholder')}
                name="propertyTitle"
                rows={3} 
                id="propertyTitle" 
                value={overview.propertyTitle}
                onChange={handleChange} />
            </label>

            <label htmlFor="propertyTitle">{t('propertyDescription')}
                <textarea
                placeholder={t('descriptionPlaceholder')}
                name="propertyDescription" 
                id="propertyDescription" 
                rows={6}
                value={overview.propertyDescription}
                onChange={handleChange} />
            </label>

            
                 
            <label htmlFor="propertyGuide">{t('guide')}
                <textarea 
                placeholder={t('guidePlaceholder')}
                name="propertyGuide" 
                id="propertyGuide" 
                rows={6}
                value={overview.propertyGuide}
                onChange={handleChange} />
            </label>

            <label htmlFor="propertyRules">{t('rules')}
                <textarea 
                placeholder={t('rulesPlaceholder')}
                name="propertyRules" 
                id="propertyRules" 
                rows={6}
                value={overview.propertyRules}
                onChange={handleChange} />
            </label>

        {
            props.isUpdate
            ?
            <button onClick={handleUpdateSubmit} className="basicButton">{t('save')}</button>
            :
            <AddPropertyBottomNav
            handleSubmitFunction={handleOriginalSubmit} 
            buttonText={t('save')}
            prevSteps={[1,2,3,4]} />
        }

            </div>
        </div>
    )
}

export default Step5AddDescription;