import axios from "axios";
import { useState, useEffect } from "react";

const GetMoviesHooks = () => {
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [error, setError] = useState("");

	const randomizePoster = () => {
		let searchArray = [
			"Superman",
			"lord of the ring",
			"batman",
			"Pokemon",
			"Harry Potter",
			"Star Wars",
			"avengers",
			"Terminator",
		];
		let randomize = Math.floor(Math.random() * 8);
		return searchArray[randomize];
	};

	useEffect(() => {
		const fetchData = async (search) => {
			
      const handleOnClick = (event) => {
				event.preventDefault();
				if (search.length === 0) {
					setError("Cannot submit an empty field");
				} else {
					setSearch(fetchData(event.target.value));
				}
			};
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
		setSearch(fetchData(randomizePoster()));
	}, []);

	return [search, data, error];
};

export default GetMoviesHooks;
