const { isAlpha, isInt } = require("validator");

const Movies = require("../model/Movies");
const User = require("../../users/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function getAllFavoriteMovies(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email }).populate("favoriteMovies");
		
		let foundFavoriteMovies = await Movies.find({user: foundUser._id})
res.json({ message: "success", payload: foundFavoriteMovies });
	} catch (e) {
		console.log(e)
	}
	

	
}
async function addFavoriteMovies(req, res) {
	try {
		const { movieTitle, moviePoster, movieRating } = req.body;

		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });

		let createdMovie = new Movies({
			movieTitle: req.body.movieTitle,
			moviePoster: req.body.moviePoster,
			movieRating: req.body.movieRating,
			movieOwner: foundUser._id,
		})
		// let errObj = {};

		// if (!isAlpha(movieTitle)) {
		// 	errObj.movieTitle = "Alphabet ONLY!";
		// }

		// if (Object.keys(errObj).length > 0) {
		// 	return res.status(500).json({
		// 		message: "error",
		// 		error: errObj,
		// 	});
		// }

	
		let savedMovie = await createdMovie.save();

		foundUser.favoriteMovies.push(savedMovie._id);

		await foundUser.save();

		res.json({ message: "success", payload: savedMovie });
	} catch (e) {
		res.status(500).json(errorHandler(e));
	}
}
async function deleteFavoriteMovies(req, res) {
	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });
		let userFavoriteMovieArray = foundUser.favoriteMovies;
		let filterArray = userFavoriteMovieArray.filter(item => item.id.toString() !== req.params.id)

		foundUser.favoriteMovies = filterArray;
		await foundUser.save();
		let deletedMovie = await Movies.findByIdAndRemove(req.params.id);
	
		res.json({
		message: "success",
		payload: deletedMovie,
	});
		
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
