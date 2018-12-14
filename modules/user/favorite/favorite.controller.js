var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:favorite.controller");
const path = require("path");
const mail = require(path.resolve("./libs/mail"));

//routes
module.exports = {
    create: function (req, res, next) {
        debug("create");
        console.log(req.body);

        let user_id = req.body.user_id;
        let article_id = req.body.article_id;


        if (!user_id || !article_id) {
            return res.status(400).json({'error': 'missing paramaters'});
        }

        // TODO verification

        return models.Favorite.create({
            user_id: user_id,
            article_id: article_id
        })
            .then(function (newFavorite) {
                return res.status(201).json({'favoriteId': newFavorite.id})
            })
            .catch(function (err) {
                console.log('Error add favorite');
                console.log('Log : ' + err);
                return (res.status(500).json({'error': 'cannot add favorite'}));
            });
    },
    getUserFavorites: function (req, res, next) {
        debug("getUserFavorites");

        let results = [];

        return Promise.resolve()
            .then(getFavorites)
            .then(() => {
                res.json(results)
            })
            .catch(next);

        function getFavorites() {
            console.log(req.params);
            return models.Favorite.findAll({
                    where: {user_id: req.params.id},
                    include: [{
                        model: models.Article
                    }]
                }
            )
                .then((_results) => {
                    results = _results
                })
        }
    },
    deleteFavorite: function (req, res, next) {
        debug("deleteFavorite");

        return Promise.resolve()
            .then(getFavorites)
            .then(() => {res.json('OK')})
            .catch(next);

        function getFavorites() {
            console.log(req.params);
            return models.Favorite.destroy({where: {id: req.params.id}});
        }
    }
};