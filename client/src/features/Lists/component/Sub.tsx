import React from 'react';

interface ISub {
   sub: string;
   icon: any;
}

const Sub = ({ icon, sub }: ISub) => {
   return (
      <div className="lists-head-sub">
         {icon} {sub}
      </div>
   );
};

export default Sub;
