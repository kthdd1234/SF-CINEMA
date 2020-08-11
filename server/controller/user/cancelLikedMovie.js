const { User, likedMovies } = require('../../models/index');

module.exports = {
  post: (req, res) => {
    const { movieId, loginID } = req.body;

    User.findOne({
      where: {
        loginID: loginID,
      },
    })
      .then((userData) => {
        if (userData === null) {
          return res.status(404).send('Not found User');
        }
        const userId = userData.get({ plain: true }).id;
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