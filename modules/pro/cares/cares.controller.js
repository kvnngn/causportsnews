var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:patients.controller");
const path = require("path");
const mail = require(path.resolve("./libs/mail"));

//routes
module.exports = {
    getCares: function(req, res, next) {
        debug("getCares");

        let cares = [];

        return Promise.resolve()
        .then(getPatients)
        .then(() => {res.json(cares)})
        .catch(next);


        function getPatients() {
            return models.Care.findAll()
            .then(function(_cares) {cares = _cares;})
        }
    },
};