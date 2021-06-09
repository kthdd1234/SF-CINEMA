const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    movies
      .findAll({
        attributes: ['backDrop'],
        raw: true,
        order: Sequelize.literal('rand()'),
      })

      .then((data) => {
        res.status(200).send(data);
      });
  },
};
