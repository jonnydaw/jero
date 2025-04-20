'use client'

import { inDevEnvironment } from "@/base";
import stylePC from "./payPC.module.css"
import styleMobile from "./payMobile.module.css"
import { GuestCounts } from "@/app/types/types";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

interface Props {
    propertyId : string;
    open : boolean;
    setOpenPay: Dispatch<SetStateAction<boolean>>;
    price : number;
    startDate : Date;
    endDate : Date;
    guests : GuestCounts;
    isMobile : boolean
    
}
const Pay = (props : Props) => {
    // if(!props.open){
    //     return null;
    // }
    const t= useTranslations('Pay');

    const style = props.isMobile ? styleMobile : stylePC;
    console.log("id2 " + JSON.stringify(props.propertyId))
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    const handleSubmit = async ( e : any) => {
        e.preventDefault();
        console.log(props.endDate)
        try {
            const response = await axios.post(`${baseApi}/booking/add-booking`, {
                propertyId : props.propertyId,
                start : props.startDate.toISOString().split('T')[0],
                end : props.endDate.toISOString().split('T')[0],
                guests : props.guests,
                frontendPrice : props.price
               },
                   { withCredentials: true}
               );
               console.log(response.status);
        } catch (error) {
            
        }

    }


    return (
        <section id={style.pay}>

            <h1>{t('confirm')}</h1>
            <p>{t('total')}: £{props.price}</p>
            <p>{props.startDate.toDateString()} - {props.endDate.toDateString()} </p>
            <p>{t('adults')}: {props.guests.adultCount}</p>
            { props.guests.childCount > 0 && <p>{t('children')}: {props.guests.childCount}</p>}
            { props.guests.petCount > 0 && <p>{t('pets')}: {props.guests.petCount}</p>}
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="cardHolderName">{t('cardName')}</label>
                <input type="text" name="cardHolderName" id="cardHolderName" />

                <label htmlFor="cardNumber">{t('cardNumber')}</label>
                <input type="text" name="cardNumber" id="cardNumber" />

                <label htmlFor="expiry">{t('expiry')}</label>
                <input type="date" name="expiry" id="expiry" />
                
                <label htmlFor="cvv">cvv</label>
                <input type="text" name="cvv" id="cvv" />
                <div>
                <button className="basicButton" onClick={() => props.setOpenPay(false)}>{t('back')}</button>
                <button className="basicButton">{t('confirm')}</button>
                </div>

            </form>
        

        </section>
    )
}

export default Pay;