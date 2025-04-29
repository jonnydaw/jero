'use client'
import { PropertyAttribute } from "@/types/types";
import style from "./propertcard.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEventHandler, MouseEventHandler } from "react";
import { useTranslations } from "next-intl";
interface Props {
    propertyAttribute : PropertyAttribute;
}

const PropertyCard = (props : Props) => {
    console.log(props)
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = (pathname.split("/").at(1));
    const startDate = searchParams.get("startdate");
    const endDate = searchParams.get("enddate");
    const adultCount = searchParams.get("numadults");
    const childCount = searchParams.get("numchildren");
    const petCount = searchParams.get("numpets");
    const guestTotal = Number(childCount) + Number(adultCount);
    let bookingLength : number | null = null
    if(startDate && endDate){
        bookingLength = ((new Date(endDate || "").getTime() - new Date(startDate || "").getTime()) / 86_400_000);
    }else{
        bookingLength = 1;
    }

    const t = useTranslations('PropertyCard');
console.log("total")
const basePrice =  Number(props.propertyAttribute.pricePerNight) * bookingLength;
const extraGuestsCosts = ((guestTotal-1) * Number(props.propertyAttribute.extraGuestPriceIncrease)) * bookingLength;

    const handleClick = () =>{
        const params = new URLSearchParams();
        params.set("startdate",startDate || "");
        params.set("enddate", endDate || "");
        params.set("numadults", adultCount|| "");
        params.set("numchildren",childCount|| "");
        params.set("numpets", petCount|| "");
        router.push(`/${locale}/property/${props.propertyAttribute.id}?${params.toString()}`);    
    }

    const handleEnter = (e : any) => {
        if(e.key === "Enter"){
            const params = new URLSearchParams();
            params.set("startdate",startDate || "");
            params.set("enddate", endDate || "");
            params.set("numadults", adultCount|| "");
            params.set("numchildren",childCount|| "");
            params.set("numpets", petCount|| "");
            router.push(`/${locale}/property/${props.propertyAttribute.id}?${params.toString()}`);
        }

    }

    return(
        <div 
            tabIndex={0}
            className={style.card}
            onClick={handleClick}
            onKeyDown={handleEnter}
            role="link"
            >
                <h3>{props.propertyAttribute.title.length > 0 ? props.propertyAttribute.title : t('noTitle') }</h3>
                <img src={props.propertyAttribute.mainImage} alt="Main Property Image" />
                <strong style={{marginTop : "0.5em"}}>£{Number(props.propertyAttribute.pricePerNight)} per night  {bookingLength && `• £${basePrice + extraGuestsCosts} ${t('total')}`}</strong>
                <em style={{marginBottom : "0.5em"}}>{t('extra')} • £{Number(props.propertyAttribute.extraGuestPriceIncrease)}</em>
                <p style={{margin : "0em"}}>{props.propertyAttribute.displayLocation}</p>
                <p>{props.propertyAttribute.percentile > 0 ? `${t('ratedHigher')} ${~~props.propertyAttribute.percentile}%` : t('noReviews') }</p>
        </div>
    )
}

export default PropertyCard;    