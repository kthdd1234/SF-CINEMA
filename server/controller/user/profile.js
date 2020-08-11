const {
  User,
  savedMovies,
  likedMovies,
  disLikedMovies,
  movies,
} = require('../../models/index');

module.exports = {
  get: (req, res) => {
    const { loginID, password } = req;
    console.log(loginID, password);

    User.findOne({
      where: {
        loginID: loginID,
        password: password,
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
      .then((userInfo) => {
        if (userInfo === null) {
          return res.status(404).send('유저의 정보가 존재하지 않습니다.');
        }
        let profile = userInfo.get({ plain: true });
        res.status(200).send(profile);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
