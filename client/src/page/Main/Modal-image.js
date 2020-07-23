import React from 'react';

function ModalImage({ img, i }) {
   return (
      <div>
         <div className="image-box">
            <img src={img} alt={`img${i}`} />
         </div>
      </div>
   );
}

export default ModalImage;
