'use client'
import { PropertyAttribute } from "@/types/types";
import style from "./propertcard.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    console.log(Number(props.propertyAttribute.extraGuestPriceIncrease));
    let bookingLength : number | null = null
    if(startDate && endDate){
        bookingLength = ((new Date(endDate || "").getTime() - new Date(startDate || "").getTime()) / 86_400_000);
    }
    //const 


    const handleClick = (e : any) =>{


        console.log()
        const params = new URLSearchParams();
        params.set("startdate",startDate || "");
        params.set("enddate", endDate || "");
        params.set("numadults", adultCount|| "");
        params.set("numchildren",childCount|| "");
        params.set("numpets", petCount|| "");
        router.push(`/${locale}/property/${props.propertyAttribute.id}?${params.toString()}`);    }
    return(
        <div 
            className={style.card}
            onClick={handleClick}
            >
                <h3>{props.propertyAttribute.title.length > 0 ? props.propertyAttribute.title : "No title" }</h3>
                <img src={props.propertyAttribute.mainImage} alt="Main Property Image" />
                <strong style={{marginTop : "0.5em"}}>£{Number(props.propertyAttribute.pricePerNight)} per night - £{ bookingLength && Number(props.propertyAttribute.pricePerNight) * bookingLength} total</strong>
                <em style={{marginBottom : "0.5em"}}>Extra guest cost per night £{Number(props.propertyAttribute.extraGuestPriceIncrease)}</em>
                <p style={{margin : "0em"}}>{props.propertyAttribute.displayLocation}</p>
                <p>{props.propertyAttribute.percentile > 0 ? `Rated higher than ${~~props.propertyAttribute.percentile}%` : "No reviews yet" }</p>
        </div>
    )
}

export default PropertyCard;    