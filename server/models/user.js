'use strict';
require('dotenv').config();

const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.movies, {
        through: 'favoritedMovies',
        foreignKey: 'UserId',
        timestamps: false,
      });
      User.belongsToMany(models.movies, {
        through: 'ratedMovies',
        foreignKey: 'UserId',
        timestamps: false,
      });
    }
  }
  User.init(
    {
      loginID: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      provider: DataTypes.STRING,
      profileImg: DataTypes.TEXT,
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'User',
      hooks: {
        afterValidate: (data) => {
          var shasum = crypto.createHash('sha1');
          let salt = process.env.SALT;
          shasum.update(data.password + salt);
          data.password = shasum.digest('hex');
        },
      },
    }
  );
  return User;
};
