'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'profileImg', {
      type: Sequelize.STRING,
      allNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
