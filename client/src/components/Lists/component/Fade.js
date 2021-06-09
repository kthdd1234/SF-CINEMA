import React from 'react';
import FadeBtn from './FadeBtn';

const Fade = ({ movieId, handleSettingTrailer }) => {
   return (
      <div className="card-fade fade">
         <div className="card-btns">
            <FadeBtn value="영화상세정보" movieId={movieId} />
            <FadeBtn
               value="예고편 보기"
               handleSettingTrailer={handleSettingTrailer}
            />
         </div>
      </div>
   );
};

export default Fade;
