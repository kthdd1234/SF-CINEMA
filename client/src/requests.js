import axios from 'axios';

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/main`,
});

/*  백그라운드 이미지 */
export const requestBackgroundImg = async () => {
   const { data } = await serverUrl.get('/backgroundImg');
   return data;
};

/* 추천 영화(랜덤) */
export const requestRandomMovies = async (count) => {
   const { data } = await serverUrl.get('/randomMovies', {
      params: {
         count: count,
      },
   });
   return data;
};

/* 별점이 9점 이상인 영화 */
export const requestHighlyRated = async (under, moreThen, count) => {
   const { data } = await serverUrl.get('/rating', {
      params: {
         under: under,
         moreThen: moreThen,
         count: count,
      },
   });
   return data;
};

/* 최신 영화 추천 */
export const requestReleaseOrder = async (under, moreThen) => {
   const { data } = await serverUrl.get(`/date`, {
      params: {
         under: under,
         moreThen: moreThen,
      },
   });
   return data;
};

/* 장르별 영화 추천 */
export const requestGenres = async (genre, count) => {
   const { data } = await serverUrl.get(`/genres`, {
      params: {
         genre: genre,
         count: count,
      },
   });
   return data;
};

/* 운영자가 추천하는 SF 영화 */
export const requestOperatorMovies = async (count) => {
   const { data } = await serverUrl.get(`/operator`, {
      params: {
         count: count,
      },
   });
   return data;
};

/* 주말에 몰아보기 좋은 SF 명작 추천 */
export const requestMasterpiece = async (count) => {
   const { data } = await serverUrl.get(`/masterpiece`, {
      params: {
         count: count,
      },
   });
   return data;
};

/* SF 시리즈 */
export const requestSeries = async (title) => {
   const { data } = await serverUrl.get('/series', {
      params: {
         title: title,
      },
   });
   return data;
};

/* 현재 영화 */
export const requestCurrentMovie = async () => {
   const url = window.location.pathname;
   const lastOfSlashIdx = url.lastIndexOf('/');
   const movieId = url.substring(lastOfSlashIdx + 1);

   const { data } = await serverUrl.get('/contents', {
      params: {
         movieId: movieId,
      },
   });
   return data;
};

/* 키워드 검색 */
export const requestSearchKeword = async (keyword) => {
   const { data } = await serverUrl.get('/searchMovie', {
      params: {
         keyword: keyword,
      },
   });
   if (data === 'Not Found') return;
   return data;
};
