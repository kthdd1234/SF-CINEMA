import React from 'react';
import Sub from './Sub';
import ShowAllBtn from './ShowAllBtn';

interface IHead {
   path: string;
   sub: string;
   icon: any;
}

const Head = ({ icon, sub, path }: IHead) => {   
   return (
      <div className="lists-head">
         <Sub icon={icon} sub={sub} />
         <ShowAllBtn path={path} />
      </div>
   );
};

export default Head;
