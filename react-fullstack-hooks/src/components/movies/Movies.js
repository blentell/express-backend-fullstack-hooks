import React from "react";
import GetMoviesHooks from "../../hooks/GetMoviesHooks";
import { Link } from "react-router-dom";
import "./Movies.css"

function Movies() {
  const [search, data, error] = GetMoviesHooks();

  return (
		<div className="moviePosters">
      {data.map((item) => {
				return (
					<div>
						<label className="favoriteLabel">
							Favorite
						</label>
						<input type="checkbox" className="favorite" name="Favorite"></input>
						<p className="title">{item.data.Title}</p>
						<Link to={`/fetch-movie/${item.data.Title}`}>
							<img src={item.data.Poster} alt="movie"></img>
						</Link>
						<p className="imdb"><b>IMDB Rating:</b> {item.data.imdbRating}</p>
					</div>
				);
			})}
		</div>
	);
}
 

export default Movies;
