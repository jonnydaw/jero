'use client'
import style from "./Profile.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cards } from "./Cards";

interface Props {
    jwt: string
}

export const Profile = () => {
    const [nameOfUser, setNameOfUser] = useState<string | null>();
    const router = useRouter()
    const customerList = [
        'Manage profile', 
        'Past bookings', 
        'Upcoming bookings', 
        'Analytics & Privacy', 
        'Wishlists', 
        'Messages'
    ]

    const getProfile = async () => {
        try{
        const response =  await axios.get('http://localhost:8080/auth/profile',{withCredentials : true})
        //console.log(response);
        setNameOfUser(response.data)
    }catch(error : any){
        console.log('Get profile error verification failed:', error.response ? error.response.data : error.message);
        //console.log(error.response)
        if(error.response.status === 403){
            router.push("/")
        }
    }
    }
    useEffect(()=>{
        getProfile()

    }, [])
    return (
        <div id={style.mainContainer}>
            <h1>
                {nameOfUser === undefined ? `Loading`: `Hello, ${nameOfUser}`}
            </h1>
            <h3>Fun stat</h3>
            <div id={style.anotherStupidContainer}>
            <div id={style.cardContainer}>
            {customerList.map((item, index) => (
                <Cards key={index} cardName={item} />
             ))}
            </div>
            </div>
        </div>
    )
}

export default Profile;