const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    const { keyword } = req.query;

    movies
      .findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              title: {
                [Sequelize.Op.like]: '%' + keyword + '%',
              },
            },
            {
              titleEng: {
                [Sequelize.Op.like]: '%' + keyword + '%',
              },
            },
          ],
        },
        order: [['releaseDate', 'DESC']],
        raw: true,
      })
      .then((movieData) => {
        if (movieData.length === 0) {
          return res.status(200).send('Not Found');
        }
        res.status(200).send(movieData);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
