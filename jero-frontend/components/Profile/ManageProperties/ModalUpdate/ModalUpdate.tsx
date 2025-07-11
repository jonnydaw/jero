'use client'
import { Link } from '@/i18n/routing';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import updateStyle from "./updateModalStyle.module.css"
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
function ModalUpdate(props : Props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
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
      <button className={`basicButton`}onClick={openModal}>{t('update')}</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >        
      <div id={updateStyle.container}>
        <h1>{t('what')}</h1>
        <div id={updateStyle.links}>
        <Link  href={`/profile/update-property/images/${props.propertyId}`}>{t('images')}</Link>
        <Link  href={`/profile/update-property/guests-and-pricing/${props.propertyId}`}>{t('guestsAndPricing')}</Link>
        <Link  href={`/profile/update-property/amenities/${props.propertyId}`}>{t('amenities')}</Link>
        <Link  href={`/profile/update-property/descriptions/${props.propertyId}`}>{t('descriptions')}</Link>
        </div>

        <button className='basicButton' style={{marginTop : "1em"}} onClick={closeModal}>{t('close')}</button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdate;