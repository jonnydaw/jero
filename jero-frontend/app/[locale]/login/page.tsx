import React from 'react'
import Login from "@/app/components/Login/Login";
import style from "./page.module.css"
type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <h1 id={style.title}>Welcome back</h1>
            <Login/>
        </div>
    )
}

export default page