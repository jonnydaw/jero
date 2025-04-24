import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import axios from 'axios';
import { inDevEnvironment } from '@/base';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { cookies, headers } from 'next/headers';
import NotLoggedIn from '@/components/Home/NotLoggedIn/NotLoggedIn';
import { getTranslations } from 'next-intl/server';
import All from '@/components/Home/All/All';
import { BookingProperty } from '@/types/types';
import Customer from '@/components/Home/Customer/Customer';
import Host from '@/components/Home/Host/Host';

const page = async () => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    const {isMobile} = getSelectorsByUserAgent(
        (await headers()).get("user-agent") ?? ""
    )
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    }

    if(!jwtValue){
        // redirect
        return(
            <>
             <NotLoggedIn/>
             <All/>
             </>
        )
    }
    const isCustomer : boolean = parseJWT(jwtValue).role === "customer";
    let errorMessage = "";
    let vals
    try{
        // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
        const response = await fetch(`${baseApi}/booking/get-upcoming-bookings`, {
            method: "GET",
            headers: {
                Cookie: `JWT=${jwtValue};`
            },       
        });
        vals  = (await (response.json()))
        console.log(vals.past)
        //firstName = await response.text();
        if(response.status !== 200){
            errorMessage = "Sorry we cannot your booking data at the moment"
            console.log(errorMessage)
        }
        }catch(error : any){
            console.log(error.message)
            errorMessage = errorMessage.length > 0 ? errorMessage : error.message;
        }

       
        //url.search = new URLSearchParams(params).toString();
        //console.log(ids)
        if(isCustomer){
            const data  : Map<String, BookingProperty[]> = new Map(Object.entries(vals)) 
            const ids = []
            const pastData = data.get("past");
            if(pastData){
                for(const data of pastData){
                    if(data.accepted && !data.cancelled){
                        ids.push(data.propertyId)
                    }
                }
            }
        
        let res;
                try{
                    // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
                    const response = await fetch(`${baseApi}/property/get-lat-lons?bookings=${ids}`, {
                        method: "GET",
                    });
                    res  = (await (response.json()))
                    console.log(res)
                    //firstName = await response.text();
                    if(response.status !== 200){
                        errorMessage = "Sorry we cannot your booking data at the moment"
                        console.log(errorMessage)
                    }
                    }catch(error : any){
                        console.log(error.message)
                        errorMessage = errorMessage.length > 0 ? errorMessage : error.message;
                    }
        
        // if(res.length > -1){
            return (
                <>
                <Customer latLons={res}/>
                <All/>
                </>
            )
        //}
        }else{
            const data  : Map<String, BookingProperty[]> = new Map(Object.entries(vals));
            let totalEarnings = 0;
            let totalGuests = 0;
            const pastData = data.get("past");
            if(pastData){
                for(const data of pastData){
                    if(data.accepted && !data.cancelled){
                        totalEarnings += (data.totalCost)
                        totalGuests += (data.numChildren + data.numAdults)
                    }
                }
            }
            return (
                <>
                <Host totalGuests={totalGuests} totalEarnings={totalEarnings}/>
                <All/>
                </>
            )
        }

       

    const t = await getTranslations('HomePage');
    return (
        <>
        <NotLoggedIn/>

        <All/>
        </>
    );  
}

export default page;