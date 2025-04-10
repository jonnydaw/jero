'use client'
interface Props {
    imgUrl : string
}  
const PropertyImage = (props : Props) => {

    return(
        <div>
            <img src={props.imgUrl} alt="property image" />
        </div>
    )
}