const router = require("express").Router();
const proController = require("./followups.controller");

//patients
router.route("/pro/followups/proId/:id").get(proController.getFollowupsByPro);
router.route("/pro/followup/new").post(proController.create);

module.exports = router;
