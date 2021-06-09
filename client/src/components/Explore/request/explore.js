import { serverUrl } from './index';

/* 영화 탐색하기 */
export const explore = async (key, value) => {
   try {
      const { data } = await serverUrl.get('/explore', {
         params: {
            [key]: value,
         },
      });

      return data;
   } catch (error) {
      console.log(error);
   }
};
