import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ProfileCard from '../../ManageProfile/ProfileCard';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor : "transparent",
    border : "none",

    
  },
};

// // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

function ModalFunc() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
      <button className={`basicButton`}onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"

      >        
      <div style={{width : "100%", display : 'flex', flexDirection : "column", justifyContent : "center", alignItems : "center", alignSelf : "center"
}}>
        <ProfileCard firstName={''} lastName={''} introduction={''} imgLink={''}/>
        <button className='basicButton' onClick={closeModal}>close</button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalFunc;