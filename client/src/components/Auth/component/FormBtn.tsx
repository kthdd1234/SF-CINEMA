import React from 'react';
import { Button } from 'antd';

interface IFormBtn {
   value: string;
   icon: any
}

const FormBtn = ({ value, icon }: IFormBtn) => {
   return (
      <div>
         <Button
            className="auth-form-btn"
            type="primary"
            htmlType="submit"
            icon={icon}
            danger
         >
            {value}
         </Button>
      </div>
   );
};

export default FormBtn;
