const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likedMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  likedMovies.init(
    {
      movieId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'likedMovies',
      timestamps: false,
    }
  );
  return likedMovies;
};
