// components/Form.js
'use client'
import style from "./Signup.module.css"

import React, { useRef, useState } from "react";
import axios from "axios"
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { createPortal } from 'react-dom';
import Portal from "../Modal/Portal";
import {catchEmailMismatch} from "./SignupErrors"


type FormData = {
    firstName : string,
    lastName : string,
    email : string,
    confirmEmail : string,
    dob: string,
    password : string,
    confirmPassword : string,
    roles : string
}

type FormFocusDefocus = {
    firstName : boolean,
    lastName : boolean,
    email : boolean,
    confirmEmail : boolean,
    dob: boolean,
    password : boolean,
    confirmPassword : boolean,
    roles : boolean
}

type FormError = {
    firstName : boolean,
    lastName : boolean,
    email : boolean,
    dob: boolean,
    password : boolean,
    roles : boolean
}



const Signup = () => {
    const t = useTranslations('Signup');
    
    const [postSuccess, setPostSuccess] = useState<boolean>(false);

    const [firstNameError, setFirstNameError] = useState<boolean>(false)
    
    const [formData, setFormData] = useState<FormData>({
        firstName : "",
        lastName : "",
        email : "",
        confirmEmail : "",
        dob: "",
        password : "",
        confirmPassword : "",
        roles : ""
    });


    // true signifies the lack of an error.
    // having to use useRef as useState was not fast enough on its own
    const errors = useRef<FormFocusDefocus>({
        firstName : true,
        lastName : true,
        email : true,
        confirmEmail : true,
        dob: true,
        password : true,
        confirmPassword : true,
        roles : true
    })

    const handleChange = (e : any) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
        if(name === `firstName`){
            console.log(value)
            if(value.length > 0){
                setFirstNameError(false);
            }
        }
    }

    const handleFocus = (e : any) =>{

    }

    const handleBlurFirstName = () => {
        if(formData.firstName.length === 0){
            setFirstNameError(true)
        }else{
            setFirstNameError(false)
        }
    }

    const allowSubmission = async () => {
        errors.current.email = catchEmailMismatch(formData.email, formData.confirmEmail);
        console.log(catchEmailMismatch(formData.email, formData.confirmEmail));
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        await allowSubmission();
        if(errors.current.email === false){
            console.log("hit")
        } else{
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', {
                firstName : formData.firstName,
                lastName : formData.lastName,
                dob: formData.dob,
                email : formData.email,
                confirmEmail : formData.confirmEmail,    
                password : formData.password,
                confirmPassword : formData.confirmPassword,
                roles : formData.roles
                },
                { withCredentials: true}
            );
            setPostSuccess(true);
            console.log(response.data);
        } catch (error : any) {
            console.log(formData)
            console.log('Signup failed:', error.response ? error.response.data : error.message);
        }
    }
    }

    return (
        <div id={style.container}>
        <div>
        <form onSubmit={handleSubmit} id={style.form}>
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder= {t('firstName')}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlurFirstName}
            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder= {t('lastName')}
                value={formData.lastName}
                onChange={handleChange}

            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="text"
                id="dob"
                name="dob"
                placeholder= {t('dob')}
                value={formData.dob}
                onChange={handleChange}
            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="email"
                id="email"
                name="email"
                placeholder= {t('email')}
                value={formData.email}
                onChange={handleChange}

            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                placeholder= {t('confirmEmail')}
                value={formData.confirmEmail}
                onChange={handleChange}
            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="password"
                id="password"
                name="password"
                placeholder= {t('password')}
                value={formData.password}
                onChange={handleChange}
            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder= {t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <select name="roles"
                id={style.roles}
                value={formData.roles}
                onChange={handleChange}
                >
                <option value="" disabled hidden>
                    {t('userTypes.placeholder')}
                </option>
                <option value="customer">{t('userTypes.tourist')}</option>
                <option value="host">{t('userTypes.host')}</option>
                <option value="both">{t('userTypes.both')}</option>
            </select>
            {!firstNameError ? <br /> : <span>Not allowed</span>}
            <button id={style.button} type="submit">
                Signup
            </button>
        </form>
            <h3 id={style.message}>Already have an account? <Link href="/login">Sign in</Link></h3>
            <Portal origin="hi" data="poo"/>
        </div>
        </div>
    );
}


export default Signup;
