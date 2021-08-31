import { serverUrl } from './index';

/* 재밌어요 취소(like cancel) */
export const likeCancel = async (userId: number | void, movieId: number | void) => {
   try {
      const { data } = await serverUrl.delete(`/like/cancel`, {
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
