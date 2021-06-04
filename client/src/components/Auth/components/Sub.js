import React from 'react';

const Sub = ({ username, sub }) => {
   return (
      <div className="auth-profile-sub">{`${
         username ? username : ''
      }님이 ${sub} 작품`}</div>
   );
};

export default Sub;
