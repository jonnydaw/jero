'use client'
import { useState } from "react";
import style from "./Otp.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import { useTranslations } from "next-intl";


const Otp = () => {
    const base = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    const t = useTranslations('Otp');
    const router = useRouter();

    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";

    const [formData, setFormData] = useState<string>("");

    const handleChange = (e : any) => {
        const { _, value} = e.target;
        setFormData(value);
       
}

const handleRegen = async (e : any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/auth/regenerate_otp`, {},
          { withCredentials: true}
      );

      console.log(response);
      alert("resent")
  } catch (error : any) {
      console.log(formData)
      console.log('OTP verification failed:', error.response ? error.response.data : error.message);
}
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/auth/verify_otp`, {
       otpPassword : Number(formData),
      },
          { withCredentials: true}
      );
      router.push('profile');


      console.log(response);
  } catch (error : any) {
    const msg =  error.response ? error.response.data : error.message;
        alert('OTP verification failed: ' + msg.message)
      console.log(formData)
      console.log('OTP verification failed:', error.response ? error.response.data : error.message);
}
  }

    return (
        <div id={style.componentContainer}>
            <div id={style.formContainer}>
            <h2>{t('prompt')}</h2>
            <form 
                onSubmit={handleSubmit} 
                id ={style.form}
                >
                <input id={style.otpInput} onChange={handleChange} type="text" required aria-required />
                <button className={`${style.submit} ${style.button}`}>{t('send')}</button>
            </form>
            <button style={{textDecoration: "underline"}} onClick={handleRegen}className={`${style.resend} ${style.button}`}>{t('resend')}</button>
            </div>
        </div>
    )
}

export default Otp;