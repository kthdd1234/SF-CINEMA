const { User, movies, likedMovies } = require('../../models/index');

module.exports = {
  post: (req, res) => {
    const { loginID, movieId } = req.body;

    User.findOne({
      where: {
        loginID: loginID,
      },
    }).then((userData) => {
      if (userData === null) {
        return res.status(404).send('Not found User');
      }
      const userId = userData.get({ plain: true }).id;

      likedMovies
        .findOne({
          where: {
            UserId: userId,
            movieId: movieId,
          },
        })
        .then((info) => {
          if (info !== null) {
            const data = info.get({ plain: true });
            likedMovies.destroy({
              where: {
                UserId: data.UserId,
                movieId: data.movieId,
              },
            });
          }
        });

      movies
        .findOne({
          where: {
            id: movieId,
          },
        })
        .then((movieData) => {
          if (movieData === null) {
            return res.status(404).send('Not found Movie');
          }
          userData.addDisLikedMovie(movieData);
          res.status(200).send('dislikedMovie Completed!');
        });
    });
  },
};
