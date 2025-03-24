'use client'

import { inDevEnvironment } from "@/base";
import axios from "axios";

interface Props {
    accepted : boolean;
    cancelled : boolean;
    bookingId : string;
    isCustomer : boolean;
    timeframe : string;
}

const Options = (props : Props) => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    if(props.isCustomer){
        //if(!props.accepted) return null;
        if(props.cancelled) return null;
        if(props.timeframe === "past" && props.accepted){
            return (
                <div>
                <button style={{backgroundColor : "white", color : "black"}}>Leave a review</button>
                </div>
            )
        }else if(props.timeframe === "future"){
            return(<div>
            <button style={{backgroundColor : "red", color : "white"}}>Cancel Booking</button>
            </div>)
        } else if(props.timeframe === "present"){
            return(<div>
                <button>Send Message</button>
                </div>)
        }
    }else if(!props.isCustomer){
        console.log("hit")
        if(props.cancelled) return null;
        if(props.timeframe === "past" && props.accepted){
            return (
                <div>
                <button style={{backgroundColor : "white", color : "black"}}>Leave a review</button>
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
                    // location.reload();
                    console.log(response.data);
                } catch (error : any) {
                    console.log('Login failed:', error.response ? error.response.data : error.message);
                }
            }
            return(
            <div>
            <button onClick={handleAccept} style={{backgroundColor : "green", color : "white"}}>Accept</button>
            </div>
            )
        } else if(props.timeframe === "future" && props.accepted){
            return(<div>
                <button>Cancel</button>
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