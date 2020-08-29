import React from 'react';
import './ModalPage.css';

function ModalImage({ img, alt }) {
   return (
      <div>
         <div className="modal-image-box">
            <img className="modal-image" src={img} alt={`img${alt}`} />
         </div>
      </div>
   );
}

export default ModalImage;
