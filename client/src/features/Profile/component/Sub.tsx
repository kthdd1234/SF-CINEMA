import React from 'react';

interface ISub {
   username: string;
   sub: string;
}

const Sub = ({ username, sub }: ISub) => {
   return (
      <div className="profile-head-sub">{`${
         username ? username : ''
      }님이 ${sub} 작품`}</div>
   );
};

export default Sub;
