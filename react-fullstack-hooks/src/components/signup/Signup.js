import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FirstNameHooks from "../../hooks/FirstNameHooks";
import LastNameHooks from "../../hooks/LastNameHooks";
import UsernameHooks from "../../hooks/UsernameHooks";
import PasswordHooks from "../../hooks/PasswordHooks";
import EmailHooks from "../../hooks/EmailHooks";
import CheckToken from "../../hooks/CheckToken";

import "./Signup.css";

function Signup() {
	const navigate = useNavigate();
	const { checkJwtToken } = CheckToken();

	useEffect(() => {
		if (checkJwtToken()) {
			navigate("/protected-home");
		}
	}, []);

	const [
		firstName,
		handleFirstNameOnChange,
		firstNameError,
		setOnFocus1,
		setOnBlur1,
	] = FirstNameHooks();
	const [
		lastName,
		handleLastNameOnChange,
		lastNameError,
		setOnFocus,
		setOnBlur,
	] = LastNameHooks();
	const [username, handleUsernameOnChange, usernameError, setOnBlur2] =
		UsernameHooks();
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
				"http://localhost:3001/api/users/create-user",
				{
					firstName,
					lastName,
					username,
					email,
					password,
				}
			);
			toast.success("Congrats~! Now please sign in!", {
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
					<h1 className="h3 mb-3 fw-normal">Please sign up</h1>

					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="firstName"
							placeholder="first name"
							onChange={handleFirstNameOnChange}
							onFocus={() => setOnFocus1(true)}
							onBlur={() => setOnBlur1(true)}
						/>
						<label htmlFor="floatingInput">First name</label>
					</div>
					<div>{firstNameError && firstNameError}</div>

					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="lastName"
							placeholder="last name"
							onChange={handleLastNameOnChange}
							onFocus={() => setOnFocus(true)}
							onBlur={() => setOnBlur(true)}
						/>
						<label htmlFor="floatingInput">Last name</label>
					</div>
					<div>{lastNameError && lastNameError}</div>

					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="username"
							placeholder="username"
							onChange={handleUsernameOnChange}
							// onFocus={() => setOnFocus2(true)}
							onBlur={() => setOnBlur2(true)}
						/>
						<label htmlFor="floatingInput">Username</label>
					</div>
					<div>{usernameError && usernameError}</div>

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
						Sign up
					</button>
				</form>
			</main>
		</div>
	);
}

export default Signup;
