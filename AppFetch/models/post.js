'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    description: DataTypes.STRING,
    like: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'userId'})
    Post.hasOne(models.Image, {foreignKey: 'postId'})
  };
  return Post;
};