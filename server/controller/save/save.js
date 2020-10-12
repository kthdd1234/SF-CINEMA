const { User, movies, savedMovies } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  post: (req, res) => {
    const { userId, movieId } = req.body;

    User.findOne({
      where: {
        id: userId,
      },
    })
      .then((userData_1) => {
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

            await userData_1.addSavedMovie(movieData);

            User.findOne({
              where: {
                id: userId,
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
                res.status(404).send(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).send(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  },
  delete: (req, res) => {
    const { userId, movieId } = req.body;

    User.findOne({
      where: {
        id: userId,
      },
    })
      .then((userData_1) => {
        if (userData_1 === null) {
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
            savedMovies
              .destroy({
                where: {
                  movieId: movieId,
                  UserId: userId,
                },
              })
              .then((destroy_result) => {
                if (destroy_result === 0) {
                  return res.status(404).send('Not Destroy saveedMovie');
                }
                User.findOne({
                  where: {
                    id: userId,
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
                    res.status(404).send(err);
                  });
              })
              .catch((err) => {
                res.status(404).send(err);
              });
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
