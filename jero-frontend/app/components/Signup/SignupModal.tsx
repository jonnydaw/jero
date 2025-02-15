'use client'
import React, { useState } from 'react'
import Modal from 'react-modal';
import style from "./otp.module.css"
import axios from 'axios';
import { useRouter } from "next/navigation";

interface Props {
  pass: string
}


const OTPModal = (props : Props) => {
    const router = useRouter()
    const [modalIsOpen, setIsOpen] = useState<boolean>(true);
    const [formData, setFormData] = useState<string>();
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          height: "20em",
          width: "40em",
          borderRadius:"1em"
        },
      };

    const openModal = () => {
      setIsOpen(true);
    }


    // const closeModal = () => {
    //   setIsOpen(false);
    // }

    const handleChange = (e : any) => {
        const { _, value} = e.target;
        setFormData(value);
       
}

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/otp', {
       otpPassword : Number(formData),
       pass : props.pass
      },
          { withCredentials: true}
      );
      setIsOpen(false);
      router.push('profile');


      console.log(response);
  } catch (error : any) {
      console.log(formData)
      console.log('OTP verification failed:', error.response ? error.response.data : error.message);
}
  }
  


    return(
        <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="OTP MODAL"
          ariaHideApp={false}
          style={customStyles}
        >
        <div id={style.otpContainer}>
            <h3 id={style.title}>Please check your email and enter the five digit code we sent.</h3>
          <form id={style.otpForm}>
            <label htmlFor=""></label>
            <input type="text" id={style.otpInput} autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={5}
              pattern="\d{5}"
              onChange={handleChange} />
              <button onClick={handleSubmit}>Submit</button>
          </form>
          </div>
        </Modal>
      </div>
    )
}

export default OTPModal;