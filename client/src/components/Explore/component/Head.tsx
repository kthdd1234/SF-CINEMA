import React from 'react';
import SelectBtn from './SelectBtn';

interface IHead {
   sub: string;
   icon: any;
   selectdBtn : boolean;
   onChangeSelect: Function;
}

const Head = ({ sub, icon, selectdBtn, onChangeSelect }: IHead) => {
   return (
      <div className="explore-head">
         <div className="explore-head-sub">
            {icon} {sub}
         </div>
         {selectdBtn ? <SelectBtn onChangeSelect={onChangeSelect} /> : null}
      </div>
   );
};

export default Head;
