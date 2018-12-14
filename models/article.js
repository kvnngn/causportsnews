'use strict';
module.exports = (sequelize, DataTypes) => {
    var Article = sequelize.define('articles', {
        title: DataTypes.STRING,
        introduction: DataTypes.STRING,
        content: DataTypes.STRING,
        type: DataTypes.STRING(100),
        img: DataTypes.BLOB,
        user_id: DataTypes.INTEGER,
    }, {freezeTableName: true,
        timestamps: false});
    Article.associate = function(models) {
        // associations can be defined here
        models.Article.belongsTo(models.User, {
            foreingKey: {
                allowNull: false
            }
        });
        models.Article.hasMany(models.Comment, {
            foreingKey: {
                allowNull: false
            }
        })
    };
    return Article;
};