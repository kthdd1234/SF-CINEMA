import React from 'react';
import { useHistory } from 'react-router-dom';

const HomeItem = ({ icon, value }) => {
   const history = useHistory();

   return (
      <div className="nav-list-item" onClick={() => history.push('/')}>
         <span className="nav-icon">{icon}</span>
         <span>{value}</span>
      </div>
   );
};

export default HomeItem;
