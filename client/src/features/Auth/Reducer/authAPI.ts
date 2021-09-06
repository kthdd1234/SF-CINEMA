import axios from 'axios';
import { message } from 'antd';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});

/* 로그인 */
const fetchLogin = async (loginID: string, password: string) => {
   try {
      const { data } = await serverUrl.post('/user/login', {
         loginID: loginID,
         password: password,
      });
      return data;
   } catch (error) {
      message.warning('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
   }
};

/* 회원가입 */
const fetchSignup = async (
   loginID: string,
   password: string,
   username: string,
) => {
   try {
      const { data } = await serverUrl.post('/user/signup', {
         loginID: loginID,
         password: password,
         username: username,
      });
      return data;
   } catch (error) {
      message.warning('이미 회원가입한 계정입니다.');
   }
};

export { fetchLogin, fetchSignup };
