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
import './Login.css';
import dotenv from 'dotenv';
dotenv.config();

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 17 },
};
const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/',
});

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: '',
         password: '',
         backgroundImg: '',
      };
   }

   componentDidMount = () => {
      serverUrl.get('main/backgroundImg').then(({ data }) => {
         this.setState({
            backgroundImg: data[1][0],
         });
      });
   };

   handleCheckLogin = () => {
      const { loginID, password } = this.state;
      const { handleLoginChange, handleProfileUpdate } = this.props;
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
                  handleLoginChange();
                  handleProfileUpdate(data);
                  message.success('로그인 성공!');
                  this.handleMoveMainCinemaPage();
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

   handleMoveMainCinemaPage = () => {
      this.props.history.push('/');
   };

   handleMoveSignUpPage = () => {
      this.props.history.push('/signUp');
   };

   handleInputValue = (key) => (e) => {
      this.setState({ [key]: e.target.value });
   };

   render() {
      return (
         <div>
            <div
               style={{
                  zIndex: 1,
                  position: 'absolute',
                  margin: '5.5vw 0 0 450pt',
                  padding: '50px 150px 50px 0px',
                  background: 'rgba(0,0,0,.75)',
                  borderRadius: '10px',
               }}
            >
               <div
                  style={{
                     width: '500px',
                  }}
               >
                  <div
                     style={{
                        padding: '0 0 1vw 0',
                        margin: '10px 0 0 33%',
                     }}
                  >
                     <strong
                        style={{
                           fontSize: '50px',
                           color: 'whitesmoke',
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
                        label={
                           <strong
                              style={{
                                 color: 'white',
                              }}
                           >
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
                        <Input onChange={this.handleInputValue('loginID')} />
                     </Form.Item>

                     <Form.Item
                        label={
                           <strong
                              style={{
                                 color: 'white',
                              }}
                           >
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

                     <Form.Item
                        {...tailLayout}
                        name="remember"
                        valuePropName="checked"
                     >
                        <Checkbox
                           style={{
                              color: 'whitesomoke',
                           }}
                        >
                           로그인 상태 유지하기
                        </Checkbox>
                     </Form.Item>

                     <Form.Item {...tailLayout}>
                        <Button
                           type="primary"
                           htmlType="submit"
                           icon={<LoginOutlined />}
                           style={{
                              width: '100%',
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
                              width: '100%',
                           }}
                           onClick={this.handleMoveSignUpPage}
                        >
                           회원가입
                        </Button>
                     </Form.Item>
                     <Divider
                        orientation="center"
                        style={{
                           margin: '0 0 20px 80px',
                        }}
                     >
                        <span className="dividerLogin">
                           소셜 계정으로 로그인
                        </span>
                     </Divider>
                     <Form.Item {...tailLayout}>
                        <GoogleLogin
                           clientId={process.env.REACT_APP_Google}
                           onSuccess={this.successResponseGoogle}
                           onFailure={this.failureResponseGoogle}
                           cookiePolicy={'single_host_origin'}
                           render={(renderProps) => (
                              <Button
                                 type="link"
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
                     <Form.Item {...tailLayout}>
                        <KakaoLogin
                           jsKey={process.env.REACT_APP_KAKAO_API}
                           onSuccess={this.successResponseKakao}
                           onFailure={this.failureResponseGoogle}
                           getProfile={true}
                           className="kakao-login"
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
                                 className="kakaoButton"
                              >
                                 카카오 로그인
                              </Button>
                           )}
                        ></KakaoLogin>
                     </Form.Item>
                  </Form>
               </div>
            </div>
            {this.state.backgroundImg === '' ? null : (
               <div className="background-image">
                  <div className="background-shadow"> </div>
                  <img
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${this.state.backgroundImg}`}
                  />
               </div>
            )}
         </div>
      );
   }
}

export default withRouter(Login);
