import { GuestCounts } from "@/app/types/types";
import { Dispatch, SetStateAction } from "react";
import GeneralBook from "../GeneralBook/GeneralBook";
import { truncate } from "fs/promises";
import style from "./mobileGeneralBooking.module.css"
interface Props {
    baseCost : number;
    extraCost : number;
    getStartDate : Date;
    setStartDate : Dispatch<SetStateAction<Date>>;
    getEndDate : Date;
    setEndDate : Dispatch<SetStateAction<Date>>;
    guestCounts : GuestCounts;
    setGuestCounts: Dispatch<SetStateAction<GuestCounts>>;
    acceptsChildren : boolean
    acceptsPets : boolean;
}
 const MobileBook = (props : Props) => {

    return(
        <div>
            <div id={style.floating}>
            <button>Book</button>
            </div>
        <div id={style.fixedContainer}>
            <button>X</button>
            <GeneralBook 
                baseCost={props.baseCost} 
                extraCost={props.extraCost} 
                getStartDate={props.getStartDate} 
                setStartDate={props.setStartDate} 
                getEndDate={props.getEndDate} 
                setEndDate={props.setEndDate} 
                guestCounts={props.guestCounts} 
                setGuestCounts={props.setGuestCounts} 
                acceptsChildren={props.acceptsChildren} 
                acceptsPets={props.acceptsPets}
                isMobile={true}
            />
        </div>
        </div>
    )

 }

 export default MobileBook;