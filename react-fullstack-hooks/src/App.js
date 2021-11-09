import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies/Movies"
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Nav from "./components/nav/Nav";
import Movie from "./components/movies/Movie";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
	return (
		<>
			<ToastContainer theme="colored" />
			<Router>
				<Nav />	
				<Switch>
					<Route exact path="/fetch-movie/:name" component={Movie} />
					<Route exact path="/movies" component={Movies} />
					<Route exact path="/sign-up" component={Signup} />
					<Route exact path="/sign-in" component={Signin} />
					<Route exact path="/" render={() => <h1>Home Page</h1>} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
