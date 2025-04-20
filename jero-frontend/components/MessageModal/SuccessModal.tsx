'use client'
import { Link } from '@/i18n/routing';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import updateStyle from "./updateModalStyle.module.css"
import updateStyle from "../Profile/ManageProperties/ModalUpdate/updateModalStyle.module.css"
import { useTranslations } from 'next-intl';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor : "transparent",
    border : "none"
  },
};

// https://www.npmjs.com/package/react-modal

// // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');
interface Props {
  propertyId: string;
}
function SuccessModal() {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const t = useTranslations('PropertyUpdateModal');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >        
      <div id={updateStyle.container}>
        <h1>{"Success"}</h1>


        <button className='basicButton' style={{marginTop : "1em"}} onClick={closeModal}>{t('close')}</button>
        </div>
      </Modal>
    </div>
  );
}

export default SuccessModal;