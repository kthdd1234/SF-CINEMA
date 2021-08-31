import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

interface IFadeBtn {
   value?: string;
   movieId?: string;
   setTrailer?: Function;
}

const FadeBtn = ({ value, movieId, setTrailer }: IFadeBtn) => {
   const history = useHistory();
   const onClickTrailer = (trailer: Function | void) => {
      trailer ? trailer(true) : null
   };

   return (
      <Button
         className="card-btns-btn"
         type="ghost"
         onClick={() =>
            value !== '예고편 보기'
               ? history.push(`/movies/${movieId}`)
               : onClickTrailer(setTrailer)
         }
      >
         {value}
      </Button>
   );
};

export default FadeBtn;
