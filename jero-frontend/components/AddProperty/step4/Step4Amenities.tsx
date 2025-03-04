'use client'
import { useState } from "react";


type Amenities = {
    balcony : boolean
}


const Step4Amenities = () => {

    const [amenities, setAmenities] = useState<Amenities>({
        balcony : false,

    });
    return(
        <div>
            <h1>Amenities</h1>

            <div>


            </div>
        </div>
    )
}

export default Step4Amenities