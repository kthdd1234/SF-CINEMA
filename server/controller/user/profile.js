const { User, movies } = require('../../models/index');

module.exports = {
  get: (req, res) => {
    const { loginID, password } = req;

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
      ],
    })
      .then((userData) => {
        if (userData === null) {
          return res.status(404).send('유저의 정보가 존재하지 않습니다.');
        }
        let profile = userData.get({ plain: true });
        res.status(200).send(profile);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
