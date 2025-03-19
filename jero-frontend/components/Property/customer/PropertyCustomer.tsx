import { PropertyAttributeFull} from "@/types/types";

type UserDeets = {
    id : string | null;
    startDate : string;
    endDate : string;
    numAdults : number;
    numChildren : number;
    numPets : number;
}

interface Props{
    propertyAttributes : PropertyAttributeFull;
    userDeets : UserDeets;
}

const PropertyCustomer = (props : Props) => {
    console.log(props.userDeets.startDate)
    return( 
        <div>  
            <h2>{props.propertyAttributes.title}</h2>
            {props.propertyAttributes.images.map((i) => (
                <img width={100} height={100} key={i} src={i} alt="" />
            ))}
            <h3>{props.propertyAttributes.description}</h3>
        </div> 
    )
}

export default PropertyCustomer;