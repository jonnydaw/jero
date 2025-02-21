'use client'
import { useState } from "react";
import style from "./Otp.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";


const Otp = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<string>("");

    const handleChange = (e : any) => {
        const { _, value} = e.target;
        setFormData(value);
       
}


  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/otp', {
       otpPassword : Number(formData),
      },
          { withCredentials: true}
      );
      router.push('profile');


      console.log(response);
  } catch (error : any) {
      console.log(formData)
      console.log('OTP verification failed:', error.response ? error.response.data : error.message);
}
  }

    return (
        <div id={style.componentContainer}>
            <div id={style.formContainer}>
            <h2>Please enter the 5 digit code we sent from "email". This code will expire after 15 minutes.</h2>
            <form 
                onSubmit={handleSubmit} 
                id ={style.form}
                >
                <input id={style.otpInput} onChange={handleChange} type="text" />
                <button className={`${style.submit} ${style.button}`}>Submit</button>
            </form>
            <button className={`${style.resend} ${style.button}`}>Didn't receive an email? Click here to resend</button>
            </div>
        </div>
    )
}

export default Otp;