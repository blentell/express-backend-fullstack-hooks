import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import FavoriteMovies from "../../hooks/FavoriteMovies";
import CheckToken from "../../hooks/CheckToken";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
	useEffect(async () => {
		getFavoriteMovies();
	}, []);

	async function getFavoriteMovies() {
		try {
			let payload = await axios.get("http://localhost:3001/api/movies/", {
				headers: {
					authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
				},
			});      
      setFavoriteMovies(payload.data.payload);
		} catch (e) {
			console.log(e);
		}
  }
  async function deleteFavoriteMovies(movieID) {
		try {
			console.log(favoriteMovies);
			let payload = await axios.delete(
				`http://localhost:3001/api/movies/delete-favorite/${movieID}`,

				{
					headers: {
						authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
					},
				}
			);
			let newFavoriteMovie = [...favoriteMovies];

			let filteredMovieArray = newFavoriteMovie.filter(
				(item) => item._id !== payload.data.payload._id
			);
			console.log(payload.data.payload);
			setFavoriteMovies(filteredMovieArray);
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<div className="moviePosters">
			{favoriteMovies.map((item) => {
				return (
          <div>
            <button onClick={() => deleteFavoriteMovies(item._id)}>Delete</button>
						<p className="title">{item.movieTitle}</p>
						<Link to={`/fetch-movie/${item.movieTitle}`}>
							<img src={item.moviePoster} alt="movie"></img>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default Favorites;
