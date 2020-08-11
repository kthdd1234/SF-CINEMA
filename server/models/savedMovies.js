const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class savedMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  savedMovies.init(
    {
      movieId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'savedMovies',
      timestamps: false,
    }
  );
  return savedMovies;
};
