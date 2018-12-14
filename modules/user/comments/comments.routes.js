const router = require("express").Router();
const commentsController = require("./comments.controller");

//patients

router.route("/comment/create").post(commentsController.create);

module.exports = router;
