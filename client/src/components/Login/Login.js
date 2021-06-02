import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import {
   requestLogin,
   requestProfile,
   requestBackground,
} from '../../requests';
import { reactLocalStorage } from 'reactjs-localstorage';
import dotenv from 'dotenv';
import './Login.css';
dotenv.config();

const { Item } = Form;

const FormItem = ({ label, name, messages, onChange }) => {
   return (
      <Item
         label={
            <div style={{ color: 'whitesmoke', fontWeight: 'bold' }}>
               {label}
            </div>
         }
         name={name}
         rules={[
            {
               required: true,
               message: messages,
            },
         ]}
      >
         <Input onChange={onChange} />
      </Item>
   );
};

const FormBtn = ({ value, icon }) => {
   return (
      <div>
         <Button
            type="primary"
            htmlType="submit"
            icon={icon}
            className="auth-btn"
         >
            {value}
         </Button>
      </div>
   );
};

const FormSub = ({ value }) => {
   return <div className="login-box-text">{value}</div>;
};

class Login extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount = async () => {
      const background = await requestBackground();
      this.props.handleBackgroundUpdate(background);
   };

   settingLogin = async (loginID, password) => {
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

   render() {
      const {
         handleInputLoginID,
         handleInputPassword,
         background,
         loginID,
         password,
      } = this.props;

      return (
         <div className="login-container">
            <div className="box-background-image">
               <div className="login-content">
                  <Form
                     layout="vertical"
                     name="basic"
                     initialValues={{ remember: true }}
                     onFinish={() => this.settingLogin(loginID, password)}
                     size="large"
                  >
                     <FormSub value="Login" />
                     <FormItem
                        label="아이디"
                        name="아이디"
                        messages="아이디를 입력해주세요"
                        onChange={handleInputLoginID}
                     />
                     <FormItem
                        label="비밀번호"
                        name="비밀번호"
                        messages="비밀버노를 입력해주세요"
                        onChange={handleInputPassword}
                     />

                     <FormBtn value="로그인" icon={<LoginOutlined />} />
                  </Form>
               </div>
            </div>
            <img
               className="background-image"
               src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${background[0].backgroundImg}`}
            />
         </div>
      );
   }
}

export default withRouter(Login);
