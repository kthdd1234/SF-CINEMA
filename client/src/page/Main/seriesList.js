module.exports = {
   seriesList: () => {
      const seriesTitleList = [
         '어벤져스',
         '터미네이터',
         '트랜스포머',
         '에이리언',
         '메이즈 러너',
         '헝거게임',
         '백 투 더 퓨쳐',
         '블레이드 러너',
         '맨 인 블랙',
         '28일 후',
         '스타워즈',
         '아이언맨',
         '다이버전트',
         '퍼시픽 림',
         '혹성탈출',
         '레지던트 이블',
         '스타트렉',
         '데드풀',
         '앤트맨',
         '쥬라기 월드',
         '가디언즈 오브 갤럭시',
         '캡틴 아메리카',
         '클로버필드',
         '스파이더맨',
         '토르',
         '배트맨',
      ];
      const seriesList = [];
      for (let i = 0; i < 3; i++) {
         let getRandomInt = Math.floor(Math.random() * seriesTitleList.length);
         seriesList.push(seriesTitleList[getRandomInt]);
         seriesTitleList.splice(getRandomInt, 1);
      }
      return seriesList;
   },
};
