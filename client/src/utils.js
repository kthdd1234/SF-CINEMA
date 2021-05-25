import React from 'react';
import $ from 'jquery';
import { notification } from 'antd';
import {
   LikeFilled,
   PushpinFilled,
   VideoCameraFilled,
   StarFilled,
   GiftFilled,
   CrownFilled,
   RocketFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   GitlabFilled,
   RobotFilled,
   HourglassFilled,
   ReadFilled,
   EyeInvisibleFilled,
   FireFilled,
   GiftOutlined,
   HomeOutlined,
   LoginOutlined,
   FormOutlined,
   UserOutlined,
   BarsOutlined,
   SearchOutlined,
   TagOutlined,
} from '@ant-design/icons';

export const pushList = {
   'latest-movies': ['최신 영화', <VideoCameraFilled />],
   'highly-rated-movies': ['평점이 높은 영화', <StarFilled />],
   'operator-push': ['운영자 추천', <GiftFilled />],
   'sf-masterpiece': ['SF 명작', <CrownFilled />],
};

export const tagList = {
   '우주 탐사': <RocketFilled />,
   외계인: <RedditCircleFilled />,
   '슈퍼 히어로': <DingdingOutlined />,
   액션: <ThunderboltFilled />,
   몬스터: <GitlabFilled />,
   '가상 현실 또는 AI': <RobotFilled />,
   '시간 여행': <HourglassFilled />,
   드라마: <ReadFilled />,
   좀비: <EyeInvisibleFilled />,
   재난: <FireFilled />,
};

export const seriesList = {
   '슈퍼 히어로': [
      '어벤져스',
      '스파이더맨',
      '아이언맨',
      '앤트맨',
      '캡틴 아메리카',
      '데드풀',
      '엑스맨',
      '가디언즈 오브 갤럭시',
      '토르',
      '배트맨',
   ],
   몬스터: ['클로버필드', '퍼시픽 림', '쥬라기 월드', '콰이어트 플레이스'],
   우주배경: ['에이리언', '스타워즈', '스타트렉', '트랜스포머'],
   액션: [
      '레지던트 이블',
      '터미네이터',
      '메이즈 러너',
      '헝거게임',
      '다이버전트',
      '블레이드 러너',
      '맨 인 블랙',
   ],
   모험: ['백 투 더 퓨쳐', '28일 후', '혹성탈출'],
};

/* URL 파라미터(query string) 가져오기 */
export const handleURLSearchParams = (paramsKey) => {
   const paramsValue = new URLSearchParams(window.location.search).get(
      paramsKey,
   );
   return paramsValue;
};

/* 사용자의 좋아요, 저장하기 데이터 분석 */
export const favorite = async ({ savedMovie, likedMovie }, id) => {
   const result = [false, false];
   const favarited = [savedMovie, likedMovie];

   favarited.forEach((movies, i) => {
      movies.forEach((movie) => {
         if (movie.id === id) {
            result[i] = true;
         }
      });
   });

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
