import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

interface IFadeBtn {
   value: string;
   movieId?: string;
   setTrailer?: Function;
}

const FadeBtn = ({ value, movieId, setTrailer }: IFadeBtn) => {
   const history = useHistory();

   return (
      <Button
         className="card-btns-btn"
         type="ghost"
         onClick={() =>
            value !== '예고편 보기'
               ? history.push(`/movies/${movieId}`)
               : setTrailer(true)
         }
      >
         {value}
      </Button>
   );
};

export default FadeBtn;
