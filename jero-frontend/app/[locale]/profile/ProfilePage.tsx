// 'use client'
// import React, { useState, useEffect } from "react";
import { inDevEnvironment } from "@/base";
import Profile from "@/components/Profile/Profile";
import axios from "axios"
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

// https://nextjs.org/docs/app/api-reference/functions/cookies

const ProfilePage = async () => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const cookieStore = await cookies();
    const jwtValue = cookieStore.get("JWT")?.value;
    

    // console.log("server " + jwtToken);

    if(!jwtValue){
        redirect("/");
    }
    let firstName;
    try{
    // https://stackoverflow.com/questions/60168695/how-to-include-cookies-with-fetch-request-in-nextjs
    const response = await fetch(`${baseApi}/auth/profile`, {
        method: "GET",
        headers: {
            Cookie: `JWT=${jwtValue};`
        },       
    });
    firstName = await response.text();
    //     console.log(response.status)
    //     if (response.status === 403) {
    //         const refreshResponse = await fetch('http://localhost:8080/auth/refresh', {
    //             method: 'GET',
    //             headers: {
    //                 Cookie: `JWT=${jwtValue}; RT=${rtValue};`,
    //             },
    //             credentials : "include"
    //         });

    //         // const { JWT: newJWT } = await refreshResponse.json();

    //         // cookieStore.set("JWT",newJWT);

        
    //     if(refreshResponse.status === 200){
    //         const response = await fetch("http://localhost:8080/auth/profile", {
    //             method: "GET",
    //             headers: {
    //                 Cookie: `JWT=${cookieStore.get("JWT")?.value};`
    //             },
    //             credentials : "include"
    //         });
    //         console.log(await response.json())

    //     }
    // } 
    }catch(error : any){
        console.error(error);
        // redirect("/");
    }
    return (
        <div> {<Profile firstName={firstName|| "hi"}/>}</div>
    );
}


export default ProfilePage;
