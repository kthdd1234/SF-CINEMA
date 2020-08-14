const { movies } = require('../../models');

module.exports = {
  get: (req, res) => {
    const { seriesName } = req.query;

    movies
      .findAll({
        where: {
          seriesName: seriesName,
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
