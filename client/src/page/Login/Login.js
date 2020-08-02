import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { LoginOutlined, FormOutlined } from '@ant-design/icons';
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
      const url = 'http://localhost:5000/user/login';
      axios
         .post(url, {
            loginID: loginID,
            password: password,
         })
         .then(({ data }) => {
            if (data === '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.') {
               return message.error(data);
            }
            const { accessToken } = data;
         });
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
               {/* <hr
                  style={{
                     width: '20vw',
                  }}
               /> */}
               <Form.Item {...tailLayout}>
                  <Button
                     type="primary"
                     htmlType="submit"
                     icon={<LoginOutlined />}
                     style={{
                        width: '17.3vw',
                     }}
                     ghost={true}
                  >
                     구글 로그인
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
                  >
                     카카오 로그인
                  </Button>
               </Form.Item>
            </Form>
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(Login);
// eslint-disable-next-line
