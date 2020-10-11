import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message, Divider } from 'antd';
import {
   LoginOutlined,
   FormOutlined,
   GoogleOutlined,
   MessageFilled,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import dotenv from 'dotenv';
import './Login.css';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/`,
});

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: '',
         password: '',
         background: '',
      };
   }

   componentDidMount = () => {
      serverUrl.get('main/background').then(({ data }) => {
         this.setState({
            background: data[0].backgroundImg,
         });
      });
      console.log(this.props.background);
   };

   handleCheckLogin = () => {
      const { loginID, password } = this.state;

      serverUrl
         .post('user/login', {
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
               .get('user/profile', {
                  headers: {
                     Authorization: 'Bearer ' + accessToken,
                  },
               })
               .then(({ data }) => {
                  this.props.handleLoginChange(true);
                  this.props.handleProfileUpdate(data);
                  this.props.history.push('/');
                  message.success('로그인 성공!');
               });
         });
   };
   successResponseGoogle = (response) => {
      const { email, name, imageUrl } = response.profileObj;

      this.setState({
         loginID: email,
         password: '',
      });
      serverUrl
         .post('user/signup', {
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
         .post('user/signup', {
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

   handleInputValue = (key) => (e) => {
      this.setState({ [key]: e.target.value });
   };

   render() {
      return (
         <div>
            <div className="login-container">
               <div className="box-background-image">
                  <div className="login-content">
                     <div className="login-wrap">
                        <div className="login-box-text">
                           <strong className="login-text">Login</strong>
                        </div>

                        <Form
                           layout="vertical"
                           name="basic"
                           initialValues={{
                              remember: true,
                           }}
                           onFinish={this.handleCheckLogin}
                           size="large"
                        >
                           <Form.Item
                              label={
                                 <strong className="login-userid">
                                    아이디
                                 </strong>
                              }
                              name="아이디"
                              rules={[
                                 {
                                    required: true,
                                    message: '아이디를 입력해주세요',
                                 },
                              ]}
                           >
                              <Input
                                 onChange={this.handleInputValue('loginID')}
                              />
                           </Form.Item>

                           <Form.Item
                              label={
                                 <strong className="login-password">
                                    비밀번호
                                 </strong>
                              }
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

                           <Form.Item name="remember" valuePropName="checked">
                              <Checkbox className="login-checkbox">
                                 <span className="login-checkbox-text">
                                    로그인 상태 유지하기
                                 </span>
                              </Checkbox>
                           </Form.Item>

                           <Form.Item>
                              <Button
                                 type="primary"
                                 htmlType="submit"
                                 icon={<LoginOutlined />}
                                 className="btn-login"
                              >
                                 로그인
                              </Button>
                           </Form.Item>
                           <Form.Item>
                              <Button
                                 type="primary"
                                 icon={<FormOutlined />}
                                 className="btn-signup"
                                 onClick={() =>
                                    this.props.history.push('/signUp')
                                 }
                              >
                                 회원가입
                              </Button>
                           </Form.Item>
                           <Divider orientation="center">
                              <span className="dividerLogin">
                                 소셜 계정으로 로그인
                              </span>
                           </Divider>
                           <Form.Item>
                              <GoogleLogin
                                 clientId={process.env.REACT_APP_Google}
                                 onSuccess={this.successResponseGoogle}
                                 onFailure={this.failureResponseGoogle}
                                 cookiePolicy={'single_host_origin'}
                                 render={(renderProps) => (
                                    <Button
                                       type="link"
                                       className="btn-google-login"
                                       style={{
                                          width: '100%',
                                          background: 'red',
                                          borderColor: 'red',
                                          color: 'rgb(255, 255, 255)',
                                          borderRadius: '4px',
                                       }}
                                       icon={<GoogleOutlined />}
                                       onClick={renderProps.onClick}
                                       disabled={renderProps.disabled}
                                    >
                                       구글 로그인
                                    </Button>
                                 )}
                              />
                           </Form.Item>
                           <Form.Item>
                              <KakaoLogin
                                 jsKey={process.env.REACT_APP_KAKAO_API}
                                 onSuccess={this.successResponseKakao}
                                 onFailure={this.failureResponseGoogle}
                                 getProfile={true}
                                 render={(props) => (
                                    <Button
                                       type="link"
                                       style={{
                                          width: '100%',
                                          borderColor: 'rgb(205, 195, 58)',
                                          color: 'rgb(176, 135, 135)',
                                          borderRadius: '4px',
                                          background: 'yellow',
                                       }}
                                       icon={<MessageFilled />}
                                       onClick={props.onClick}
                                       disabled={props.disabled}
                                    >
                                       카카오 로그인
                                    </Button>
                                 )}
                              ></KakaoLogin>
                           </Form.Item>
                        </Form>
                     </div>
                  </div>
                  <img
                     className="background-image"
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${this.state.background}`}
                  />
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(Login);
