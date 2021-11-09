import React from "react";
import {useParams} from "react-router-dom"
import GetMovieHooks from "../../hooks/GetMovieHooks";

function Movie() {
  let { name } = useParams();
	const [data] = GetMovieHooks(name);
 
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
