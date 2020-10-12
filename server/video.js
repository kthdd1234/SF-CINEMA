const { movies, User } = require('./models/index');

movies
  .findAll({
    raw: true,
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      let movieId = data[i].id;
      let actors = data[i].actors;

      actors = JSON.parse(actors).slice(0, 4).join(', ');
      movies.update(
        {
          actors: actors,
        },
        {
          where: {
            id: movieId,
          },
        }
      );
    }
  });

// backgroundImg: JSON.stringify([
//   'uhYoytlNaq46dG81wLmHqaSuzWu.jpg',
//   '5o88bbqcV5STn56jqOeovaaWbAE.jpg',
// ]),

// movies.update(
//   {
//     genre: '슈퍼 히어로',
//   },
//   {
//     where: {
//       id: 263,
//     },
//   }
// );

// movies.create({
//   title: '모비우스',
//   titleEng: 'Morbius',
//   genre: '슈펴 히어로',
//   director: '다니엘 에스피노사',
//   plot:
//     '마블 원작 코믹스에서 `스파이더맨’과 맞선 적수 `마이클 모비우스’ 박사를 주인공으로 한 영화',
//   posters: '/zYrgKhV9CPsnPRlX7Bdv8kNF28v.jpg',
//   nation: '미국',
//   actors: JSON.stringify(['자레드 레토', '아드리아 아르조나']),
//   releaseDate: 20210318,
//   runtime: '업데이트 예정',
//   ratingGrade: '업데이트 예정',
//   userRating: 0,
//   videoId: 'WYXhvWOn0Y8',
//   backDrop: '/kdUArJCSTW8bpJipOqkvCZsVEqi.jpg',
// });
