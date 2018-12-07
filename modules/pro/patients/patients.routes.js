const router = require("express").Router();
const proController = require("./patients.controller");

//patients
router.route("/pro/patients/proId/:id").get(proController.getPatientsByPro);
router.route("/pro/patients").get(proController.getPatients);
router.route("/pro/patient/create/").post(proController.addPatient);
router.route("/pro/patient/id/:id").get(proController.getPatientById);
router.route("/pro/patient/update").put(proController.updatePatient);
router.route("/pro/patient/resetPassword").put(proController.resetPassword);

module.exports = router;
