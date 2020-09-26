const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    movies
      .findAll({
        order: Sequelize.literal('rand()'),
        limit: 6,
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
