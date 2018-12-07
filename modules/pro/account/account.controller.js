var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:account.controller");

//routes
module.exports = {
    update: function(req, res, next) {
        debug("update");

        const updateUser = req.body;
        return models.User.update(updateUser,{where: {id: updateUser.id}})
        .then(function(user) { return res.json(user); })
        .catch(function(err) {
            console.log('Error verify user:');
            console.log('Log : ' + err);
            return res.status(500).json({'error': 'unable to verify user'});
        });
    },
    updateEmail: function(req, res, next) {
        debug("updateEmail");

        const email = req.body.email;

        return models.User.update(
            {email: email},
            {where: {id: req.body.user_id}}
        )
        .then(function() { return res.json({res: "OK"}); })
        .catch(function(err) {
            console.log('Error verify user:');
            console.log('Log : ' + err);
            return res.status(500).json({'error': 'unable to verify user'});
        });
    },
    updatePassword: function(req, res, next) {
        debug("updatePassword");
        bcrypt.hash(req.body.currentPassword, 5, function(err, bcryptedPassword) {
            return models.User.find({where: {id: req.body.user_id}})
            .then(function(userFound) {
                bcrypt.compare(req.body.currentPassword, userFound.pass, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        bcrypt.hash(req.body.newPassword, 5, function(err, bcryptedPassword) {
                            return models.User.update(
                                {pass: bcryptedPassword},
                                {where: {id: req.body.user_id}}
                            )
                            .then(function() { return res.json("OK"); })
                        });
                    }
                    else {return res.status(403).json({"error": "invalid password"});}
                });
            })
            .catch(next);
        });
    }
};