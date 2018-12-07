var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:followups.controller");

//routes
module.exports = {
    getFollowupsByPro: function(req, res, next) {
        debug("getFollowupsByPro");

        let followups = [];

        return Promise.resolve()
        .then(findFollowupLinkedToPro)
        .then(() => {res.json(followups)})
        .catch(next);


        function findFollowupLinkedToPro() {
            return models.Followup.findAll({
                where: {pro_id: req.params.id},
                include: [{
                    model: models.Patient,
                    attributes: {exclude: ['password']}
                }]
            })
            .then(function(_followups) {followups = _followups;})
        }
    },
    create: function(req, res, next) {
        debug("create");

        return Promise.resolve()
        .then(createFollowup)
        .then((followup) => {res.json(followup)})
        .catch(next);


        function createFollowup() {
            console.log(req.body);
            return models.Followup.create({
                cares_id: req.body.cares_id,
                patient_id: req.body.patient_id,
                pro_id: req.body.pro_id,
                status: 'Accepted'
            })
        }
    }
};