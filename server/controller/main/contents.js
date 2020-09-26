const { movies } = require('../../models/index');

module.exports = {
  get: (req, res) => {
    const { movieId } = req.query;

    movies
      .findOne({
        where: {
          id: movieId,
        },
      })
      .then((movieData) => {
        if (movieData === null) {
          res.status(404).send('Not found movie');
        }
        const movie = movieData.get({ plain: true });
        res.status(200).send(movie);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
