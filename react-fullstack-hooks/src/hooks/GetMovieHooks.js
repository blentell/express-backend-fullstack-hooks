import axios from "axios";
import { useState, useEffect } from "react";
// import Movies from "../components/movies/Movies";


const GetMovieHooks = (search) => {
	
	const [data, setData] = useState("");
  
	useEffect(() => {
		const fetchData = async () => { 
			const response = await axios.get(
        `https://www.omdbapi.com/?apikey=12384fbb&t=${search}`
        );
        
        setData(response.data);        
      };
     

		fetchData();
	}, []);

	return [data];
};

export default GetMovieHooks;