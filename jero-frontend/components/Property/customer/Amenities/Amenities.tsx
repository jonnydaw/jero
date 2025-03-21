import style from "./amenties.module.css"


interface Props {
    object : Object
    amenityName : string
}


const Amenities = (props : Props) => {
    const truthies : string[] = [];
    const falsies : string[] = [];
    Object.entries(props.object).forEach(([key, value]) => {
        if (value) {
            truthies.push(key);
        }else{
            falsies.push(key);
        }
    });
    return(
        <div id={style.amenitiesList}>
            <h4>{props.amenityName}</h4>
        
            <ul id={style.hasnt}>
            {falsies.map((i) => (
                <li key={i}>{i}</li>
            ))}
        </ul>
        <ul id={style.has}>
            {truthies.map((i) => (
                <li key={i}>{i}</li>
            ))}
        </ul>
      

        </div>
    )

}

export default Amenities