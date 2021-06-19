const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const File = sequelize.define("file", {
  type: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.BLOB("long"),
  },
  Version: Sequelize.STRING,
  RepositoryURL: Sequelize.STRING,
  Actor: Sequelize.STRING,

});

module.exports = File;
