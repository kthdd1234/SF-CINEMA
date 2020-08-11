import React from 'react';

function ModalImage({ img, alt }) {
   return (
      <div>
         <div className="image-box">
            <img src={img} alt={`img${alt}`} />
         </div>
      </div>
   );
}

export default ModalImage;
