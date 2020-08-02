const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    const { count } = req.query;
    movies
      .findAll({
        where: {
          releaseDate: {
            [Sequelize.Op.lt]: 20060000,
          },
        },
        order: Sequelize.literal('rand()'),
        limit: Number(count),
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
