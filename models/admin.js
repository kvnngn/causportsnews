'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('admins', {
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(200),
    firstname: DataTypes.STRING(100),
    lastname: DataTypes.STRING(100),
  }, {freezeTableName: true,
    timestamps: false});
    Admin.associate = function(models) {
    // associations can be defined here
    models.Admin.hasMany(models.Article);
  };
  return Admin;
};
