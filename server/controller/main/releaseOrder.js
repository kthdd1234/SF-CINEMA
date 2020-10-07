const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    let { under, moreThen } = req.query;
    console.log(under, moreThen);

    movies
      .findAll({
        where: {
          releaseDate: {
            [Sequelize.Op.lt]: Number(under),
            [Sequelize.Op.gte]: Number(moreThen),
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
