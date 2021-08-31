import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { BackDrop, FormBtn, FormItem, FormSub } from '../Components';
import { backdrop } from '../requests/backdrop';
import { signup } from '../requests/signup';
import '../Styles/Auth.css';

const SignUp = () => {
   const [backDrop, setBackDrop] = useState('');
   const [id, setId] = useState('');
   const [password, setPassword] = useState('');
   const [comfirmPw, setComfirmPw] = useState('');
   const [name, setName] = useState('');
   const history = useHistory();

   const formItemList = [
      { label: '아이디', messages: '아이디를 입력해주세요', method: setId },
      {
         label: '비밀번호',
         messages: '비밀번호를 입력해주세요',
         method: setPassword,
      },
      {
         label: '비밀번호 확인',
         messages: '비밀번호를 재입력해주세요',
         method: setComfirmPw,
      },
      { label: '이름', messages: '이름을 입력해주세요', method: setName },
   ];

   useEffect(() => {
      const req = async () => {
         const data = await backdrop();
         setBackDrop(data[0].backDrop);
      };
      req();
   }, []);

   const onFinish = async () => {
      if (password !== comfirmPw) {
         return message.error('입력하신 비밀번호가 일치하지 않습니다.');
      } else {
         const result = await signup(id, password, name);
         if (result !== undefined) {
            message.success(`${result} 로그인해주세요.`);
            history.push('/login');
         }
      }
   };

   return (
      <div className="auth">
         <BackDrop backDrop={backDrop} />
         <div style={{ height: '47rem' }} className="auth-form">
            <Form
               layout="vertical"
               name="basic"
               initialValues={{ remember: true }}
               onFinish={onFinish}
               size="large"
            >
               <FormSub value="회원가입" />
               {formItemList.map((item, i) => (
                  <FormItem
                     key={i}
                     label={item.label}
                     name={item.label}
                     messages={item.messages}
                     onChange={item.method}
                  />
               ))}

               <FormBtn value="회원가입" icon={<FormOutlined />} />
            </Form>
         </div>
      </div>
   );
};

export default SignUp;
