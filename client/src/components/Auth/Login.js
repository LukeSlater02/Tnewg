import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, register } from "../../modules/authManager";
import './Login.scss'

export function Login() {
	let navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("")

	const [loginClicked, setLoginClicked] = useState(false)
	const [registerClicked, setRegisterClicked] = useState(false)

	const loginSubmit = (e) => {
		e.preventDefault();
		login(email, password)
			.then(() => navigate("/"))
			.catch(() => console.error());
	};

	const registerClick = (e) => {
		e.preventDefault();
		const userProfile = { email, displayName };
		register(userProfile, password).then(() => navigate("/"))
			.catch(() => console.error());

	};

	const handleInputChange = event => {
		if (event.target.id == 'email') {
			setEmail(event.target.value)
		}
		if (event.target.id == 'password') {
			setPassword(event.target.value)
		}
		if (event.target.id == 'username') {
			setDisplayName(event.target.value)
		}
	}

	return (
		<main className="container--login">
			<div className="loginContentContainer">
				<div className="loginTitle">
					<img src="img/eyeCard.png"></img> <h1>T N E W G</h1> <img src="img/lichCard.png"></img>
				</div>
			</div>

			<section className="loginBody">
				<div>
					<h1 onClick={() => {
						setLoginClicked(!loginClicked)
						setRegisterClicked(false)
					}}>LOG IN</h1>
				</div>
				{loginClicked ? <>
					<div>
						<input placeholder="Email" id="email" size={30} value={email} onChange={handleInputChange}></input>
						<br></br>
						<input placeholder="password" id="password" type="password" value={password} onChange={handleInputChange}></input>
						<br></br>
						<div className="pixelButton add"><p onClick={loginSubmit}><img src="img/powerSymbol.png"></img></p></div>
					</div></> : ""}
				<div>
					<h1 onClick={() => {
						setRegisterClicked(!registerClicked)
						setLoginClicked(false)
					}}>Register</h1>
				</div>
				{registerClicked ? <>
					<div>
						<input placeholder="Email" id="email" size={30} value={email} onChange={handleInputChange}></input>
						<input placeholder="Username" id="username" size={30} value={displayName} onChange={handleInputChange}></input>
						<br></br>
						<input placeholder="password" id="password" type="password" value={password} onChange={handleInputChange}></input>
						<br></br>
						<div className="pixelButton add"><p onClick={registerClick}>submit</p></div>
					</div></> : ""}
			</section>

		</main>
	);
}