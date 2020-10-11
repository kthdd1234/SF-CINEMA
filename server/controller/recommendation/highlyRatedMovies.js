const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    let { count } = req.query;
    count = count !== undefined ? count : 100;

    movies
      .findAll({
        where: {
          userRating: {
            [Sequelize.Op.lt]: 10,
            [Sequelize.Op.gte]: 8.5,
          },
        },
        order: Sequelize.literal('rand()'),
        limit: Number(count),
        raw: true,
      })
      .then((movieInfo) => {
        res.status(200).send(movieInfo);
      })
      .catch((err) => {
        res.status(404).send(err);
        console.log(err);
      });
  },
};
