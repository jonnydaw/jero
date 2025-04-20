'use client'
import { PropertyAttributeFull } from "@/types/types";
import style from "./mobileBubbles.module.css"
import { useTranslations } from "next-intl";


interface Props{
    propertyAttributes : PropertyAttributeFull;

}

const MobileBubbles = (props : Props) => {
    const t = useTranslations('Property');
    return(
        <div className={style.bubbleArea}>
        
        <strong className={style.bubble}>{`${props.propertyAttributes.numBedrooms} ${t('bedrooms')}`}</strong>
        <strong className={style.bubble}>{`${props.propertyAttributes.numBathrooms} ${t('bathrooms')}`}</strong>
        <strong className={style.bubble}>{props.propertyAttributes.numberDoubleBeds > 0 && `${t('doubleBeds')} ${props.propertyAttributes.numberDoubleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSingleBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSingleBeds > 0 && `${t('singleBeds')} ${props.propertyAttributes.numberSingleBeds} `}</strong>
        <strong className={props.propertyAttributes.numberSofaBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSofaBeds > 0 && `${t('sofaBeds')} ${props.propertyAttributes.numberSofaBeds} `}</strong>
        <strong className={props.propertyAttributes.numberHammocks > 0 ? style.bubble : ""}>{props.propertyAttributes.numberHammocks > 0 && `${t('hammocks')} ${props.propertyAttributes.numberHammocks} `}</strong>
        
        <strong className={props.propertyAttributes.acceptsChildren ? style.bubble : style.bubbleFalse}>{`${props.propertyAttributes.acceptsChildren ? "" : t('not')} ${t('childFriendly')}`}</strong>
        <strong className={props.propertyAttributes.disabilityFriendly ? style.bubble : style.bubbleFalse}>{`${props.propertyAttributes.disabilityFriendly ? "" : t('not')} ${t('disabilityFriendly')}`}</strong>
        <strong className={props.propertyAttributes.acceptsPets ? style.bubble : style.bubbleFalse}> {`${props.propertyAttributes.acceptsPets ? "" : t('not')} ${t('petFriendly')}`}</strong>
        </div>
    )
}
export default MobileBubbles;