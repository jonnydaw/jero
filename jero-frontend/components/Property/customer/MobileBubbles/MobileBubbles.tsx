'use client'
import { PropertyAttributeFull } from "@/types/types";
import style from "./mobileBubbles.module.css"


interface Props{
    propertyAttributes : PropertyAttributeFull;

}

const MobileBubbles = (props : Props) => {
    return(
        <div className={style.bubbleArea}>
        
        <strong className={style.bubble}>{`${props.propertyAttributes.numBedrooms} Bedrooms`}</strong>
        <strong className={style.bubble}>{`${props.propertyAttributes.numBathrooms} Bathrooms`}</strong>
        <strong className={style.bubble}>{props.propertyAttributes.numberDoubleBeds > 0 && `Double beds ${props.propertyAttributes.numberDoubleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSingleBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSingleBeds > 0 && `Single beds ${props.propertyAttributes.numberSingleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSofaBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSofaBeds > 0 && `Sofa beds ${props.propertyAttributes.numberSofaBeds} `}</strong>
        <strong className={props.propertyAttributes.numberHammocks > 0 ? style.bubble : ""}>{props.propertyAttributes.numberHammocks > 0 && `Hammocks ${props.propertyAttributes.numberHammocks} `}</strong>
        
        <strong className={props.propertyAttributes.acceptsChildren ? style.bubble : style.bubbleFalse}>{`${props.propertyAttributes.acceptsChildren ? "" : "Not"} Child Friendly`}</strong>
        <strong className={props.propertyAttributes.acceptsPets ? style.bubble : style.bubbleFalse}> {`${props.propertyAttributes.acceptsPets ? "" : "Not"} Pet Friendly`}</strong>
        <strong className={props.propertyAttributes.disabilityFriendly ? style.bubble : style.bubbleFalse}>{`${props.propertyAttributes.disabilityFriendly ? "" : "Not"} Disability Friendly`}</strong>
        </div>
    )
}
export default MobileBubbles;