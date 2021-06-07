import React from 'react';
import SelectBtn from './SelectBtn';

const Head = ({ sub, icon, selectdBtn, onChangeSelect }) => {
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
