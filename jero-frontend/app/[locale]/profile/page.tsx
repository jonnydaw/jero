import React from 'react'
import ProfilePage from "@/app/[locale]/profile/ProfilePage";
import style from "./profile.module.css"

type Props = {}

const page = (props: Props) => {
    return (
        <div><ProfilePage/></div>
    )
}

export default page