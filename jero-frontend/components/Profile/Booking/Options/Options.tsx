'use client'
import { Link } from "@/i18n/routing"

import { inDevEnvironment } from "@/base";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import style from "./options.module.css"
import ProfileCard from "../../ManageProfile/ProfileCard";
import ModalExample from "../Modal/ModalFunc";
import ModalFunc from "../Modal/ModalFunc";
import { styleText } from "util";
import { useTranslations } from "next-intl";

interface Props {
    propertyId : string;
    accepted : boolean;
    cancelled : boolean;
    bookingId : string;
    isCustomer : boolean;
    timeframe : string;
}

const Options = (props : Props) => {
    const t = useTranslations('Options');
    const t2 = useTranslations('Errors');
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const router = useRouter();
    const pathname = usePathname();
    const leaveReviewRedirect = (e : any) => {
        e.preventDefault();
        const locale = (pathname.split("/").at(1));
        router.push(`/${locale}/profile/bookings/review/${props.propertyId}/${props.bookingId}`);
    }

    const handleCancel = async (e: any) => {
        if(confirm(t('cancelQuestion'))){
            //alert("booking cancelled")
        try {
            const response = await axios.patch(`${baseApi}/booking/cancel-booking`, {
                    bookingId : props.bookingId
                },
                { withCredentials: true}
            );
            // router.push("/")
            alert(t('cancelMessage'))
            // location.reload();
            console.log(response.data);
        } catch (error : any) {
            console.log(error.response.data.message)
            alert(`${t2('cancelFailed')}:  ${error.response.data.message}`)
        }
    }else alert(t('notCanceled'))
    }

    if(props.isCustomer){
        //if(!props.accepted) return null;
        if(props.cancelled) return (
            <div id={style.optionContainer}>
                <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>

            </div>
        );
        if(props.timeframe === "past" && props.accepted){
            //console.log("hit bool")
            return (
                <div id={style.optionContainer}>
                <button onClick={leaveReviewRedirect} className="basicButton">{t('leaveReview')}</button>
                <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>
                </div>
            )
        }else if(props.timeframe === "past" && !props.accepted){
            return (
                <div id={style.optionContainer}>
                    <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>
                </div>
            );
        }else if(props.timeframe === "future" && !props.accepted){
            return(<div id={style.optionContainer}>
            <button onClick={handleCancel} className="basicButton" style={{backgroundColor : "#FF746C", color : "black"}}>{t('cancelText')}</button>
            <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>
            </div>)
        } else if(props.timeframe === "future" && props.accepted) {
            return(<div id={style.optionContainer}>
                <button onClick={handleCancel} className="basicButton" style={{backgroundColor : "#FF746C", color : "black"}}>{t('cancelText')}</button>
                <Link href={`/booked/${props.bookingId}/${props.propertyId}`}>{t('view')}</Link>
                </div>)
        }else if(props.timeframe === "present"){
            return(
                <Link href={`/booked/${props.bookingId}/${props.propertyId}`}>{t('view')}</Link>
            )
        }
    }else if(!props.isCustomer){
        //console.log("hit")
        if(props.cancelled) return null;
        if(props.timeframe === "past" && props.accepted){
            return(
                <div id={style.optionContainer}>
                    <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>
                </div>
        


            )
        } else if(props.timeframe === "future" && !props.accepted){
            
            const handleAccept = async (e: any) => {
                try {
                    const response = await axios.post(`${baseApi}/booking/accept`, {
                            bookingId : props.bookingId
                        },
                        { withCredentials: true}
                    );
                    // router.push("/")
                    alert(t('acceptedMessage'))
                    // location.reload();
                    console.log(response.data);
                } catch (error : any) {
                    alert(`${t2('acceptFailed')}:  ${error.response.data.message}`)
                }
            }
            return(
            <div id={style.optionContainer}>
            <button onClick={handleAccept} className='basicButton' style={{backgroundColor : "green", color : "white"}}>{t('acceptText')}</button>
            <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>

            </div>
            )
        } else if(props.timeframe === "future" && props.accepted){

            return(<div id={style.optionContainer}>
                <button onClick={handleCancel} className="basicButton">{t('cancelText')}</button>
                <Link href={`/property/${props.propertyId}`}>{t('view')}</Link>
                </div>)
        }
    }
    // return(
    //     <div>
    //         options
    //     </div>
    // )
}

export default Options;