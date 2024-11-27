import React from 'react'
import Signup from "@/app/[locale]/signup/Signup";

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <h1>Signup</h1>
            <Signup/>
        </div>
    )
}

export default page