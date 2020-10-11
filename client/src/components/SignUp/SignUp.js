import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/`,
});

class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: '',
         password: '',
         confirmPassword: '',
         username: '',
         profileImg: '',
         background: '',
      };
   }

   componentDidMount = () => {
      serverUrl.get('main/background').then(({ data }) => {
         this.setState({
            background: data[1].backgroundImg,
         });
      });
   };

   onFinishedSignUp = () => {
      this.props.history.push('/login');
   };

   handleCheckSignUp = () => {
      const {
         loginID,
         password,
         confirmPassword,
         username,
         profileImg,
      } = this.state;

      if (password !== confirmPassword) {
         return message.error('입력하신 비밀번호가 일치하지 않습니다.');
      } else {
         const url = `http://${process.env.REACT_APP_HOST}:5000/user/signup`;
         axios
            .post(url, {
               loginID: loginID,
               password: password,
               username: username,
               profileImg: profileImg,
               provider: 'SFCinema',
            })
            .then(({ data }) => {
               if (data === '이미 회원가입한 계정입니다.') {
                  return message.warning(data);
               }
               message.success(data);
               setTimeout(this.onFinishedSignUp, 1000);
            })
            .catch((err) => console.log(err));
      }
   };

   handleInputValue = (key) => (e) => {
      this.setState({ [key]: e.target.value });
   };

   render() {
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
                           onFinish={this.handleCheckSignUp}
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
                              <Input
                                 onChange={this.handleInputValue('loginID')}
                              />
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
                                 onChange={this.handleInputValue(
                                    'confirmPassword',
                                 )}
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
                              <Input
                                 onChange={this.handleInputValue('username')}
                              />
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
                                 onClick={() =>
                                    this.props.history.push('/login')
                                 }
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
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${this.state.background}`}
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
