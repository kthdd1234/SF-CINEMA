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

const serverUrl = axios.create({
   baseURL: 'http://54.180.32.31:5000/',
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
         backgroundImg: '',
      };
   }

   componentDidMount = () => {
      serverUrl.get('main/backgroundImg').then(({ data }) => {
         this.setState({
            backgroundImg: data[1][1],
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
         const url = 'http://54.180.32.31:5000/user/signup';
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
            {this.state.backgroundImg === '' ? null : (
               <div className="background-image">
                  <div className="background-shadow"> </div>
                  <img
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${this.state.backgroundImg}`}
                  />
               </div>
            )}
            <div
               style={{
                  position: 'relative',
                  margin: '3.3vw 0 0 5vw',
                  maxWidth: '30vw',
               }}
            >
               <div
                  style={{
                     position: 'relative',
                     background: 'rgba(0,0,0,.75)',
                     borderRadius: '10px',
                     top: '3vw',
                     padding: '3vw 2vw 4vw 2vw',
                  }}
               >
                  <div
                     style={{
                        padding: '0 0 1vw 0',
                        margin: '10px 0 0 33%',
                     }}
                  >
                     <strong style={{ fontSize: '50px', color: 'whitesmoke' }}>
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
                           onChange={this.handleInputValue('confirmPassword')}
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
                        <Input onChange={this.handleInputValue('username')} />
                     </Form.Item>

                     <Form.Item {...tailLayout}>
                        <Button
                           type="primary"
                           htmlType="submit"
                           icon={<FormOutlined />}
                           style={{}}
                           onClick={() => this.handleClickSignUp}
                           style={{
                              width: '100%',
                           }}
                        >
                           가입하기
                        </Button>
                     </Form.Item>

                     <Form.Item {...tailLayout}>
                        <Button
                           type="primary"
                           htmlType="submit"
                           icon={<FormOutlined />}
                           onClick={() => this.props.history.push('/login')}
                           style={{
                              width: '100%',
                           }}
                        >
                           구글 계정이나 카카오 계정이 있나요?
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(SignUp);
// eslint-disable-next-line
