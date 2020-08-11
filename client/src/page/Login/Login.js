import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message, Divider } from 'antd';
import { LoginOutlined, FormOutlined, GoogleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import './Login.css';
import Kakao from './kakao';
import dotenv from 'dotenv';
dotenv.config();

const layout = {
   labelCol: {
      span: 5,
   },
   wrapperCol: {
      span: 16,
   },
};
const tailLayout = {
   wrapperCol: {
      offset: 5,
      span: 16,
   },
};

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/user',
});

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: '',
         password: '',
      };
   }
   handleCheckLogin = () => {
      const { loginID, password } = this.state;
      const { handleLoginChange, handleProfileUpdate } = this.props;
      serverUrl
         .post('/login', {
            loginID: loginID,
            password: password,
         })
         .then(({ data }) => {
            if (data === '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.') {
               return message.error(data);
            }
            const { accessToken } = data;
            reactLocalStorage.set('SFCinemaUserToken', accessToken);
            serverUrl
               .get('/profile', {
                  headers: {
                     Authorization: 'Bearer ' + accessToken,
                  },
               })
               .then(({ data }) => {
                  console.log(data);
                  handleLoginChange();
                  handleProfileUpdate(data);
                  message.success('로그인 성공!');
                  this.handleMoveMainCinemaPage();
               });
         });
   };
   successResponseGoogle = (response) => {
      const { email, name, imageUrl } = response.profileObj;
      console.log(imageUrl);
      this.setState({
         loginID: email,
         password: '',
      });
      serverUrl
         .post('/signup', {
            loginID: email,
            password: '',
            username: name,
            profileImg: imageUrl,
            provider: 'GoogleLogin',
         })
         .then(({ data }) => {
            this.handleCheckLogin();
         });
   };

   failureResponseGoogle = (response) => {
      console.log('구글 로그인 실패', response);
      return message.error('구글 로그인에 실패하였습니다.');
   };

   successResponseKakao = (response) => {
      console.log('카카오 로그인 성공', response.profile);
      const { kakao_account, properties } = response.profile;
      const email = kakao_account.email;
      const username = properties.nickname;
      const profile_image = properties.profile_image;
      this.setState({
         loginID: email,
         password: '',
      });
      serverUrl
         .post('/signup', {
            loginID: email,
            password: '',
            username: username,
            profileImg: profile_image,
            provider: 'KakaoLogin',
         })
         .then(({ data }) => {
            this.handleCheckLogin();
         });
   };

   failureResponseGoogle = (response) => {
      console.log('카카오 로그인 실패', response);
      return message.error('카카오 로그인에 실패하였습니다.');
   };

   handleMoveMainCinemaPage = () => {
      this.props.history.push('/');
   };

   handleMoveSignUpPage = () => {
      this.props.history.push('/signup');
   };

   handleInputValue = (key) => (e) => {
      this.setState({ [key]: e.target.value });
   };

   render() {
      return (
         <div
            style={{
               margin: '2vw 25vw 0 25vw',
               padding: '3vw 12vw 0 12vw',
            }}
         >
            <div
               style={{
                  padding: '0 0 1vw 0',
               }}
            >
               <strong
                  style={{
                     padding: '5.4vw',
                     fontSize: '2.5vw',
                  }}
               >
                  Login
               </strong>
            </div>

            <Form
               {...layout}
               name="basic"
               initialValues={{
                  remember: true,
               }}
               onFinish={this.handleCheckLogin}
               size="large"
            >
               <Form.Item
                  label="아이디"
                  name="아이디"
                  rules={[
                     {
                        required: true,
                        message: '아이디를 입력해주세요',
                     },
                  ]}
               >
                  <Input onChange={this.handleInputValue('loginID')} />
               </Form.Item>

               <Form.Item
                  label="비밀번호"
                  name="비밀번호"
                  rules={[
                     {
                        required: true,
                        message: '비밀번호를 입력해주세요',
                     },
                  ]}
               >
                  <Input.Password
                     onChange={this.handleInputValue('password')}
                  />
               </Form.Item>

               <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
               >
                  <Checkbox>로그인 상태 유지하기</Checkbox>
               </Form.Item>

               <Form.Item {...tailLayout}>
                  <Button
                     type="primary"
                     htmlType="submit"
                     icon={<LoginOutlined />}
                     style={{
                        width: '17.3vw',
                     }}
                  >
                     로그인
                  </Button>
               </Form.Item>
               <Form.Item {...tailLayout}>
                  <Button
                     type="primary"
                     icon={<FormOutlined />}
                     style={{
                        width: '17.3vw',
                     }}
                     onClick={this.handleMoveSignUpPage}
                  >
                     회원가입
                  </Button>
               </Form.Item>
               <Divider
                  orientation="center"
                  plain
                  style={{
                     fontStyle: 'bored',
                     marginLeft: '23px',
                  }}
               >
                  <span className="dividerLogin">소셜 계정으로 로그인</span>
               </Divider>
               <Form.Item {...tailLayout}>
                  <GoogleLogin
                     clientId={process.env.REACT_APP_Google}
                     onSuccess={this.successResponseGoogle}
                     onFailure={this.failureResponseGoogle}
                     cookiePolicy={'single_host_origin'}
                     render={(renderProps) => (
                        <Button
                           type="primary"
                           style={{
                              width: '17.3vw',
                              borderColor: 'red',
                              color: 'red',
                              borderRadius: '4px',
                           }}
                           icon={<GoogleOutlined />}
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                           ghost={true}
                        >
                           구글 로그인
                        </Button>
                     )}
                  />
               </Form.Item>
               <Form.Item {...tailLayout}>
                  <KakaoLogin
                     jsKey={process.env.REACT_APP_KAKAO_API}
                     onSuccess={this.successResponseKakao}
                     onFailure={this.failureResponseGoogle}
                     getProfile={true}
                     className="kakao-login"
                     render={(props) => (
                        <Button
                           type="primary"
                           style={{
                              width: '17.3vw',
                              borderColor: 'rgb(205, 195, 58)',
                              color: 'rgb(205, 195, 58)',
                              borderRadius: '4px',
                           }}
                           icon={<Kakao />}
                           onClick={props.onClick}
                           disabled={props.disabled}
                           ghost={true}
                           className="kakaoButton"
                        >
                           카카오 로그인
                        </Button>
                     )}
                  ></KakaoLogin>
               </Form.Item>
            </Form>
         </div>
      );
   }
}

export default withRouter(Login);
function newFunction() {
   const dotenv = require('dotenv');
   dotenv.config();
   return dotenv;
}
