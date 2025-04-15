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
            errors.firstName = "first name should not be empty"

        }

        if(formData.lastName.trim().length === 0){
            // https://stackoverflow.com/questions/60444100/how-to-update-multiple-state-at-once-using-react-hook-react-js
            errors.lastName = "last name should not be empty" 

        }

        const emailErrors: string[] = [];
        const confirmEmailErrors: string[] = []

        if(formData.email.trim().length === 0){
            emailErrors.push("email cannot be empty");

        }

        if(!isValidEmail(formData.email)){
            emailErrors.push("invalid email");

        }

        if(formData.confirmEmail.trim().length === 0){
            confirmEmailErrors.push("confirm email cannot be empty");

        }

        if(!isValidEmail(formData.confirmEmail)){
            confirmEmailErrors.push("confirm email is not valid");
        }

        if(formData.email !== formData.confirmEmail){
            confirmEmailErrors.push("emails do not match");
            emailErrors.push("emails do not match");
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
            passwordErrors.push("password cannot be empty");

        }

        if(!isValidPassword(formData.password)){
            passwordErrors.push("password is not valid");

        }

        if(formData.confirmPassword.trim().length === 0){
            confirmPasswordErrors.push("confirm password cannot be empty");

        }

        if(!isValidPassword(formData.confirmPassword)){
            confirmPasswordErrors.push("confirm password is not valid");

        }

        if(formData.confirmPassword !== formData.password){
            confirmPasswordErrors.push("passwords do not match");
            passwordErrors.push("passwords do not match");
        }

        if(passwordErrors.length > 0){
            errors.password = passwordErrors.join(", ");

        }

        if(confirmPasswordErrors.length > 0){
            errors.confirmPassword = confirmPasswordErrors.join(", ");
        }

        if(formData.roles.trim().length === 0){
            errors.roles = "Please select an option from below"
        }

        const dateErrors: string[] = [];
        if(formData.dob.trim().length === 0 ){
            dateErrors.push("Please enter a date of birth")
        }

        if(formData.dob.trim().length > 0){
            console.log("hitdob")
            const dt = DateTime.fromISO(formData.dob).diff(DateTime.fromISO(eighteenYearsAgo)).milliseconds
            if(dt > 0){
                dateErrors.push("you must be 18 or over to register")
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
            console.log('Signup failed:', error.response ? error.response.data : error.message);
    }}
    else{
        
    }
    }

    return (
        <div id={style.container}>
        <div>
        <form noValidate onSubmit={handleSubmit} id={style.form}>
            <h2 style={{fontSize: "larger"}}>Please fill out all fields below.</h2>


            <div className={style.inputArea}>
            <div className={style.labelAndError}>
                <label htmlFor="firstName">firstName</label>
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
                <label htmlFor="lastName">firstName</label>
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
                <label htmlFor="dob">firstName</label>
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
                <label htmlFor="email">firstName</label>
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
                <label htmlFor="confirmEmail">confirm email</label>
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
                <label htmlFor="password">password</label>
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
                <label htmlFor="confirmPassword">confirmpassword</label>
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
                <label htmlFor={style.roles}>Roles</label>
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
                Signup
            </button>
        </form>
     
            <h3 id={style.message}>Already have an account? <Link href="/login">Sign in</Link></h3>
        </div>
        </div>
    );
}




export default Signup;
