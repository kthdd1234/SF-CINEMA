const { User, likedMovies, movies } = require('../../models/index');
const Sequelize = require('sequelize');

module.exports = {
  post: (req, res) => {
    const { movieId, loginID } = req.body;

    User.findOne({
      where: {
        loginID: loginID,
      },
    })
      .then(async (userData) => {
        if (userData === null) {
          return res.status(404).send('Not found User');
        }
        const userId = userData.get({ plain: true }).id;

        await movies.update(
          {
            numberOfLikes: Sequelize.literal('numberOfLikes - 1'),
          },
          {
            where: {
              id: movieId,
            },
          }
        );

        likedMovies
          .destroy({
            where: {
              movieId: movieId,
              UserId: userId,
            },
          })
          .then(() => {
            res.status(200).send('cancel likedMovies');
          })
          .catch((err) => {
            res.status(404).send(err);
          });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
