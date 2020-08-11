const { User, disLikedMovies } = require('../../models/index');

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
        disLikedMovies
          .destroy({
            where: {
              movieId: movieId,
              UserId: userId,
            },
          })
          .then(() => {
            res.status(200).send('cancel disLikedMovies');
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
