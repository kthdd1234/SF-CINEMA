import { serverUrl } from './index';

/* 재밌어요 완료(like completed) */
export const likeCompleted = async (userId, movieId) => {
   try {
      const { data } = await serverUrl.post(`/like/completed`, {
         userId: userId,
         movieId: movieId,
      });

      return data;
   } catch (error) {
      console.log(error);
   }
};
