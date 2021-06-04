import React from 'react';
import { Form, Input } from 'antd';

const { Item } = Form;

const FormItem = ({ label, name, messages, onChange }) => {
   return (
      <Item
         label={<div className="auth-form-label">{label}</div>}
         name={name}
         rules={[
            {
               required: true,
               message: messages,
            },
         ]}
      >
         <Input onChange={onChange} />
      </Item>
   );
};

export default FormItem;
