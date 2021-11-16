import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./Movies.css"
import CheckToken from "../../hooks/CheckToken";
import { useNavigate } from "react-router-dom";
import Favorites from "../../hooks/Favorites"

function Movies({data}) {
	const { addToFavorites } = Favorites();
	const { checkJwtToken } = CheckToken();
	const navigate = useNavigate();
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
						<label className="favoriteLabel">
							Favorite
						</label>
						<input type="checkbox" onChange={addToFavorites}className="favorite" name="Favorite"></input>
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
