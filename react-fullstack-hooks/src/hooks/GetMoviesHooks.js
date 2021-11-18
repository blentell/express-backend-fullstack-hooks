import axios from "axios";
import { useState, useEffect } from "react";

const GetMoviesHooks = () => {
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [error, setError] = useState("");

// console.log("getMoviesSearch:", search)
	function randomizePoster() {
		let searchArray = [
			"Superman",
			"lord of the rings",
			"batman",
			"Pokemon",
			"Harry Potter",
			"Star Wars",
			"avengers",
			"Terminator",
		];
		let randomize = Math.floor(Math.random() * 8);
		return searchArray[randomize];
	}

	async function SearchMovies() {
		// window.history.pushState("", "", `/protected-home?s=${movieTitle}`);
			const payload = await axios.get(
				`https://www.omdbapi.com/?apikey=12384fbb&s=${search}&type=movie`
			);	
			if (payload.data.Response === "False") {
				setError("No movie by that name");
			} else {
				let movieIdArray2 = payload.data.Search.map((item2) => item2.imdbID);
				let promiseMovieArray2 = movieIdArray2.map(async (item2) => {
					return await axios.get(
						`https://www.omdbapi.com/?apikey=12384fbb&i=${item2}`
					);
				});
				Promise.all(promiseMovieArray2)
					.then((result2) => {
						setError("");						
						// setData(result2);
						let resultArray = result2.map((item) => {
							return item.data;
						})
						setData(resultArray)
					})
					.catch((e) => {
						setError(e.response.data);
					});
		
		};
	}

	useEffect(() => {
		const fetchData = async (search) => {
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
						setData(result);
					})
					.catch((e) => {
						setError(e.response.data);
					});
			}
		};
		fetchData(randomizePoster());
	}, []);

	return [search, data, error, setSearch, SearchMovies];
};

export default GetMoviesHooks;
