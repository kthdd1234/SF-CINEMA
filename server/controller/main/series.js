const { movies } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  get: (req, res) => {
    const { tilte } = req.query;
    movies
      .findAll({
        where: {
          title: {
            [Op.like]: '%' + tilte + '%',
          },
        },
        order: [['releaseDate', 'ASC']],
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
