import React from 'react';
import $ from 'jquery';
import { notification } from 'antd';
import { LikeFilled, PushpinFilled } from '@ant-design/icons';

/* URL 파라미터(query string) 가져오기 */
export const handleURLSearchParams = (paramsKey) => {
   const paramsValue = new URLSearchParams(window.location.search).get(
      paramsKey,
   );
   return paramsValue;
};

/* 사용자의 좋아요, 저장하기 데이터 분석 */
export const handleUserFavoritedData = async (
   { savedMovie, likedMovie },
   contensts,
) => {
   const favorite = ['savedFilled', 'likedFilled'];
   const favaritedData = [savedMovie, likedMovie];
   let result = {};
   for (let i = 0; i < likedMovie.length; i++) {
      if (likedMovie[i].title === contensts.title) {
         console.log('일치함');
      }
   }

   favaritedData.forEach((data, i) => {
      data.forEach((movie) => {
         if (movie.id === contensts.id) {
            result[favorite[i]] = true;
         }
      });
   });
   console.log(favaritedData);
   result = Object.keys(result).length !== 0 ? result : undefined;
   console.log(result);
   return result;
};

/* 로그인이 되어 있지 않을 경우 알림창 */
export const handlePopconfirmVisible = (key, isLogin, visible) => {
   if (!isLogin) {
      if (visible) {
         return { [key]: true };
      } else {
         return { [key]: false };
      }
   }
};

/* 저장하기 완료 알림창 */
export const handleSaveCompletedNotification = (placement) => {
   notification.success({
      message: `영화 정보 저장 완료!`,
      description: '프로필 관리 목록에 해당 영화 정보를 저장하였습니다.',
      placement,
      icon: (
         <PushpinFilled
            style={{
               color: 'red',
            }}
         />
      ),
   });
};

/* 저장하기 취소 알림창 */
export const handleSaveCancelNotification = (placement) => {
   notification.warn({
      message: `영화 정보 저장 취소!`,
      description: '프로필 관리 목록에 해당 영화 정보를 삭제하였습니다.',
      placement,
   });
};

/* 좋아요 완료 알림창 */
export const handleLikeCompletedNotification = (placement) => {
   notification.success({
      message: `좋아요 완료!`,
      description: '좋아요 목록에 해당 영화 정보가 추가되었습니다.',
      placement,
      icon: (
         <LikeFilled
            style={{
               color: 'blue',
            }}
         />
      ),
   });
};

/* 좋아요 취소 알림창 */
export const handleLikeCancelNotification = (placement) => {
   notification.warn({
      message: `좋아요 취소!`,
      description: '좋아요 목록에 해당 영화 정보를 삭제하였습니다.',
      placement,
   });
};

/* 영화 예고편 실행 및 중지 */
export const handleTrailerVisible = (trailer, videoId) => {
   if (trailer === false) {
      $(`.${videoId}`)[0].contentWindow.postMessage(
         '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
         '*',
      );
   }
};
