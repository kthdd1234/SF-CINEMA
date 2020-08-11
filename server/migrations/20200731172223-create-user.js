'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('movies', 'videoId', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
