import React from 'react';
import { useHistory } from 'react-router-dom';
import Item from './Item';

const AuthItems = () => {
   const history = useHistory();
   const auth = [
      { name: '로그인', path: '/login' },
      { name: '회원가입', path: '/signup' },
   ];

   return (
      <>
         {auth.map((obj, i) => (
            <Item
               key={i}
               name={obj.name}
               icon={null}
               onClick={() => history.push(obj.path)}
            />
         ))}
      </>
   );
};

export default AuthItems;
