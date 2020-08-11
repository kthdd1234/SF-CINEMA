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
      movies.belongsToMany(models.User, {
        as: 'savedMovie',
        through: 'savedMovies',
        foreignKey: 'movieId',
        timestamps: false,
      });
      movies.belongsToMany(models.User, {
        as: 'likedMovie',
        through: 'likedMovies',
        foreignKey: 'movieId',
        timestamps: false,
      });
      movies.belongsToMany(models.User, {
        as: 'disLikedMovie',
        through: 'disLikedMovies',
        foreignKey: 'movieId',
        timestamps: false,
      });
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
      seriesName: DataTypes.STRING,
      videoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'movies',
      timestamps: false,
    }
  );
  return movies;
};
