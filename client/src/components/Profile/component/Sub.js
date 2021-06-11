import React from 'react';

const Sub = ({ username, sub }) => {
   return (
      <div className="profile-head-sub">{`${
         username ? username : ''
      }님이 ${sub} 작품`}</div>
   );
};

export default Sub;
