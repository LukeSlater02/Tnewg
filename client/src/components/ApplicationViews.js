import React, { useState } from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { IntroMap } from "./introMap/IntroMap"
import { Login } from "./Auth/Login"
import { BattleMap } from "./battles/battleMap"
import { CreateCard } from "./Cards/CreateCard"
import { NavBar } from "./Nav/NavBar"
import { CardList } from "./Cards/CardList"

export const ApplicationViews = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/battle" element={<BattleMap />}></Route>
        <Route path="/cards/create" element={<><NavBar /><CreateCard /></>}></Route>
        <Route path="/cards/list" element={<><NavBar/> <CardList/></>}></Route>
      </Routes>
    </>
  )
}