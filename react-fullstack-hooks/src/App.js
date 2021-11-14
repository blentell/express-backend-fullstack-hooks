import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies/Movies";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Nav from "./components/nav/Nav";
import Movie from "./components/movies/Movie";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
// import ProtectedHome from "./components/protectedHome/ProtectedHome";
// import GetMoviesHooks from "./hooks/GetMoviesHooks";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
	const [user, setUser] = useState(null);
	

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
	},[]);
	return (
		<>
			<ToastContainer theme="colored" />
			<Router>
				<Nav user={user} setUser={setUser} />
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
						path="/protected-home"
						element={
							<PrivateRoute>
								<Movies />
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
