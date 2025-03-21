'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import style from "./propertycustomer.module.css"
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { GuestCounts } from "@/app/types/types";
import { SetStateAction, useState } from "react";
import Amenities from "./Amenities/Amenities";
import { useSearchParams } from "next/navigation";


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
    start : string;
    end : string;
}
const PropertyCustomer = (props : Props) => {
    const sp = useSearchParams();
    const adultCountSp = Number(sp.get("numadults"))
    let childCountSp = Number(sp.get("numchildren"))
    let petCountSp = Number(sp.get("numpets"))
    const startDate = sp.get("startdate")
    const endDate = sp.get("enddate")

    if(childCountSp > 0 && !props.propertyAttributes.acceptsChildren){
        childCountSp = 0;
    }

    if(petCountSp > 0 && !props.propertyAttributes.acceptsPets){
        petCountSp = 0;
    }
    const [guestCounts, setGuestCounts] = useState<GuestCounts>(
        { 
            adultCount : adultCountSp,
            childCount : childCountSp,
             petCount : petCountSp
        });
    
    const [dates, setDates] = useState<Dates>({
        start : String(startDate),
        end : String(endDate)
    })
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

    const handleDateChange = (e: any) => {
        e.preventDefault();

    }

    console.log(props.userDeets.startDate)
    console.log(props.propertyAttributes.beauty);
    return( 
        <div id={style.container}>
            {/* <section>
                <h3>what is nearby</h3>
            </section> */}
            <section id={style.info}>
            <h2>{props.propertyAttributes.title}</h2>
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
            <p></p>

            <h3>{props.propertyAttributes.description}</h3>
            <strong>{`Price per night £${props.propertyAttributes.pricePerNight} | Price increase per person £${props.propertyAttributes.priceIncreasePerPerson}`}</strong>
            <br />
            <strong>
            
                {props.propertyAttributes.numberDoubleBeds > 0 && `Double beds ${props.propertyAttributes.numberDoubleBeds} | `}
                {props.propertyAttributes.numberSingleBeds > 0 && `Single beds ${props.propertyAttributes.numberSingleBeds} | `}
                {props.propertyAttributes.numberSofaBeds > 0 && `Sofa beds ${props.propertyAttributes.numberSofaBeds} | `}
                {props.propertyAttributes.numberHammocks > 0 && `Hammocks ${props.propertyAttributes.numberHammocks} | `}


            
            </strong>
            <br />
            <strong>
            
            {`Accepts children: ${props.propertyAttributes.acceptsChildren ? "yes" : "no"} | `}
            {`Accepts pets: ${props.propertyAttributes.acceptsPets ? "yes" : "no"} | `}
            {`Is disability friendly: ${props.propertyAttributes.disabilityFriendly ? "yes" : "no"} | `}
        </strong>

        <h3>Amenities</h3>
        <Amenities object={props.propertyAttributes.beauty} amenityName={"beauty"}  />
            </section>
            <section id={style.book}>
                <form>
                <input 
                    type="date" 
                    name="" 
                    id="" 
                    value={dates.start} 
                    onChange={handleDateChange}
                />
                <input
                    type="date" 
                    name="" 
                    id="" 
                    value={dates.end}
                    onChange={handleDateChange}
                />
                <GuestToggler count={{
                        adultCount: guestCounts.adultCount,
                        childCount: guestCounts.childCount,
                        petCount: guestCounts.petCount
                    }} setCount={setGuestCounts}/>
                <button>Book</button>
                </form>
            </section>
        </div> 
    )
}

export default PropertyCustomer;