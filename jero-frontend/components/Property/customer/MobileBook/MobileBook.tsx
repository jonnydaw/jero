'use client'

import { GuestCounts } from "@/app/types/types";
import { Dispatch, SetStateAction, useState } from "react";
import GeneralBook from "../GeneralBook/GeneralBook";
import { truncate } from "fs/promises";
import style from "./mobileBooking.module.css"
import { useTranslations } from "next-intl";
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
    allowedToBook : boolean
    blockedDates: Date[]
    maxGuests: number
    minGuests: number
}
 const MobileBook = (props : Props) => {
    const t = useTranslations('MobileBook');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <div>
            <div id={style.floating}>
            <button onClick={() =>setIsOpen(true)}>{t('book')}</button>
            </div>
        <div style={isOpen ? {display : "block"} : {display : "none"}} id={style.fixedContainer}>
            <button  onClick={() =>setIsOpen(false)}>{t('close')}</button>
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
                    propertyId={props.propertyId}
                    allowedToBook={props.allowedToBook} 
                    blockedDates={props.blockedDates} 
                    max={props.maxGuests}
                    min={props.minGuests}          
            />
        </div>

        </div>
    )

 }

 export default MobileBook;