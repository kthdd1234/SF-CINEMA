const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const { count } = req.query;

    movies
      .findAll({
        order: Sequelize.literal('rand()'),
        limit: Number(count),
        raw: true,
      })
      .then((movie_Data) => {
        res.status(200).send(movie_Data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
