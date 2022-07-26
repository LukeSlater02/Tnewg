import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.scss'
import { logout, getCurrentUser } from "../../modules/authManager";

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate()
    return (
        <div className="nav">
            <Link to={"/cards/list"}>Card List</Link>
            {currentUser.userType == "admin" ? <Link to={"/cards/create"}>Create Card</Link> : ""}
            <Link to={"/decks/list"}>Deck List</Link>
            <a onClick={() => {
                logout().then(() => navigate("/login"))
            }}>Logout</a>
        </div>
    )
}