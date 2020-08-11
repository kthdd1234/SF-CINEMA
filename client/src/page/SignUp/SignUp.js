import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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

class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: '',
         password: '',
         confirmPassword: '',
         username: '',
         profileImg: '',
      };
   }

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
         const url = 'http://localhost:5000/user/signup';
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
         <div
            style={{
               margin: '0 25vw 0 25vw',
               padding: '3vw 12vw 0 12vw',
            }}
         >
            <div
               style={{
                  padding: '0 0 2vw 3.5vw',
               }}
            >
               <strong
                  style={{
                     padding: '5.4vw',
                     fontSize: '2.5vw',
                  }}
               >
                  Sign Up
               </strong>
            </div>

            <Form
               {...layout}
               name="basic"
               initialValues={{
                  remember: true,
               }}
               onFinish={this.handleCheckSignUp}
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
                  label="비밀번호 확인"
                  name="비밀번호 확인"
                  rules={[
                     {
                        required: true,
                        message: '비밀번호를 재확인해주세요',
                     },
                  ]}
               >
                  <Input.Password
                     onChange={this.handleInputValue('confirmPassword')}
                  />
               </Form.Item>
               <Form.Item
                  label="이름"
                  name="이름"
                  rules={[
                     {
                        required: true,
                        message: '이름을 입력해주세요',
                     },
                  ]}
               >
                  <Input onChange={this.handleInputValue('username')} />
               </Form.Item>

               <Form.Item {...tailLayout}>
                  <Button
                     type="primary"
                     htmlType="submit"
                     icon={<FormOutlined />}
                     style={{
                        width: '17.3vw',
                     }}
                     onClick={() => this.handleClickSignUp}
                  >
                     가입하기
                  </Button>
               </Form.Item>

               <Form.Item {...tailLayout}>
                  <Button
                     type="primary"
                     htmlType="submit"
                     icon={<FormOutlined />}
                     style={{
                        width: '17.3vw',
                     }}
                     ghost={true}
                     onClick={() => this.props.history.push('/login')}
                  >
                     구글 계정이나 카카오 계정이 있나요?
                  </Button>
               </Form.Item>
            </Form>
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(SignUp);
// eslint-disable-next-line
