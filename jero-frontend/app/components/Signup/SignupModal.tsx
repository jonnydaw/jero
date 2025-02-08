'use client'
import React, { useState } from 'react'
import Modal from 'react-modal';
import style from "./otp.module.css"



const OTPModal = () => {

    const [modalIsOpen, setIsOpen] = useState<boolean>(true);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          height: "20em",
          width: "40em"
        },
      };

    function openModal() {
      setIsOpen(true);
    }
  

    function closeModal() {
      setIsOpen(false);
    }
    return(
        <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
          ariaHideApp={false}
          style={customStyles}
        >
        <div id={style.otpContainer}>
            <h3 id={style.title}>Please check your email and enter the code we sent.</h3>
          <form>
            <label htmlFor=""></label>
            <input type="text" id={style.otpInput} autoComplete="one-time-code"
  inputMode="numeric"
  maxLength={6}
  pattern="\d{6}" />
          </form>
          </div>
        </Modal>
      </div>
    )
}

export default OTPModal;