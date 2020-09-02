const { User, movies } = require('../../models/index');
const Sequelize = require('sequelize');

module.exports = {
  post: (req, res) => {
    const { loginID, movieId } = req.body;
    console.log(loginID);

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
        .then(async (movieData) => {
          if (movieData === null) {
            return res.status(404).send('Not found Movie');
          }

          await userData.addLikedMovie(movieData);
          movies.update(
            {
              numberOfLikes: Sequelize.literal('numberOfLikes + 1'),
            },
            {
              where: {
                id: movieId,
              },
            }
          );
          res.status(200).send('likedMovie Completed!');
        });
    });
  },
};
