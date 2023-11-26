const { DataTypes } = require("sequelize");

const User = require("../models/User");
const Publication = require("../models/Publication");

const database = require("../database/connection");

const Like = database.define("likes", {});

Like.belongsTo(User);
Like.belongsTo(Publication);

User.hasMany(Like);
Publication.hasMany(Like);

module.exports = Like;
