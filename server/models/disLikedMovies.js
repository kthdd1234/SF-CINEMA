const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class disLikedMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  disLikedMovies.init(
    {
      movieId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'disLikedMovies',
      timestamps: false,
    }
  );
  return disLikedMovies;
};
