import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../../app/hook';
import { setIsLogin, setProfile, loginAsync } from '../Reducer/authSlice';
import { Form, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { reactLocalStorage } from 'reactjs-localstorage';
import { BackDrop, FormBtn, FormItem, FormSub } from '../Components';
import { RootState } from '../../../app/store';
import { userProfile } from '../../Profile/request/profile';
import '../Styles/Auth.css';

const Login = () => {
   const [id, setId] = useState('');
   const [password, setPassword] = useState('');
   const history = useHistory();
   const { loginStatus } = useAppSelector((state: RootState) => state.auth);
   const dispatch = useAppDispatch();

   const onFinish = async () => {
      try {
         const resultAction = await dispatch(
            loginAsync({ loginID: id, password: password }),
         );
         const { accessToken } = unwrapResult(resultAction);
         reactLocalStorage.set('SFCinemaUserToken', accessToken);
         const profile = await userProfile(accessToken);

         dispatch(setIsLogin(true));
         dispatch(setProfile(profile));

         message.success('로그인 완료!');
         history.push('/');
      } catch (error) {}
   };

   return (
      <div className="auth">
         <BackDrop backDrop="pZvZjxPFfWWIwtPQodsNygQ6u5Z.jpg" />
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
                  onChange={setId}
               />
               <FormItem
                  label="비밀번호"
                  name="비밀번호"
                  messages="비밀번호를 입력해주세요"
                  onChange={setPassword}
               />

               <FormBtn value="로그인" icon={<LoginOutlined />} />
            </Form>
         </div>
      </div>
   );
};

export default Login;
