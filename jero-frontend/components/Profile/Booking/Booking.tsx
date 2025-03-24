import { styleText } from "util";

interface Props {
    bookings : Map<String, BookingProperty[]>;
    isCustomer : boolean;
}

import style from "./booking.module.css"
import { BookingProperty } from "@/types/types";
import BookingCard from "./BookingCard";

const Booking = (props : Props) => {

    return (
        
        <div id={style.container}>

           <section id={style.past}>
           <h2>Past</h2>
           { 
           props.bookings.get("past")!.length > 0
            && 
            props.bookings.get("past")?.map((val, idx) => (
                <BookingCard  key={idx} booking={{
                    propertyId: val.propertyId,
                    bookingId: val.bookingId,
                    title: val.title,
                    image: val.image,
                    start: val.start,
                    end: val.end,
                    numAdults: val.numAdults,
                    numChildren: val.numChildren,
                    numPets: val.numPets,
                    totalCost: val.totalCost,
                    accepted : val.accepted,
                    cancelled : val.cancelled
                }} isCustomer={props.isCustomer} timeframe={"past"}/>
            ))
            }

           </section>
           <section id={style.present}>
           <h2>Present</h2>
           {
            props.bookings.get("present")!.length > 0
            && 
            props.bookings.get("present")?.map((val, idx) => (
                <BookingCard  key={idx} booking={{
                    propertyId: val.propertyId,
                    bookingId: val.bookingId,
                    title: val.title,
                    image: val.image,
                    start: val.start,
                    end: val.end,
                    numAdults: val.numAdults,
                    numChildren: val.numChildren,
                    numPets: val.numPets,
                    totalCost: val.totalCost,
                    accepted : val.accepted,
                    cancelled : val.cancelled
                }} isCustomer={props.isCustomer} timeframe={"present"}/>
            ))
            }

           </section>
            
           <section id={style.future}>
           <h2>Future</h2>
           {
            props.bookings.get("future")!.length > 0
        && 
            props.bookings.get("future")?.map((val, idx) => (
                <BookingCard booking={{
                    propertyId: val.propertyId,
                    bookingId: val.bookingId,
                    title: val.title,
                    image: val.image,
                    start: val.start,
                    end: val.end,
                    numAdults: val.numAdults,
                    numChildren: 1,
                    numPets: 1,
                    totalCost: val.totalCost,
                    accepted : val.accepted,
                    cancelled : val.cancelled
                }} isCustomer={props.isCustomer} timeframe={"future"}/>            
            ))
            }
           </section>
        </div>
    )
}

export default Booking;