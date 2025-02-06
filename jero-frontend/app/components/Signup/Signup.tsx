// components/Form.js
'use client'
import style from "./Signup.module.css"

import React, { useRef, useState } from "react";
import axios from "axios"
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { createPortal } from 'react-dom';
import Portal from "../Modal/Portal";
import {doEmailsMatch, isValidEmail} from "./SignupErrors"


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

type EmailError = {
    empty : boolean,
    invalid : boolean,
    mismatch : boolean
}

type ConfirmEmailError = {
    empty : boolean,
    invalid : boolean,
    mismatch : boolean
}



const Signup = () => {
    const t = useTranslations('Signup');
    
    const [postSuccess, setPostSuccess] = useState<boolean>(false);

    const calculateAge = () => {
        const dob = new Date(formData.dob);
        const now = new Date();
        return now.valueOf() - dob.valueOf();
    }

    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    
    const [emailError, setEmailError] = useState<EmailError>({
        empty : false,
        invalid : false,
        mismatch: false
    });

    const [confirmEmailError, setConfirmEmailError] = useState<ConfirmEmailError>({
        empty : false,
        invalid : false,
        mismatch: false
    });
    
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
        if(name === `firstName` && value.length > 0 ){
            setFirstNameError(false);
        } else if(name === `lastName` && value.length > 0){
            setLastNameError(false);
        } else if(name === `email` && value.length > 0){
            setEmailError({...emailError, [`empty`] : false});
            if(isValidEmail(value)){
                console.log("hit second if")
                setEmailError({...emailError, [`invalid`] : false});
            }
            if(doEmailsMatch(formData.confirmEmail, value)){
                //console.log("hit mismatch")
                setConfirmEmailError({...confirmEmailError, [`mismatch`] : false});
            }
        } else if(name === `confirmEmail` && value.length > 0){
            setConfirmEmailError({...confirmEmailError, [`empty`] : false});
            if(isValidEmail(value)){
                setConfirmEmailError({...confirmEmailError, [`invalid`] : false});
            }
            //console.log(doEmailsMatch(formData.email, value))
            if(doEmailsMatch(formData.email, value)){
                //console.log("hit mismatch")
                setConfirmEmailError({...confirmEmailError, [`mismatch`] : false});
            }
        } else if(name === `dob`){
            console.log(calculateAge());
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

    const handleBlurLastName = () => {
        if(formData.lastName.length === 0){
            setLastNameError(true)
        }else{
            setLastNameError(false)
        }
    }

    const handleBlurEmail = () => {
        if(formData.email.length === 0){
            console.log("hitLength")
            setEmailError({...emailError, [`empty`] : true})
        }else if(!isValidEmail(formData.email)) {
            console.log("hitInvalid")
            setEmailError({...emailError, [`invalid`] : true})
        } else if (!doEmailsMatch(formData.email, formData.confirmEmail)){
            setConfirmEmailError({...confirmEmailError, [`mismatch`] : true})
        }
    }

    const handleBlurConfirmEmail = () => {
        if(formData.confirmEmail.length === 0){
            console.log("hitLength")
            setConfirmEmailError({...confirmEmailError, [`empty`] : true})
        }else if(!isValidEmail(formData.confirmEmail)) {
            console.log("hitInvalid")
            setConfirmEmailError({...confirmEmailError, [`invalid`] : true})
        } else if (!doEmailsMatch(formData.email, formData.confirmEmail)){
            setConfirmEmailError({...confirmEmailError, [`mismatch`] : true})
        }
    }

    const allowSubmission = async () => {
        // check if any errors exist
        // errors.current.email = doEmailsMatch(formData.email, formData.confirmEmail);
        // console.log(doEmailsMatch(formData.email, formData.confirmEmail));
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

            {!firstNameError ? <br /> : <span>First name cannot be empty.</span>}
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder= {t('firstName')}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlurFirstName}
            />

            {!lastNameError ? <br /> : <span>Last name cannot be empty.</span>}
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder= {t('lastName')}
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlurLastName}
            />

            {!firstNameError ? <span>Date of Birth</span> : <span>Not allowed</span>}
            <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
            />
            {(!emailError.empty && !emailError.invalid) ? <br /> : <span>{emailError.empty ? `Email cannot be empty` : `Invalid Email`}</span> }
            <input
                type="email"
                id="email"
                name="email"
                placeholder= {t('email')}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlurEmail}

            />
            {(!confirmEmailError.empty && !confirmEmailError.invalid && !confirmEmailError.mismatch)  
            ? <br /> 
            : <span>
                {confirmEmailError.empty ? `Email cannot be empty` : 
                confirmEmailError.invalid ? `Email is invalid`: `Email mismatch`}
            </span>}
            <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                placeholder= {t('confirmEmail')}
                value={formData.confirmEmail}
                onChange={handleChange}
                onBlur={handleBlurConfirmEmail}
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
