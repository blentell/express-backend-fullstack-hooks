const { isAlpha, isInt } = require("validator");

const Movies = require("../model/Movies");
const User = require("../../users/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function getAllFavoriteMovies(req, res) {
	let foundAllMovies = await Movies.find({});

	res.json({ message: "success", payload: foundAllMovies });
}
async function addFavoriteMovies(req, res) {
	try {
		const { movieTitle, moviePoster, movieLink } = req.body;

		let errObj = {};

		if (!isAlpha(movieTitle)) {
			errObj.movieTitle = "Alphabet ONLY!";
		}

		if (Object.keys(errObj).length > 0) {
			return res.status(500).json({
				message: "error",
				error: errObj,
			});
		}

		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });

		const addedMovie = new Movie({
			movieTitle,
			moviePoster,
			movieLink,
			movieOwner: foundUser._id,
		});

		let savedMovie = await addedMovie.save();

		foundUser.favoriteMovies.push(savedMovie._id);

		await foundUser.save();

		res.json({ message: "success", addedMovie });
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function deleteFavoriteMovies(req, res) {
	try {
		let deletedMovie = await Movies.findByIdAndRemove(req.params.id);

		if (!deletedMovie) {
			return res
				.status(404)
				.json({ message: "failure", error: "record not found" });
		} else {
			const decodedData = res.locals.decodedData;

			let foundUser = await User.findOne({ email: decodedData.email });

			let userFavoriteMovieArray = foundUser.favoriteMovies;

			let filteredFavoriteMovieArray = userFavoriteMovieArray.filter(
				(item) => item._id.toString() !== req.params.id
			);

			foundUser.favoriteMovies = filteredFavoriteMovieArray;

			await foundUser.save();

			res.json({
				message: "success",
				deleted: deletedMovie,
			});
		}
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function updateFavoriteMovies(req, res) {
	try {
		let foundMovie = await Movies.findById(req.params.id);

		if (!foundMovie) {
			res.status(404).json({ message: "failure", error: "Movie not found" });
		} else {
			let updatedMovie = await Movies.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);

			res.json({ message: "success", payload: updatedMovie });
		}
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}

module.exports = {
	getAllFavoriteMovies,
	addFavoriteMovies,
	deleteFavoriteMovies,
	updateFavoriteMovies,
};
