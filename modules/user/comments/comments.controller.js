var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:articles.controller");
const path = require("path");
const mail = require(path.resolve("./libs/mail"));

//routes
module.exports = {
    create: function (req, res, next) {
        debug("create");
        console.log(req.body);

        var content = req.body.content;
        var article_id = req.body.article_id;
        var user_id = req.body.user_id;

        if (!content || !article_id || !user_id) {
            return res.status(400).json({'error': 'missing paramaters'});
        }

        // TODO verification

        console.log(req.body);
        return models.Comment.create({
            content: content,
            article_id: article_id,
            user_id: user_id
        })
            .then(function (newComment) {
                return res.status(201).json({'commentId': newComment.id})
            })
            .catch(function (err) {
                console.log('Error add comment');
                console.log('Log : ' + err);
                return (res.status(500).json({'error': 'cannot add comment'}));
            });
    }
};