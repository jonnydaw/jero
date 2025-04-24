import { propagateServerField } from "next/dist/server/lib/render-server";
import style from "./host.module.css"
interface Props {
    totalGuests: number;
    totalEarnings: number;
}
const Host = (props: Props) => {
    return (
        <div id={style.container}>
            <div id={style.subcontainer}>
                <h1>Total Earnings: £{props.totalEarnings}</h1>
                <h1>Total Guests Hosted: {props.totalGuests}</h1>
            </div>
        </div>
    )
}

export default Host;