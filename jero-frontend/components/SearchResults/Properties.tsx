import { PropertyAttribute } from "@/types/types";
import PropertyCard from "../PropertyCard/PropertyCard";
import style from "./searchresults.module.css"

import mobileStyle from "./searchresultsMobile.module.css"

interface Props {
    propertyAttributes: PropertyAttribute[];
    locationOverview : string;
    isMobile : boolean;
}

const Properties = (props : Props) => {
    return (
        <section id={!props.isMobile ? style.cards : mobileStyle.cards} >
        {props.propertyAttributes && props.propertyAttributes.map((item, _) => (
            <div className={!props.isMobile ? style.propertyArea : mobileStyle.propertyArea } key={item.id}>
                <PropertyCard propertyAttribute={item}/>
            </div>
          ))
          }
         
    </section>
    )
}

export default Properties