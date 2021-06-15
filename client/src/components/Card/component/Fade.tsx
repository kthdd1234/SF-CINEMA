import React from 'react';
import FadeBtn from './FadeBtn';

interface IFade {
   movieId: string;
   setTrailer: Function
}

const Fade = ({ movieId, setTrailer }: IFade) => {
   return (
      <div className="card-fade card-fade-show">
         <div className="card-btns">
            <FadeBtn value="영화상세정보" movieId={movieId} />
            <FadeBtn
               value="예고편 보기"
               setTrailer={setTrailer}
            />
         </div>
      </div>
   );
};

export default Fade;
