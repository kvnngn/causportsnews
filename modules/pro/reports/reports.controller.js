var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:reports.controller");

//routes
module.exports = {
    getReportsByPro: function(req, res, next) {
        debug("getReportsByPro");

        console.log(req.params.id);
        return models.Report_pro.findAll(
            {
                where: {pro_id: req.params.id},
                attributes: ['creation_date', 'content'],
                include: [{
                    model: models.Patient,
                    attributes: {exclude: ['password']}
                }]
            }
        )
        .then(function(reports) { return res.json(reports); })
        .catch(next);
    }, getReportsByPatient: function(req, res, next) {
        debug("getReportsByPatient");

        console.log(req.params.id);
        return models.Report_pro.findAll(
            {
                where: {patient_id: req.params.id},
                attributes: ['creation_date', 'content'],
                include: [{
                    model: models.Patient,
                    attributes: {exclude: ['password']}
                }]
            }
        )
        .then(function(reports) { return res.json(reports); })
        .catch(next);
    },
    create: function(req, res, next) {
        debug("create");

        return Promise.resolve()
        .then(createReport)
        .then((followup) => {res.json(followup)})
        .catch(next);


        function createReport() {
            return models.Report_pro.create({
                date: req.body.date,
                patient_id: req.body.patient_id,
                pro_id: req.body.pro_id,
                content: req.body.content
            })
        }
    }

};