import React from 'react';
import { Form, Input } from 'antd';

interface IFormItem {
   label: string;
   name: string;
   messages: string;
   onChange: Function;
}

const { Item } = Form;

const FormItem = ({ label, name, messages, onChange }: IFormItem) => {
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
         <Input onChange={({ target }) => onChange(target.value)} />
      </Item>
   );
};
//
export default FormItem;
