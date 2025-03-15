
import style from "./searchresults.module.css"


interface PropertyAttribute {    
    cityDistrictId : string 
    pricePerNight : string;
    title : string;
    townId : string;
}
  
  interface Props {
    propertyAttributes: PropertyAttribute[];
  }

const SearchResults = (props : Props) => {
    return (
        <div id ={style.container}>
            <div id={style.properties}>
                
            {props.propertyAttributes.map((item, index) => (
                    <div key={index}>
                        <p>{item.cityDistrictId}</p>
                        <p>{item.pricePerNight}</p>
                        <p>{item.title}</p>
                        <p>{item.townId}</p>
                        <p>break</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SearchResults;