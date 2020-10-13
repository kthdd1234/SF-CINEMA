require('dotenv').config();

const { User } = require('../../models/index');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    let { loginID, password } = req.body;
    let shasum = crypto.createHash('sha1');
    let salt = process.env.SALT;
    shasum.update(password + salt);
    password = shasum.digest('hex');

    User.findOne({
      where: {
        loginID: loginID,
        password: password,
      },
    })
      .then((userInfo) => {
        if (userInfo === null) {
          return res
            .status(404)
            .send('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        }
        const setUserData = userInfo.get({ plain: true });
        const { loginID, password } = setUserData;
        const setUser = { loginID: loginID, password: password };
        const accessToken = jwt.sign(setUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '24h',
        });

        res.status(200).send({ accessToken: accessToken });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
