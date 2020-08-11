const { User, movies } = require('../../models/index');

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
          userData.addSavedMovie(movieData);
          res.status(200).send('savedMovie Completed!');
        });
    });
  },
};
