'use client'
import { PropertyAttributeFull} from "@/types/types";
import Image from 'next/image'
import style from "./propertycustomer.module.css"
import GuestToggler from "@/components/Navbar/NavbarPC/GuestDropdown/GuestToggler";
import { GuestCounts } from "@/app/types/types";
import { SetStateAction, useState } from "react";


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

const PropertyCustomer = (props : Props) => {
    const [count, setCount] = useState<GuestCounts>({adultCount : 1, childCount : 0, petCount : 0});

    console.log(props.userDeets.startDate)
    console.log(props.propertyAttributes.beauty);
    return( 
        <div id={style.container}>
            <section>
                <h3>what is nearby</h3>
            </section>
            <section id={style.info}>
            <h2>{props.propertyAttributes.title}</h2>
            <div id={style.imageArea}>
            <button>left</button>
            <Image
                src={props.propertyAttributes.images.at(0) || "/vercel.svg"}
                width={500}
                height={500}
                alt="Picture of the author"
              />
              <button>right</button>
            </div>
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
        {Object.entries(props.propertyAttributes.beauty).map(([key, value]) => (
            <div key={key}>
            <p >{key} {String(value)}</p>
            </div>
        ))}

            </section>
            <section id={style.book}>
                <form>
                <input type="date" name="" id="" />
                <input type="date" name="" id="" />
                <GuestToggler count={{
                        adultCount: count.adultCount,
                        childCount: count.childCount,
                        petCount: count.petCount
                    }} setCount={setCount}/>
                <button>Book</button>
                </form>
            </section>
        </div> 
    )
}

export default PropertyCustomer;