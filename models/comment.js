'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('comments', {
    content: DataTypes.STRING,
    article_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {freezeTableName: true,
    timestamps: false});
    Comment.associate = function(models) {
      // associations can be defined here
    models.Comment.belongsTo(models.User, {
      foreingKey: {
        allowNull: false
      }
    })
  };
  return Comment;
};