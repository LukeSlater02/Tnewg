import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../modules/authManager";
import './Login.scss'

export function Login() {
	let navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginSubmit = (e) => {
		e.preventDefault();
		login(email, password)
			.then(() => navigate("/"))
			.catch(() => alert("Login Failed"));
	};

	const handleInputChange = event => {
		if(event.target.id == 'email')
		{
			setEmail(event.target.value)
		}
		if(event.target.id == 'password')
		{
			setPassword(event.target.value)
		}
	}

	return (
		<main className="container--login">
			{/* <dialog className="dialog dialog--auth" open={existDialog}>
				<div>User does not exist</div>
				<button
					className="button--close"
					onClick={(e) => setExistDialog(false)}
				>
					Close
				</button>
			</dialog> */}
			<section className="dragon-img"></section>
			<section >
				<form className="form--login" onSubmit={loginSubmit}>
					<fieldset>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Email"
							required
							autoFocus
							value={email}
							onChange={handleInputChange}
						/>
					</fieldset>
					<fieldset>
						<input
							type="password"
							id="password"
							className="form-control"
							placeholder="Password"
							required
							autoFocus
							value={password}
							onChange={handleInputChange}
						/>
					</fieldset>
					<fieldset>
						<button type="submit">Sign In</button>
					</fieldset>
				</form>
			</section>
			<section className="link--register"> <br></br>
				<Link to="/register">Register for an account</Link>
			</section>
		</main>
	);
}