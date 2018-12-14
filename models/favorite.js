'use strict';
module.exports = (sequelize, DataTypes) => {
    var Favorite = sequelize.define('favorites', {
        article_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        timestamps: false
    });
    Favorite.associate = function (models) {
        // associations can be defined here
        models.Favorite.belongsTo(models.Article, {
            foreingKey: {
                allowNull: false
            }
        });
        models.Favorite.belongsTo(models.User, {
            foreingKey: {
                allowNull: false
            }
        })
    };
    return Favorite;
};