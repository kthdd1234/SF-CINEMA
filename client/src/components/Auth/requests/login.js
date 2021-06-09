import { serverUrl } from './index';
import { message } from 'antd';

/* 로그인 */
export const login = async (loginID, password) => {
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
