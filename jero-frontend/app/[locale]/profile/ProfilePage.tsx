// 'use client'
// import React, { useState, useEffect } from "react";
import Profile from "@/app/components/Profile/Profile";
import axios from "axios"
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

// https://nextjs.org/docs/app/api-reference/functions/cookies

const ProfilePage = async () => {
    
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("JWT")?.value;

    

    // console.log("server " + jwtToken);

    if(!jwtToken){
        redirect("/");
    }
    let firstName;
    try{
    // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
    const response = await fetch("http://localhost:8080/auth/profile", {
        method: "GET",
        headers: {
            Cookie: `JWT=${jwtToken};`
        }
    });
    firstName = await response.text();
    }catch(error : any){
        console.error(error);
        redirect("/");
    }
    return (
        <div> {<Profile firstName={firstName}/>}</div>
    );
}


export default ProfilePage;
