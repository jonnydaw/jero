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
    console.log(jwtToken);
    if(!jwtToken){
        redirect("/")
    }
    return (
        <div> {<Profile/>}</div>
    );
}


export default ProfilePage;
