import { PropertyAttribute } from "@/types/types";
import PropertyCardOwner from "@/components/PropertyCard/PropertyCardOwner";
import style from "../../SearchResults/searchresults.module.css"

import mobileStyle from "../../SearchResults/searchresultsMobile.module.css"

interface Props {
    propertyAttributes: PropertyAttribute[];
    locationOverview : string;
    isMobile : boolean;
}

const OwnerProperties = (props : Props) => {
    return (
        <section id={!props.isMobile ? style.cards : mobileStyle.cards}>
        {props.propertyAttributes && props.propertyAttributes.map((item, _) => (
            <div className={!props.isMobile ? style.propertyArea : mobileStyle.propertyArea } key={item.id}>
                <PropertyCardOwner propertyAttribute={item}/>
            </div>
          ))
          }
         
    </section>
    )
}

export default OwnerProperties