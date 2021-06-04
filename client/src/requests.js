import axios from 'axios';
import { message } from 'antd';

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000`,
});

/* 회원가입 */
export const requestSignUp = async (loginID, password, username) => {
   const { data } = await serverUrl
      .post('/user/signup', {
         loginID: loginID,
         password: password,
         username: username,
      })
      .catch((err) => {
         console.log(err);
         return message.warning('이미 회원가입한 계정입니다.');
      });

   return data;
};

/* 로그인 */
export const requestLogin = async (loginID, password) => {
   const { data } = await serverUrl
      .post('/user/login', {
         loginID: loginID,
         password: password,
      })
      .catch((err) => {
         console.log(err);
         return message.warning(
            '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
         );
      });

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

/* 영화 탐색하기 */
export const reqExplore = async (key, value) => {
   const { data } = await serverUrl.get('/explore', {
      params: {
         [key]: value,
      },
   });

   return data;
};

/* 현재 영화 */
export const reqMovie = async () => {
   const url = window.location.pathname;
   const lastOfSlashIdx = url.lastIndexOf('/');
   const movieId = url.substring(lastOfSlashIdx + 1);

   const { data } = await serverUrl.get('/movies', {
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
   if (data === 'Not Found') return [];
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
