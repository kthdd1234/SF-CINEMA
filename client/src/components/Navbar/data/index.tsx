import React from 'react';
import {
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
} from '@ant-design/icons';


interface IData {
   path: string;
   sub: string;
   icon: any;  
}


interface Iindex {
   [key: string]: number
}

 const pushList:IData[]  = [
   { path: 'latest-movies', sub: '최신 영화', icon: <VideoCameraFilled /> },
   {
      path: 'highly-rated-movies',
      sub: '평점이 높은 영화',
      icon: <StarFilled />,
   },
   { path: 'operator-push', sub: '운영자 추천', icon: <GiftFilled /> },
   { path: 'sf-masterpiece', sub: 'SF 명작', icon: <CrownFilled /> },
];

const pushIndex: Iindex = {};
pushList.forEach((obj, i) => { pushIndex[obj.path] = i })

 const tagList:IData[]  = [
   { path: '우주 탐사', sub: '우주 탐사', icon:  <RocketFilled /> },
   {
      path: '외계인',
      sub: '외계인',
      icon: <RedditCircleFilled />,
   }, 
   { path: '액션', sub: '액션', icon: <ThunderboltFilled /> },
   { path: '슈퍼 히어로', sub: '슈퍼 히어로', icon: <DingdingOutlined /> },
   { path: '몬스터', sub: '몬스터', icon: <GitlabFilled /> },
   { path: '가상 현실 또는 AI', sub: '가상 현실 또는 AI', icon: <RobotFilled /> },
   { path: '시간 여행', sub: '시간 여행', icon: <HourglassFilled /> },
   { path: '드라마', sub: '드라마', icon: <ReadFilled /> },
   { path: '좀비', sub: '좀비', icon: <EyeInvisibleFilled /> },
   { path: '재난', sub: '재난', icon: <FireFilled /> },
];

const tagIndex: Iindex = {};
tagList.forEach((obj, i) => { tagIndex[obj.path] = i });

 const seriesList = [
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
   '클로버필드',
   '퍼시픽 림',
   '쥬라기 월드',
   '콰이어트 플레이스',
   '에이리언',
   '스타워즈',
   '스타트렉',
   '트랜스포머',
   '레지던트 이블',
   '터미네이터',
   '메이즈 러너',
   '헝거게임',
   '다이버전트',
   '블레이드 러너',
   '맨 인 블랙',
   '백 투 더 퓨쳐',
   '28일 후',
   '혹성탈출',
].map((series) => {
   return { path: series, sub: series, icon: <div/> }
})

export { pushList,pushIndex, tagList, tagIndex, seriesList }

