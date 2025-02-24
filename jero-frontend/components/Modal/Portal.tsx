import { useState } from 'react';
import { createPortal } from 'react-dom';

interface Props{
    origin: string
    data : string
}

const Portal : React.FC<Props> = ({origin, data}) => {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <p>{origin}</p>,
        document.body
      )}
    </>
  );
}

export default Portal