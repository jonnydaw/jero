'use client'
import { PropertyAttributeFull } from "@/types/types";
import style from "./mobileBubbles.module.css"


interface Props{
    propertyAttributes : PropertyAttributeFull;

}

const MobileBubbles = (props : Props) => {
    return(
        <div className={style.bubbleArea}>
            <strong className={style.bubble}>{`Price per night: £${props.propertyAttributes.pricePerNight} `}</strong>
            <strong className={style.bubble}>{`Price increase per person: £${props.propertyAttributes.priceIncreasePerPerson} (per night)`}</strong>

        <strong className={style.bubble}>{props.propertyAttributes.numberDoubleBeds > 0 && `Double beds ${props.propertyAttributes.numberDoubleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSingleBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSingleBeds > 0 && `Single beds ${props.propertyAttributes.numberSingleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSofaBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSofaBeds > 0 && `Sofa beds ${props.propertyAttributes.numberSofaBeds} `}</strong>
        <strong className={props.propertyAttributes.numberHammocks > 0 ? style.bubble : ""}>{props.propertyAttributes.numberHammocks > 0 && `Hammocks ${props.propertyAttributes.numberHammocks} `}</strong>
        
        <strong className={props.propertyAttributes.acceptsChildren ? style.bubble : style.bubbleFalse}>{`Child Friendly: ${props.propertyAttributes.acceptsChildren ? "Yes" : "No"} `}</strong>
        <strong className={props.propertyAttributes.acceptsPets ? style.bubble : style.bubbleFalse}> {`Pet Friendly: ${props.propertyAttributes.acceptsPets ? "Yes" : "No"} `}</strong>
        <strong className={props.propertyAttributes.disabilityFriendly ? style.bubble : style.bubbleFalse}>{`Disability friendly: ${props.propertyAttributes.disabilityFriendly ? "yes" : "no"} `}</strong>
        </div>
    )
}
export default MobileBubbles;