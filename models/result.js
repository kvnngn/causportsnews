'use strict';
module.exports = (sequelize, DataTypes) => {
    var Result = sequelize.define('results', {
        team1_name: DataTypes.STRING,
        team2_name: DataTypes.STRING,
        score_1: DataTypes.STRING,
        score_2: DataTypes.STRING,
        logo_1: DataTypes.BLOB,
        logo_2: DataTypes.BLOB,
        user_id: DataTypes.INTEGER,
    }, {freezeTableName: true,
        timestamps: false});
    Result.associate = function(models) {
    };
    return Result;
};