import { PropertyAttributeFull, PropertyAttributeFullWithSecrets } from "@/types/types";
import GeneralProperty from "../GeneralProperty/GeneralProperty"
//import spc from "../customer/propertycustomer.module.css"
import stylePC from "../customer/propertycustomer.module.css"
import mobileStyle from "../customer/propertyCustomerMobile.module.css"
import customStyle from "./booked.module.css"
type UserDeets = {
    id : string | null;
    role : string | null;
    startDate : string;
    endDate : string;
    numAdults : number;
    numChildren : number;
    numPets : number;
}

interface Props{
    propertyAttributes : PropertyAttributeFullWithSecrets;
    userDeets : UserDeets;
    isMobile : boolean;
}



const PropertyBooked = (props : Props) => {
    const style = props.isMobile ? mobileStyle : stylePC;

    return (
        <div id={style.container}> 
            <GeneralProperty propertyAttributes={props.propertyAttributes} userDeets={props.userDeets} isMobile={props.isMobile} isCircle={false}/>
            <section id={customStyle.toKnow}>
                <div>
                    <h2>Address</h2>
                    <p>{props.propertyAttributes.address}</p>
                    <h2>Host's Guide</h2>
                    <p>{props.propertyAttributes.guide}</p>
                </div>
            </section>
        
        </div>
    )
}

export default PropertyBooked;