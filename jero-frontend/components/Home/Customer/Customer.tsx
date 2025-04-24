import { LatLons } from "@/types/types"
import style from "./customer.module.css"
import HomePageMap from "./HomePageMap";
interface Props {
    latLons : LatLons[];
}
const Customer = (props : Props) => {
    return (
        <div id={style.container}>
            <div id={style.subcontainer}>
                <h1>Where you have been</h1>
            </div>
            <HomePageMap latLongs={props.latLons}/>
        </div>
    )
}

export default Customer