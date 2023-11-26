const { DataTypes } = require("sequelize");

const User = require("./User");
const Publication = require("./Publication");

const database = require("../database/connection");

const Comment = database.define("comments", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Comment.belongsTo(User);
Comment.belongsTo(Publication);

User.hasMany(Comment);
Publication.hasMany(Comment);

module.exports = Comment;
