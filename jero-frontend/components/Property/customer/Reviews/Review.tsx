'use client'
import style from "../Amenities/amenties.module.css"

import { useState } from "react";

interface Props {
    reviewDate : Date,
    score : number,
    title : string,
    body : string,
}

const Reviews = (props : Props) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    console.log(props.reviewDate)
    return (
        <div id={style.amenitiesList}>
        <div onClick={() => setExpanded(!expanded)} id={style.title}>
        <h3>{props.title} @ {props.reviewDate.toLocaleString().split("T")[0]}</h3>
        <h4>{props.score} / {10}</h4>
        <button onClick={() => setExpanded(!expanded)} className={`basicButton`}>{expanded ? `Hide` : `show`}</button>
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