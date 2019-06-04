'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    FbId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {foreignKey: 'userId'})
    User.hasMany(models.Comment, {foreignKey: 'userId'})
    User.hasMany(models.Follow, {foreignKey: 'userId'})
    User.hasMany(models.Follow, {foreignKey: 'userId_follow'})
  };
  return User;
};