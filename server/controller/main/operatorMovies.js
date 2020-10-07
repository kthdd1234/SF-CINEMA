const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    let { count } = req.query;
    count = count !== undefined ? count : 100;
    const operator_Recommend_Movies = [
      '인터스텔라',
      '컨택트',
      '프로메테우스',
      '에이리언: 커버넌트',
      '나는 전설이다',
      '콘택트',
      '엣지 오브 투모로우',
      '라이프',
      '마션',
      '어벤져스: 엔드게임',
      '터미네이터: 다크 페이트',
      '스파이더맨: 파 프롬 홈',
      '인셉션',
      '애드 아스트라',
      '포스 카인드',
      '설국 열차',
      '이퀼리브리엄',
      '매트릭스',
      '메이즈러너',
      '우주전쟁',
      '맨 프럼 어스',
      '아이언맨',
      '아마겟돈',
      '미션 투 마스',
      '아이로봇',
      '딥 임팩트',
      '스타쉽 트루퍼스',
      '투모로우',
      '그녀',
      '로건',
      '헝거게임: 판엠의 불꽃',
      '월드워Z',
      '콰이어트 플레이스',
      '28주 후',
      '28일 후',
      '레지던트 이블',
      '미스트',
      '타임머신',
      '시간을 달리는 소녀',
      '너의 이름은',
      '업그레이드',
      '닥터 스트레인지',
      '캡틴 아메리카: 윈터 솔져',
      '테넷',
    ];
    movies
      .findAll({
        where: {
          title: operator_Recommend_Movies,
        },
        order: Sequelize.literal('rand()'),
        raw: true,
        limit: Number(count),
      })
      .then((movie) => {
        res.status(200).send(movie);
      })
      .catch((err) => {
        res.status(404).send(err);
        console.log(err);
      });
  },
};
