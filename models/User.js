const { DataTypes } = require("sequelize");

const database = require("../database/connection");

const User = database.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = User;
