'use strict';

const { NOW } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'firstUser@gmail.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
      
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
