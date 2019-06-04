'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.STRING
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, {foreignKey: 'userId'})
    Follow.belongsTo(models.User, {foreignKey: 'userId_follow'})
  };
  return Follow;
};