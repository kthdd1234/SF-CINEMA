import React from 'react';
import { useHistory } from 'react-router-dom';

const AuthItems = () => {
   const history = useHistory();
   const auth = [
      ['로그인', '/login'],
      ['회원가입', '/signup'],
   ];

   return (
      <>
         {auth.map((item, i) => (
            <div
               key={i}
               className="nav-list-item"
               onClick={() => history.push(item[1])}
            >
               <span>{item[0]}</span>
            </div>
         ))}
      </>
   );
};

export default AuthItems;
