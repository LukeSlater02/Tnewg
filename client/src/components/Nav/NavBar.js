import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './NavBar.scss'
import { logout } from "../../modules/authManager";
import firebase from "firebase";
import { getCurrentUser } from "../../modules/authManager";

export const NavBar = ({ }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (firebase.auth().currentUser) {
      getCurrentUser(firebase.auth().currentUser.uid).then(data => setUser(data))
    }
  }, [])

  let url = window.location.href

  return (
    <div className="nav">

      <Link className={url.includes("/cards/list") ? "active" : ""} to={"/cards/list"}>Card List</Link>
      {user.userType == "admin" ? <Link className={url.includes("/cards/create") ? "active" : ""} to={"/cards/create"}>Create Card</Link> : ""}
      <Link to={"/decks/list"} className={url.includes("/decks/list") ? "active" : ""}>Deck List</Link>
      <a onClick={() => {
        logout()
        setUser({})
      }}>Logout</a>
    </div>
  )
}