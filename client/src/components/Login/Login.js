import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message, Divider } from 'antd';
import {
   LoginOutlined,
   FormOutlined,
   GoogleOutlined,
   MessageFilled,
} from '@ant-design/icons';
import {
   requestSignUp,
   requestLogin,
   requestProfile,
   requestBackground,
} from '../../requests';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import dotenv from 'dotenv';
import { reactLocalStorage } from 'reactjs-localstorage';
import './Login.css';
dotenv.config();

class Login extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount = async () => {
      const background = await requestBackground();
      this.props.handleBackgroundUpdate(background);
   };

   handleSettingLogin = async (loginID, password) => {
      const { handleLoginChange, handleProfileUpdate, history } = this.props;
      const result = await requestLogin(loginID, password);

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

   successResponseGoogle = (response) => {
      const { email, name, imageUrl } = response.profileObj;

      requestSignUp(email, '', name, imageUrl, 'GoogleLogin');
      this.handleSettingLogin(email, '');
   };

   failureResponseGoogle = (response) => {
      console.log('구글 로그인 실패: ', response);
      return message.error('구글 로그인에 실패하였습니다.');
   };

   successResponseKakao = (response) => {
      const { kakao_account, properties } = response.profile;
      const { username, profile_image } = properties;
      const { email } = kakao_account;

      requestSignUp(email, '', username, profile_image, 'KakaoLogin');
      this.handleSettingLogin(email, '');
   };

   failureResponseGoogle = (response) => {
      console.log('카카오 로그인 실패: ', response);
      return message.error('카카오 로그인에 실패하였습니다.');
   };

   render() {
      const {
         handleInputLoginID,
         handleInputPassword,
         background,
         loginID,
         password,
      } = this.props;

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
                           onFinish={() =>
                              this.handleSettingLogin(loginID, password)
                           }
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
                              <Input onChange={handleInputLoginID} />
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
                              <Input.Password onChange={handleInputPassword} />
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
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${background[0].backgroundImg}`}
                  />
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(Login);
