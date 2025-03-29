
import { PropertyAttribute } from "@/types/types";
import style from "./searchresults.module.css"
import mobileStyle from "./searchresultsMobile.module.css"
import PropertyCard from "../PropertyCard/PropertyCard";
import Properties from "./Properties";


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
    isMobile : boolean;
  }

const SearchResults = (props : Props) => {
    return (
        <div id ={!props.isMobile ? style.container : mobileStyle.container}>
           <div id={!props.isMobile ? style.searchResultsArea : mobileStyle.searchResultsArea}>

          <section id={!props.isMobile ? style.locationOverview : mobileStyle.locationOverview}>
            
            <div className={style.overviewSubsection}>
              <h3>Overview</h3>
              <p>{props.locationOverview}</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Climate</h3>
              <p>25c</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Famous Places</h3>
              <ul><
                li></li>
              <li></li>
              <li></li>
              </ul>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Crime Level</h3>
              <p>{props.locationOverview}</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Traditional Dish</h3>
              <p>{props.locationOverview}</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Off the beaten track</h3>
              <p>{props.locationOverview}</p>
            </div>

          </section>
        <Properties propertyAttributes={props.propertyAttributes} locationOverview={props.locationOverview} isMobile={props.isMobile} />
        </div>
              <div id={style.map}>

              </div>

        </div>
    )
}

export default SearchResults;