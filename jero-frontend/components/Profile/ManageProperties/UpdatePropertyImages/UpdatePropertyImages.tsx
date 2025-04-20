'use client'

import { useState } from "react"
import style from "./updatePropetyImages.module.css"
import Step2AddImages from "@/components/AddProperty/step2/Step2AddImages"
import { inDevEnvironment } from "@/base"
import axios from "axios"
import { useTranslations } from "next-intl"

interface Props {
    imgUrls : string[]
    propertyId : string;
}
const UpdatePropertyImages = (props : Props) => {

    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    const [getImages, setImages] = useState<string[]>(
        props.imgUrls
    )

    const t = useTranslations('UpdatePropertyImages');


    const handleDelete = (item : string) => {
        setImages(getImages.filter((image) => image !== item))
    } 

    console.log("getimgs " + getImages)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`${baseApi}/property/update-property-images/${props.propertyId}`, {
                updatedImages :  getImages

               },
                   { withCredentials: true}
               );
               //console.log(response.status);
               alert("uploaded")

               
        } catch (error) {
            
        }

    }

    return (
        <div id={style.container}>
            <div id={style.subContainer}>
                <h1 style={{textAlign: "center"}}>{t('currentImages')}</h1>
                <div id={style.imageArea}>
            {
                getImages.map((item, idx) => (
                    <div className={style.image} key={idx} >
                        <img src={item} alt="propertyimage" />
                        <button style={{backgroundColor: "#FF746C"}} className={`basicButton`} onClick={() => handleDelete(item)}>{t('delete')}</button>
                    </div>
                ))
            }
           
            </div>
            <button onClick={handleSubmit} className="basicButton">{t('confirm')}</button>
            <Step2AddImages isUpdate={true} getter={getImages} setter={setImages}/>
            </div>
        </div>
    )
}

export default UpdatePropertyImages;