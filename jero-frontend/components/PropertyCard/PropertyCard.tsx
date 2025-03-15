import { PropertyAttribute } from "@/types/types";
import style from "./propertcard.module.css"

interface Props {
    propertyAttribute : PropertyAttribute;
}

const PropertyCard = (props : Props) => {
    console.log(props)
    return(
        <div className={style.card}>
            
                <h3>Title: {props.propertyAttribute.title}</h3>
                <img src={props.propertyAttribute.mainImage} alt="Main Property Image" />
                <p>Location : {props.propertyAttribute.townId}, {props.propertyAttribute.cityDistrictId}</p>
                <strong>Price: {props.propertyAttribute.pricePerNight}</strong>
            
        </div>
    )
}

export default PropertyCard;