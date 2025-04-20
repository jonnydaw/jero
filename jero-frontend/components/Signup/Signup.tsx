// components/Form.js
'use client'
import style from "./Signup.module.css"

import React, { useRef, useState } from "react";
import axios from "axios"
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { DateTime } from "luxon"
import {isFieldMatch, isValidEmail, isValidPassword} from "./SignupErrors"
import { useRouter } from "next/navigation";
import { inDevEnvironment } from "@/base";


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
    firstName : string | null;
    lastName: string | null;
    email : string| null;
    confirmEmail : string| null;
    dob: string| null;
    password : string| null;
    confirmPassword : string | null;
    roles : string | null;
}



const Signup = () => {
    const t = useTranslations('Signup');
    
    const [postSuccess, setPostSuccess] = useState<boolean>(false);
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    
    const eighteenYearsAgo = DateTime.now().minus({years: 18}).toISODate()
    console.log(eighteenYearsAgo)
    

    const [formErrors, setFormErrors] = useState<FormErrors>({
        firstName :  null,
        lastName: null,
        email : null,
        confirmEmail :  null,
        dob: null,
        password : null,
        confirmPassword :  null,
        roles : null,
    }
    );

    const permitSubmission = useRef<boolean | null>(null);
    
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

    const handleChange = (e : any) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // const validateEmptyHelper = (field: string, value : string, errorArr : st) => {
    //     if
    // }

    const  validate = async () => {
        const errors: FormErrors = {
            firstName: null,
            lastName: null,
            email: null,
            confirmEmail: null,
            dob: null,
            password: null,
            confirmPassword: null,
            roles: null
        }
        
        if(formData.firstName.trim().length === 0){
            errors.firstName = t('emptyFirstName')

        }

        if(formData.lastName.trim().length === 0){
            // https://stackoverflow.com/questions/60444100/how-to-update-multiple-state-at-once-using-react-hook-react-js
            errors.lastName = t('emptyLastName') 

        }

        const emailErrors: string[] = [];
        const confirmEmailErrors: string[] = []

        if(formData.email.trim().length === 0){
            emailErrors.push(t('emptyEmail'));

        }

        if(!isValidEmail(formData.email)){
            emailErrors.push(t('invalidEmail'));

        }

        if(formData.confirmEmail.trim().length === 0){
            confirmEmailErrors.push(t('emptyConfirmEmail'));

        }

        if(!isValidEmail(formData.confirmEmail)){
            confirmEmailErrors.push(t('invalidConfirmEmail'));
        }

        if(formData.email !== formData.confirmEmail){
            confirmEmailErrors.push(t('emailMismatch'));
            emailErrors.push(t('emailMismatch'));
        }


        if(emailErrors.length > 0){
            errors.email = emailErrors.join(", ")

        }

        if(confirmEmailErrors.length > 0){
            errors.confirmEmail = confirmEmailErrors.join(", ")

        }


        const passwordErrors: string[] = []
        const confirmPasswordErrors : string[] = []
        if(formData.password.trim().length === 0){
            passwordErrors.push(t('emptyPassword'));

        }

        if(!isValidPassword(formData.password)){
            passwordErrors.push(t('invalidPassword'));

        }

        if(formData.confirmPassword.trim().length === 0){
            confirmPasswordErrors.push(t('emptyConfirmPassword'));

        }

        if(!isValidPassword(formData.confirmPassword)){
            confirmPasswordErrors.push(t('invalidConfirmPassword'));

        }

        if(formData.confirmPassword !== formData.password){
            confirmPasswordErrors.push(t('passwordMismatch'));
            passwordErrors.push(t('passwordMismatch'));
        }

        if(passwordErrors.length > 0){
            errors.password = passwordErrors.join(", ");

        }

        if(confirmPasswordErrors.length > 0){
            errors.confirmPassword = confirmPasswordErrors.join(", ");
        }

        if(formData.roles.trim().length === 0){
            errors.roles = t('emptyRoles')
        }

        const dateErrors: string[] = [];
        if(formData.dob.trim().length === 0 ){
            dateErrors.push(t('emptyDob'))
        }

        if(formData.dob.trim().length > 0){
            console.log("hitdob")
            const dt = DateTime.fromISO(formData.dob).diff(DateTime.fromISO(eighteenYearsAgo)).milliseconds
            if(dt > 0){
                dateErrors.push(t('tooYoung'))
            }
        }

        if(dateErrors.length > 0){
            errors.dob = dateErrors.join(", ");
        }
        setFormErrors(errors)
        console.log(errors.dob)
        let nonNullKeys = Object.keys(errors).filter(key => errors[key as keyof FormErrors] === null);
        console.log("nonnull " + nonNullKeys)
        console.log((errors))
        if(nonNullKeys.length !== Object.keys(errors).length){
            console.log("hit nonnull")
            permitSubmission.current = false;
        }else{
            permitSubmission.current = true;
        }

    }



    const router = useRouter()


    // const allowSubmission = () : boolean => {
    //     console.log(formErrors)
    //     console.log(formErrors === null)
    //     return formErrors.firstName !== null
    // }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
         await validate();
        console.log(permitSubmission)
        if(permitSubmission.current){
        try {
            const response = await axios.post(`${baseApi}/auth/signup`, {
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
            router.push("otp");
            console.log(response.data);
        } catch (error : any) {
            console.log(formData)
            const msg = error.response ? error.response.data : error.message;
            alert('Signup failed: '+ JSON.stringify(msg.message));
    }}
    else{
        
    }
    }

    return (
        <div id={style.container}>
        <div>
        <form noValidate onSubmit={handleSubmit} id={style.form}>
            <h2 style={{fontSize: "larger"}}>{t('fillOut')}</h2>


            <div className={style.inputArea}>
            <div className={style.labelAndError}>
                <label htmlFor="firstName">{t('firstName')}</label>
                {formErrors.firstName ? <span className={style.errorMessage}> {formErrors.firstName }</span> : <br/>}
            </div>

            <input
                required
                aria-required="true"
                aria-invalid={formErrors.firstName ? true : false}
                type="text"
                id="firstName"
                name="firstName"
                placeholder= {t('firstName')}
                value={formData.firstName}
                onChange={handleChange}

            />
            </div>

            <div className={style.inputArea}>
            <div className={style.labelAndError}>
                <label htmlFor="lastName">{t('lastName')}</label>
                {formErrors.lastName ? <span className={style.errorMessage}> {formErrors.lastName }</span> : <br/>}
            </div>
            <input
                required
                aria-required="true"
                type="text"
                id="lastName"
                name="lastName"
                placeholder= {t('lastName')}
                value={formData.lastName}
                onChange={handleChange}
            />
            </div>

            <div className={style.inputArea}>
                
            <div className={style.labelAndError}>
                <label htmlFor="dob">{t('dob')}</label>
                {formErrors.dob ? <span className={style.errorMessage}> {formErrors.dob }</span> : <br/>}
            </div>
                <input
                    required
                    aria-required="true"
                    type="date"
                    id="dob"
                    name="dob"
                    max={eighteenYearsAgo}
                    value={formData.dob}
                    onChange={handleChange}
                />

            </div>

            <div className={style.inputArea}>
            <div className={style.labelAndError}>
                <label htmlFor="email">{t('email')}</label>
                {formErrors.email ? <span className={style.errorMessage}> {formErrors.email }</span> : <br/>}
            </div>
            <input
                required
                aria-required="true"
                type="email"
                id="email"
                name="email"
                placeholder= {t('email')}
                value={formData.email}
                onChange={handleChange}
            />
            </div>
            
            <div className={style.inputArea}>
            <div className={style.labelAndError}>
                <label htmlFor="confirmEmail">{t('confirmEmail')}</label>
                {formErrors.confirmEmail ? <span className={style.errorMessage}> {formErrors.confirmEmail }</span> : <br/>}
            </div>
                <input
                    required
                    aria-required="true"
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    placeholder= {t('confirmEmail')}
                    value={formData.confirmEmail}
                    onChange={handleChange}
                />
            </div>


            <div className={style.inputArea}>
                
            <div className={style.labelAndError}>
                <label htmlFor="password">{t('password')}</label>
                {formErrors.password ? <span className={style.errorMessage}> {formErrors.password }</span> : <br/>}
            </div>
            <input
                aria-required="true"
                required
                type="password"
                id="password"
                minLength={8}
                name="password"
                placeholder= {t('password')}
                value={formData.password}
                onChange={handleChange}
            />
            </div>

            <div className={style.inputArea}>
            
            <div className={style.labelAndError}>
                <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                {formErrors.confirmPassword ? <span className={style.errorMessage}> {formErrors.confirmPassword }</span> : <br/>}
            </div>
                <input
                    required
                    aria-required="true"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    minLength={8}
                    placeholder= {t('confirmPassword')}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>

            <div className={style.inputArea}>
            
            <div className={style.labelAndError}>
                <label htmlFor={style.roles}>{t('userTypes.placeholder')}</label>
                {formErrors.roles ? <span className={style.errorMessage}> {formErrors.roles }</span> : <br/>}
            </div>
            <select name="roles"
                required
                aria-required="true"
                id={style.roles}
                value={formData.roles}
                onChange={handleChange}
                >
                <option value="" disabled hidden>
                    {t('userTypes.placeholder')}
                </option>
                <option value="customer">{t('userTypes.tourist')}</option>
                <option value="host">{t('userTypes.host')}</option>
            </select>
            </div>

            <button className="basicButton" id={style.button} type="submit">
            {t('signup')}
            </button>
        </form>
     
            <h3 id={style.message}>{t('already')} <Link href="/login">{t('login')}</Link></h3>
        </div>
        </div>
    );
}




export default Signup;
