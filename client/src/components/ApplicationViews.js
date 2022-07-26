import React, { useState, useEffect } from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { IntroMap } from "./introMap/IntroMap"
import { Login } from "./Auth/Login"
import { BattleMap } from "./battles/battleMap"
import { CreateCard } from "./Cards/CreateCard"
import { NavBar } from "./Nav/NavBar"
import { CardList } from "./Cards/CardList"
import { DeckView } from "./Decks/DeckView"
import { DeckList } from "./Decks/DeckList"
import { EditCard } from "./Cards/EditCard"
import { getCurrentUser } from "../modules/authManager"
import firebase from "firebase"

export const ApplicationViews = ({ isLoggedIn }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (firebase.auth().currentUser) {
      getCurrentUser(firebase.auth().currentUser.uid).then(data => setUser(data))
    }
  }, [])

  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<><Login /></>}></Route>
        </Routes>
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/card/:cardId/edit" element={<><NavBar currentUser={user} /><EditCard /></>}></Route>
        <Route path="/battle" element={<BattleMap />}></Route>
        <Route path="/cards/list" element={<><NavBar currentUser={user} /> <CardList /></>}></Route>
        <Route path="/deck/:deckId" element={<><NavBar currentUser={user} /><DeckView /></>}></Route>
        <Route path="/decks/list" element={<><NavBar currentUser={user} /><DeckList /></>}></Route>
        {user.userType == "admin" ?
          <Route path="/cards/create" element={<><NavBar currentUser={user} /><CreateCard /></>}></Route>
          :
          ""
        }
        <Route path="*" element={<><NavBar currentUser={user} /><Navigate to="/decks/list" /></>}></Route>
      </Routes>
    </>
  )
}