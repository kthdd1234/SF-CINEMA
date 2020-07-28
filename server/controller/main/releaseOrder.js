const { movies } = require('../../models');

module.exports = {
  get: async (req, res) => {
    movies
      .findAll({
        order: [['releaseDate', 'DESC']],
        limit: 30,
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
