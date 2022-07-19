import React, { useEffect, useState } from "react";
import { ApplicationViews } from "./components/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
import { onLoginStatusChange } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <p>LOADING</p>;
  }

  return (
    <ApplicationViews isLoggedIn={isLoggedIn} />
  );
}

export default App;