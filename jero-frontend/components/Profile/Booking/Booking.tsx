'use client' 

import { styleText } from "util";

interface Props {
    bookings : Map<String, BookingProperty[]>;
    isCustomer : boolean;
    isMobile : boolean
}

import stylePC from "./booking.module.css"
import mobileStyle from "./mobileBooking.module.css"
import { BookingProperty } from "@/types/types";
import BookingCard from "./BookingCard";
import Info from "./Info";
import { PiEyedropperSample } from "react-icons/pi";
import { useState } from "react";
import { useTranslations } from "next-intl";
// import { useState } from "react";

const Booking = (props : Props) => {
    const [timePeriod,setTimePeriod] = useState<string[]>(["future"]);
    const time = props.isMobile ? timePeriod : ["past", "present", "future"];
    const style = props.isMobile ? mobileStyle : stylePC;
    const t = useTranslations('Bookings'); 


    return (
        
        <div id={style.container}>
            {
                props.isMobile &&
                <div id={style.selectTimeFrameArea}>
                <button className={timePeriod.at(0) === "past" ? style.selected : style.notSelected } onClick={() => setTimePeriod(["past"])}>{t('past')}</button>
                <button className={timePeriod.at(0) === "present" ? style.selected : style.notSelected } onClick={() => setTimePeriod(["present"])} >{t('present')}</button>
                <button className={timePeriod.at(0) === "future" ? style.selected : style.notSelected } onClick={() => setTimePeriod(["future"])}>{t('future')}</button>
                </div>
            }

            {
            time.map((val, idx) => (
                <Info
                key={idx}
                bookings={props.bookings} 
                isCustomer={props.isCustomer} 
                isMobile={props.isMobile} 
                timeframe={val}/>
            ))


            }
        </div>
    )
}

export default Booking;