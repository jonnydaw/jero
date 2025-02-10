// 'use client'
// import React, { useState, useEffect } from "react";
import axios from "axios"
import { cookies } from "next/headers";

// https://nextjs.org/docs/app/api-reference/functions/cookies

const Profile = async () => {

    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("JWT")?.value;
    return (
        <div>{jwtToken || `Not logged in`}</div>
    );
}


export default Profile;
