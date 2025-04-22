
import { PropertyAttribute } from "@/types/types";
import style from "./searchresults.module.css"
import mobileStyle from "./searchresultsMobile.module.css"
import PropertyCard from "../PropertyCard/PropertyCard";
import Properties from "./Properties";
import Filters from "./Filters";
import SearchMap from "../Map/SearchMap";
import SearchResultsMap from "./SearchResultsMap";
import Overview from "./Overview/Overview";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";



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
  //console.log(props.locationOverview.attractions)

    const t = useTranslations('')

          
    return (
        <div id ={!props.isMobile ? style.container : mobileStyle.container}>
           <div id={!props.isMobile ? style.searchResultsArea : mobileStyle.searchResultsArea}>

          <section id={style.locationOverview }>

            <Overview locationOverview={props.locationOverview}/>
           

            
          </section>
          <section id={style.filters}>
            <Filters/>
          </section>
        <Properties propertyAttributes={props.propertyAttributes} locationOverview={props.locationOverview} isMobile={props.isMobile} />
        </div>
              {
                !props.isMobile &&
                <div id={style.map}>
              <SearchResultsMap propertyAttributes={props.propertyAttributes} />
              </div>
              }

        </div>
    )
}

export default SearchResults;