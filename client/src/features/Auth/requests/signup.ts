import { serverUrl } from './index';
import { message } from 'antd';

/* 회원가입 */
export const signup = async (loginID: string, password: string, username: string) => {
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
