var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:auth.controller");

//routes
module.exports = {
    register: function(req, res, next) {
        debug("register");

        var email = req.body.email;
        var password = req.body.password;
        var civ = req.body.civility;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var city = req.body.city;
        var phone = req.body.phone;
        var type = req.body.type;

        if(!email || !password || !civ || !firstname || !lastname || !city || !phone) {
            return res.status(400).json({'error': 'missing paramaters'});
        }

        // TODO verification

        return models.User.find({
            attributes: ['email'],
            where: {email: email}
        })
        .then(function(userFound) {
            console.log(userFound)
            if(!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    var newUser = models.User.create({
                        email: email,
                        password: bcryptedPassword,
                        civility: civ,
                        firstname: firstname,
                        lastname: lastname,
                        city: city,
                        phone: phone
                    })
                    .then(function(newUser) {
                        return res.status(201).json({'userId': newUser.id})
                    })
                    .catch(function(err) {
                        console.log('Error add user');
                        console.log('Log : ' + err);
                        return (res.status(500).json({'error': 'cannot add user'}));
                    });
                });
            } else {
                return res.status(409).json({'error': 'user already exist'});
            }
        })
        .catch(function(err) {
            console.log('Error verify user:');
            console.log('Log : ' + err);
            return res.status(500).json({'error': 'unable to verify user'});
        });
    },
    login: function(req, res, next) {
        debug("login");

        var email = req.body.email;
        var password = req.body.password;

        if(email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        return Promise.resolve()
            .then(login())
            .catch(next);

        function login() {
            return models.User.find({
                exclude: ['password'],
                where: {email: email}
            })
                .then(function(userFound) {
                    if(userFound) {
                        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                            if(resBycrypt) {
                                return res.status(200).json({
                                    'user': userFound,
                                    'token': jwtUtils.generateTokenForUser(userFound)
                                });
                            }
                            else {return res.status(403).json({"error": "invalid password"});}
                        });
                    }
                    else {return res.status(404).json({'error': 'user not exist in DB'});}
                })
                .catch(function(err) {
                    return res.status(500).json({'error': 'unable to verify user'});
                });
        }
    }
};