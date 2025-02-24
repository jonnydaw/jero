import React from 'react'
import Login from "@/components/Login/Login";
import style from "./page.module.css"
import { cookies } from 'next/headers';
type Props = {}

const page = async (props: Props) => {
    // const cookieStore = await cookies();
    // const jwtValue = cookieStore.get("JWT")?.value;
    // const rtValue = cookieStore.get("RT")?.value;
    return (
        <div>
            <h1 id={style.title}>Welcome back</h1>
            <Login/>
        </div>
    )
}

export default page