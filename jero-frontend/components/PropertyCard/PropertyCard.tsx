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
    const searchParams = useSearchParams()
    const handleClick = (e : any) =>{
        const locale = (pathname.split("/").at(1));
        const startDate = searchParams.get("startdate");
        const endDate = searchParams.get("enddate");
        const adultCount = searchParams.get("numadults");
        const childCount = searchParams.get("numchildren");
        const petCount = searchParams.get("numpets");

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
                <strong>£{props.propertyAttribute.pricePerNight} nightly - £300 for your stay </strong>
                <p>{props.propertyAttribute.displayLocation}</p>
                <p>{props.propertyAttribute.percentile > 0 ? `Rated higher than ${~~props.propertyAttribute.percentile}%` : "No reviews yet" }</p>
        </div>
    )
}

export default PropertyCard;    