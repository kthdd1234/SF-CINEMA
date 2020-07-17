'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movies.init(
    {
      title: DataTypes.STRING,
      titleEng: DataTypes.STRING,
      director: DataTypes.STRING,
      nation: DataTypes.STRING,
      plot: DataTypes.TEXT,
      posters: DataTypes.TEXT,
      actors: DataTypes.TEXT,
      releaseDate: DataTypes.INTEGER,
      runtime: DataTypes.STRING,
      ratingGrade: DataTypes.STRING,
      userRating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'movies',
      timestamps: false,
    }
  );
  return movies;
};
