
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
           <div id={style.searchResultsArea}>

          <section id={style.locationOverview}>
            
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
          <section id={style.cards}>
            {props.propertyAttributes.map((item, _) => (
                <div className={style.propertyArea} key={item.id}>
                    <PropertyCard propertyAttribute={item}/>
                </div>
              ))
              }
             
        </section>
        </div>
              <div id={style.map}>

              </div>

        </div>
    )
}

export default SearchResults;