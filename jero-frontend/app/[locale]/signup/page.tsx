import React from 'react'
import Signup from "@/components/Signup/Signup";
import style from './page.module.css'
type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <h1 id={style.title}>Welcome, to access all features pls signup</h1>
            <Signup/>
        </div>
    )
}

export default page