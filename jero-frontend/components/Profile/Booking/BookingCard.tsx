import { BookingProperty } from "@/types/types";
import React from "react";
import style from "./bookingcard.module.css"
import Options from "./Options/Options";
import { RiH1 } from "react-icons/ri";
import ModalFunc from "./Modal/ModalFunc";
import { useTranslations } from "next-intl";


interface Props {
  booking: BookingProperty;
  isCustomer : boolean
  timeframe: string;
};

const BookingCard = (props : Props) => {
  const t = useTranslations('Bookings');
  return (
    <div id={style.container}>

      {props.booking.cancelled && <h1 style={{color : "#BD0900"}}>{t('cancelled')}</h1>}
      {!props.booking.cancelled && !props.booking.accepted && <h1 style={{color : "gray"}}>{props.timeframe === "future" ? t('pendingConfirmation') : t('notAccepted')}</h1>}
      {!props.booking.cancelled && props.booking.accepted && <h1 style={{color : "green"}}>{t('accepted')}</h1>}

      <img id={style.image}
        src={props.booking.image}
        alt={props.booking.title}
      />
      <div>

        <h2 >{props.booking.title}</h2>        
        <strong>
          £{props.booking.totalCost}
        </strong>
        <br />
        <em>{new Date(props.booking.start).toLocaleDateString()} - {new Date(props.booking.end).toLocaleDateString()} </em>
        <br />
        <strong>{props.isCustomer ? t('hostedBy') : t('bookedBy')} {props.booking.otherPartyInfo.firstName || "Anon"}</strong>
        <ModalFunc 
          firstName={props.booking.otherPartyInfo.firstName} 
          lastName={props.booking.otherPartyInfo.lastName} 
          profileImg={props.booking.otherPartyInfo.imgULR} 
          intro={props.booking.otherPartyInfo.introduction}/>

        <div style={{marginTop:"2.5em"}}>
          <span className={style.span} >{t('adults')}: {props.booking.numAdults} </span>
          {props.booking.numChildren > 0 && (
            <span className={style.span}>{t('children')}: {props.booking.numChildren}</span>
          )}
          {props.booking.numPets > 0 && (
            <span className={style.span}>{t('pets')}: {props.booking.numPets} </span>
          )}
        </div>
          <div id={style.options}>
          <Options propertyId={props.booking.propertyId} bookingId={props.booking.bookingId} isCustomer={props.isCustomer} timeframe={props.timeframe} accepted={props.booking.accepted} cancelled={props.booking.cancelled}/>
          </div>

      </div>
    </div>
  );
};

export default BookingCard;
