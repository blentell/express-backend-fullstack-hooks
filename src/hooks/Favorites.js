import React, { useState, useEffect } from "react";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import FavoriteMovies from "./FavoriteMovies";
import CheckToken from "./CheckToken";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
	const { checkJwtToken } = CheckToken();  

  useEffect(async () => {
    if (checkJwtToken()) {
      await axios
        .get("http://localhost:3001/api/movies/")
        .then((res) => {
          setMovies(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
      },[]);

  const addToFavorites = (movies) => {
    setFavorites([...favorites, movies]);
    console.log("its work?");
  };


  return <FavoriteMovies movies={movies} addToFavorites={addToFavorites} />;
  
}

	
// 	useEffect(async () => {
// 		await axios
// 			.get("http://localhost:3001/api/movies/")
// 			.then((res) => {
// 				setMovies(res.data);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}, []);

// 	const addToFavorites = (movies) => {
// 		setFavorites([...favorites, movies]);
// 		console.log("its work?");
// 	};

// 	return <FavoriteMovies movies={movies} addToFavorites={addToFavorites} />;
// }

export default Favorites;
