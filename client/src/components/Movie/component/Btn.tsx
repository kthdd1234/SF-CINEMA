import React from 'react';
import { Button } from 'antd';

interface IBtn {
   className: string;
   icon: any;
   onClick: (event: React.MouseEvent<HTMLElement>) => void;
   value: string;
}

const Btn = ({ className, icon, onClick, value }: IBtn) => {
   const setValue = value === '예고편 보기';

   return (
      <Button
         className={className}
         danger={setValue ? true : false}
         type={setValue ? 'primary': 'ghost'}
         icon={icon}
         onClick={onClick}
      >
         {value}
      </Button>
   );
};

export default Btn;
