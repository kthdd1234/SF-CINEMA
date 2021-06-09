import { serverUrl } from './index';

/*  백그라운드 이미지 */
export const backdrop = async () => {
   try {
      const { data } = await serverUrl.get('/background/image');
      return data;
   } catch (error) {
      console.log(error);
   }
};
