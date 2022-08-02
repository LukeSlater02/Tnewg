import React, { useEffect, useState } from "react";
import { ApplicationViews } from "./components/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
import { onLoginStatusChange, getCurrentUser } from "./modules/authManager";
import firebase from "firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <p>LOADING</p>;
  }

  return (
    <>
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </>

  );
}

export default App;