import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { requestSignUp, requestBackground } from '../../requests';
import './SignUp.css';

class SignUp extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount = async () => {
      const background = await requestBackground();
      this.props.handleBackgroundUpdate(background);
   };

   handleSettingSignUp = async () => {
      const {
         loginID,
         password,
         confirmPassword,
         username,
         history,
      } = this.props;

      if (password !== confirmPassword) {
         return message.error('입력하신 비밀번호가 일치하지 않습니다.');
      } else {
         const result = await requestSignUp(
            loginID,
            password,
            username,
            '',
            'SFCinema',
         );
         if (result !== undefined) {
            message.success(result);
            history.push('/login');
         }
      }
   };

   render() {
      const {
         background,
         history,
         handleInputLoginID,
         handleInputPassword,
         handleInputConfirmPassword,
         handleInputUsername,
      } = this.props;

      return (
         <div>
            <div className="signup-container">
               <div className="box-background-image">
                  <div className="signup-content">
                     <div className="signup-wrap">
                        <div className="signup-box-text">
                           <strong className="signup-text">Sign Up</strong>
                        </div>

                        <Form
                           layout="vertical"
                           name="basic"
                           initialValues={{
                              remember: true,
                           }}
                           onFinish={this.handleSettingSignUp}
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
                              <Input onChange={handleInputLoginID} />
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
                              <Input.Password onChange={handleInputPassword} />
                           </Form.Item>

                           <Form.Item
                              label={
                                 <strong
                                    style={{
                                       color: 'white',
                                    }}
                                 >
                                    비밀번호 확인
                                 </strong>
                              }
                              name="비밀번호 확인"
                              rules={[
                                 {
                                    required: true,
                                    message: '비밀번호를 재확인해주세요',
                                 },
                              ]}
                           >
                              <Input.Password
                                 onChange={handleInputConfirmPassword}
                              />
                           </Form.Item>
                           <Form.Item
                              label={
                                 <strong
                                    style={{
                                       color: 'white',
                                    }}
                                 >
                                    이름
                                 </strong>
                              }
                              name="이름"
                              rules={[
                                 {
                                    required: true,
                                    message: '이름을 입력해주세요',
                                 },
                              ]}
                           >
                              <Input onChange={handleInputUsername} />
                           </Form.Item>

                           <Form.Item
                              style={{
                                 marginBottom: '10px',
                              }}
                           >
                              <Button
                                 type="primary"
                                 htmlType="submit"
                                 icon={<FormOutlined />}
                                 style={{
                                    width: '100%',
                                    marginTop: '10px',
                                 }}
                              >
                                 가입하기
                              </Button>
                           </Form.Item>

                           <Form.Item>
                              <Button
                                 type="primary"
                                 htmlType="submit"
                                 icon={<FormOutlined />}
                                 onClick={() => history.push('/login')}
                                 style={{
                                    width: '100%',
                                 }}
                              >
                                 소셜 로그인
                              </Button>
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

// eslint-disable-next-line
export default withRouter(SignUp);
// eslint-disable-next-line
