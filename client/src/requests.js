import axios from 'axios';
import { message } from 'antd';

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});

/* 회원가입 */
export const requestSignUp = async (
   loginID,
   password,
   username,
   profileImg,
   provider,
) => {
   const { data } = await serverUrl.post('/user/signup', {
      loginID: loginID,
      password: password,
      username: username,
      profileImg: profileImg,
      provider: provider,
   });
   if (data === '이미 회원가입한 계정입니다.') return message.warning(data);

   return data;
};

/* 로그인 */
export const requestLogin = async (loginID, password) => {
   const { data } = await serverUrl.post('/user/login', {
      loginID: loginID,
      password: password,
   });
   if (data === '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.')
      return message.error(data);

   return data;
};

/* 프로필 */
export const requestProfile = async (accessToken) => {
   const { data } = await serverUrl.get('/user/profile', {
      headers: {
         Authorization: 'Bearer ' + accessToken,
      },
   });
   if (data === '유저의 정보가 존재하지 않습니다.') {
      return message.error(data);
   }

   return data;
};

/*  백그라운드 이미지 */
export const requestBackground = async () => {
   const { data } = await serverUrl.get('/background/image');
   return data;
};

/* 추천 영화(랜덤) */
export const requestRecommendation = async (count) => {
   const { data } = await serverUrl.get('/recommendation', {
      params: {
         count: count,
      },
   });

   return data;
};

/* 별점이 높은 영화 */
export const requestHighlyRatedMovies = async (count) => {
   const { data } = await serverUrl.get('/recommendation/highly-rated-movies', {
      params: {
         count: count,
      },
   });

   return data;
};

/* 최신 영화 추천 */
export const requestLatestMovies = async () => {
   const { data } = await serverUrl.get(`/recommendation/latest-movies`);

   return data;
};

/* 장르별 영화 추천 */
export const requestGenre = async (genre, count) => {
   const { data } = await serverUrl.get(`/genre`, {
      params: {
         genre: genre,
         count: count ? count : undefined,
      },
   });

   return data;
};

/* 운영자가 추천하는 SF 영화 */
export const requestOperatorRecommendation = async (count) => {
   const { data } = await serverUrl.get(
      `/recommendation/operator-recommendation`,
      {
         params: {
            count: count ? count : undefined,
         },
      },
   );

   return data;
};

/* 주말에 몰아보기 좋은 SF 명작 추천 */
export const requestSFMasterpiece = async (count) => {
   const { data } = await serverUrl.get(`/recommendation/sf-masterpiece`, {
      params: {
         count: count ? count : undefined,
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
export const requestContests = async () => {
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
export const requestSearch = async (keyword) => {
   const { data } = await serverUrl.get('/search', {
      params: {
         keyword: keyword,
      },
   });
   if (data === 'Not Found') return;
   return data;
};

/* 저장하기(completed) */
export const requestSaveCompleted = async (userId, movieId) => {
   const { data } = await serverUrl.post(`/save/completed`, {
      userId: userId,
      movieId: movieId,
   });
   if (data === 'Not Found User') return;
   else if (data === 'Not Found Movie') return;

   return data;
};

/* 저장하기(cancel) */
export const requestSaveCancel = async (userId, movieId) => {
   const { data } = await serverUrl.delete(`/save/cancel`, {
      data: {
         userId: userId,
         movieId: movieId,
      },
   });
   if (data === 'Not Found User') return;
   else if (data === 'Not Found Movie') return;

   return data;
};

/* 재밌어요(completed) */
export const requestLikeCompleted = async (userId, movieId) => {
   console.log('userId, movieId', userId, movieId);
   const { data } = await serverUrl.post(`/like/completed`, {
      userId: userId,
      movieId: movieId,
   });
   if (data === 'Not Found User') return;
   else if (data === 'Not Found Movie') return;

   return data;
};

/* 재밌어요(cancel) */
export const requestLikeCancel = async (userId, movieId) => {
   console.log('userId, movieId', userId, movieId);
   const { data } = await serverUrl.delete(`/like/cancel`, {
      data: {
         userId: userId,
         movieId: movieId,
      },
   });
   if (data === 'Not Found User') return;
   else if (data === 'Not Found Movie') return;

   return data;
};
