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
