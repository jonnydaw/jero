
import { PropertyAttribute } from "@/types/types";
import style from "./searchresults.module.css"
import mobileStyle from "./searchresultsMobile.module.css"
import PropertyCard from "../PropertyCard/PropertyCard";
import Properties from "./Properties";
import Filters from "./Filters";
import SearchMap from "../Map/SearchMap";
import SearchResultsMap from "./SearchResultsMap";



// type PropertyAttribute = {    
//     id : string
//     cityDistrictId : string 
//     pricePerNight : string;
//     title : string;
//     townId : string;
// }
  
  interface Props {
    propertyAttributes: PropertyAttribute[];
    locationOverview : any;
    isMobile : boolean;
  }

const SearchResults = (props : Props) => {
  console.log(props.locationOverview.attractions)


          
    return (
        <div id ={!props.isMobile ? style.container : mobileStyle.container}>
           <div id={!props.isMobile ? style.searchResultsArea : mobileStyle.searchResultsArea}>

          <section id={!props.isMobile ? style.locationOverview : mobileStyle.locationOverview}>
            
            <div className={style.overviewSubsection}>
              <h3>Fun Fact</h3>
              <p>{props.locationOverview.overview}</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Average Temperature (at time of travel)</h3>
              <p>{props.locationOverview.temp} &deg;C</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Attractions</h3>
              <ul id={style.uList}>
              {props.locationOverview.attractions.map((i: any, index : number) => (
                <li key={index}>{i}</li> 
               ))}
              </ul>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Crime Level</h3>
              <p>{props.locationOverview.crime}</p>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Traditional Dishes</h3>
              <ul>
              {props.locationOverview.dishes.map((i: any, index : number) => (
                <li key={index}>{i}</li> 
               ))}
              </ul>
            </div>

            <div className={style.overviewSubsection}>
              <h3>Costs</h3>
              <ul>
              {props.locationOverview.cost.map((i: any, index : number) => (
                <li key={index}>{i}</li> 
               ))}
              </ul>
            </div>

          </section>
          <section id={style.filters}>
            <Filters/>
          </section>
        <Properties propertyAttributes={props.propertyAttributes} locationOverview={props.locationOverview} isMobile={props.isMobile} />
        </div>
              <div id={style.map}>
              <SearchResultsMap propertyAttributes={props.propertyAttributes} />
              </div>

        </div>
    )
}

export default SearchResults;