'use client'

import { GuestCounts } from "@/app/types/types";
import { Dispatch, SetStateAction, useState } from "react";
import GeneralBook from "../GeneralBook/GeneralBook";
import { truncate } from "fs/promises";
import style from "./mobileBooking.module.css"
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
    propertyId : string;
}
 const MobileBook = (props : Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <div>
            <div id={style.floating}>
            <button onClick={() =>setIsOpen(true)}>Book</button>
            </div>
        <div style={isOpen ? {display : "block"} : {display : "none"}} id={style.fixedContainer}>
            <button  onClick={() =>setIsOpen(false)}>Close</button>
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
                    isMobile={true} propertyId={props.propertyId}            
            />
        </div>

        </div>
    )

 }

 export default MobileBook;