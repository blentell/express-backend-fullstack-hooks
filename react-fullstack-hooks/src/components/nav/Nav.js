import React from "react";
import { Link } from "react-router-dom";
import GetMoviesHooks from "../../hooks/GetMoviesHooks";

function Nav() {
  const [search, data, error] = GetMoviesHooks();
  
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand" href="#">
					Home
				</Link>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								to="/sign-up"
								className="nav-link active"
								aria-current="page"
							>
								Sign up
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/sign-in" className="nav-link">
								Sign in
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/movies" className="nav-link">
								Movies
							</Link>
						</li>
					</ul>
				</div>				
					<input
						className="form-control me-2"
            name="search"          
						placeholder="Search"
						aria-label="Search"
					/>
					<button
						className="btn btn-outline-success"						
						onClick={search}
					>
						Search
					</button>				
			</div>
		</nav>
	);
}

export default Nav;

// onClick = { handleClick };