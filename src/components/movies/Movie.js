import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import GetMovieHooks from "../../hooks/GetMovieHooks";
import CheckToken from "../../hooks/CheckToken";
import { useNavigate } from "react-router-dom";


function Movie() {
  let { name } = useParams();
	const [data] = GetMovieHooks(name);
	const { checkJwtToken } = CheckToken();
	const navigate = useNavigate();

 useEffect(() => {
		if (checkJwtToken()) {
			navigate("/fetch-movie/:name");
		}
 }, []);
	return (					
		<div>
			<p>{data.Title}</p>
      <img src={data.Poster} alt="movie"></img>
      <p>{data.Plot}</p>
			<p>IMDB Rating: {data.imdbRating}</p>
    </div>
      
	);
}

export default Movie;
