'use client'
import { useState } from "react"
import style from "./amenties.module.css"


interface Props {
    object : Object
    amenityName : string
}


const Amenities = (props : Props) => {
    const truthies : string[] = [];
    const falsies : string[] = [];
    const [expanded, setExpanded] = useState<boolean>(false);
    Object.entries(props.object).forEach(([key, value]) => {
        if (value) {
            truthies.push(key);
        }else{
            falsies.push(key);
        }
    });
    return(
        <div id={style.amenitiesList}>
        <div onClick={() => setExpanded(!expanded)} id={style.title}>
        <h3>{props.amenityName}</h3>
        <h4>{`${truthies.length} / ${truthies.length + falsies.length} `}</h4>
        <button onClick={() => setExpanded(!expanded)} className={`basicButton`}>{expanded ? `Hide` : `show`}</button>
        </div>
            {
                expanded 
                &&
                <div id={style.flex}>
      
                <ul id={style.hasnt}>
                {falsies.map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
            <ul id={style.has}>
                {truthies.map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        
            </div>
            }
        </div>
    )

}

export default Amenities