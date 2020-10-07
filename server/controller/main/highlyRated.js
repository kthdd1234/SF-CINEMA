const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    let { under, moreThen, count } = req.query;
    count = count !== undefined ? count : 100;

    movies
      .findAll({
        where: {
          userRating: {
            [Sequelize.Op.lt]: Number(under),
            [Sequelize.Op.gte]: Number(moreThen),
          },
        },
        order: [['userRating', 'DESC']],
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
