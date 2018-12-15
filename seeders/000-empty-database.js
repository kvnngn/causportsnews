"use strict";
const config = require("../config");


module.exports = {
    up: function(queryInterface, Sequelize) {
        return module.exports.down(queryInterface, Sequelize);
    },

    down: function(queryInterface, Sequelize) {
        return Promise.resolve()
        .then(() => queryInterface.bulkDelete("articles"))
        .then(() => queryInterface.bulkDelete("comments"))
        .then(() => queryInterface.bulkDelete("favorites"))
        .then(() => queryInterface.bulkDelete("results"))
        .then(() => queryInterface.bulkDelete("users"))

    }
};
