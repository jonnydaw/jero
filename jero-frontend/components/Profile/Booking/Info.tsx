import { BookingProperty } from "@/types/types";
import style from "./booking.module.css"
import BookingCard from "./BookingCard"
interface Props {
    bookings : Map<String, BookingProperty[]>;
    isCustomer : boolean;
    isMobile : boolean;
    timeframe : string;
}
const Info = (props : Props) => {
    return(
        <section id={style.timeframe}>
        {!props.isMobile && <h2>{props.timeframe}</h2>}
        { 
        props.bookings.get(props.timeframe)!.length > 0
         && 
         props.bookings.get(props.timeframe)?.map((val, idx) => (
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
                 cancelled : val.cancelled,
                 otherPartyInfo : val.otherPartyInfo
             }} isCustomer={props.isCustomer} timeframe={props.timeframe}/>
         ))
         }

        </section>
    )
}
export default Info;