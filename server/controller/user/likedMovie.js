const { User, movies } = require('../../models/index');
const Sequelize = require('sequelize');

module.exports = {
  post: (req, res) => {
    const { loginID, movieId } = req.body;

    User.findOne({
      where: {
        loginID: loginID,
      },
    }).then((userData_1) => {
      if (userData_1 === null) {
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

          await userData_1.addLikedMovie(movieData);
          movies
            .update(
              {
                numberOfLikes: Sequelize.literal('numberOfLikes + 1'),
              },
              {
                where: {
                  id: movieId,
                },
              }
            )
            .then((result) => {
              if (result[0] === 1) {
                User.findOne({
                  where: {
                    loginID: loginID,
                  },
                  include: [
                    {
                      model: movies,
                      as: 'savedMovie',
                    },
                    {
                      model: movies,
                      as: 'likedMovie',
                    },
                    {
                      model: movies,
                      as: 'disLikedMovie',
                    },
                  ],
                })
                  .then((userData_2) => {
                    if (userData_2 === null) {
                      return res.status(404).send('Not Found User');
                    }
                    const profile = userData_2.get({ plain: true });
                    res.status(200).send(profile);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(404).send(err);
                  });
              }
            });
        });
    });
  },
};
