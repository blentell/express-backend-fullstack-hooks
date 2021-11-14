import axios from "axios";
import { useState, useEffect } from "react";

const SearchHooks = () => {
	
		const [search, setSearch] = useState("");
		const [data, setData] = useState([]);
		const [error, setError] = useState("");

		useEffect(() => {
			const fetchData = async () => {
				const response = await axios.get(
					`https://www.omdbapi.com/?apikey=12384fbb&s=${search}&type=movie`
				);

				if (response.data.Response === "False") {
					setError("No movie by that name");
				} else {
					let movieIdArray = response.data.Search.map((item) => item.imdbID);
					let promiseMovieArray = movieIdArray.map(async (item) => {
						return await axios.get(
							`https://www.omdbapi.com/?apikey=12384fbb&i=${item}`
						);
					});
					Promise.all(promiseMovieArray)
						.then((result) => {
							setError("");
							console.log("result", result);
							setData(result);
						})
						.catch((e) => {
							setError(e.response.data);
						});
				}
			};
			fetchData();
		}, []);

		return [search, setSearch];
	};
	

export default SearchHooks;