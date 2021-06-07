import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { requestSignUp, requestBackground } from '../../../requests';
import BackDrop from '../component/BackDrop';
import FormBtn from '../component/FormBtn';
import FormItem from '../component/FormItem';
import FormSub from '../component/FormSub';
import '../Auth.css';

const SignUp = ({ history }) => {
   const [backDrop, setBackDrop] = useState([]);
   const [id, setId] = useState('');
   const [password, setPassword] = useState('');
   const [comfirmPw, setComfirmPw] = useState('');
   const [name, setName] = useState('');

   const formItemList = [
      ['아이디', '아이디를 입력해주세요', setId],
      ['비밀번호', '비밀번호를 입력해주세요', setPassword],
      ['비밀번호 확인', '비밀번호를 재입력해주세요', setComfirmPw],
      ['이름', '이름을 입력해주세요', setName],
   ];

   useEffect(() => {
      const req = async () => {
         const data = await requestBackground();
         setBackDrop(data[0].backgroundImg);
      };
      req();
   }, []);

   const onFinish = async () => {
      if (password !== comfirmPw) {
         return message.error('입력하신 비밀번호가 일치하지 않습니다.');
      } else {
         const result = await requestSignUp(id, password, name);
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
                     label={item[0]}
                     name={item[0]}
                     messages={item[1]}
                     onChange={({ target }) => item[2](target.value)}
                  />
               ))}

               <FormBtn value="회원가입" icon={<FormOutlined />} />
            </Form>
         </div>
      </div>
   );
};

export default withRouter(SignUp);
