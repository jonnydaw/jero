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

type FormErrors = {
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

    const [passwordError, setPasswordError] = useState<ConfirmEmailError>({
        empty : false,
        invalid : false,
        mismatch: false
    });

    const [confirmPasswordError, setConfirmPasswordError] = useState<ConfirmEmailError>({
        empty : false,
        invalid : false,
        mismatch: false
    });

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


    // true signifies the lack of an error.
    // having to use useRef as useState was not fast enough on its own
    const [errors, setErrors] = useState<FormErrors>({
        firstName : false,
        lastName : false,
        email : false,
        confirmEmail : false,
        dob: false,
        password : false,
        confirmPassword : false,
        roles : false
    })

    // TODO: REFACTOR
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
                setEmailError({...emailError, [`invalid`] : false});
            }
            if(isFieldMatch(formData.confirmEmail, value)){
                setConfirmEmailError({...confirmEmailError, [`mismatch`] : false});
            }
        } else if(name === `confirmEmail` && value.length > 0){
            setConfirmEmailError({...confirmEmailError, [`empty`] : false});
            if(isValidEmail(value)){
                setConfirmEmailError({...confirmEmailError, [`invalid`] : false});
            }
            if(isFieldMatch(formData.email, value)){
                setConfirmEmailError({...confirmEmailError, [`mismatch`] : false});
            }
        } else if(name === `dob`){
            console.log(calculateAge());
        } else if (name === `password` && value.length > 0){
            setPasswordError({...passwordError, [`empty`] : false});
            if(isValidPassword(value)){
                setPasswordError({...passwordError, [`invalid`] : false});
            }
            if(isFieldMatch(formData.confirmPassword, value)){
                setConfirmPasswordError({...confirmPasswordError, [`mismatch`] : false});
            }
        } else if(name === `confirmPassword` && value.length > 0){
            console.log(isValidPassword(value));
            setConfirmPasswordError({...confirmPasswordError, [`empty`] : false});
            if(isValidPassword(value)){
                console.log("valid")
                setConfirmPasswordError({...confirmPasswordError, [`invalid`] : false});
            }
            if(isFieldMatch(formData.password, value)){
                setConfirmPasswordError({...confirmPasswordError, [`mismatch`] : false});
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

    const handleBlurLastName = () => {
        if(formData.lastName.length === 0){
            setLastNameError(true)
        }else{
            setLastNameError(false)
        }
    }

    const handleBlurEmail = () => {
        if(formData.email.length === 0){
            setEmailError({...emailError, [`empty`] : true})
        }else if(!isValidEmail(formData.email)) {
            setEmailError({...emailError, [`invalid`] : true})
        } else if (formData.confirmEmail .length > 0 && !isFieldMatch(formData.email, formData.confirmEmail)){
            setConfirmEmailError({...confirmEmailError, [`mismatch`] : true})
        }
    }

    const handleBlurConfirmEmail = () => {
        if(formData.confirmEmail.length === 0){
            setConfirmEmailError({...confirmEmailError, [`empty`] : true})
        }else if(!isValidEmail(formData.confirmEmail)) {
            setConfirmEmailError({...confirmEmailError, [`invalid`] : true})
        } else if (!isFieldMatch(formData.email, formData.confirmEmail)){
            setConfirmEmailError({...confirmEmailError, [`mismatch`] : true})
        }
    }


    const handleBlurPassword = () => {
        if(formData.password.length === 0){
            setPasswordError({...passwordError, [`empty`] : true})
        }else if(!isValidPassword(formData.password)) {
            setPasswordError({...passwordError, [`invalid`] : true})
        } else if (formData.confirmPassword .length > 0 && !isFieldMatch(formData.password, formData.confirmPassword)){
            setConfirmPasswordError({...confirmPasswordError, [`mismatch`] : true})
        }
    }

    const handleBlurConfirmPassword = () => {
        if(formData.confirmPassword.length === 0){
            setConfirmPasswordError({...confirmPasswordError, [`empty`] : true})
        }else if(!isValidPassword(formData.confirmPassword)) {
            setConfirmPasswordError({...confirmPasswordError, [`invalid`] : true})
        } else if (!isFieldMatch(formData.password, formData.confirmPassword)){
            setConfirmPasswordError({...confirmPasswordError, [`mismatch`] : true})
        }
    }


    const allowSubmission = () : boolean => {
        if(firstNameError){
            console.log("fname")
            return false;
        }
        else if(lastNameError){
            console.log("lname");
            return false;
        }
        else if(emailError.empty || emailError.invalid || emailError.mismatch){
            console.log("e")
            return false;
        }
        else if(confirmEmailError.empty || confirmEmailError.invalid || confirmEmailError.mismatch){
            console.log("ce")
            return false;}
        else if(passwordError.empty || passwordError.invalid || passwordError.mismatch){
            console.log("p")
            return false;
        }
        else if(confirmPasswordError.empty || confirmPasswordError.invalid || confirmPasswordError.mismatch){
            console.log("confirmP")
            return false;
        }
        else if(formData.roles === t('userTypes.tourist') || formData.roles === t('userTypes.host') || formData.roles === (t('userTypes.both'))){
            console.log("user")
            return false;
        }
        setSubmissionError(false);
        console.log("no errors")
        return true;
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        console.log(emailError)
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
                roles : formData.roles
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
            {(!passwordError.empty && !passwordError.invalid) ? <br /> : <span>{passwordError.empty ? `Password cannot be empty` : `Invalid Password`}</span> }
            <input
                type="password"
                id="password"
                name="password"
                placeholder= {t('password')}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlurPassword}
            />
            {(!confirmPasswordError.empty && !confirmPasswordError.invalid && !confirmPasswordError.mismatch)  
            ? <br /> 
            : <span>
                {confirmPasswordError.empty ? `Password cannot be empty` : 
                confirmPasswordError.invalid ? `Password is invalid`: `Password mismatch`}
            </span>}
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder= {t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlurConfirmPassword}
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
            <h3 id={style.message}>Already have an account? <Link href="/login">Sign in</Link></h3>
            {postSuccess && <OTPModal/>}
        </div>
        </div>
    );
}




export default Signup;
