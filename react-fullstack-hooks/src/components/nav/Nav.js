import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Movies from "../movies/Movies"
import GetMoviesHooks from "../../hooks/GetMoviesHooks";


function Nav({ user, setUser, setData }) {
	const [search, data, error, setSearch, { SearchMovies }] = GetMoviesHooks();
	let linkTitle1 = user ? user.username : "Sign up";
	let link1 = user ? "/profile" : "/sign-up";
	let linkTitle2 = user ? "Logout" : "Sign in";
	let link2 = user ? "/" : "/sign-in";
	let linkTitle3 = user ? "Movies" : "";
	let link3 = user ? "/protected-home" : "/sign-in";
	let logoutButton = user ? logout : () => {};

	function logout() {
		setUser(null);
		window.localStorage.removeItem("jwtToken");
	}
	async function handleOnChange(e) {
		e.preventDefault();
		setSearch(e.target.value);
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand" href="#">
					Home
				</Link>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to={link1} className="nav-link active" aria-current="page">
								{linkTitle1}
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={link2}
								className="nav-link"
								onClick={() => logoutButton()}
							>
								{linkTitle2}
							</Link>
						</li>
						<li className="nav-item">
							<Link to={link3} className="nav-link">
								{linkTitle3}
							</Link>
						</li>
					</ul>
				</div>
				<input
					className="form-control me-2"
					name="search"
					placeholder="Search"
					aria-label="Search"
					onChange={handleOnChange}
				/>
				<button className="btn btn-outline-success" onClick={SearchMovies}>
					Search
				</button>
			</div>
		</nav>
	);
}

export default Nav;
