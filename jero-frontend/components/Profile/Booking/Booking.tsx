import { styleText } from "util";

interface Props {
    bookings : any
}

import style from "./booking.module.css"

const Booking = (props : Props) => {
    return (
        <div id={style.container}>
           <section id={style.past}>
           <h2>Past</h2>

           </section>
           <section id={style.present}>
           <h2>Present</h2>
            {-1> 0 ? "hi" : "Empty here" }
           </section>
           
           <section id={style.future}>
           <h2>Future</h2>

           </section>
        </div>
    )
}

export default Booking;