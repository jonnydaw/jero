'use client'


import { PropertyAttributeFull } from "@/types/types";
import style from "./bubblesPC.module.css"


interface Props{
    propertyAttributes : PropertyAttributeFull;

}

const PCBubbles = (props : Props) => {
    return(
        <div id={style.bubbleContainer}>
        <div className={style.bubbleArea}>
            <strong className={style.bubble}>{`Price per night £${props.propertyAttributes.pricePerNight} `}</strong>
            <strong className={style.bubble}>{`Price increase per person £${props.propertyAttributes.priceIncreasePerPerson}`}</strong>
        </div>

        <div className={style.bubbleArea}>
        <strong className={style.bubble}>{props.propertyAttributes.numberDoubleBeds > 0 && `Double beds ${props.propertyAttributes.numberDoubleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSingleBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSingleBeds > 0 && `Single beds ${props.propertyAttributes.numberSingleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSofaBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSofaBeds > 0 && `Sofa beds ${props.propertyAttributes.numberSofaBeds} `}</strong>
        <strong className={props.propertyAttributes.numberHammocks > 0 ? style.bubble : ""}>{props.propertyAttributes.numberHammocks > 0 && `Hammocks ${props.propertyAttributes.numberHammocks} `}</strong>
        </div>
        
        <div className={style.bubbleArea}>
        <strong className={props.propertyAttributes.acceptsChildren ? style.bubble : style.bubbleFalse}>{`Accepts children: ${props.propertyAttributes.acceptsChildren ? "yes" : "no"} `}</strong>
        <strong className={props.propertyAttributes.acceptsPets ? style.bubble : style.bubbleFalse}> {`Accepts pets: ${props.propertyAttributes.acceptsPets ? "yes" : "no"} `}</strong>
        <strong className={props.propertyAttributes.disabilityFriendly ? style.bubble : style.bubbleFalse}>{`Is disability friendly: ${props.propertyAttributes.disabilityFriendly ? "yes" : "no"} `}</strong>
        </div>
        </div>
    )
}
export default PCBubbles;