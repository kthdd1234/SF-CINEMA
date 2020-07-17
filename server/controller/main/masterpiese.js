const { movies } = require('../../models');

module.exports = {
  get: async (req, res) => {
    movies
      .findAll({
        order: [['releaseDate', 'ASC']],
        limit: 20,
        raw: true,
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
