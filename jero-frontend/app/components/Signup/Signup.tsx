// components/Form.js
'use client'
import style from "./Signup.module.css"

import React, { useRef, useState } from "react";
import axios from "axios"
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { createPortal } from 'react-dom';
import Portal from "../Modal/Portal";
import {isFieldMatch, isValidEmail, isValidPassword} from "./SignupErrors"
import OTPModal from "./SignupModal";
import { useRouter } from "next/navigation";


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


type EmailOrPasswordError =  {
    empty : boolean,
    invalid : boolean,
    mismatch : boolean
    blurred : boolean
}

type GeneralErrors = {
    empty : boolean,
    blurred : boolean 
}


type FormErrors = {
    firstName : boolean,
    lastName : boolean,
    email : EmailOrPasswordError,
    confirmEmail : EmailOrPasswordError,
    dob: boolean,
    password : EmailOrPasswordError,
    confirmPassword : EmailOrPasswordError,
    roles : boolean
}



const Signup = () => {
    const t = useTranslations('Signup');
    
    const [postSuccess, setPostSuccess] = useState<boolean>(false);

    const calculateAge = () => {
        const dob = new Date(formData.dob);
        const now = new Date();
        return now.valueOf() - dob.valueOf();
    }

    const [submissionError, setSubmissionError] = useState<boolean>(false);
    
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

    const [errors, setErrors] = useState<FormErrors>({
        firstName : false,
        lastName : false,
        email : {empty: false, invalid: false,mismatch: false, blurred : false},
        confirmEmail : {empty: false, invalid: false,mismatch: false, blurred : false},
        dob: false,
        password : {empty: false, invalid: false,mismatch: false, blurred : false},
        confirmPassword : {empty: false, invalid: false,mismatch: false, blurred : false},
        roles : false
    })
// could be tidier still
    const handleValidationPerInput = (name: string, value: string, blurredStatus : boolean) => {
        if(name === `firstName`){
            setErrors({...errors, [name] : value.length === 0 })
        } else if(name === `lastName`){
            setErrors({...errors, [name] : value.length === 0})
        } else if(name === `email`){
            if(blurredStatus || errors.email.blurred === true){
            setErrors({...errors, [name] : 
                {
                empty: value.length === 0,
                invalid : !isValidEmail(value),
                mismatch: !isFieldMatch(formData.confirmEmail, value),
                blurred : true
                }
        })
        if(isFieldMatch(formData.confirmEmail, value)){
                setErrors({...errors, [`confirmEmail`] : 
                    {
                    empty: errors.confirmEmail.empty,
                    invalid : errors.confirmEmail.invalid,
                    mismatch: !isFieldMatch(formData.confirmEmail, value),
                    blurred : errors.confirmEmail.blurred
                    }
            })
        }
    }
        } else if(name === `confirmEmail`){
            if(blurredStatus || errors.confirmEmail.blurred === true){
            setErrors({...errors, [name] : 
                {
                empty: value.length === 0,
                invalid : !isValidEmail(value),
                mismatch : !isFieldMatch(formData.email, value),
                blurred : true
                }
        })
    }

        } else if(name === `dob`){
            console.log(calculateAge());
        } else if (name === `password`){
            if(blurredStatus || errors.password.blurred === true){
            setErrors({...errors, [name] : 
                {
                empty: value.length === 0,
                invalid : !isValidPassword(value),
                mismatch: !isFieldMatch(formData.confirmPassword, value),
                blurred : true
            }
        })
        if(isFieldMatch(formData.confirmPassword, value)){
            setErrors({...errors, [`confirmPassword`] : 
                {
                empty: errors.confirmPassword.empty,
                invalid : errors.confirmPassword.invalid,
                mismatch: !isFieldMatch(formData.confirmPassword, value),
                blurred : errors.confirmPassword.blurred
                }
        })
    }
        }
        } else if(name === `confirmPassword`){
            console.log(isValidPassword(value));
            if(blurredStatus || errors.confirmPassword.blurred === true){
            setErrors({...errors, [name] : 
                {
                empty: value.length === 0,
                invalid : !isValidPassword(value),
                mismatch: !isFieldMatch(formData.password, value),
                blurred : true
                }
        })
        }
    }
        
    }
    const handleChange = (e : any) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
        handleValidationPerInput(name,value, false);
       
    }

    const handleBlur = (e : any) => {
        const { name, value} = e.target;
        handleValidationPerInput(name,value, true);
    }


    const router = useRouter()


    const allowSubmission = () : boolean => {
        // to do
        setSubmissionError(false);
        console.log("no errors")
        return true;
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        //console.log(emailError)
        if(allowSubmission()){
            setPostSuccess(true)
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', {
                firstName : formData.firstName,
                lastName : formData.lastName,
                dob: formData.dob,
                email : formData.email,
                confirmEmail : formData.confirmEmail,    
                password : formData.password,
                confirmPassword : formData.confirmPassword,
                roles : formData.roles,
                locale : window.location.href
                },
                { withCredentials: true}
            );
            setPostSuccess(true);
            console.log(response.data);
        } catch (error : any) {
            console.log(formData)
            console.log('Signup failed:', error.response ? error.response.data : error.message);
    }}
    else{
        setSubmissionError(true);
    }
    }

    return (
        <div id={style.container}>
        <div>
        <form onSubmit={handleSubmit} id={style.form}>

            {!errors.firstName ? <br /> : <span>First name cannot be empty.</span>}
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder= {t('firstName')}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            {!errors.lastName ? <br /> : <span>Last name cannot be empty.</span>}
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder= {t('lastName')}
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            {!errors.firstName ? <span>Date of Birth</span> : <span>Not allowed</span>}
            <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
            />
            {(!errors.email.empty && !errors.email.invalid) ? <br /> : <span>{errors.email.empty ? `Email cannot be empty` : `Invalid Email`}</span> }
            <input
                type="email"
                id="email"
                name="email"
                placeholder= {t('email')}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}

            />
            {(!errors.confirmEmail.empty && !errors.confirmEmail.invalid && !errors.confirmEmail.mismatch)  
            ? <br /> 
            : <span>
                {errors.confirmEmail.empty ? `Email cannot be empty` : 
                errors.confirmEmail.invalid ? `Email is invalid`: `Email mismatch`}
            </span>}
            <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                placeholder= {t('confirmEmail')}
                value={formData.confirmEmail}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {(!errors.password.empty && !errors.password.invalid) ? <br /> : <span>{errors.password.empty ? `Password cannot be empty` : `Invalid Password`}</span> }
            <input
                type="password"
                id="password"
                name="password"
                placeholder= {t('password')}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {(!errors.confirmPassword.empty && !errors.confirmPassword.invalid && !errors.confirmPassword.mismatch)  
            ? <br /> 
            : <span>
                {errors.confirmPassword.empty ? `Password cannot be empty` : 
                errors.confirmPassword.invalid ? `Password is invalid`: `Password mismatch`}
            </span>}
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder= {t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {true ? <br /> : <span>An option must be selected</span>}
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
            {!submissionError ? <br /> : <span>Not allowed</span>}
            <button id={style.button} type="submit">
                Signup
            </button>
        </form>
        <div onClick={() => router.back()}>Go Back</div>
            <h3 id={style.message}>Already have an account? <Link href="/login">Sign in</Link></h3>
            {postSuccess && <OTPModal pass={formData.password}/>}
            {/* {true && <OTPModal/>} */}
        </div>
        </div>
    );
}




export default Signup;
