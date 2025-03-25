'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import stylePC from "./propertycustomer.module.css"
import mobileStyle from "./propertyCustomerMobile.module.css"
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { GuestCounts } from "@/app/types/types";
import { SetStateAction, useState } from "react";
import Amenities from "./Amenities/Amenities";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PCBubbles from "./PCBubbles/PCBubbles";
import MobileBubbles from "./MobileBubbles/MobileBubbles";
import GeneralBook from "./GeneralBook/GeneralBook";
import MobileBook from "./MobileBook/MobileBook";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type UserDeets = {
    id : string | null;
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

const PropertyCustomer = (props : Props) => {
    const sp = useSearchParams();
    const adultCountSp = Number(sp.get("numadults"))
    let childCountSp = Number(sp.get("numchildren"))
    let petCountSp = Number(sp.get("numpets"))
    const startDate = sp.get("startdate") || "";
    const endDate = sp.get("enddate") || "";
    // const disabled: string[] = []
    // if(!props.propertyAttributes.acceptsChildren){
    //     childCountSp = 0;
    //     disabled.push("childCount")
    // }

    // if(!props.propertyAttributes.acceptsPets){
    //     disabled.push("petCount")
    //     petCountSp = 0;
    // }
    const [guestCounts, setGuestCounts] = useState<GuestCounts>(
        { 
            adultCount : adultCountSp,
            childCount : childCountSp,
             petCount : petCountSp
        });
    
    const [getStartDate, setStartDate] = useState<Date>(new Date(startDate));
    const [getEndDate, setEndDate] = useState<Date>(new Date(endDate));


    const bookingLength = ((getEndDate.getTime() - getStartDate.getTime()) / 86_400_000);

    const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);


    const handleIncrement = (e : any) => {
        e.preventDefault();
        setCurrentImageIdx(currentImageIdx < props.propertyAttributes.images.length - 1 ? currentImageIdx + 1 : 0);
    }

    const handleDecrement = (e : any) => {
        e.preventDefault();
        setCurrentImageIdx(currentImageIdx > 0 ? currentImageIdx - 1 :  props.propertyAttributes.images.length - 1)
        console.log(currentImageIdx)
    }



    console.log(props.userDeets.startDate)
    console.log(props.propertyAttributes.beauty);
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
            {/* <section>
                <h3>what is nearby</h3>
            </section> */}
            <section id={style.info}>
            <h1>{props.propertyAttributes.title || "No title provided"}</h1>
            <div id={stylePC.imageArea}>
            <button onClick={handleDecrement}> &larr;</button>
            <figure>
            <Image
                src={props.propertyAttributes.images.at(currentImageIdx) || "/vercel.svg"}
                width={props.isMobile ? 320 : 800}
                height={props.isMobile ? 213.2 :533}
                alt="Picture of the author"
              />
              <figcaption>Image {currentImageIdx + 1} of {props.propertyAttributes.images.length}</figcaption>
              </figure>
              <button onClick={handleIncrement}>&rarr;</button>
            </div>
            <div id={style.overview}>
                <h2>Overview</h2>
            
            {
                props.isMobile ? <MobileBubbles propertyAttributes={props.propertyAttributes}/> : <PCBubbles propertyAttributes={props.propertyAttributes}/>
            }

            <div id={style.description}>
            <p >{props.propertyAttributes.description || "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}

            </p>
            </div>
            </div>
        <div id={style.amentiesArea}>
        <h2>Amenities</h2>
        <Amenities object={props.propertyAttributes.beauty} amenityName={"🪞 beauty"}  />
        </div>
            </section>
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
                    propertyId={props.propertyAttributes.id}/> 
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
                            propertyId={props.propertyAttributes.id}/>
                }
        </div> 
    )
}

export default PropertyCustomer;