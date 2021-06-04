import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import {
   requestLogin,
   requestProfile,
   requestBackground,
} from '../../../requests';
import { reactLocalStorage } from 'reactjs-localstorage';
import BackDrop from '../components/BackDrop';
import FormBtn from '../components/FormBtn';
import FormItem from '../components/FormItem';
import FormSub from '../components/FormSub';
import '../Auth.css';

const Login = ({ handleLoginChange, handleProfileUpdate, history }) => {
   const [backDrop, setBackDrop] = useState([]);
   const [id, setId] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      const req = async () => {
         const data = await requestBackground();
         setBackDrop(data[0].backgroundImg);
      };
      req();
   }, []);

   const onFinish = async () => {
      const result = await requestLogin(id, password);

      if (result !== undefined) {
         const { accessToken } = result;
         reactLocalStorage.set('SFCinemaUserToken', accessToken);
         const profile = await requestProfile(accessToken);

         handleLoginChange(true);
         handleProfileUpdate(profile);

         message.success('로그인 완료!');
         history.push('/');
      }
   };

   return (
      <div className="auth">
         <BackDrop backDrop={backDrop} />
         <div style={{ height: '33rem' }} className="auth-form">
            <Form
               layout="vertical"
               name="basic"
               initialValues={{ remember: true }}
               onFinish={onFinish}
               size="large"
            >
               <FormSub value="로그인" />
               <FormItem
                  label="아이디"
                  name="아이디"
                  messages="아이디를 입력해주세요"
                  onChange={({ target }) => setId(target.value)}
               />
               <FormItem
                  label="비밀번호"
                  name="비밀번호"
                  messages="비밀번호를 입력해주세요"
                  onChange={({ target }) => setPassword(target.value)}
               />

               <FormBtn value="로그인" icon={<LoginOutlined />} />
            </Form>
         </div>
      </div>
   );
};

export default withRouter(Login);
