const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    let { yearCount, yearunder, yearmoreThen } = req.query;

    movies
      .findAll({
        where: {
          releaseDate: {
            [Sequelize.Op.lt]: Number(yearunder),
            [Sequelize.Op.gte]: Number(yearmoreThen),
          },
        },
        order: [['releaseDate', 'DESC']],
        limit: Number(yearCount),
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
