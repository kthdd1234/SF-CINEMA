import React from 'react';
import './ModalPage.css';

function ModalImage({ img, alt }) {
   return (
      <div className="modal-img-wrap">
         <div className="modal-img-left-shadow" />
         <div className="modal-image-box">
            <img className="modal-image" src={img} alt={`img${alt}`} />
         </div>
      </div>
   );
}

export default ModalImage;
