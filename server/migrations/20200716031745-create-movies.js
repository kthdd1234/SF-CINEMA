'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      titleEng: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      nation: {
        type: Sequelize.STRING,
      },
      plot: {
        type: Sequelize.TEXT,
      },
      posters: {
        type: Sequelize.TEXT,
      },
      actors: {
        type: Sequelize.TEXT,
      },
      releaseDate: {
        type: Sequelize.STRING,
      },
      runtime: {
        type: Sequelize.STRING,
      },
      ratingGrade: {
        type: Sequelize.STRING,
      },
      userRating: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movies');
  },
};
