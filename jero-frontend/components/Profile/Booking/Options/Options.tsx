'use client'

import { inDevEnvironment } from "@/base";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    propertyId : string;
    accepted : boolean;
    cancelled : boolean;
    bookingId : string;
    isCustomer : boolean;
    timeframe : string;
}

const Options = (props : Props) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const router = useRouter();
    const pathname = usePathname();
    const leaveReviewRedirect = (e : any) => {
        e.preventDefault();
        const locale = (pathname.split("/").at(1));
        router.push(`/${locale}/profile/bookings/review/${props.propertyId}/${props.bookingId}`);
    }

    const handleCancel = async (e: any) => {
        if(confirm("Do you want to cancel this booking")){
            //alert("booking cancelled")
        try {
            const response = await axios.patch(`${baseApi}/booking/cancel-booking`, {
                    bookingId : props.bookingId
                },
                { withCredentials: true}
            );
            // router.push("/")
            alert("Booking cancelled")
            // location.reload();
            console.log(response.data);
        } catch (error : any) {
            console.log(error.response.data.message)
            alert(`Login failed:  ${error.response.data.message}`)
            //console.log('Login failed:', error.response ? error.response.data : error.message);
        }
    }else alert("booking not cancelled")
    }

    if(props.isCustomer){
        //if(!props.accepted) return null;
        if(props.cancelled) return null;
        if(props.timeframe === "past" && props.accepted){
            return (
                <div>
                <button onClick={leaveReviewRedirect} className="basicButton">Leave a review</button>
                </div>
            )
        }else if(props.timeframe === "future"){
            return(<div>
            <button onClick={handleCancel} className="basicButton" style={{backgroundColor : "#FF746C", color : "black"}}>Cancel Booking</button>
            </div>)
        } else if(props.timeframe === "present"){
            // return(<div>
            //     <button>Send Message</button>
            //     </div>)
        }
    }else if(!props.isCustomer){
        console.log("hit")
        if(props.cancelled) return null;
        if(props.timeframe === "past" && props.accepted){
            return;
        } else if(props.timeframe === "future" && !props.accepted){
            
            const handleAccept = async (e: any) => {
                try {
                    const response = await axios.post(`${baseApi}/booking/accept`, {
                            bookingId : props.bookingId
                        },
                        { withCredentials: true}
                    );
                    // router.push("/")
                    alert("Booking accepted")
                    // location.reload();
                    console.log(response.data);
                } catch (error : any) {
                    console.log(error.response.data.message)
                    alert(`Login failed:  ${error.response.data.message}`)
                    //console.log('Login failed:', error.response ? error.response.data : error.message);
                }
            }
            return(
            <div>
            <button onClick={handleAccept} className='basicButton' style={{backgroundColor : "green", color : "white"}}>Accept</button>
            </div>
            )
        } else if(props.timeframe === "future" && props.accepted){

            return(<div>
                <button onClick={handleCancel} className="basicButton">Cancel</button>
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