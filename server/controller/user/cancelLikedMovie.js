const { User, likedMovies, movies } = require('../../models/index');
const Sequelize = require('sequelize');

module.exports = {
  delete: (req, res) => {
    const { movieId, loginID } = req.body;

    User.findOne({
      where: {
        loginID: loginID,
      },
    })
      .then(async (userData_1) => {
        if (userData_1 === null) {
          return res.status(404).send('Not found User');
        }
        const userId = userData_1.get({ plain: true }).id;

        await movies
          .update(
            {
              numberOfLikes: Sequelize.literal('numberOfLikes - 1'),
            },
            {
              where: {
                id: movieId,
              },
            }
          )
          .then((update_result) => {
            if (update_result[0] === 1) {
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

        likedMovies
          .destroy({
            where: {
              movieId: movieId,
              UserId: userId,
            },
          })
          .then((destroy_result) => {
            if (destroy_result === 0) {
              return res.status(404).send('Not Destory likedMovie');
            }
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
