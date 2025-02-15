'use client'
import style from "./Profile.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cards } from "./Cards";

interface Props {
    firstName: string
}

export const Profile = (props : Props) => {
    const [nameOfUser, setNameOfUser] = useState<string | null>();
    const router = useRouter()
    const customerList : Object = {
        "mangage" : {"id" : 1, "title" : "Manage Profile", "content" : "does"},
        "past" : {"id" : 2, "title" : "Past Bookings", "content" : "does1"},
        "upcoming" : {"id" : 3, "title" : "Upcoming Bookings", "content" : "does2"},
        "analyticsAndPrivacy" : {"id" : 4, "title" : "Analytics & Privacy", "content" : "does2"},
        "wishlists" : {"id" : 5, "title" : "Wishlists", "content" : "does2"},
        "messages" : {"id" : 6, "title" : "Wishlists", "content" : "does2"},
    }

    // const getProfile = async () => {
    //     try{
    //     const response =  await axios.get('http://localhost:8080/auth/profile',{withCredentials : true})
    //     //console.log(response);
    //     setNameOfUser(response.data)
    // }catch(error : any){
    //     console.log('Get profile error verification failed:', error.response ? error.response.data : error.message);
    //     //console.log(error.response)
    //     if(error.response.status === 403){
    //         router.push("/")
    //     }
    // }
    // }
    // useEffect(()=>{
    //     getProfile()

    // }, [])
    return (
        <div id={style.mainContainer}>
            <h1>
                {props.firstName === undefined ? `Loading`: `Hello, ${props.firstName}`}
            </h1>
            <h3>Fun stat</h3>
            <div id={style.anotherStupidContainer}>
            <div id={style.cardContainer}>
                
            {Object.values(customerList).map(value => (
                <Cards key={value.id} cardName={value.title} cardContent={value.content} />            
                ))}
                
            </div>
            </div>
        </div>
    )
}

export default Profile;