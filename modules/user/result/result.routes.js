const router = require("express").Router();
const resultsController = require("./result.controller");

//patients

router.route("/result/create").post(resultsController.create);
router.route("/results").get(resultsController.getResults);

module.exports = router;
