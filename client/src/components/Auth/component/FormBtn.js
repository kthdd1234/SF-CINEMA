import React from 'react';
import { Button } from 'antd';

const FormBtn = ({ value, icon }) => {
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
