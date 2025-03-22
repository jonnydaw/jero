import { styleText } from "util";

interface Props {
    bookings : Map<String, BookingProperty[]>
}

import style from "./booking.module.css"
import { BookingProperty } from "@/types/types";

const Booking = (props : Props) => {

    return (
        
        <div id={style.container}>

           <section id={style.past}>
           <h2>Past</h2>
           { 
           props.bookings.get("past")!.length > 0
            && 
            props.bookings.get("past")?.map((val, idx) => (
                <p key={idx}>{val.bookingId}</p>
            ))
            }

           </section>
           <section id={style.present}>
           <h2>Present</h2>
           {
            props.bookings.get("present")?.map((val, idx) => (
                <p key={idx}>{val.bookingId}</p>
            ))
            }

           </section>
            
           <section id={style.future}>
           <h2>Future</h2>
           {
            props.bookings.get("future")?.map((val, idx) => (
                <p key={idx}>{val.bookingId}</p>
            ))
            }
           </section>
        </div>
    )
}

export default Booking;