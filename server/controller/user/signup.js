const { User } = require('../../models/index');

module.exports = {
  post: (req, res) => {
    const { loginID, password, username, provider, profileImg } = req.body;

    User.findOrCreate({
      where: {
        loginID: loginID,
      },
      defaults: {
        username: username,
        password: password,
        profileImg: profileImg,
        provider: provider,
      },
      raw: true,
    })
      .then((userInfo) => {
        if (!userInfo[1]) {
          return res.status(409).send('이미 회원가입한 계정입니다.');
        }
        res.status(200).send('회원가입 완료!');
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
