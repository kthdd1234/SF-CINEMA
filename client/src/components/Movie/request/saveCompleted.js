import { serverUrl } from './index';

/* 저장하기 완료(save completed) */
export const saveCompleted = async (userId, movieId) => {
   try {
      const { data } = await serverUrl.post(`/save/completed`, {
         userId: userId,
         movieId: movieId,
      });

      return data;
   } catch (error) {
      console.log(error);
   }
};
