const router = require("express").Router();
const articleController = require("./articles.controller");

//patients
router.route("/articles").get(articleController.getArticles);
router.route("/article/id/:id").get(articleController.getArticleById);
router.route("/articles/categorie/:categorie").get(articleController.getArticlesByCategorie);
router.route("/article/create").post(articleController.create);

module.exports = router;
