const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    movies
      .findAll({
        where: {
          releaseDate: {
            [Sequelize.Op.lt]: 20220000,
            [Sequelize.Op.gte]: 20200000,
          },
        },
        order: [['releaseDate', 'DESC']],
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
