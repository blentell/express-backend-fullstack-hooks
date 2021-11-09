const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
	{
		movieTitle: {
			type: String,
		},
		moviePoster: {
			type: String,
    },
    movieLink: {
      type: String,
    },
		movieOwner: {
			type: mongoose.Schema.ObjectId,
			ref: "user",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("movie", MovieSchema);
