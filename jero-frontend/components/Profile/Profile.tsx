import style from "./Profile.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cards } from "./Cards";
import { internationalKeys } from "../Navbar/NavbarPC/ProfileDropdown/helper";
import { useTranslations } from "next-intl";

interface Props {
    firstName: string;
    profileKeys : string[];
}

export const Profile = (props : Props) => {
    let arr : string[] = props.profileKeys;
    const t = useTranslations('Profile');
    // arr.push(...internationalKeys);
    
    // const router = useRouter()
    // const customerList : Object = {
    //     "mangage" : {"id" : 1, "title" : "Manage Profile", "content" : "does"},
    //     "past" : {"id" : 2, "title" : "Past Bookings", "content" : "does1"},
    //     "upcoming" : {"id" : 3, "title" : "Upcoming Bookings", "content" : "does2"},
    //     "analyticsAndPrivacy" : {"id" : 4, "title" : "Analytics & Privacy", "content" : "does2"},
    //     "wishlists" : {"id" : 5, "title" : "Wishlists", "content" : "does2"},
    //     "messages" : {"id" : 6, "title" : "Wishlists", "content" : "does2"},
    // }

    return (
        <div id={style.mainContainer}>
            <h1>
                {props.firstName === undefined ? `Loading`: `${t('hi')}, ${props.firstName}`}
            </h1>
            <div id={style.anotherStupidContainer}>
            <div id={style.cardContainer}>  
                
            {arr.map((item,idx) => (
                <Cards key={idx} ti={idx} cardName={t(item)} cardContent={t(item)} cardOnwardLink={item} />            
            ))
            }
                
            </div>
            </div>
        </div>
    )
}

export default Profile;