const router = require("express").Router();
const favoriteController = require("./favorite.controller");

//patients

router.route("/favorite/create").post(favoriteController.create);
router.route("/favorites/id/:id").get(favoriteController.getUserFavorites);
router.route("/favorite/delete/id/:id").delete(favoriteController.deleteFavorite);

module.exports = router;
