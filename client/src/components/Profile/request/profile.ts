import { serverUrl } from './index';
import { message } from 'antd';

type UserProfile = string | number | true;

/* 프로필 */
export const userProfile = async (accessToken: UserProfile) => {
   try {
      const { data } = await serverUrl.get('/user/profile', {
         headers: {
            Authorization: 'Bearer ' + accessToken,
         },
      });

      if (data === '유저의 정보가 존재하지 않습니다.') {
         return message.error(data);
      }

      return data;
   } catch (error) {
      console.log(error);
   }
};
