import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/movies/Movies.css";
import CheckToken from "./CheckToken";
import { useNavigate } from "react-router-dom";
import Favorites from "../components/movies/Favorites"

function FavoriteMovies({ data }) {
  const { checkJwtToken } = CheckToken();
  // const [movies, favorites] = Favorites();
	const navigate = useNavigate();
	useEffect(() => {
		if (checkJwtToken()) {
			navigate("/protected-home/favorites");
		}
	}, []);
	return (
		<div className="moviePosters">
			{data.map((item) => {
				return (
					<div>
						<label className="favoriteLabel">Favorite</label>
						<input type="checkbox" className="favorite" name="Favorite"></input>
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

export default FavoriteMovies;
