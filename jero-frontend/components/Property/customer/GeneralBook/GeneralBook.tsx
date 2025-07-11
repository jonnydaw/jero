'use client'
import { GuestCounts } from "@/app/types/types";
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import pcStyle from "./generalBooking.module.css"
import mobileStyle from "./mobileGeneralBooking.module.css"
import "react-datepicker/dist/react-datepicker.css";
import Pay from "../Pay/Pay";
import { DateTime } from "luxon";
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
    isMobile : boolean;
    propertyId : string;
    min : number;
    max : number
    allowedToBook : boolean
    blockedDates : Date[]
}

const GeneralBook = (props : Props) => {
    const t = useTranslations('Book')
    const style = props.isMobile ? mobileStyle : pcStyle;
    const [openPay, setOpenPay] = useState<boolean>(false);
    const disabled: string[] = []
    // console.log("can book: " + props.allowedToBook)
    // console.log("startdate " + props.getStartDate);
    // console.log("enddate " + props.getEndDate)
    if(!props.acceptsChildren){
        props.guestCounts.childCount = 0;
        disabled.push("childCount")
    }

    if(!props.acceptsPets){
        disabled.push("petCount")
        props.guestCounts.petCount = 0;
    }

    // ???????????????????????????????????????????????????????????????????     blockedDates : Date[] give me an error if something is wrong!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const blockedDates: Date[] = props.blockedDates !== null ? props.blockedDates.map(date => new Date(date)) : [];

    return (
    <section id={style.book}>
    { 
       ( openPay )
        ?  
        
        <Pay 
            open={openPay} 
            setOpenPay={setOpenPay} 
            price={props.baseCost + props.extraCost} 
            startDate={props.getStartDate} 
            endDate={props.getEndDate} 
            guests={props.guestCounts}  
            propertyId={props.propertyId}
            isMobile={props.isMobile}
        />
        :
        <form>
        <div>
        <h4>{t('price')}</h4>
        <p>{t('baseRate')} • £{props.baseCost}</p>
        <p>{t('additionalCosts')} • £{props.extraCost}
        </p>
        <strong>{t('total')} • £{props.baseCost + props.extraCost}</strong>
        </div>
        <div id={style.dates}>
       
        <DatePicker
            name="start"
            minDate={DateTime.now().plus({days : 1}).toJSDate()}
            selected={props.getStartDate}
            onChange={(date) => props.setStartDate(date || new Date())}
            className={style.customCalendar}
            enableTabLoop={false}
            calendarClassName={style.customCalendar} 
            excludeDates={blockedDates}
            />

        <DatePicker
            name="end"
            selected={props.getEndDate}
            minDate={DateTime.fromISO(props.getStartDate.toISOString()).plus({days : 1}).toJSDate()}
            onChange={(date) => props.setEndDate(date || new Date())}
            className={style.customCalendar}
            //https://stackoverflow.com/questions/73123315/react-datepicker-datepicker-pushing-other-elements-to-the-right-on-toggle-and
            enableTabLoop={false}
            excludeDates={blockedDates}
            calendarClassName={style.customCalendar} 
            />
        </div>
        <p style={{fontSize: "small", textAlign: "center"}}>{t('minimum')} {props.min} | {t('maximum')} {props.max}</p>
        <GuestToggler count={{
                adultCount: props.guestCounts.adultCount,
                childCount: props.guestCounts.childCount,
                petCount: props.guestCounts.petCount
            }} setCount={props.setGuestCounts}
            disabled={disabled}
            max={props.max}
            min={props.min}/>
            
            <div tabIndex={0} onClick={() => setOpenPay(true)}><button  disabled={!props.allowedToBook}className={`basicButton`}>{props.allowedToBook ? t('book') : t('youMust')}</button></div>
        </form>
}
    </section>
    )
}


export default GeneralBook;