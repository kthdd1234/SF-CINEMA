const { movies } = require('../../models/index');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const { genre, limit } = req.query;
    const count = limit ? limit : 100;

    movies
      .findAll({
        where: {
          genre: genre,
        },
        limit: Number(count),
        raw: true,
        order: Sequelize.literal('rand()'),
      })
      .then((movieData) => {
        if (movieData.length === 0) {
          return res.status(404).send('Not Found');
        }
        res.status(200).send(movieData);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
