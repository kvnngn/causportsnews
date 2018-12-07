'use strict';
module.exports = (sequelize, DataTypes) => {
    var Article = sequelize.define('articles', {
            title: DataTypes.STRING(100),
            content: DataTypes.STRING,
            introduction: DataTypes.STRING,
            img: DataTypes.BLOB,
            type: DataTypes.STRING(100),
        },
        {
            freezeTableName: true,
            timestamps: false
        });
    Article.associate = function (models) {
        // associations can be defined here
        models.Article.hasMany(models.Comment)
    };
    return Article;
};
