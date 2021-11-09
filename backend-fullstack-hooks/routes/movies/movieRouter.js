var express = require("express");
var router = express.Router();
const { isAlpha, isInt } = require("validator");
// bringing in the required utilities
var { jwtMiddleware } = require("../users/lib/authMiddleware");

const {getAllFavoriteMovies, addFavoriteMovies, deleteFavoriteMovies, updateFavoriteMovies } = require('./controller/movieController')

router.post("/add-favorite", jwtMiddleware, addFavoriteMovies);

router.get("/", jwtMiddleware, getAllFavoriteMovies);

router.put("/update-favorite/:id", jwtMiddleware, updateFavoriteMovies);

router.delete("/delete-favorite/:id", jwtMiddleware, deleteFavoriteMovies);


module.exports = router;

