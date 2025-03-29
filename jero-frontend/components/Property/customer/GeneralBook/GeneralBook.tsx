'use client'
import { GuestCounts } from "@/app/types/types";
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import pcStyle from "./generalBooking.module.css"
import mobileStyle from "./mobileGeneralBooking.module.css"
import "react-datepicker/dist/react-datepicker.css";
import Pay from "../Pay/Pay";

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
}

const GeneralBook = (props : Props) => {

    const style = props.isMobile ? mobileStyle : pcStyle;
    const [openPay, setOpenPay] = useState<boolean>(false);
    const disabled: string[] = []
    if(!props.acceptsChildren){
        props.guestCounts.childCount = 0;
        disabled.push("childCount")
    }

    if(!props.acceptsPets){
        disabled.push("petCount")
        props.guestCounts.petCount = 0;
    }

    // if(openPay){
    //     return

    // }else{

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
        <h4>Price</h4>
        <p>Base rate - £{props.baseCost}</p>
        <p>Additional guest costs - £{props.extraCost}
        </p>
        <strong>Total - £{props.baseCost + props.extraCost}</strong>
        </div>
        {/* <input 
            type="date" 
            name="pop" 
            id="pop" 
            value={dates.start} 
            onChange={handleDateChange}
        />
        <input
            type="date" 
            name="end" 
            id="end" 
            value={dates.end}
            onChange={handleDateChange}
        /> */}
        <div id={style.dates}>
        <DatePicker
            name="start"
            selected={props.getStartDate}
            onChange={(date) => props.setStartDate(date || new Date(""))}
            className={style.customCalendar}
            enableTabLoop={false}
            calendarClassName={style.customCalendar} 
            />
        <DatePicker
            name="end"
            selected={props.getEndDate}
            onChange={(date) => props.setEndDate(date || new Date(""))}
            className={style.customCalendar}
            //https://stackoverflow.com/questions/73123315/react-datepicker-datepicker-pushing-other-elements-to-the-right-on-toggle-and
            enableTabLoop={false}

            calendarClassName={style.customCalendar} 
            />
        </div>
        <GuestToggler count={{
                adultCount: props.guestCounts.adultCount,
                childCount: props.guestCounts.childCount,
                petCount: props.guestCounts.petCount
            }} setCount={props.setGuestCounts}
            disabled={disabled}/>
            
            <div onClick={() => setOpenPay(true)}><button className={`basicButton`}>Book</button></div>
        </form>
}
    </section>
    )
}


export default GeneralBook;