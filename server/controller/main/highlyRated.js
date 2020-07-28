const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: async (req, res) => {
    // count 데이터 갯수
    // moreThen 데이터 정보 구분
    let { ratedCount, ratedmoreThen, ratedunder } = req.query;

    movies
      .findAll({
        where: {
          userRating: {
            [Sequelize.Op.lt]: Number(ratedunder),
            [Sequelize.Op.gte]: Number(ratedmoreThen),
          },
        },
        order: [['userRating', 'DESC']],
        limit: Number(ratedCount),
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
