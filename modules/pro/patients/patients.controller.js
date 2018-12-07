var bcrypt = require("bcrypt");
var jwtUtils = require('../../../utils/jwt.utils');
var models = require("../../../models/index");
const debug = require("debug")("app:patients.controller");
const path = require("path");
const mail = require(path.resolve("./libs/mail"));

//routes
module.exports = {
    getPatientsByPro: function(req, res, next) {
        debug("getPatientsByPro");

        let followups = [];
        let patients = [];

        return Promise.resolve()
        .then(findFollowupLinkedToPro)
        .then(getUniquePatients)
        .then(() => {res.json(patients)})
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

        function getUniquePatients() {
            patients = followups.filter((followup) => {return followup.patient;});
        }

    },
    getPatients: function(req, res, next) {
        debug("getPatients");

        let patients = [];

        return Promise.resolve()
        .then(getPatients)
        .then(() => {res.json(patients)})
        .catch(next);


        function getPatients() {
            return models.Patient.findAll({attributes: {exclude: ['password']}})
            .then(function(_patients) {patients = _patients;})
        }
    },
    addPatient: function(req, res, next) {
        debug("addPatient");

        var email = req.body.email;
        var password = req.body.password;
        var civ = req.body.civility;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var birthdate = req.body.birthdate;
        var pro_id = req.body.pro_id;

        if(!email || !password || !civ || !firstname || !lastname || !birthdate || !pro_id) {
            return res.status(400).json({'error': 'missing paramaters'});
        }

        // TODO verification

        return models.Patient.find({
            attributes: ['email'],
            where: {email: email}
        })
        .then(function(patientFound) {
            if(!patientFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    var newPatient = models.Patient.create({
                        email: email,
                        pass: bcryptedPassword,
                        civ: civ,
                        firstname: firstname,
                        lastname: lastname,
                        birthdate: birthdate
                    })
                    .then(function(newPatient) {
                        return res.status(201).json({'patientId': newPatient.id})
                    })
                    .catch(function(err) {
                        console.log('Error add patient');
                        console.log('Log : ' + err);
                        return (res.status(500).json({'error': 'cannot add patient'}));
                    });
                });
            } else {
                return res.status(409).json({'error': 'patient already exist'});
            }
        })
        .catch(function(err) {
            console.log('Error verify patient:');
            console.log('Log : ' + err);
            return res.status(500).json({'error': 'unable to verify patient'});
        });
    },
    getPatientById: function(req, res, next) {
        debug("getPatientById");

        return models.Patient.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(patient) { return res.json(patient); })
        .catch(next);
    },
    updatePatient: function(req, res, next) {
        debug("updatePatient");

        console.log(req.body);
        return models.Patient.update(req.body, { where: {id: req.body.id} })
        .then(function(patient) { return res.json(patient); })
        .catch(next);
    },

    resetPassword: function(req, res, next) {
        debug("updatePatient");

        let patient = null;

        models.Patient.findById(req.body.id)
        .then(function(_patient) { patient = _patient; })
        .then(function() { return patient.resetPassword(); })
        .then(function(newPassword) {
            return mail.send("patients/reset-password", {
                to: patient.firstname + " " + patient.lastname + "<" + patient.email + ">",
                subject: "Reinitialisation de votre mot de passe",
                password: newPassword
            });
        })
        .then(() => { res.json({ok:true})})
        .catch(next);
    }
};