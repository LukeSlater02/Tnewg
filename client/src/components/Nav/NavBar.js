import React from "react";
import { Link } from "react-router-dom";
import './NavBar.scss'

export const NavBar = () => {
    return(
       <div className="nav">
        <Link to={"/cards/list"}>Card List</Link>
        <Link to={"/cards/create"}>Create Card</Link>
        <Link to={"/decks/list"}>Deck List</Link>
       </div>
    )
}