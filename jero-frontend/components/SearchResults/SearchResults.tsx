
import { PropertyAttribute } from "@/types/types";
import style from "./searchresults.module.css"
import PropertyCard from "../PropertyCard/PropertyCard";


// type PropertyAttribute = {    
//     id : string
//     cityDistrictId : string 
//     pricePerNight : string;
//     title : string;
//     townId : string;
// }
  
  interface Props {
    propertyAttributes: PropertyAttribute[];
    locationOverview : string;
  }

const SearchResults = (props : Props) => {
    return (
        <div id ={style.container}>
          <div id={style.locationOverview}>
            <p>{props.locationOverview}</p>
          </div>

            <div id={style.properties}>
                
            {props.propertyAttributes.map((item, index) => (
                <div className={style.propertyArea} key={item.id}>
                    <PropertyCard propertyAttribute={item}/>
                </div>
              ))
              }
              </div>
              <div id={style.map}>

              </div>

        </div>
    )
}

export default SearchResults;