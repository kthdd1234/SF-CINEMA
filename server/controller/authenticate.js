require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  authenticateToken: function (req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.status(401).send('Unauthorized');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      const { loginID, password } = user;
      if (err) return res.status(403).send('Forbidden');
      req.loginID = loginID;
      req.password = password;
      next();
    });
  },
};
