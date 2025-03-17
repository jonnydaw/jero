'use client'

import { inDevEnvironment } from "@/base";
import axios from "axios";
import Link from "next/link"
import { AnyARecord } from "node:dns";
import style from "./profiledropdown.module.css"

const LogoutFakeLink = () => {
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    
    const handleClick = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseApi}/logout`, {

                },
                { withCredentials: true}
            );
            console.log("hi" + response.data);
            location.reload();
        } catch (error : any) {
            console.log(error)
            //onsole.log('Login failed:', error.response ? error.response.data : error.message);
        }

    }

    return(
        <span id={style.fakeLink} className={style.links} onClick={handleClick}>
            Logout
        </span>
    )
}

export default LogoutFakeLink