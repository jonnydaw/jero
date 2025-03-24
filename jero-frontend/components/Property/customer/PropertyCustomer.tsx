'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import style from "./propertycustomer.module.css"
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { GuestCounts } from "@/app/types/types";
import { SetStateAction, useState } from "react";
import Amenities from "./Amenities/Amenities";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pay from "./Pay";
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
}

interface Dates {
    start : Date;
    end : Date;
}

const PropertyCustomer = (props : Props) => {
    const sp = useSearchParams();
    const adultCountSp = Number(sp.get("numadults"))
    let childCountSp = Number(sp.get("numchildren"))
    let petCountSp = Number(sp.get("numpets"))
    const startDate = sp.get("startdate") || "";
    const endDate = sp.get("enddate") || "";
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
    return( 
        <div id={style.container}>
            {/* <section>
                <h3>what is nearby</h3>
            </section> */}
            <section id={style.info}>
            <h1>{props.propertyAttributes.title || "No title provided"}</h1>
            <div id={style.imageArea}>
            <button onClick={handleDecrement}> &larr;</button>
            <figure>
            <Image
                src={props.propertyAttributes.images.at(currentImageIdx) || "/vercel.svg"}
                width={800}
                height={533}
                alt="Picture of the author"
              />
              <figcaption>Image {currentImageIdx + 1} of {props.propertyAttributes.images.length}</figcaption>
              </figure>
              <button onClick={handleIncrement}>&rarr;</button>
            </div>
            <div id={style.overview}>
                <h2>Overview</h2>
            <div className={style.bubbleArea}>
                <strong className={style.bubble}>{`Price per night £${props.propertyAttributes.pricePerNight} `}</strong>
                <strong className={style.bubble}>{`Price increase per person £${props.propertyAttributes.priceIncreasePerPerson}`}</strong>
            </div>

            <div className={style.bubbleArea}>
            <strong className={style.bubble}>{props.propertyAttributes.numberDoubleBeds > 0 && `Double beds ${props.propertyAttributes.numberDoubleBeds} `}</strong>
            <strong className={props.propertyAttributes.numberSingleBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSingleBeds > 0 && `Single beds ${props.propertyAttributes.numberSingleBeds} `}</strong>
            <strong className={props.propertyAttributes.numberSofaBeds > 0 ? style.bubble : ""}>{props.propertyAttributes.numberSofaBeds > 0 && `Sofa beds ${props.propertyAttributes.numberSofaBeds} `}</strong>
            <strong className={props.propertyAttributes.numberHammocks > 0 ? style.bubble : ""}>{props.propertyAttributes.numberHammocks > 0 && `Hammocks ${props.propertyAttributes.numberHammocks} `}</strong>
            </div>
            
            <div className={style.bubbleArea}>
            <strong className={props.propertyAttributes.acceptsChildren ? style.bubble : style.bubbleFalse}>{`Accepts children: ${props.propertyAttributes.acceptsChildren ? "yes" : "no"} `}</strong>
            <strong className={props.propertyAttributes.acceptsPets ? style.bubble : style.bubbleFalse}> {`Accepts pets: ${props.propertyAttributes.acceptsPets ? "yes" : "no"} `}</strong>
            <strong className={props.propertyAttributes.disabilityFriendly ? style.bubble : style.bubbleFalse}>{`Is disability friendly: ${props.propertyAttributes.disabilityFriendly ? "yes" : "no"} `}</strong>
            </div>
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
            <section id={style.book}>
                <form>
                <div>
                <h4>price</h4>
                <p>Base rate - £{baseCost}</p>
                <p>Extra costs - £{extraCost}
                </p>
                <strong>Total - £{baseCost + extraCost}</strong>
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
                    selected={getStartDate}
                    onChange={(date) => setStartDate(date || new Date(""))}
                    className={style.customCalendar}
                    enableTabLoop={false}

                    calendarClassName={style.customCalendar} 
                    />
                <DatePicker
                    name="end"
                    selected={getEndDate}
                    onChange={(date) => setEndDate(date || new Date(""))}
                    className={style.customCalendar}
                    //https://stackoverflow.com/questions/73123315/react-datepicker-datepicker-pushing-other-elements-to-the-right-on-toggle-and
                    enableTabLoop={false}

                    calendarClassName={style.customCalendar} 
                    />
                </div>
                <GuestToggler count={{
                        adultCount: guestCounts.adultCount,
                        childCount: guestCounts.childCount,
                        petCount: guestCounts.petCount
                    }} setCount={setGuestCounts}
                    
                    disabled={disabled}/>
                <button>Book</button>
                </form>
            </section>
                {/* <Pay open={true} price={baseCost + extraCost} startDate={getStartDate} endDate={getEndDate} guests={guestCounts} propertyId={props.propertyAttributes.id}/> */}
        </div> 
    )
}

export default PropertyCustomer;