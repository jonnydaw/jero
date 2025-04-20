'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import stylePC from "./propertycustomer.module.css"
import mobileStyle from "./propertyCustomerMobile.module.css"
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { GuestCounts } from "@/app/types/types";
import { SetStateAction, useMemo, useState } from "react";
import Amenities from "../GeneralProperty/Amenities/Amenities";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PCBubbles from "../GeneralProperty/PCBubbles/PCBubbles";
import MobileBubbles from "../GeneralProperty/MobileBubbles/MobileBubbles";
import GeneralBook from "./GeneralBook/GeneralBook";
import MobileBook from "./MobileBook/MobileBook";
import dynamic from "next/dynamic";
import exp from "constants";
import { json } from "stream/consumers";
import Reviews from "../GeneralProperty/Reviews/Review";
import ProfileCard from "@/components/Profile/ManageProfile/ProfileCard";
import GeneralProperty from "../GeneralProperty/GeneralProperty";
import { useTranslations } from "next-intl";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type UserDeets = {
    id : string | null;
    role : string | null;
    startDate : string;
    endDate : string;
    numAdults : number;
    numChildren : number;
    numPets : number;
}

interface Props{
    propertyAttributes : PropertyAttributeFull;
    userDeets : UserDeets;
    isMobile : boolean;
}

type Expanded = {
    overviewExpand : boolean;
    amenitiesExpand : boolean;
    reviewsExpand : boolean;
}

const PropertyCustomer = (props : Props) => {
    // console.log("reviews: " + JSON.stringify(props.propertyAttributes.reviews))
    const t = useTranslations('Property');
    const sp = useSearchParams();
    const adultCountSp = Number(sp.get("numadults"))
    let childCountSp = Number(sp.get("numchildren"))
    let petCountSp = Number(sp.get("numpets"))
    const startDate = props.userDeets.startDate
    const endDate = props.userDeets.endDate

    console.log("start " + startDate )
    let allowedToBook : boolean = false
    if(props.userDeets.id !== null && props.userDeets.role === 'customer'){
        allowedToBook = true
    }
    const disabled: string[] = []
    if(!props.propertyAttributes.acceptsChildren){
        childCountSp = 0;
        disabled.push("childCount")
    }

    if(!props.propertyAttributes.acceptsPets){
        disabled.push("petCount")
        petCountSp = 0;
    }



    const [guestCounts, setGuestCounts] = useState<GuestCounts>(
        { 
            adultCount : adultCountSp,
            childCount : childCountSp,
             petCount : petCountSp
        });

    const [getStartDate, setStartDate] = useState<Date>(new Date(startDate));
    const [getEndDate, setEndDate] = useState<Date>(new Date(endDate));


    const bookingLength = Math.trunc((getEndDate.getTime() - getStartDate.getTime()) / 86_400_000);
    console.log("length " + bookingLength)

    console.log(props.propertyAttributes.blockedDate)
    const baseCost = bookingLength * Number(props.propertyAttributes.pricePerNight);
    const extraCost = (Number(props.propertyAttributes.priceIncreasePerPerson) > 0 && (guestCounts.adultCount + guestCounts.childCount) > 1) 
        ?
        Number(props.propertyAttributes.priceIncreasePerPerson) * bookingLength * (guestCounts.adultCount + guestCounts.childCount - 1)
        :
        0
        ;
    
    const style = props.isMobile ? mobileStyle : stylePC;
    return( 
        <div id={style.container}>
                {
                props.isMobile &&
                <strong style={{display : "flex", justifyContent : "center", fontSize : "large", margin :"0.5em", color : "green"}}>
                    💸 £{props.propertyAttributes.pricePerNight + (Number(props.propertyAttributes.priceIncreasePerPerson) * (guestCounts.adultCount + guestCounts.childCount -1))} {t('perNight')} 
                    - £{Number(props.propertyAttributes.pricePerNight + (Number(props.propertyAttributes.priceIncreasePerPerson) * (guestCounts.adultCount + guestCounts.childCount -1))) * bookingLength} {t('total')} 💸
                </strong>
              }
            <GeneralProperty propertyAttributes={props.propertyAttributes} userDeets={props.userDeets} isMobile={props.isMobile} isCircle={true}/>

                {
                    props.isMobile ? 
                    <MobileBook   baseCost={baseCost}
                    extraCost={extraCost}
                    getStartDate={getStartDate}
                    setStartDate={setStartDate}
                    getEndDate={getEndDate}
                    setEndDate={setEndDate}
                    guestCounts={guestCounts}
                    setGuestCounts={setGuestCounts}
                    acceptsChildren={props.propertyAttributes.acceptsChildren}
                    acceptsPets={props.propertyAttributes.acceptsPets} 
                    propertyId={props.propertyAttributes.id}
                    allowedToBook={allowedToBook}
                    blockedDates={props.propertyAttributes.blockedDate}
                    maxGuests={props.propertyAttributes.maxGuests}
                    minGuests={props.propertyAttributes.minGuests}/> 
                    : 
                        <GeneralBook 
                        baseCost={baseCost}
                        extraCost={extraCost}
                        getStartDate={getStartDate}
                        setStartDate={setStartDate}
                        getEndDate={getEndDate}
                        setEndDate={setEndDate}
                        guestCounts={guestCounts}
                        setGuestCounts={setGuestCounts}
                        acceptsChildren={props.propertyAttributes.acceptsChildren}
                        acceptsPets={props.propertyAttributes.acceptsPets}
                        isMobile={false}
                        propertyId={props.propertyAttributes.id} 
                        allowedToBook={allowedToBook}
                        blockedDates={props.propertyAttributes.blockedDate}
                        max={props.propertyAttributes.maxGuests}
                        min={props.propertyAttributes.minGuests}
                        />
                }
        </div> 
    )
}

export default PropertyCustomer;