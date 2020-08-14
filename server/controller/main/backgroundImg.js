const { movies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    movies
      .findAll({
        where: {
          backgroundImg: {
            [Sequelize.Op.not]: null,
          },
        },
        raw: true,
        order: Sequelize.literal('rand()'),
      })
      .then((data) => {
        const backgroundImgList = data.reduce((acc, cur) => {
          const backgroundImg = JSON.parse(cur.backgroundImg);
          return acc.concat(backgroundImg);
        }, []);
        res.status(200).send([data, backgroundImgList]);
      });
  },
};
