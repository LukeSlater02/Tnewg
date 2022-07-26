import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.scss'
import { logout } from "../../modules/authManager";

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate()
    return (
        <div className="nav">
            <Link to={"/cards/list"}>Card List</Link>
            {currentUser.userType == "admin" ? <Link to={"/cards/create"}>Create Card</Link> : ""}
            <div className="navTitle">
                <img src="/img/eyeCard.png"></img> <h1>T N E W G</h1> <img src="/img/lichCard.png"></img>
            </div>
            <Link to={"/decks/list"}>Deck List</Link>
            <a onClick={() => {
                logout().then(() => navigate("/login"))
            }}>Logout</a>
        </div>
    )
}