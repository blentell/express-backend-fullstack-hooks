import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies/Movies";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Nav from "./components/nav/Nav";
import Movie from "./components/movies/Movie";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
// import ProtectedHome from "./components/protectedHome/ProtectedHome";
import GetMoviesHooks from "./hooks/GetMoviesHooks";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Favorites from "./components/movies/Favorites";

function App() {
	const [user, setUser] = useState(null);
	const [search1, data2, _, , SearchMovies] = GetMoviesHooks();
	const [isSearch, setIsSearch] = useState(false);
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [error, setError] = useState("");

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

	useEffect(async () => {
		if (isSearch) {
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
						setIsSearch(false);
						setData(result2);
					})
					.catch((e) => {
						setError(e.response.data);
					});
			}
		}
	}, [isSearch]);

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

	useEffect(() => {
		let jwtToken = window.localStorage.getItem("jwtToken");

		if (jwtToken) {
			let decodedToken = jwtDecode(jwtToken);
			const currentTime = Date.now() / 1000;

			if (decodedToken.exp < currentTime) {
				window.localStorage.removeItem("jwtToken");
				setUser(null);
			} else {
				setUser({
					email: decodedToken.email,
					username: decodedToken.username,
				});
			}
		}
	}, []);

	return (
		<>
			<ToastContainer theme="colored" />
			<Router>
				<Nav
					user={user}
					setUser={setUser}
					setIsSearch={setIsSearch}
					setSearch={setSearch}
				/>
				<Routes>
					<Route
						path="/fetch-movie/:name"
						element={
							<PrivateRoute>
								<Movie />
							</PrivateRoute>
						}
					/>
					<Route
						path="/protected-home/"
						element={
							<PrivateRoute>
								<Movies search={search} data={data} setUser={setUser} />
							</PrivateRoute>
						}
					/>
					<Route
						path="/protected-home/favorites"
						element={
							<PrivateRoute>
								<Favorites />
							</PrivateRoute>
						}
					/>
					{/* <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute> */}
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/sign-in" element={<Signin setUser={setUser} />} />
					<Route path="/" render={() => <h1>Home Page</h1>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
