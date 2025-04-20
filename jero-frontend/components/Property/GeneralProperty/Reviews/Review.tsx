'use client'
import { useTranslations } from "next-intl";
import style from "../Amenities/amenties.module.css"

import { useState } from "react";

interface Props {
    reviewDate : Date,
    reviewer : string,
    score : number,
    title : string,
    body : string,
}

const Reviews = (props : Props) => {
    const t = useTranslations("Reviews");
    const [expanded, setExpanded] = useState<boolean>(false);
   // console.log(props.reviewDate)
    return (
        <div id={style.amenitiesList}>
        <div onClick={() => setExpanded(!expanded)} id={style.title}>
        <h3>{props.title} @ {props.reviewDate.toLocaleString().split("T")[0]} {t('by')} {props.reviewer}</h3>
        <h4>{props.score} / {10}</h4>
        <button onClick={() => setExpanded(!expanded)} className={`basicButton`}>{expanded ? t('hide'): t('show')}</button>
        </div>
            {
                expanded 
                &&
                <div id={style.flex}>
      
                    <p>{props.body}</p>
        
            </div>
            }
        </div>
    )
}

export default Reviews;