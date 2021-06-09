import { serverUrl } from './index';

/* 저장하기 취소(save cancel) */
export const saveCancel = async (userId, movieId) => {
   try {
      const { data } = await serverUrl.delete(`/save/cancel`, {
         data: {
            userId: userId,
            movieId: movieId,
         },
      });

      return data;
   } catch (error) {
      console.log(error);
   }
};
