import React, { useState } from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { IntroMap } from "./introMap/IntroMap"
import { Login } from "./Auth/Login"
import { BattleMap } from "./battles/battleMap"

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
        <Route path="/" element={<IntroMap />}></Route>
        <Route path="/battle" element={<BattleMap/>}></Route>
      </Routes>
    </>
  )
}