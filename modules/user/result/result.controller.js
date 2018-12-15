var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:result.controller");
const path = require("path");
const mail = require(path.resolve("./libs/mail"));

//routes
module.exports = {
    create: function (req, res, next) {
        debug("create");

        let team1_name = req.body.team1_name;
        let team2_name = req.body.team2_name;
        let score_1 = req.body.score_1;
        let score_2 = req.body.score_2;
        let logo_1 = req.body.logo_1;
        let logo_2 = req.body.logo_2;

        if (!team1_name || !team2_name || !score_1 || !score_2) {
            return res.status(400).json({'error': 'missing paramaters'});
        }

        // TODO verification

        return models.Result.create({
            team1_name: team1_name,
            team2_name: team2_name,
            score_1: score_1,
            score_2: score_2,
            logo_1: logo_1,
            logo_2: logo_2
        })
            .then(function (newResult) {
                return res.status(201).json({'commentId': newResult.id})
            })
            .catch(function (err) {
                console.log('Error add comment');
                console.log('Log : ' + err);
                return (res.status(500).json({'error': 'cannot add comment'}));
            });
    },
    getResults: function (req, res, next) {
        debug("getResults");

        let results = [];

        return Promise.resolve()
            .then(getArticles)
            .then(() => {
                res.json(results)
            })
            .catch(next);

        function getArticles() {
            return models.Result.findAll()
                .then((_results) => {
                    results = _results
                })
        }
    }
};