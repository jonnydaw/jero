// components/Form.js
'use client'
import style from "./Signup.module.css"

import React, { useState } from "react";
import axios from "axios"
import { useTranslations } from "next-intl";

const Signup = () => {
    const t = useTranslations('Signup');
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        confirmEmail : "",
        dob: "",
        password : "",
        confirmPassword : ""

    });

    const handleChange = (e : any) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', {
                firstName : formData.firstName,
                lastName : formData.lastName,
                dob: formData.dob,
                email : formData.email,
                confirmEmail : formData.confirmEmail,    
                password : formData.password,
                confirmPassword : formData.confirmPassword
                },
                { withCredentials: true}
            );
            console.log(response.data);
        } catch (error : any) {
            console.log(formData)
            console.log('Signup failed:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div id={style.container}   >
        <div>
        <form onSubmit={handleSubmit} id={style.form}>
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder= {t('firstName')}
                value={formData.firstName}
                onChange={handleChange}
            />
                        <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder= {t('lastName')}
                value={formData.lastName}
                onChange={handleChange}
            />
            <input
                type="text"
                id="dob"
                name="dob"
                placeholder= {t('dob')}
                value={formData.dob}
                onChange={handleChange}
            />
            <input
                type="email"
                id="email"
                name="email"
                placeholder= {t('email')}
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                placeholder= {t('confirmEmail')}
                value={formData.confirmEmail}
                onChange={handleChange}
            />

            <input
                type="password"
                id="password"
                name="password"
                placeholder= {t('password')}
                value={formData.password}
                onChange={handleChange}
            />
            
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder= {t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            
            <button id={style.button} type="submit">
                Signup
            </button>
        </form>
            <h3 id={style.message}>Already have an account? Login</h3>
        </div>
        </div>
    );
}


export default Signup;
