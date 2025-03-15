'use client'
import { PropertyAttribute } from "@/types/types";
import style from "./propertcard.module.css"
import { usePathname, useRouter } from "next/navigation";
interface Props {
    propertyAttribute : PropertyAttribute;
}

const PropertyCard = (props : Props) => {
    console.log(props)
    const router = useRouter();
    const pathname = usePathname();
    
    const handleClick = (e : any) =>{
        const locale = (pathname.split("/").at(1));
        router.push(`/${locale}/property/${props.propertyAttribute.id}`);    }
    return(
        <div 
            className={style.card}
            onClick={handleClick}
            >
                <h3>{props.propertyAttribute.title.length > 0 ? props.propertyAttribute.title : "No title" }</h3>
                <img src={props.propertyAttribute.mainImage} alt="Main Property Image" />
                <strong>£{props.propertyAttribute.pricePerNight} nightly - £300 for your stay </strong>
                <p>{props.propertyAttribute.displayLocation}</p>
        </div>
    )
}

export default PropertyCard;