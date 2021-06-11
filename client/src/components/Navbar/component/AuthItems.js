import React from 'react';
import { useHistory } from 'react-router-dom';
import Item from './Item';

const AuthItems = () => {
   const history = useHistory();
   const auth = [
      ['로그인', '/login'],
      ['회원가입', '/signup'],
   ];

   return (
      <>
         {auth.map((item, i) => (
            <Item
               key={i}
               name={item[0]}
               icon={null}
               onClick={() => history.push(item[1])}
            />
         ))}
      </>
   );
};

export default AuthItems;
