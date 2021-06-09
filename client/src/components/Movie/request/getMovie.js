import { serverUrl } from './index';

/* 현재 영화 */
export const getMovie = async () => {
   try {
      const url = window.location.pathname;
      const lastOfSlashIdx = url.lastIndexOf('/');
      const movieId = url.substring(lastOfSlashIdx + 1);

      const { data } = await serverUrl.get('/movies', {
         params: {
            movieId: movieId,
         },
      });
      return data;
   } catch (error) {
      console.log(error);
   }
};
