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
		if (event.target.id == 'email') {
			setEmail(event.target.value)
		}
		if (event.target.id == 'password') {
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

			<div className="loginContentContainer">

				<div className="loginTitle">
					<img src="img/eyeCard.png"></img> <h1>T N E W G</h1> <img src="img/lichCard.png"></img>
				</div>

				<section className="loginBody">
					<div>
						<h1>LOG IN</h1>
					</div>
					<div>
						<Link to="/register"><h1>Register</h1></Link>
					</div>
				</section>

			</div>

		</main>
	);
}