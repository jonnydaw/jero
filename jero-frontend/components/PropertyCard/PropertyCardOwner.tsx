import { PropertyAttribute } from "@/types/types";
import style from "./propertcard.module.css"
import { Link } from "@/i18n/routing";
import ModalUpdate from "@/components/Profile/ManageProperties/ModalUpdate/ModalUpdate"
interface Props {
    propertyAttribute : PropertyAttribute;
}
const PropertyCardOwner = (props : Props) => {
    return(
        <div 
            className={style.card}>
                

                <h3>{props.propertyAttribute.title.length > 0 ? props.propertyAttribute.title : "No title" }</h3>
                <img src={props.propertyAttribute.mainImage} alt="Main Property Image" />
                <strong style={{marginTop : "0.5em"}}>£{Number(props.propertyAttribute.pricePerNight)} per night</strong>
                <em style={{marginBottom : "0.5em"}}>Extra guest cost per night £{Number(props.propertyAttribute.extraGuestPriceIncrease)}</em>
                <p style={{margin : "0em"}}>{props.propertyAttribute.displayLocation}</p>
                <p>{props.propertyAttribute.percentile > 0 ? `Rated higher than ${~~props.propertyAttribute.percentile}%` : "No reviews yet" }</p>
                <div style={{display : "flex", justifyContent : "center", alignItems: "center"}}>
                <button className="basicButton" style={{backgroundColor : "#FF746C", marginRight: "0.5em"}}>Delete</button>
                {/* <button style={{marginLeft: "0.5em"}} className="basicButton">Update</button> */}
                <ModalUpdate propertyId={props.propertyAttribute.id}/>

                </div>
                
                
        </div>
    )
}

export default PropertyCardOwner;