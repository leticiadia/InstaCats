const { DataTypes } = require("sequelize");

const database = require("../database/connection");

const Publication = database.define("publications", {
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Publication;
