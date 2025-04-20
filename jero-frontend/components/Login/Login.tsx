// components/Form.js
'use client'
import React, { useState } from "react";
import axios from "axios"
import style from "./Login.module.css"
import { Link } from "@/i18n/routing";
import next from "next";
// https://stackoverflow.com/questions/74421327/nextrouter-was-not-mounted-next-js
import { useRouter } from "next/navigation";
import { inDevEnvironment } from "@/base";
import { useTranslations } from "next-intl";
const Login = () => {

    const t = useTranslations('Login');

    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const router = useRouter();

    const handleChange = (e : any) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
        console.log(base)
        try {
            const response = await axios.post(`${base}/auth/signin`, {
                    username : formData.email,
                    password : formData.password

                },
                { withCredentials: true}
            );
            router.push("/")
            location.reload();
            console.log(response.data);
        } catch (error : any) {
            // console.log(formData)
            // console.log('Login failed:', error.response ? error.response.data : error.message);
            alert(t('notAllowed'))
        }
    }
    // const myRefresh = async (e:any) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get('http://localhost:8080/auth/refresh', {
    //             withCredentials: true
    //         }
    //         );
    //         console.log(response.data);
    //     } catch (error : any) {
    //         console.log(formData)
    //         console.log('Login failed:', error.response ? error.response.data : error.message);
    //     }
    // }

    return (
        <div id={style.container}   >
            {/* <button onClick={myRefresh}></button> */}
        <div>
        <form onSubmit={handleSubmit} id={style.form}>
            <label htmlFor="email">{t('email')}</label>
            <input
                required
                aria-required
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <label htmlFor="password">{t('password')}</label>
            <input
                required
                aria-required
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

            <button className='basicButton' id={style.button} type="submit">
                {t('login')}
            </button>
        </form>
        <h3 id={style.message}>{t('noAccount')} <Link href="/signup">{t('signup')}</Link> </h3>
        </div>
        </div>
    );
}


export default Login;
