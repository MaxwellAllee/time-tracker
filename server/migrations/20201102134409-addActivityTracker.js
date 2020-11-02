'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const week = await queryInterface.addColumn('Users', 'week', {type:Sequelize.INTEGER, allowNull: false}, { after: 'password' });
    const day = await queryInterface.addColumn('Users', 'day', {type:Sequelize.INTEGER, allowNull: false}, { after: 'week' });
    const activity = await queryInterface.addColumn('Users', 'activity', {type:Sequelize.INTEGER, allowNull: false}, { after: 'day' });
  },

  down: async (queryInterface, Sequelize) => {
    const week = await queryInterface.removeColumn('Users', 'week');
    const day = await queryInterface.removeColumn('Users', 'day');
    const activity = await queryInterface.removeColumn('Users', 'activity');
  }
};
