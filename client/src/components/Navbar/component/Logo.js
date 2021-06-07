import React from 'react';
import { useHistory } from 'react-router-dom';
import SFCINEMA from '../image/SFCINEMA.png';

const Logo = () => {
   const history = useHistory();

   return (
      <img
         className="nav-list-logo"
         src={SFCINEMA}
         onClick={() => history.push('/')}
      />
   );
};

export default Logo;
