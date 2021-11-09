import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PasswordHooks from "../../hooks/PasswordHooks";
import EmailHooks from "../../hooks/EmailHooks";

import "./Signin.css";

function Signin() {
	const [
		password,
		handlePasswordOnChange,
		passwordError,
		setOnFocus3,
		setOnBlur3,
	] = PasswordHooks();
	const [email, handleEmailOnChange, emailError, setOnFocus4, setOnBlur4] =
		EmailHooks();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			let payload = await axios.post(
				"http://localhost:3001/api/users/login",
				{				
					email,
					password,
				}
      );      
			toast.success("Congrats~! You've signed in!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (e) {
			console.log(e.response);
			toast.error(e.response.data.error);
		}
	}
	return (
		<div className="form-div-signin">
			<main className="form-signin">
				<form onSubmit={handleSubmit}>
					<h1 className="h3 mb-3 fw-normal">Please sign in</h1>

					
					<div className="form-floating">
						<input
							type="email"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							onChange={handleEmailOnChange}
							onFocus={() => setOnFocus4(true)}
							onBlur={() => setOnBlur4(true)}
						/>
						<label htmlFor="floatingInput">Email address</label>
						<div>{emailError && emailError}</div>
					</div>

					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							onChange={handlePasswordOnChange}
							onFocus={() => setOnFocus3(true)}
							onBlur={() => setOnBlur3(true)}
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<div>{passwordError && passwordError}</div>

					<button className="w-100 btn btn-lg btn-primary" type="submit">
						Sign in
					</button>
				</form>
			</main>
		</div>
	);
}

export default Signin;


