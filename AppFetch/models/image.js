'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    urlImage: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Post, {foreignKey: 'postId'})
    Image.hasMany(models.Comment, {foreignKey: 'imageId'})
  };
  return Image;
};