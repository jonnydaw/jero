// 'use client'
// import React, { useState, useEffect } from "react";
import { inDevEnvironment } from "@/base";
import { profileKeysCustomer, profileKeysHost } from "@/components/Navbar/NavbarPC/ProfileDropdown/helper";
import Profile from "@/components/Profile/Profile";
import axios from "axios"
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

// https://nextjs.org/docs/app/api-reference/functions/cookies

const ProfilePage = async () => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    
    const parseJWT = (jwtValue : string) => {
        return (JSON.parse(atob(jwtValue.split('.')[1])))
    }

    if(!jwtValue){
        redirect("/");
    }
    const arr : string[] = parseJWT(jwtValue).role === "customer" 
    ? profileKeysCustomer 
    : profileKeysHost
    ;


    let firstName;
    try{
    // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
    const response = await fetch(`${baseApi}/profile/get-first-name`, {
        method: "GET",
        headers: {
            Cookie: `JWT=${jwtValue};`
        },       
    });
    firstName = await response.text();

    }catch(error : any){
        console.error(error);
    }
    return (
        <div> {<Profile firstName={firstName || "You should not be here"} profileKeys={arr}/>}</div>
    );
}


export default ProfilePage;
