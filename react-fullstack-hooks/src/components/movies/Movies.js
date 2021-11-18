import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Movies.css";
import CheckToken from "../../hooks/CheckToken";
import { useNavigate } from "react-router-dom";
// import Favorites from "./Favorites";

function Movies({ data }) {
	// const { addToFavorites } = Favorites();
	const { checkJwtToken } = CheckToken();
	const navigate = useNavigate();

	async function addToFavorites(movieDetail) {
		console.log(movieDetail);
		try {
			let payload = await axios.post(
				"http://localhost:3001/api/movies/add-favorite",
				{
					movieTitle: movieDetail.Title,
					moviePoster: movieDetail.Poster,
					movieRating: movieDetail.Rating,
				},
				{
					headers: {
						authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
					},
				}
			);
			console.log("payload: ", payload);
		} catch (e) {
			console.log(e.response);
		}
	}
	useEffect(() => {
		if (checkJwtToken()) {
			navigate("/protected-home");
		}
	}, []);
	return (
		<div className="moviePosters">
			{data.map((item) => {
				return (
					<div>
						<button onClick={() => addToFavorites(item.data)}>
							Add to favorites
						</button>
						<p className="title">{item.data.Title}</p>
						<Link to={`/fetch-movie/${item.data.Title}`}>
							<img src={item.data.Poster} alt="movie"></img>
						</Link>
						<p className="imdb">
							<b>IMDB Rating:</b> {item.data.imdbRating}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default Movies;
