import React from 'react';
import { Button } from 'antd';

const Btn = ({ className, icon, onClick, value }) => {
   const setting = value === '예고편 보기';

   return (
      <Button
         className={className}
         icon={icon}
         type={setting ? 'danger' : 'ghost'}
         onClick={onClick}
      >
         {value}
      </Button>
   );
};

export default Btn;
