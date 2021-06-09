import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const FadeBtn = ({ value, movieId, handleSettingTrailer }) => {
   const history = useHistory();

   return (
      <Button
         className="card-btns-btn"
         type="ghost"
         onClick={() =>
            value !== '예고편 보기'
               ? history.push(`/movies/${movieId}`)
               : handleSettingTrailer(true)
         }
      >
         {value}
      </Button>
   );
};

export default FadeBtn;
